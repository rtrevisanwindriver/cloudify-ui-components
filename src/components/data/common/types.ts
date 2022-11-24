export interface GridParams {
    _search: string;
    currentPage: number;
    pageSize: number;
    sortColumn?: string;
    sortAscending?: boolean;
}

export type FetchDataFunction = (params: { gridParams: GridParams }) => void | Promise<unknown>;
