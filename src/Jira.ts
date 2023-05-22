import { executeGetAPI, executePostAPI } from "./executors";
import JiraIssue from "../models/Issue";
import { IssueType } from "../models/IssueType";

require("dotenv").config();

export default class JiraModule {
  public constructor() {}

  public createJiraIssue(data: any) {
    data = this.setJiraIssueData(data);
    return executePostAPI(`${process.env.JIRA_BASE_URL}/issue`, data);
  }

  private setJiraIssueData(data: any): any {
    console.log(data, "-------------------")
    const issue = new JiraIssue(data.summary);
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
