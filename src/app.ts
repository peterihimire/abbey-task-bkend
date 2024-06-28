import express, { Application, Request } from "express";
import session, { SessionOptions } from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CustomUser } from "./types/types";
import { redisclient } from "./utils/redis-client";

import authRoute from "./routes/auth-route";
import userRoute from "./routes/user-route";
import testRoute from "./routes/test-route";

import {
  logErrorMiddleware,
  returnError,
  unknownRoute,
} from "./middlewares/error-handler";
import RedisStore from "connect-redis";

type CustomSessionOptions = SessionOptions & {
  cookie: {
    sameSite: "none" | "lax" | "strict" | boolean;
  };
};

declare module "express-session" {
  interface SessionData {
    user: CustomUser;
  }
}

const corsOptions = {
  origin: ["https://localhost:3000", "http://localhost:3000"],
  methods: ["GET", "PUT", "PATCH", "POST", "OPTIONS", "DELETE", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Origin",
    "Accept",
  ],
  credentials: true,
  optionSuccessStatus: 200,
  preflightContinue: false,
};

let redisStore = new (RedisStore as any)({
  client: redisclient,
  prefix: "abbeytask_user",
});

const sessionOptions: CustomSessionOptions = {
  store: redisStore,
  secret: String(process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: process.env.NODE_ENV === "production", // if true only transmit cookie over https
    secure: false,
    httpOnly: true, // if true prevent client side JS from reading the cookie
    maxAge: 1000 * 60 * 60 * 12, // session max age in miliseconds
    sameSite: "none",
  },
};

const app: Application = express();
app.set("trust proxy", 1);

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/abbeytask/v1/auth", session(sessionOptions), authRoute);
app.use("/api/abbeytask/v1/users", session(sessionOptions), userRoute);
app.use("/api/abbeytask/v1/test", testRoute);

app.use(unknownRoute);
app.use(logErrorMiddleware);
app.use(returnError);
export default app;
