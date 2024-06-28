import { Router } from "express";
import {
  getUserInfo,
  addFriend,
  addFollower,
} from "../controllers/user-controller";

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

const router = Router();

router.get("/acct_info", verifySessionAndAuthorization, getUserInfo);
router.post("/add_friend", verifySessionAndAuthorization, addFriend);
router.post("/add_follower", verifySessionAndAuthorization, addFollower);

export default router;
