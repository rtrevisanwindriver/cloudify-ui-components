import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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

import './DataTable.css';

/**
 * DataTable component enables fetching data using predefined function and showing tabular data in a simple manner.
 *
 * ## Features
 * - data pagination
 * - selectable rows
 * - expandable rows
 * - data sorting by columns
 * - filtering data
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
class DataTable extends Component {
    public static Row = TableRow;

    public static Column = TableColumn;

    public static Data = TableDataCell;

    public static Action = DataAction;

    public static Filter = TableFilter;

    public static RowExpandable = TableRowExpandable;

    public static DataExpandable = TableDataExpandable;

    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props, context) {
        super(props, context);

        // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
        this.paginationRef = React.createRef();

        this.state = {
            sortColumn: props.sortColumn,
            sortAscending: props.sortAscending,
            searchText: '',
            searching: false
        };

        // @ts-expect-error TS(2339) FIXME: Property 'debouncedSearch' does not exist on type ... Remove this comment to see the full error message
        this.debouncedSearch = _.debounce(
            () => {
                // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
                this.paginationRef.current.reset(() => {
                    return Promise.resolve(this.callFetchData()).then(() => this.setState({ searching: false }));
                });
            },
            300,
            { maxWait: 2000 }
        );

        this.callFetchData = this.callFetchData.bind(this);
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error TS(2339) FIXME: Property 'sortColumn' does not exist on type 'Read... Remove this comment to see the full error message
        const { sortColumn, sortAscending } = this.props;
        const changedProps = {};
        if (prevProps.sortColumn !== sortColumn) {
            // @ts-expect-error TS(2339) FIXME: Property 'sortColumn' does not exist on type '{}'.
            changedProps.sortColumn = sortColumn;
        }
        if (prevProps.sortAscending !== sortAscending) {
            // @ts-expect-error TS(2339) FIXME: Property 'sortAscending' does not exist on type '{... Remove this comment to see the full error message
            changedProps.sortAscending = sortAscending;
        }

        if (!_.isEmpty(changedProps)) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(changedProps);
        }
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
    setSortColumn(name) {
        // @ts-expect-error TS(2339) FIXME: Property 'sortAscending' does not exist on type 'R... Remove this comment to see the full error message
        const { sortAscending, sortColumn } = this.state;
        let ascending = sortAscending;

        if (sortColumn === name) {
            ascending = !ascending;
        } else {
            ascending = true;
        }

        const fetchData = { sortColumn: name, sortAscending: ascending, currentPage: 1 };
        this.setState(fetchData, () => {
            // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
            this.paginationRef.current.reset(this.callFetchData);
        });
    }

    callFetchData() {
        // @ts-expect-error TS(2339) FIXME: Property 'fetchData' does not exist on type 'Reado... Remove this comment to see the full error message
        const { fetchData } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
        const { searchText, sortColumn, sortAscending } = this.state;
        // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
        const { currentPage, pageSize } = this.paginationRef.current.state;

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
            // @ts-expect-error TS(2339) FIXME: Property 'totalSize' does not exist on type 'Reado... Remove this comment to see the full error message
            totalSize,
            // @ts-expect-error TS(2339) FIXME: Property 'pageSize' does not exist on type 'Readon... Remove this comment to see the full error message
            pageSize,
            // @ts-expect-error TS(2339) FIXME: Property 'searchable' does not exist on type 'Read... Remove this comment to see the full error message
            searchable,
            // @ts-expect-error TS(2339) FIXME: Property 'selectable' does not exist on type 'Read... Remove this comment to see the full error message
            selectable,
            // @ts-expect-error TS(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            className,
            // @ts-expect-error TS(2339) FIXME: Property 'noDataAvailable' does not exist on type ... Remove this comment to see the full error message
            noDataAvailable,
            // @ts-expect-error TS(2339) FIXME: Property 'sizeMultiplier' does not exist on type '... Remove this comment to see the full error message
            sizeMultiplier,
            // @ts-expect-error TS(2339) FIXME: Property 'noDataMessage' does not exist on type 'R... Remove this comment to see the full error message
            noDataMessage,
            // @ts-expect-error TS(2339) FIXME: Property 'style' does not exist on type 'Readonly<... Remove this comment to see the full error message
            style
        } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
        const { searchText, searching, sortColumn, sortAscending } = this.state;
        // @ts-expect-error TS(7034) FIXME: Variable 'headerColumns' implicitly has type 'any[... Remove this comment to see the full error message
        const headerColumns = [];
        // @ts-expect-error TS(7034) FIXME: Variable 'bodyRows' implicitly has type 'any[]' in... Remove this comment to see the full error message
        const bodyRows = [];
        let gridAction = null;
        // @ts-expect-error TS(7034) FIXME: Variable 'gridFilters' implicitly has type 'any[]'... Remove this comment to see the full error message
        const gridFilters = [];

        // @ts-expect-error TS(7034) FIXME: Variable 'showCols' implicitly has type 'any[]' in... Remove this comment to see the full error message
        const showCols = [];
        React.Children.forEach(children, child => {
            if (child) {
                // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
                if (child.type === TableColumn) {
                    // @ts-expect-error TS(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
                    showCols.push(child.props.show ?? true);
                    headerColumns.push(child);
                    // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
                } else if (child.type === TableRow) {
                    // @ts-expect-error TS(2769) FIXME: No overload matches this call.
                    bodyRows.push(React.cloneElement(child, { showCols }));
                    // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
                } else if (child.type === TableRowExpandable) {
                    // @ts-expect-error TS(7034) FIXME: Variable 'expandableContent' implicitly has type '... Remove this comment to see the full error message
                    const expandableContent = [];
                    // @ts-expect-error TS(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
                    React.Children.forEach(child.props.children, expChild => {
                        if (expChild) {
                            if (expChild.type === TableRow) {
                                // @ts-expect-error TS(7005) FIXME: Variable 'showCols' implicitly has an 'any[]' type... Remove this comment to see the full error message
                                bodyRows.push(React.cloneElement(expChild, { showCols }));
                                // @ts-expect-error TS(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
                            } else if (expChild.type === TableDataExpandable && child.props.expanded) {
                                expandableContent.push(
                                    React.cloneElement(expChild, { numberOfColumns: showCols.length })
                                );
                            }
                        }
                    });
                    // @ts-expect-error TS(7005) FIXME: Variable 'expandableContent' implicitly has an 'an... Remove this comment to see the full error message
                    bodyRows.push(expandableContent);
                    // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
                } else if (child.type === DataAction) {
                    gridAction = child;
                    // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
                } else if (child.type === TableFilter) {
                    gridFilters.push(child);
                }
            }
        });

        return (
            <div className={`gridTable ${className}`} style={style}>
                {/* @ts-expect-error TS(7005) FIXME: Variable 'gridFilters' implicitly has an 'any[]' t... Remove this comment to see the full error message */}
                {(searchable || !_.isEmpty(gridFilters) || gridAction) && (
                    <Form size="small" as="div">
                        <Form.Group inline>
                            {searchable && (
                                <DataSearch
                                    search={searchText}
                                    searching={searching}
                                    onSearch={text =>
                                        // @ts-expect-error TS(2339) FIXME: Property 'debouncedSearch' does not exist on type ... Remove this comment to see the full error message
                                        this.setState({ searchText: text, searching: true }, this.debouncedSearch)
                                    }
                                />
                            )}
                            {/* @ts-expect-error TS(7005) FIXME: Variable 'gridFilters' implicitly has an 'any[]' t... Remove this comment to see the full error message */}
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
                    // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
                    ref={this.paginationRef}
                >
                    <DataTableContext.Provider
                        value={{
                            sortColumn,
                            sortAscending,
                            // @ts-expect-error TS(2322) FIXME: Type 'void' is not assignable to type 'never'.
                            setSortColumn: name => this.setSortColumn(name)
                        }}
                    >
                        <Table compact="very" sortable selectable={selectable} className={className}>
                            <Table.Header>
                                {/* @ts-expect-error TS(7005) FIXME: Variable 'headerColumns' implicitly has an 'any[]'... Remove this comment to see the full error message */}
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
                                // @ts-expect-error TS(7005) FIXME: Variable 'bodyRows' implicitly has an 'any[]' type... Remove this comment to see the full error message
                                <Table.Body>{bodyRows}</Table.Body>
                            )}
                        </Table>
                    </DataTableContext.Provider>
                </Pagination>
            </div>
        );
    }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DataTable.propTypes = {
    /**
     * table content
     */
    children: PropTypes.node.isRequired,

    /**
     * function used to fetch table data
     */
    fetchData: PropTypes.func,

    /**
     * total number of rows in table, if not specified pagination will not be set. It is used to calculate pagination pages
     */
    totalSize: PropTypes.number,

    /**
     * number of displayed rows on page
     */
    pageSize: PropTypes.number,

    /**
     * column name used for data sorting
     */
    sortColumn: PropTypes.string,

    /**
     * true for ascending sort, false for descending sort
     */
    sortAscending: PropTypes.bool,

    /**
     * if true filtering and searching input to be added
     */
    searchable: PropTypes.bool,

    /**
     * if true row can be selected and highlighted
     */
    selectable: PropTypes.bool,

    /**
     * name of the style class to be added
     */
    className: PropTypes.string,

    /**
     * if true no data available message is shown
     */
    noDataAvailable: PropTypes.bool,

    /**
     * param related to pagination, list of page sizes is generated as multiplication of basic fixed values [1, 2, 3, 5, 10] by this param
     */
    sizeMultiplier: PropTypes.number,

    /**
     * message displayed when there's no data
     */
    noDataMessage: PropTypes.node,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DataTable.defaultProps = {
    fetchData: () => Promise.resolve(),
    totalSize: -1,
    pageSize: 0,
    sortColumn: '',
    sortAscending: true,
    searchable: false,
    selectable: false,
    className: '',
    noDataAvailable: false,
    sizeMultiplier: 5,
    noDataMessage: 'No data available',
    style: undefined
};

export default DataTable;
