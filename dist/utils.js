"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.sendErrorResponse = exports.checkIfDefined = exports.handleRequrest = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function handleRequrest(res, callBack) {
    try {
        const data = await callBack;
        if (data == undefined) {
            res.status(204).send();
            return;
        }
        res.json(data);
    }
    catch (e) {
        let code = 500;
        if (e.message == "NOT_FOUND")
            code = 404;
        // if()
        res.status(code).json({
            message: e.message,
            timestamp: new Date(),
        });
    }
}
exports.handleRequrest = handleRequrest;
function checkIfDefined(data) {
    if (data == undefined)
        throw new Error("NOT_FOUND");
    return data;
}
exports.checkIfDefined = checkIfDefined;
function sendErrorResponse(res, code = 400, msg = "Bad request") {
    res.status(code).json({
        message: msg,
        timestamp: new Date(),
    });
}
exports.sendErrorResponse = sendErrorResponse;
(0, dotenv_1.configDotenv)();
async function authenticateToken(req, res, next) {
    const unprotected = [
        "/api/user/login",
        "/api/user/signup",
        "/api/user/refresh",
        "/api/restaurant",
        "/api/top-restaurant",
        /^\/api\/restaurant\/\w+$/,
    ];
    if (unprotected.some((route) => {
        if (typeof route === "string") {
            return req.path === route;
        }
        else {
            return route.test(req.path);
        }
    })) {
        next();
        return;
    }
    // console.log(req.body);
    // console.log(req);
    // console.log(req.headers);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // console.log("Auth Header:", authHeader);
    // console.log("Token:", token);
    // console.log(user.name)
    if (token == null) {
        // console.log(token);
        return sendErrorResponse(res, 401, "NO_TOKEN");
    }
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(user);
            // console.log(res);
            return sendErrorResponse(res, 403, "INVALID_TOKEN");
        }
        req.user = user.email;
        req.role = user.role;
        next();
    });
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=utils.js.map