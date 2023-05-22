"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Issue {
    constructor(summary) {
        this.projectKey = "";
        this.summary = "";
        this.issueType = "";
        this.projectKey = "IN";
        this.summary = summary || "Shachar Test";
        this.issueType = "Story";
    }
}
exports.default = Issue;
