"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const user_services_1 = require("../services/user.services");
exports.UserRoute = (0, express_1.Router)();
// UserRoute.get("/:id", (req, res) => {
//   const id = req.params.id as any as number;
//   handleRequrest(res, UserService.getUserById(id));
// });
exports.UserRoute.post("/login", (req, res) => {
    (0, utils_1.handleRequrest)(res, user_services_1.UserService.login(req.body));
});
exports.UserRoute.post("/refresh", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    (0, utils_1.handleRequrest)(res, user_services_1.UserService.refreshToken(token));
});
exports.UserRoute.get("/:userId/roles", async (req, res) => {
    try {
        const roles = await user_services_1.UserService.getUserRoles(req.params.userId);
        res.status(200).json({ roles });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//# sourceMappingURL=user.route.js.map