export namespace v1 {
	
	export class TableRowCondition {
	    type: string;
	    status: string;
	    reason?: string;
	    message?: string;
	
	    static createFrom(source: any = {}) {
	        return new TableRowCondition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.status = source["status"];
	        this.reason = source["reason"];
	        this.message = source["message"];
	    }
	}
	export class TableRow {
	    cells: any[];
	    conditions?: TableRowCondition[];
	    // Go type: runtime.RawExtension
	    object?: any;
	
	    static createFrom(source: any = {}) {
	        return new TableRow(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.cells = source["cells"];
	        this.conditions = this.convertValues(source["conditions"], TableRowCondition);
	        this.object = this.convertValues(source["object"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class TableColumnDefinition {
	    name: string;
	    type: string;
	    format: string;
	    description: string;
	    priority: number;
	
	    static createFrom(source: any = {}) {
	        return new TableColumnDefinition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.type = source["type"];
	        this.format = source["format"];
	        this.description = source["description"];
	        this.priority = source["priority"];
	    }
	}
	export class Table {
	    kind?: string;
	    apiVersion?: string;
	    selfLink?: string;
	    resourceVersion?: string;
	    continue?: string;
	    remainingItemCount?: number;
	    columnDefinitions: TableColumnDefinition[];
	    rows: TableRow[];
	
	    static createFrom(source: any = {}) {
	        return new Table(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.kind = source["kind"];
	        this.apiVersion = source["apiVersion"];
	        this.selfLink = source["selfLink"];
	        this.resourceVersion = source["resourceVersion"];
	        this.continue = source["continue"];
	        this.remainingItemCount = source["remainingItemCount"];
	        this.columnDefinitions = this.convertValues(source["columnDefinitions"], TableColumnDefinition);
	        this.rows = this.convertValues(source["rows"], TableRow);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class APIResource {
	    name: string;
	    singularName: string;
	    namespaced: boolean;
	    group?: string;
	    version?: string;
	    kind: string;
	    verbs: string[];
	    shortNames?: string[];
	    categories?: string[];
	    storageVersionHash?: string;
	
	    static createFrom(source: any = {}) {
	        return new APIResource(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.singularName = source["singularName"];
	        this.namespaced = source["namespaced"];
	        this.group = source["group"];
	        this.version = source["version"];
	        this.kind = source["kind"];
	        this.verbs = source["verbs"];
	        this.shortNames = source["shortNames"];
	        this.categories = source["categories"];
	        this.storageVersionHash = source["storageVersionHash"];
	    }
	}

}

export namespace app {
	
	export class ResourceTable {
	    apiResource: v1.APIResource;
	    table?: v1.Table;
	    isError: boolean;
	    tableRowNames: string[];
	
	    static createFrom(source: any = {}) {
	        return new ResourceTable(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.apiResource = this.convertValues(source["apiResource"], v1.APIResource);
	        this.table = this.convertValues(source["table"], v1.Table);
	        this.isError = source["isError"];
	        this.tableRowNames = source["tableRowNames"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

