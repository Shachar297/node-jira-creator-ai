export default class Issue {

  public projectKey?: string = "";
  public summary?: string = "";
  public issueType?: string = "";

  public constructor(summary: string) {

    this.projectKey = "IN";
    this.summary = summary || "Shachar Test";
    this.issueType = "Story";

  }
}
