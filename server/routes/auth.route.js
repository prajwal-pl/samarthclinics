import express from "express";
import {
  authFunction,
  getBasicUserInfo,
  getUserDetails,
  getUserByClerkId,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authFunction);
router.post("/user", getBasicUserInfo);
router.get("/:id", getUserDetails);
router.get("/clerk/:clerkId", getUserByClerkId);

export default router;
