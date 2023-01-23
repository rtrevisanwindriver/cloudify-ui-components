import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { debounce, isEmpty } from 'lodash';

import { Form, Table } from 'semantic-ui-react';
import Pagination from '../common/Pagination';
import DataAction from '../common/DataAction';
import DataSearch from '../common/DataSearch';

import TableColumn from './TableColumn';
import TableDataCell from './TableDataCell';
import TableDataExpandable from './TableDataExpandable';
import TableFilter from './TableFilter';
import TableRow from './TableRow';
import TableRowExpandable from './TableRowExpandable';
import DataTableContext from './DataTableContext';

import type { FetchDataFunction } from '../common/types';
import './DataTable.css';

const defaultProps = {
    fetchData: (() => Promise.resolve()) as FetchDataFunction,
    totalSize: -1,
    pageSize: 0,
    sortColumn: '',
    sortAscending: true,
    searchable: false,
    selectable: false,
    className: '',
    noDataAvailable: false,
    sizeMultiplier: 5,
    noDataMessage: 'No data available' as ReactNode,
    style: undefined
};

export interface DataTableProps {
    /**
     * table content
     */
    children: ReactNode[];
    /**
     * function that accepts grid parameters:
     *
     *       gridParams: {
     *          _search: string;
     *          currentPage: number;
     *          pageSize: number;
     *          sortColumn: string;
     *          sortAscending: boolean;
     *      };
     *
     * - `_search` - if `searchable` prop is set to true, then it's a text provided in the search bar, it's an empty string otherwise
     * - `sortColumn` (both the prop, and grid param) should be matching a name of a column.
     * - fetch data function is called everytime user changes those settings in table or a props change.
     * - those parameters are compatible with `toolbox.refresh()`, so it's easy to use in widgets:
     * defaults to noop, not required
     */
    fetchData?: FetchDataFunction;

    /**
     * total number of rows in table, if not specified pagination will not be set. It is used to calculate pagination pages
     */
    totalSize?: number;

    /**
     * number of displayed rows on page
     */
    pageSize?: number;

    /**
     * column name used for data sorting
     */
    sortColumn: string;

    /**
     * true for ascending sort, false for descending sort
     */
    sortAscending?: boolean;

    /**
     * if true filtering and searching input to be added
     */
    searchable?: boolean;

    /**
     * if true row can be selected and highlighted
     */
    selectable?: boolean;

    /**
     * name of the style class to be added
     */
    className?: string;

    /**
     * if true no data available message is shown
     */
    noDataAvailable?: boolean;

    /**
     * param related to pagination, list of page sizes is generated as multiplication of basic fixed values [1, 2, 3, 5, 10] by this param
     */
    sizeMultiplier?: number;

    /**
     * message displayed when there's no data
     */
    noDataMessage?: ReactNode;

    /**
     * CSS style
     */
    style?: React.CSSProperties;
}

type DataTablePropsAfterDefault = DataTableProps & typeof defaultProps;

type DataTableState = {
    currentPage?: number;
    sortAscending: boolean;
    sortColumn: string;
    searchText: string;
    searching: boolean;
};

/**
 * `DataTable` component enables fetching data using predefined function and showing tabular data in a simple manner.
 *
 * ## Features
 * - data fetch with pagination
 * - selectable rows
 * - expandable rows
 * - data sorting by columns
 * - filtering data
 *
 * ## Data Fetch Examples
 * This is an example of a [widget](https://github.com/cloudify-cosmo/cloudify-stage/tree/master/widgets) that uses `DataTable` component to easily display list of blueprints
 * - It showcases compatibility of `fetchData` prop with `toolbox.refresh()`
 * - `DataTable` component initial render triggers `fetchGridData` function, which fetches the data
 * - `DataTable` component passes page size, page offset and sorting details (column name and ascending/descending information) to `fetchGridData` function. If any of these values change, the `fetchGridData` function is triggered again
 * - `[params]` token in `fetchUrl` function is translated into grid parameters (see `fetchUrl` function section in [Widget Definition page](https://docs.cloudify.co/staging/dev/developer/writing_widgets/widget-definition/))
 * - fetched data can be accessed in `render` method as `data` argument and presented using `DataTable` component
 *
 * js code example:
 *
 *      Stage.defineWidget ({
 *          id: 'blueprints-list',
 *          name: 'Blueprints',
 *          description: 'Shows blueprint list',
 *          permission: Stage.GenericConfig.CUSTOM_WIDGET_PERMISSIONS.CUSTOM_ALL,
 *          categories: [Stage.GenericConfig.CATEGORY.BLUEPRINTS],
 *          initialConfiguration: [
 *             Stage.GenericConfig.POLLING_TIME_CONFIG(10),
 *             Stage.GenericConfig.PAGE_SIZE_CONFIG(5),
 *             Stage.GenericConfig.SORT_COLUMN_CONFIG('created_at'),
 *             Stage.GenericConfig.SORT_ASCENDING_CONFIG(false)
 *         ],
 *         fetchUrl: '[manager]/blueprints?_include=id,updated_at,created_at,created_by[params]',
 *
 *      render(widget, data, error, toolbox) {
 *         const { DataTable, Loading } = Stage.Basic;
 *         if (_.isEmpty(data)) {
 *             return <Loading />;
 *         }
 *
 *         const fetchGridData = fetchParams => toolbox.refresh(fetchParams);
 *         const { pageSize, sortColumn, sortAscending } = widget.configuration;
 *         const { metadata, items } = data;
 *
 *         return (
 *             <DataTable
 *                 fetchData={fetchGridData}
 *                 totalSize={metadata.pagination.total}
 *                 pageSize={pageSize}
 *                 sortColumn={sortColumn}
 *                 sortAscending={sortAscending}
 *                 searchable
 *             >
 *                 <DataTable.Column label="Name" name="id" width="40%" />
 *                 <DataTable.Column label="Created" name="created_at" width="20%" />
 *                 <DataTable.Column label="Updated" name="updated_at" width="20%" />
 *                 <DataTable.Column label="Creator" name="created_by" width="20%" />
 *                 {items.map(item => (
 *                     <DataTable.Row key={item.id}>
 *                         <DataTable.Data>{item.id}</DataTable.Data>
 *                         <DataTable.Data>{item.created_at}</DataTable.Data>
 *                         <DataTable.Data>{item.updated_at}</DataTable.Data>
 *                         <DataTable.Data>{item.created_by}</DataTable.Data>
 *                       </DataTable.Row>
 *                  ))}
 *                  </DataTable>
 *              );
 *          }
 *      });
 *
 *
 * ## Sub-components
 * - `DataTable.Row` = data row
 * - `DataTable.Column` = header column;
 * - `DataTable.Data` = data cell, passes props to semantic-ui data cell
 * - `DataTable.Action` = table action area
 * - `DataTable.Filter` = table filter
 * - `DataTable.RowExpandable` = expandable data row;
 * - `DataTable.DataExpandable` = expandable data content;
 */
export class DataTable extends Component<DataTablePropsAfterDefault, DataTableState> {
    public static Row = TableRow;

    public static Column = TableColumn;

    public static Data = TableDataCell;

    public static Action = DataAction;

    public static Filter = TableFilter;

    public static RowExpandable = TableRowExpandable;

    public static DataExpandable = TableDataExpandable;

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = defaultProps;

    private paginationRef: React.RefObject<Pagination>;

    private debouncedSearch;

    constructor(props: DataTablePropsAfterDefault, context: unknown) {
        super(props, context);

        this.paginationRef = React.createRef();

        this.state = {
            sortColumn: props.sortColumn,
            sortAscending: props.sortAscending,
            searchText: '',
            searching: false
        };

        this.debouncedSearch = debounce(
            () => {
                this.paginationRef.current?.reset(() => {
                    return Promise.resolve(this.callFetchData()).then(() => this.setState({ searching: false }));
                });
            },
            300,
            { maxWait: 2000 }
        );

        this.callFetchData = this.callFetchData.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<DataTablePropsAfterDefault>) {
        const { sortColumn, sortAscending } = this.props;

        if (prevProps.sortColumn !== sortColumn || prevProps.sortAscending !== sortAscending) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ sortColumn, sortAscending });
        }
    }

    setSortColumn(name: string) {
        const { sortAscending, sortColumn } = this.state;
        let ascending = sortAscending;

        if (sortColumn === name) {
            ascending = !ascending;
        } else {
            ascending = true;
        }

        const fetchData = { sortColumn: name, sortAscending: ascending, currentPage: 1 };
        this.setState(fetchData, () => {
            this.paginationRef.current?.reset(this.callFetchData);
        });
    }

    callFetchData() {
        const { fetchData } = this.props;
        const { searchText, sortColumn, sortAscending } = this.state;
        const { currentPage = 0, pageSize = 0 } = this.paginationRef.current?.state || {};

        return fetchData({
            gridParams: {
                _search: searchText,
                currentPage,
                pageSize,
                sortColumn,
                sortAscending
            }
        });
    }

    render() {
        const {
            children,
            totalSize,
            pageSize,
            searchable,
            selectable,
            className,
            noDataAvailable,
            sizeMultiplier,
            noDataMessage,
            style
        } = this.props;
        const { searchText, searching, sortColumn, sortAscending } = this.state;
        const headerColumns: Array<ReactNode> = [];
        const bodyRows: ReactNode[] = [];
        let gridAction = null;
        const gridFilters: ReactNode[] = [];

        const showCols: boolean[] = [];
        React.Children.forEach(children, child => {
            if (child && typeof child === 'object' && 'type' in child) {
                if (child.type === TableColumn) {
                    showCols.push(child.props.show ?? true);
                    headerColumns.push(child);
                } else if (child.type === TableRow) {
                    bodyRows.push(React.cloneElement(child, { showCols }));
                } else if (child.type === TableRowExpandable) {
                    const expandableContent: ReactNode[] = [];
                    React.Children.forEach(child.props.children, expChild => {
                        if (expChild) {
                            if (expChild.type === TableRow) {
                                bodyRows.push(React.cloneElement(expChild, { showCols }));
                            } else if (expChild.type === TableDataExpandable && child.props.expanded) {
                                expandableContent.push(
                                    React.cloneElement(expChild, { numberOfColumns: showCols.length })
                                );
                            }
                        }
                    });
                    bodyRows.push(expandableContent);
                } else if (child.type === DataAction) {
                    gridAction = child;
                } else if (child.type === TableFilter) {
                    gridFilters.push(child);
                }
            }
        });

        return (
            <div className={`gridTable ${className}`} style={style}>
                {(searchable || !isEmpty(gridFilters) || gridAction) && (
                    <Form size="small" as="div">
                        <Form.Group inline>
                            {searchable && (
                                <DataSearch
                                    search={searchText}
                                    searching={searching}
                                    onSearch={text =>
                                        this.setState({ searchText: text, searching: true }, this.debouncedSearch)
                                    }
                                />
                            )}
                            {gridFilters}
                            {gridAction}
                        </Form.Group>
                    </Form>
                )}

                <Pagination
                    totalSize={totalSize}
                    pageSize={pageSize}
                    sizeMultiplier={sizeMultiplier}
                    fetchData={this.callFetchData}
                    ref={this.paginationRef}
                >
                    <DataTableContext.Provider
                        value={{
                            sortColumn,
                            sortAscending,
                            setSortColumn: name => this.setSortColumn(name)
                        }}
                    >
                        <Table compact="very" sortable selectable={selectable} className={className}>
                            <Table.Header>
                                <Table.Row>{headerColumns}</Table.Row>
                            </Table.Header>
                            {noDataAvailable || totalSize === 0 ? (
                                <Table.Body>
                                    <Table.Row className="noDataRow">
                                        <td colSpan={headerColumns.length} className="center aligned">
                                            <span>{noDataMessage}</span>
                                        </td>
                                    </Table.Row>
                                </Table.Body>
                            ) : (
                                <Table.Body>{bodyRows}</Table.Body>
                            )}
                        </Table>
                    </DataTableContext.Provider>
                </Pagination>
            </div>
        );
    }
}

export default DataTable;
