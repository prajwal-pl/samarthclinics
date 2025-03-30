import express from "express";
import {
  authFunction,
  getBasicUserInfo,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authFunction);
router.post("/user", getBasicUserInfo);

export default router;
