"use server";
import prisma from "@/lib/prisma";
import { createTransport } from "nodemailer";
import { z } from "zod"; // For input validation
import { revalidatePath } from "next/cache";
import { signIn } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { getUserOnboardingStatus } from "../userInfo/action";
import { redirect } from "next/navigation";

function generateVerificationCode(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
}
export async function handleCredentialsAuth(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Check if there's an error in the result
    if (result?.error) {
      // Parse the error message from the callback error
      if (result.error.includes("Invalid password")) {
        return { error: "InvalidPassword" };
      } else if (result.error.includes("User not found")) {
        return { error: "UserNotFound" };
      } else {
        return { error: "CredentialsSignin" };
      }
    }

    const hasCompletedOnboarding = await getUserOnboardingStatus(email);
    if (hasCompletedOnboarding) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding");
    }
    return result;
  } catch (error) {
    console.error("Auth error:", error);
    // Extract the actual error message from the CallbackRouteError
    const errorMessage = error.message || error.toString();

    if (errorMessage.includes("Invalid password")) {
      return { error: "InvalidPassword" };
    } else if (errorMessage.includes("User not found")) {
      return { error: "UserNotFound" };
    }

    return { error: "CredentialsSignin" };
  }
}

export async function handleGoogleAuth() {
  return signIn("google");
}

// Validation schemas
const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

// Helper function to send verification email
export const sendVerificationEmail = async (email, code) => {
  console.log(email);

  const transporter = createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email - CV.COHR",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - CV.COHR</title>
               <style>
              @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
              }
  
              @keyframes pulse {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                  100% { transform: scale(1); }
              }
  
              @keyframes gradientBG {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
              }
  
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background: linear-gradient(45deg, #f4f6ff, #e8ebff, #f4f6ff);
                  background-size: 200% 200%;
                  animation: gradientBG 15s ease infinite;
                  min-height: 100vh;
              }
  
              .container {
                  max-width: 600px;
                  margin: 40px auto;
                  padding: 40px;
                  background: rgba(255, 255, 255, 0.95);
                  border-radius: 20px;
                  box-shadow: 0 10px 30px rgba(59, 81, 163, 0.1);
                  animation: fadeIn 1s ease-out;
                  backdrop-filter: blur(10px);
              }
  
              .logo {
                  text-align: center;
                  margin-bottom: 10px;
                  animation: fadeIn 1s ease-out;
              }
  
              .logo-img {
                  width: 100px;
                  height: 80px;
              }
  
              .content {
                  padding: 20px;
                  animation: fadeIn 1.2s ease-out;
              }
  
              h1 {
                  color: #3b51a3;
                  font-size: 28px;
                  margin-bottom: 25px;
                  text-align: center;
              }
  
              .button {
                  display: inline-block;
                  padding: 15px 40px;
                  background: linear-gradient(135deg, #3b51a3, #4c64b8);
                  color: #ffffff !important;
                  text-decoration: none;
                  border-radius: 50px;
                  font-weight: 600;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                  transition: all 0.3s ease;
                  box-shadow: 0 5px 15px rgba(59, 81, 163, 0.3);
                  animation: pulse 2s infinite;
              }
  
              .button:hover {
                  transform: translateY(-2px);
                  color: #ffffff;
                  box-shadow: 0 8px 20px rgba(59, 81, 163, 0.4);
                  background: linear-gradient(135deg, #4c64b8, #3b51a3);
              }
  
              .divider {
                  height: 1px;
                  background: linear-gradient(to right, transparent, #3b51a3, transparent);
                  margin: 30px 0;
              }
  
              .footer {
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid rgba(59, 81, 163, 0.1);
                  font-size: 12px;
                  color: #666;
                  text-align: center;
                  animation: fadeIn 1.4s ease-out;
              }
  
              .social-links {
                  margin: 20px 0;
                  text-align: center;
              }
  
              .social-links a {
                  color: #3b51a3;
                  margin: 0 10px;
                  text-decoration: none;
                  transition: color 0.3s ease;
              }
  
              .social-links a:hover {
                  color: #4c64b8;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">
                 <img class="logo-img" src="https://cv.cohr.sa/ar-logo.png" alt="Company Logo">
              </div>
              <div class="content">
                  <h1>Verify Your Email Address</h1>
                  <p>Welcome to CV.COHR! 🎉</p>
                  <p>Your verification code is:</p>
                  
                  <div style="text-align: center; margin: 35px 0;">
                      <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #3b51a3;">
                          ${code}
                      </div>
                  </div>
                  
                  <p>This code will expire in 15 minutes.</p>
                  <p>If you didn't create an account with CV.COHR, please disregard this email.</p>

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
export async function storeUser(userData) {
  try {
    const { email, name, image } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return existingUser;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name,
        image: image,
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error storing user:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return { success: true, user };
    } else {
      const newUser = await prisma.user.create({
        data: { email },
      });

      return { success: true, user: newUser };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message };
  }
}

export async function handleMagicLinkSignIn(email) {
  try {
    await signIn("nodemailer", { email, callbackUrl: "/dashboard" });
    return { success: true };
  } catch (error) {
    console.error("Magic link sign in failed:", error);
    return { success: false, error: "Failed to send magic link" };
  }
}
export async function googleSignIn() {
  try {
    await signIn("google");
    return { success: true };
  } catch (error) {
    console.error("Magic link sign in failed:", error);
    return { success: false, error: "Failed to send magic link" };
  }
}

// Server Actions
export async function register(formData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validatedData = registerSchema.parse(rawData);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { error: "Email already registered" };
    }

    // Add better error handling and logging
    try {
      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      const verificationCode = generateVerificationCode();
      const verificationExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      console.log(verificationCode);

      console.log("Debug: before user creation", {
        hashedPassword,
        verificationCode,
        email: validatedData.email,
      });

      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          verificationCode,
          verificationExpires,
          emailVerified: false,
        },
      });

      console.log("Debug: user created successfully", user);

      await sendVerificationEmail(validatedData.email, verificationCode);
      return {
        success: true,
        redirectPath: `/auth/verify?email=${validatedData.email}`,
        redirectStatus: 303,
      };
    } catch (err) {
      console.error("Error in registration process:", err);
      throw err; // Re-throw to be caught by outer try-catch
    }
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    if (error.code === "P2002") {
      return { error: "Email already registered" };
    }

    return { error: "Registration failed. Please try again." };
  }
}

export async function verifyEmail(formData) {
  try {
    const rawData = {
      email: formData.get("email"),
      code: formData.get("code"),
    };

    const validatedData = verifyEmailSchema.parse(rawData);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.emailVerified) {
      return { error: "Email already verified" };
    }

    if (user.verificationCode !== validatedData.code) {
      return { error: "Invalid verification code" };
    }

    if (new Date() > user.verificationExpires) {
      return { error: "Verification code expired" };
    }

    await prisma.user.update({
      where: { email: validatedData.email },
      data: {
        emailVerified: true,
        verificationCode: null,
        verificationExpires: null,
      },
    });

    revalidatePath("/auth/verify");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Verification failed. Please try again." };
  }
}

export async function resendVerification(formData) {
  try {
    const email = formData.get("email")?.toString();
    if (!email) {
      return { error: "Email is required" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (user.emailVerified) {
      return { error: "Email already verified" };
    }

    const verificationCode = generateVerificationCode();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        verificationCode,
        verificationExpires,
      },
    });

    await sendVerificationEmail(email, verificationCode);

    return { success: true };
  } catch (error) {
    return { error: "Failed to resend verification code. Please try again." };
  }
}
