import "server-only";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";

export const { signIn, signOut, auth, handlers } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    // Nodemailer({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest: async ({
    //     identifier,
    //     url,
    //     token,
    //     baseUrl,
    //     provider,
    //   }) => {
    //     const transporter = createTransport({
    //       host: process.env.EMAIL_SERVER_HOST,
    //       port: process.env.EMAIL_SERVER_PORT,
    //       auth: {
    //         user: process.env.EMAIL_SERVER_USER,
    //         pass: process.env.EMAIL_SERVER_PASSWORD,
    //       },
    //     });

    //     const mailOptions = {
    //       from: process.env.EMAIL_FROM,
    //       to: identifier,
    //       subject: `Sign in link for Cohor`,
    //       html: `
    //       <div style={{fontFamily: "Arial, sans-serif", color: "#333", display: "flex", flexDirection: "column", alignItems: "center"}}>              <h2>Welcome to SooSquare!</h2>
    //           <p>We're excited to have you on board. To get started, please verify your email address.</p>
    //           <a href="${url}" style="background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; margin: 10px 0; display: inline-block;">
    //             Verify Email
    //           </a>
    //           <p>If you didn’t ask to verify this address, you can ignore this email.</p>
    //           <p>Thanks,<br/>The SooSquare Team</p>
    //         </div>
    //       `,
    //     };
    //     return transporter.sendMail(mailOptions);
    //   },
    // }),
    Google,
  ],
  pages: {
    signIn: "/auth",
  },
});
