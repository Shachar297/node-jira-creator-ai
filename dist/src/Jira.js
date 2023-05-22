"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executors_1 = require("./executors");
const Issue_1 = __importDefault(require("../models/Issue"));
require("dotenv").config();
class JiraModule {
    constructor() { }
    createJiraIssue(data) {
        data = this.setJiraIssueData(data);
        return (0, executors_1.executePostAPI)(`${process.env.JIRA_BASE_URL}/issue`, data);
    }
    setJiraIssueData(data) {
        console.log(data, "-------------------");
        const issue = new Issue_1.default(data.summary);
        const config = {
            fields: {
                issuetype: {
                    id: 10126,
                },
                summary: data.summary,
                project: {
                    key: "IN",
                },
            },
        };
        return config;
    }
}
exports.default = JiraModule;
