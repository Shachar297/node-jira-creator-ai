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
        return new Promise((resolve, reject) => {
            return this.isJiraTicketExistsBySummary(data)
                .then((res) => {
                if (!res) {
                    data = this.setJiraIssueData(data);
                    resolve((0, executors_1.executePostAPI)(`${process.env.JIRA_BASE_URL}/issue`, data));
                }
                else {
                    console.log({
                        dataMessage: "issue can not be created, it may has been created already",
                    });
                    resolve({
                        dataMessage: "issue can not be created, it may has been created already",
                    });
                }
            })
                .catch((e) => {
                reject(e);
            });
        });
        // return executePostAPI(`${process.env.JIRA_BASE_URL}/issue`, data);
    }
    isJiraTicketExistsBySummary(data) {
        return new Promise((resolve, reject) => {
            let query = `project = ${process.env.JIRA_PROJECT_KEY} and (summary ~ "${data.object.spec.kind}" and  summary ~ "${data.object.spec.name.split("/")[1]}")`, queryData = {
                expand: [""],
                fields: ["summary"],
                fieldsByKeys: false,
                jql: query,
                maxResults: 100,
                startAt: 0,
            };
            let api = `${process.env.JIRA_BASE_URL}/search`;
            return (0, executors_1.executePostAPI)(api, queryData).then((issues) => {
                if (issues.data.issues.length > 0) {
                    resolve(true);
                }
                resolve(false);
            });
        });
    }
    setJiraIssueData(data) {
        console.log(data);
        const issue = new Issue_1.default(data.summary);
        const config = {
            fields: {
                issuetype: {
                    id: 10004,
                },
                summary: `${data.object.spec.kind} - ${data.object.spec.name.split("/")[1]}`,
                labels: [data.object.metadata.namespace],
                project: {
                    key: "DOR",
                },
                customfield_10112: `${data.object.metadata.creationTimestamp}`,
                customfield_10111: data.object.metadata.namespace,
                customfield_10113: {
                    version: 1,
                    type: "doc",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: data.object.spec.details,
                                },
                            ],
                        },
                    ],
                },
                description: {
                    version: 1,
                    type: "doc",
                    content: [
                        {
                            type: "codeBlock",
                            content: [
                                {
                                    text: `${JSON.stringify(data.object.spec, null, 4)}`,
                                    type: "text",
                                },
                            ],
                        },
                    ],
                },
            },
        };
        return config;
    }
}
exports.default = JiraModule;
