import express, { Response, Request } from "express";
import JiraModule from "../src/Jira";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IncomingHttpRequest } from "../models/IncomingHttpRequest";

export default class RoutesManager {
  public router: express.Router;
  public constructor() {
    this.router = express.Router();
    this.initRoutes();
  }
  private initRoutes(): void {
    const jiraModule = new JiraModule();

    this.router.get("/healthcheck/", (req: Request, res: Response) => {
      res.json({
        status: 200,
        message: `Fire !!`,
      });
    });

    this.router.post("/", (req: Request, res: Response) => {
      const { apiVersion, kind, metadata, spec } = req.body,
        requestBody = new IncomingHttpRequest(apiVersion, kind, metadata, spec);

      jiraModule
        .createJiraIssue(requestBody)
        .then((data: any) => {
          res.send(data.data);
        })
        .catch((err: any) => {
          console.log(err.errorMessages, "????");
          res.send(err);
        });
    });
  }
}
