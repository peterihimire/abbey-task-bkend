import { Router } from "express";
import { getUserInfo } from "../controllers/user-controller";

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

const router = Router();

router.get("/acct_info", verifySessionAndAuthorization, getUserInfo);

export default router;
