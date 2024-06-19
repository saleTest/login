import { Not } from "typeorm";
import UserModel from "../models/user.model";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginModel } from "../models/login.model";
import { checkIfDefined } from "../utils";
import UserRole from "../models/user.role.model";
import Role, { IRole } from "../models/role.model";
import { Types } from "mongoose";

configDotenv();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService {
  static async login(model: LoginModel) {
    const user = await this.getUserByEmail(model.email);
    // console.log(bcrypt.hashSync(model.password, 10))
    // console.log(user);
    const matches = await bcrypt.compare(model.password, user.password);
    if (matches) {
      // console.log(user);
      const roles = await this.getUserRoles(user._id);
      console.log(roles);
      return {
        email: user.email,
        role: roles,
        access: jwt.sign({ name: user.email, role: roles }, accessSecret, {
          expiresIn: accessExpire,
        }),
        refresh: jwt.sign({ name: user.email, role: roles }, refreshSecret, {
          expiresIn: refreshExpire,
        }),
      };
    }
    throw new Error("BAD_CREDENTIALS");
  }

  public static async refreshToken(refresh: string) {
    try {
      const decoded: any = jwt.verify(refresh, refreshSecret as string);
      return {
        email: decoded.name,
        role: decoded.role,
        access: jwt.sign(
          { name: decoded.name, role: decoded.role },
          accessSecret,
          {
            expiresIn: accessExpire,
          }
        ),
        refresh: refresh,
      };
    } catch (err) {
      throw new Error("REFRESH_FAILED");
    }
  }

  static async getUserByEmail(email: string) {
    const data = await UserModel.findOne().where({ email: email }).exec();
    return checkIfDefined(data);
  }

  static async getUserRoles(userId: string) {
    try {
      // console.log(userId);
      const userRoles = await UserRole.findOne({
        user_id: new Types.ObjectId(userId),
      });

      if (!userRoles) {
        throw new Error("User roles not found");
      }

      const roleId = userRoles.role_id.toString();

      // console.log("Role ID:", roleId);
      //
      const roles = await Role.findOne({ _id: new Types.ObjectId(roleId) });

      // console.log("Role document:", roles);

      if (!roles) {
        console.log("Role not found for the given role ID");
      }

      return roles.role_name;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
