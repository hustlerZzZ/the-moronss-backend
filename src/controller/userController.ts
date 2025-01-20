import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../utils/statusCodes";
import { Request, Response, NextFunction } from "express";
import sendEmailVerification from "../utils/emailVerification";

const prisma = new PrismaClient();

export class UserController {
  static async userRegistration(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, email, password, password_confirmation } = req.body;

      if (!name || !email || !password || !password_confirmation) {
        res.status(StatusCode.BAD_REQUEST).json({
          status: "failed",
          msg: "All fields are required!",
        });
        return;
      }

      if (password !== password_confirmation) {
        res.status(StatusCode.BAD_REQUEST).json({
          status: "failed",
          msg: "Passwords don't match",
        });
        return;
      }

      const existingUser = await prisma.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        res.status(StatusCode.ALREADY_EXISTS).json({
          status: "failed",
          msg: "Email already exists!",
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await sendEmailVerification(req, newUser);

      res.status(StatusCode.OK).json({
        status: "success",
        msg: "Registration success!",
        newUser: {
          id: newUser.id,
          email: newUser.email,
          created_at: newUser.created_at,
        },
      });
    } catch (e) {
      console.error(e);
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        status: "failed",
        msg: "Unable to register, please try again later!",
      });
    }
  }
  // User Email Verification
  // User Login
  // Get new access token or refresh token
  // Change password
  // Profile or logged-in user
  // send password reset email
  // password reset
}
