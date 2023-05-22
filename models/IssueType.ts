export class IssueType{
    public IssueTypeName:string;
    public IssueTypeId: number;
    public constructor(issueTypeName: string, issueTypeId: number) {
        this.IssueTypeName = issueTypeName
        this.IssueTypeId = issueTypeId
    }
}