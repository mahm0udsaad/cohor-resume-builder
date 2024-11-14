"use server";
import prisma from "@/lib/prisma";
import { createTransport } from "nodemailer";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Function to generate a random verification code
function generateVerificationCode(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
}

// Validation schema for password reset
const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Function to initiate forgot password process
export async function initiatePasswordReset(formData) {
  const email = formData.get("email");

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "UserNotFound" };
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();

    // Delete any existing verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: "PASSWORD_RESET",
      },
    });

    // Save verification code and set expiry (15 minutes)
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationCode,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        type: "PASSWORD_RESET",
      },
    });

    // Send verification email with password reset code
    await sendVerificationEmail(email, verificationCode, "PASSWORD_RESET");

    return {
      success: true,
      email,
    };
  } catch (error) {
    console.error("Password reset initiation error:", error);
    return { error: "ResetInitiationFailed" };
  }
}

// Function to reset password after verification
export async function resetPassword(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  try {
    // Validate password
    const validationResult = resetPasswordSchema.safeParse({
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      return { error: validationResult.error.issues[0].message };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Delete all verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        type: "PASSWORD_RESET",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "PasswordResetFailed" };
  }
}

// Updated verifyEmail function to handle both email verification and password reset
export async function verifyEmail(formData) {
  const email = formData.get("email");
  const code = formData.get("code");
  const type = formData.get("type") || "EMAIL_VERIFICATION";

  try {
    // Find the verification token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: code,
        type,
        expires: { gt: new Date() },
      },
    });

    if (!verificationToken) {
      return { error: "InvalidOrExpiredCode" };
    }

    if (type === "EMAIL_VERIFICATION") {
      // Handle email verification
      await prisma.user.update({
        where: { email },
        data: { emailVerified: true },
      });
    }

    // Delete the used verification token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true };
  } catch (error) {
    console.error("Verification error:", error);
    return { error: "VerificationFailed" };
  }
}

// Updated helper function to send verification email
const sendVerificationEmail = async (
  email,
  code,
  type = "EMAIL_VERIFICATION",
) => {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const subject =
    type === "PASSWORD_RESET"
      ? "Reset Your Password - CV.COHR"
      : "Verify your email - CV.COHR";

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
      </head>
      <body>
          <div class="container">
              <div class="logo">
                 <img class="logo-img" src="https://cv.cohr.sa/ar-logo.png" alt="Company Logo">
              </div>
              <div class="content">
                  <h1>${
                    type === "PASSWORD_RESET"
                      ? "Reset Your Password"
                      : "Verify Your Email Address"
                  }</h1>
                  <p>${
                    type === "PASSWORD_RESET"
                      ? "You requested to reset your password. Use the code below to complete the process:"
                      : "Welcome to CV.COHR! 🎉"
                  }</p>
                  <p>Your verification code is:</p>
                  
                  <div style="text-align: center; margin: 35px 0;">
                      <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3b51a3;">
                          ${code}
                      </div>
                  </div>
                  
                  <p>This code will expire in 15 minutes.</p>
                  <p>${
                    type === "PASSWORD_RESET"
                      ? "If you didn't request a password reset, please ignore this email."
                      : "If you didn't create an account with CV.COHR, please disregard this email."
                  }</p>

                  <div class="divider"></div>
              </div>
              <div class="footer">
                  <p>CV.COHR - Create Professional CVs in Minutes<br>
                  © 2024 CV.COHR. All rights reserved.</p>
                  <p>This is an automated message, please do not reply to this email.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
