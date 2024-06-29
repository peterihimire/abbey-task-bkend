import { RequestHandler } from "express";
import { httpStatusCodes } from "../utils/http-status-codes";
import BaseError from "../utils/base-error";
import dotenv from "dotenv";
import {
  foundUser,
  createFollower,
  createFriendship,
} from "../repositories/user-repository";

dotenv.config();

// @route POST api/users/acct_info
// @desc To get user details
// @access Public
export const getUserInfo: RequestHandler = async (req, res, next) => {
  const { user } = req.session;

  try {
    if (!user) {
      return next(
        new BaseError(
          "User is not authenticated.",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    const found_user = await foundUser(user?.email!);

    if (!found_user) {
      return next(
        new BaseError("User does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

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

// @route POST api/users/add_friend
// @desc To add a friend
// @access Private
export const addFriend: RequestHandler = async (req, res, next) => {
  const { user } = req.session;
  const { friendId } = req.body;

  console.log("Hello user...", user);

  try {
    if (!user) {
      return next(
        new BaseError(
          "User is not authenticated.",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    const found_user = await foundUser(user?.email!);
    console.log("This is found user....", found_user);

    if (!found_user) {
      return next(
        new BaseError("User does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

    const payload = {
      userId: Number(user?.id),
      friendId: friendId,
    };

    const added_friend = await createFriendship(payload);

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Friend Added!",
      data: added_friend,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};

// @route POST api/users/add_follower
// @desc To add a follower
// @access Private
export const addFollower: RequestHandler = async (req, res, next) => {
  const { user } = req.session;
  const { friendId } = req.body;

  console.log("Hello user...", user);

  try {
    if (!user) {
      return next(
        new BaseError(
          "User is not authenticated.",
          httpStatusCodes.UNAUTHORIZED
        )
      );
    }

    if (!friendId) {
      return next(
        new BaseError("Follower ID is required.", httpStatusCodes.BAD_REQUEST)
      );
    }

    const found_user = await foundUser(user?.email!);

    if (!found_user) {
      return next(
        new BaseError("User does not exist.", httpStatusCodes.NOT_FOUND)
      );
    }

    const payload = {
      userId: Number(user?.id),
      friendId: friendId,
    };

    const added_follower = await createFollower(payload);

    res.status(httpStatusCodes.OK).json({
      status: "success",
      msg: "Now Following!",
      data: added_follower,
    });
  } catch (error: any) {
    if (!error.statusCode) {
      error.statusCode = httpStatusCodes.INTERNAL_SERVER;
    }
    next(error);
  }
};
