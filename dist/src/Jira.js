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
                summary: `${data.metadata.name} [${data.metadata.namespace}]`,
                labels: [data.metadata.labels.app],
                project: {
                    key: "IN",
                },
                customfield_10097: {
                    version: 1,
                    type: "doc",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    text: `${JSON.stringify(data.spec)}`,
                                    type: "text"
                                }
                            ]
                        }
                    ]
                }
            },
        };
        return config;
    }
}
exports.default = JiraModule;
