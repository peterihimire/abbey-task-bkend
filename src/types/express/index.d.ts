import express from "express";
import { CustomUser } from "../types";

// This works with the verify-session file
declare global {
  namespace Express {
    interface Request {
      user?: CustomUser;
    }
  }
}
