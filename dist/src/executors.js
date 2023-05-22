"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeGetAPI = exports.executePostAPI = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
function executePostAPI(api, data) {
    const config = {
        method: "POST",
        url: api,
        headers: {
            "content-type": "application/json",
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
        },
        data: data,
    };
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(config)
            .then((res) => {
            resolve(res);
        })
            .catch((err) => {
            reject(err.response.data);
        });
    });
}
exports.executePostAPI = executePostAPI;
function executeGetAPI(api) {
    let config = {
        method: "GET",
        url: api,
        headers: {
            Authorization: `Basic ${process.env.JIRA_TOKEN}`,
        },
    };
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(config)
            .then((res) => {
            resolve(res.data);
        })
            .catch((err) => {
            reject(err.response.data);
        });
    });
}
exports.executeGetAPI = executeGetAPI;
