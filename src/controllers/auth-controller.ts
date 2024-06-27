import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
// import db from "../database/models";
import bcrypt from "bcrypt";
// import crypto from "crypto";
// import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// const User = db.User;
// const smsKey: string = process.env.SMS_KEY!;
import {
  foundUser,
  existingAcctId,
  createUser,
} from "../repositories/user-repository";

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const register: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const original_password = req.body.password;

  try {
    const found_user = await foundUser(email);
    // console.log("This is found user....", found_user);

    if (found_user) {
      return next(
        new BaseError(
          "Account already exist, login instead!",
          httpStatusCodes.CONFLICT
        )
      );
    }

    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(original_password, salt);

    const payload = {
      email: email,
      password: hashed_password,
    };
    console.log("This is user payload...", payload);

    const created_user = await createUser(payload);
    console.log("Created user yes...", created_user);
    const { id, password, ...others } = created_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Account created!.",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const login: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  const original_password = req.body.password;

  try {
    const found_user = await foundUser(email);
    // console.log("This is found user....", found_user);

    if (!found_user) {
      return next(
        new BaseError(
          "Error login in check credentials!",
          httpStatusCodes.CONFLICT
        )
      );
    }

    const hashedPassword = await bcrypt.compare(
      original_password,
      found_user.password
    );

    if (!hashedPassword) {
      return next(
        new BaseError(
          "Wrong password or username!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    // Session
    const { createdAt, updatedAt, ...session_data } = found_user;
    console.log("This is the session data going to the session", session_data);

    const new_session = {
      id: session_data.id.toString(),
      acctId: session_data.acctId,
      email: session_data.email,
      password: session_data.password,
    };
    console.log("This is the new session...", new_session);

    req.session.user = new_session;

    req.session.save(function (err) {
      if (err) return next(err);
    });

    const { id, password, ...others } = found_user;

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "You are logged in",
      data: { ...others },
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/auth/login
// @desc Login into account
// @access Private
export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new BaseError("Logout error!", httpStatusCodes.UNAUTHORIZED));
    }
    console.log("Logout successful!");
    res.status(200).json({
      status: "success",
      msg: "Logout successful!",
    });
  });
};
