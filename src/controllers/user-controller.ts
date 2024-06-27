import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import dotenv from "dotenv";
dotenv.config();

import { foundUser } from "../repositories/user-repository";
// import { updateProfile } from "../repositories/profile-repository";

// @route POST api/auth/send-otp
// @desc To send SMS OTP to user
// @access Public
export const getUserInfo: RequestHandler = async (req, res, next) => {
  const { user } = req.session;

  console.log("Hello user...", user);

  try {
    const found_user = await foundUser(user?.email!);
    console.log("This is found user....", found_user);

    if (!found_user) {
      return next(
        new BaseError("User does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

    console.log("THIS is found user...", found_user);
    const { id, password, createdAt, updatedAt, ...others } = found_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "User info!",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
