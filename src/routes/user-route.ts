import { Router } from "express";
import { getUserInfo ,addFriend} from "../controllers/user-controller";

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

const router = Router();

router.get("/acct_info", verifySessionAndAuthorization, getUserInfo);
router.post("/add_friend", verifySessionAndAuthorization, addFriend);

export default router;
