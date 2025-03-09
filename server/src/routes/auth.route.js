import express from "express";
import { authFunction } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/auth/:role", authMiddleware, authFunction);
