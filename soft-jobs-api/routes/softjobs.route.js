import { softJobsController } from "../controllers/softjobs.controller.js";
import { Router } from 'express';
import { authMiddleware } from "../lib/auth/auth.middleware.js";
import { HandleLoginMiddleware } from "../lib/login/handleLogin.js";

const router = Router();

// GET /usuarios
router.get("/usuarios", authMiddleware, softJobsController.read);

// POST /usuarios
router.post("/usuarios", softJobsController.register);

// POST /login
router.post("/login", HandleLoginMiddleware, softJobsController.login);

// DEFAULT ROUTE
router.get("*", softJobsController.undefinedRoute);

export default router;