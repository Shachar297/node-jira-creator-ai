

export class IncomingHttpRequest{

    public apiVersion?: string;
    public kind?: string;
    public metadata?: any;
    public spec?: any;
    public raw_object: any
    public constructor(raw_object: any, apiVersion?: string, kind?: string, metadata?: any, spec?: any) {
        this.apiVersion = apiVersion;
        this.kind = kind;
        this.metadata = metadata;
        this.spec = spec;
        this.raw_object = raw_object;
        // this.apiVersion = (this.apiVersion in [null, undefined] || !this.apiVersion) ? "" : this.apiVersion;
        // this.kind = (this.kind in [null, undefined] || !this.kind) ? "" : this.kind;
    }

}