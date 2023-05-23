"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingHttpRequest = void 0;
class IncomingHttpRequest {
    constructor(apiVersion, kind, metadata, spec) {
        this.apiVersion = apiVersion;
        this.kind = kind;
        this.metadata = metadata;
        this.spec = spec;
        this.apiVersion = (this.apiVersion in [null, undefined] || !this.apiVersion) ? "" : this.apiVersion;
        this.kind = (this.kind in [null, undefined] || !this.kind) ? "" : this.kind;
    }
}
exports.IncomingHttpRequest = IncomingHttpRequest;
