import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

require("dotenv").config();

export function executePostAPI(api: string, data: any): Promise<AxiosResponse> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: api,
    headers: {
      "content-type": "application/json",
      Authorization: `Basic ${process.env.JIRA_TOKEN}`,
    },
    data: data,
  };
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios(config)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err.response.data);
      });
  });
}

export function executeGetAPI(api: string): Promise<AxiosResponse> {
  let config: AxiosRequestConfig = {
    method: "GET",
    url: api,
    headers: {
      Authorization: `Basic ${process.env.JIRA_TOKEN}`,
    },
  };
  return new Promise<AxiosResponse>((resolve, reject) => {
    axios(config)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err.response.data);
      });
  });
}
