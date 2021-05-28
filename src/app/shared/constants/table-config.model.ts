export class TableDataConfig {
    headerName: string = "";
    field: string = ""
    visiblity: boolean = false;
    type: string = "";
    filterConfig: FilterConfig = new FilterConfig();
    onClick?(params:any) {} // '?' indicates optional parameter 
}

export class FilterConfig {
    canFilter: boolean = false;
    format: string = "";
}

export class TableSettings {
    paginator: boolean = false;
    hover: boolean = false;
    search: boolean = false;
    selectoption: boolean = false;
    export: ExportTableData[] = [];
}

export class ExportTableData {
    type: string = "";
    label: string = "";
    name: string = "";
    format: string = "";
}