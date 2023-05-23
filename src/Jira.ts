import { executeGetAPI, executePostAPI } from "./executors";
import JiraIssue from "../models/Issue";
import { IssueType } from "../models/IssueType";
import { IncomingHttpRequest } from "../models/IncomingHttpRequest";

require("dotenv").config();

export default class JiraModule {
  public constructor() {}

  public createJiraIssue(data: IncomingHttpRequest) {
    return new Promise((resolve, reject) => {
      return this.isJiraTicketExistsBySummary(data)
        .then((res: any) => {
          if (!res) {
            data = this.setJiraIssueData(data);
            resolve(executePostAPI(`${process.env.JIRA_BASE_URL}/issue`, data));
          }else 
          {
            console.log({
              dataMessage:
                "issue can not be created, it may has been created already",
            });
            resolve({
              dataMessage:
                "issue can not be created, it may has been created already",
            });
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
    // return executePostAPI(`${process.env.JIRA_BASE_URL}/issue`, data);
  }

  public isJiraTicketExistsBySummary(data: IncomingHttpRequest) {
    
    return new Promise((resolve, reject) => {
      let query = `project = ${process.env.JIRA_PROJECT_KEY} and (summary ~ "${
          data.object.spec.kind
        }" and  summary ~ "${data.object.spec.name.split("/")[1]}")`,
        queryData: any = {
          expand: [""],
          fields: ["summary"],
          fieldsByKeys: false,
          jql: query,
          maxResults: 100,
          startAt: 0,
        };

      let api = `${process.env.JIRA_BASE_URL}/search`;
      return executePostAPI(api, queryData).then((issues: any) => {
        if (issues.data.issues.length > 0) {
          resolve(true);
        }
        resolve(false);
      });
    });
  }

  private setJiraIssueData(data: any): any {
    console.log(data)
    const issue = new JiraIssue(data.summary);
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
        customfield_10112: `${data.object.metadata.creationTimestamp}`, // timestamp,
        customfield_10111: data.object.metadata.namespace, // namespace
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
        }, //error details
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
