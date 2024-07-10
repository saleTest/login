"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = require("dotenv");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const user_role_model_1 = __importDefault(require("../models/user.role.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const mongoose_1 = require("mongoose");
(0, dotenv_1.configDotenv)();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;
class UserService {
    static async login(model) {
        const user = await this.getUserByEmail(model.email);
        // console.log(bcrypt.hashSync(model.password, 10))
        // console.log(user);
        const matches = await bcrypt_1.default.compare(model.password, user.password);
        if (matches) {
            // console.log(user);
            const roles = await this.getUserRoles(user._id);
            console.log(roles);
            return {
                email: user.email,
                role: roles,
                access: jsonwebtoken_1.default.sign({ name: user.email, role: roles }, accessSecret, {
                    expiresIn: accessExpire,
                }),
                refresh: jsonwebtoken_1.default.sign({ name: user.email, role: roles }, refreshSecret, {
                    expiresIn: refreshExpire,
                }),
            };
        }
        throw new Error("BAD_CREDENTIALS");
    }
    static async refreshToken(refresh) {
        try {
            const decoded = jsonwebtoken_1.default.verify(refresh, refreshSecret);
            return {
                email: decoded.name,
                role: decoded.role,
                access: jsonwebtoken_1.default.sign({ name: decoded.name, role: decoded.role }, accessSecret, {
                    expiresIn: accessExpire,
                }),
                refresh: refresh,
            };
        }
        catch (err) {
            throw new Error("REFRESH_FAILED");
        }
    }
    static async getUserByEmail(email) {
        const data = await user_model_1.default.findOne().where({ email: email }).exec();
        return (0, utils_1.checkIfDefined)(data);
    }
    static async getUserRoles(userId) {
        try {
            // console.log(userId);
            const userRoles = await user_role_model_1.default.findOne({
                user_id: new mongoose_1.Types.ObjectId(userId),
            });
            if (!userRoles) {
                throw new Error("User roles not found");
            }
            const roleId = userRoles.role_id.toString();
            // console.log("Role ID:", roleId);
            //
            const roles = await role_model_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(roleId) });
            // console.log("Role document:", roles);
            if (!roles) {
                console.log("Role not found for the given role ID");
            }
            return roles.role_name;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map