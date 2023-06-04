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
      console.log(`Received health check request.`)
      res.json({
        status: 200,
        message: `Fire !!`,
      });
    });

    this.router.post("/", (req: Request, res: Response) => {
      const raw_object= req.body.raw_object 
        const requestBody = new IncomingHttpRequest(raw_object);
      console.log(req.body);
      jiraModule
        .createJiraIssue(requestBody)
        .then((data: any) => {
          console.log(`Received Jira issue creation request`)
          res.send(data.data);
        })
        .catch((err: any) => {
          console.log(err, "????");
          res.send(err);
        });
    });
  }
}
