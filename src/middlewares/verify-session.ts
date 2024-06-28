import fs from "fs";
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";

import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";

// VALIDATE USER SESSION
export const verifySession: RequestHandler = (req, res, next) => {
  const { user } = req.session;

  console.log("This is the session user...", user);

  if (!user) {
    return next(
      new BaseError(
        "Session is invalid or expired, login to continue!",
        httpStatusCodes.UNAUTHORIZED
      )
    );
  }
  req.user = user;
  next();
};

// USER ONLY
export const verifySessionAndAuthorization: RequestHandler = (
  req,
  res,
  next
) => {
  verifySession(req, res, async () => {
    const user = req.user;
    console.log("This is user...from session...", user);
    const user_id = req.body?.id || req.params?.id;

    if (!user?.email) {
      return next(
        new BaseError(
          "Not authorised to access resource, invalid or expired session!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    if (user?.id === user_id || user?.id) {
      next();
      return;
    }

    return next(
      new BaseError(
        "Requires User Authorization!",
        httpStatusCodes.UNAUTHORIZED
      )
    );
  });
};
