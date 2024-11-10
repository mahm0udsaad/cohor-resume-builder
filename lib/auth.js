import "server-only";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { createTransport } from "nodemailer";
import Nodemailer from "next-auth/providers/nodemailer";

export const { signIn, signOut, auth, handlers } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url }) => {
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
          to: identifier,
          subject: "Sign in link for cv.cohr",
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
                        margin-bottom: 40px;
                        animation: fadeIn 1s ease-out;
                    }
        
                    .logo-text {
                        font-size: 2.5em;
                        font-weight: bold;
                        color: #3b51a3;
                        letter-spacing: 2px;
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
                       <img src="https://cv.cohr.sa/ar-logo.png" alt="Company Logo">
                    </div>
                    <div class="content">
                        <h1>Verify Your Email Address</h1>
                        <p>Welcome to CV.COHR! 🎉</p>
                        <p>We're excited to have you on board. To get started with creating your professional CV, please verify your email address by clicking the button below:</p>
                        
                        <div style="text-align: center; margin: 35px 0;">
                            <a href="${url}" class="button">Verify Email Address</a>
                        </div>
        
                        <p>If you didn't create an account with CV.COHR, please disregard this email.</p>
        
                        <div class="divider"></div>
        
                        <div class="social-links">
                            <a href="#">Twitter</a> • 
                            <a href="#">LinkedIn</a> • 
                            <a href="#">Instagram</a>
                        </div>
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
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    verifyRequest: "/auth?verifying=true",
  },
});
