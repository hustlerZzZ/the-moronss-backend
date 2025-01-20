import { Request } from "express";
import { Users } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import transporter from "../config/emailConfig";

export default async function sendEmailVerification(req: Request, user: Users) {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 15);

  await prisma.email_verification.create({
    data: {
      user_id: user.id,
      otp: `${OTP}`,
      expires_at: expiration,
    },
  });

  // OTP Verification Link
  const otpVerifyLink = `${process.env.FRONTEND_HOST}/account/verify-email`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "OTP - Verify your account",
    html: `
        <div>
            <p>Dear ${user.name}</p>
            <p>Thank your for siging up with our service.</p>
            <p>To complete the registration, please verify your email address by entering the following OTP : <a href=${otpVerifyLink}>Click Here</a></p>
            <h2>${OTP}</h2>
            <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>
        </div>
        `,
  });

  return OTP;
}
