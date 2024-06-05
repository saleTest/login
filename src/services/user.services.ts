import { Not } from "typeorm";
import UserModel from "../models/user.model";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginModel } from "../models/login.model";
import { checkIfDefined } from "../utils";

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
      return {
        email: user.email,

        access: jwt.sign({ name: user.email }, accessSecret, {
          expiresIn: accessExpire,
        }),
        refresh: jwt.sign({ name: user.email }, refreshSecret, {
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

        access: jwt.sign({ name: decoded.name }, accessSecret, {
          expiresIn: accessExpire,
        }),
        refresh: refresh,
      };
    } catch (err) {
      throw new Error("REFRESH_FAILED");
    }
  }

  static async getUserByEmail(email: string) {
    const data = await UserModel.findOne({
      email: email,
    }).exec();
    return checkIfDefined(data);
  }
}
