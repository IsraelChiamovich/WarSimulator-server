// src/controllers/userController.ts

import { Request, Response } from "express";
import { RegisterDTO } from "../DTO/userDTO";
import { registerUserService } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  const userData: RegisterDTO = req.body;

  try {
    const user = await registerUserService(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json((error as Error).message);
  }
};
