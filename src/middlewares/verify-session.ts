import { RequestHandler } from "express";

import BaseError from "../utils/base-error";
import { httpStatusCodes } from "../utils/http-status-codes";

// VALIDATE USER SESSION
export const verifySession: RequestHandler = (req, res, next) => {
  const { user } = req.session;

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

    if (!user?.email) {
      return next(
        new BaseError(
          "Not authorised to access resource, invalid or expired session!",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    next();
  });
};
