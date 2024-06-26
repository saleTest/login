import { Router } from "express";
import { handleRequrest } from "../utils";
import { UserService } from "../services/user.services";

export const UserRoute = Router();

// UserRoute.get("/:id", (req, res) => {
//   const id = req.params.id as any as number;
//   handleRequrest(res, UserService.getUserById(id));
// });
UserRoute.post("/login", (req, res) => {
  handleRequrest(res, UserService.login(req.body));
});

UserRoute.post("/refresh", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  handleRequrest(res, UserService.refreshToken(token));
});

UserRoute.get("/:userId/roles", async (req, res) => {
  try {
    const roles = await UserService.getUserRoles(req.params.userId);
    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
