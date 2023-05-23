import { executeGetAPI, executePostAPI } from "./executors";
import JiraIssue from "../models/Issue";
import { IssueType } from "../models/IssueType";
import {IncomingHttpRequest} from "../models/IncomingHttpRequest"

require("dotenv").config();

export default class JiraModule {
  public constructor() {}

  public createJiraIssue(data: IncomingHttpRequest) {
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
        summary: `${data.metadata.name } [${data.metadata.namespace}]`,
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
              content : [
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
