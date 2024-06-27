import { prisma } from "../database/prisma";

export const foundUser = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      friends: {
        select: {
          status: true,
          friendId: false,
          friend: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      },
      followers: {
        select: {
          followerId: false,
          follower: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      },
    },
  });
};

export const existingAcctId = async (acct_id: string) => {
  return prisma.user.findUnique({
    where: { acctId: acct_id },
    include: {
      // tasks: true,
      friends: {
        select: {
          userId: false,
          id: false,
          status: true,
          createdAt: true,
        },
      },
      followers: {
        select: {
          followerId: false,
          id: false,
          createdAt: true,
        },
      },
    },
  });
};

export const createUser = async (data: { email: string; password: string }) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
};

export const createFriendship = async (data: {
  userId: number;
  friendId: number;
}) => {
  return prisma.friend.create({
    data: {
      userId: data.userId,
      friendId: data.friendId,
      status: "PENDING",
    },
  });
};

export const createFollower = async (data: {
  userId: number;
  friendId: number;
}) => {
  return prisma.follow.create({
    data: {
      followerId: data.userId,
      followingId: data.friendId,
    },
  });
};
