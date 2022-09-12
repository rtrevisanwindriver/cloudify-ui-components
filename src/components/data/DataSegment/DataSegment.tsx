import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Form, Icon, Message } from 'semantic-ui-react';
import DataSearch from '../common/DataSearch';
import DataAction from '../common/DataAction';
import Pagination from '../common/Pagination';

import SegmentItem from './SegmentItem';

import './DataSegment.css';

/**
 * `DataSegment` component enables fetching data using predefined function and showing segmented data in a simple manner.
 *
 * It delivers alternative way of presenting fetched data to `DataTable`.
 *
 * ## Features
 * - data pagination
 * - selectable segments
 * - search filter
 * - action buttons
 *
 * ## Sub-components
 * - `DataSegment.Item` = segment item
 * - `DataSegment.Action` = segment action area
 */
export default class DataSegment extends Component {
    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props, context) {
        super(props, context);

        // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
        this.paginationRef = React.createRef();

        this.state = {
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

    callFetchData() {
        // @ts-expect-error TS(2339) FIXME: Property 'fetchData' does not exist on type 'Reado... Remove this comment to see the full error message
        const { fetchData } = this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
        const { searchText } = this.state;
        // @ts-expect-error TS(2339) FIXME: Property 'paginationRef' does not exist on type 'D... Remove this comment to see the full error message
        const { currentPage, pageSize } = this.paginationRef.current.state;

        return fetchData({
            gridParams: {
                _search: searchText,
                currentPage,
                pageSize
            }
        });
    }

    render() {
        // @ts-expect-error TS(2339) FIXME: Property 'totalSize' does not exist on type 'Reado... Remove this comment to see the full error message
        const { children, totalSize, pageSize, searchable, className, sizeMultiplier, noDataMessage, style } =
            this.props;
        // @ts-expect-error TS(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
        const { searchText, searching } = this.state;
        let segmentAction = null;
        // @ts-expect-error TS(7034) FIXME: Variable 'segments' implicitly has type 'any[]' in... Remove this comment to see the full error message
        const segments = [];

        React.Children.forEach(children, child => {
            // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
            if (child && child.type) {
                // @ts-expect-error TS(2339) FIXME: Property 'type' does not exist on type 'string | n... Remove this comment to see the full error message
                if (child.type === DataAction) {
                    segmentAction = child;
                } else {
                    segments.push(child);
                }
            }
        });

        return (
            <div className={`segmentList ${className}`} style={style}>
                {(segmentAction || searchable) && (
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
                            {segmentAction}
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
                    {totalSize === 0 ? (
                        <Message icon>
                            <Icon name="ban" />
                            <span>{noDataMessage}</span>
                        </Message>
                    ) : (
                        // @ts-expect-error TS(7005) FIXME: Variable 'segments' implicitly has an 'any[]' type... Remove this comment to see the full error message
                        segments
                    )}
                </Pagination>
            </div>
        );
    }
}

// @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
DataSegment.Item = SegmentItem;
// @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message
DataSegment.Action = DataAction;

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DataSegment.propTypes = {
    /**
     * primary content
     */
    children: PropTypes.node.isRequired,

    /**
     * function used to fetch data
     */
    fetchData: PropTypes.func,

    /**
     * total number of data segments, if not specified pagination will not be set. It is used to calculate pagination pages.
     */
    totalSize: PropTypes.number,

    /**
     * number of displayed rows on page
     */
    pageSize: PropTypes.number,

    /**
     * CSS classname
     */
    className: PropTypes.string,

    /**
     * param related to pagination. List of page sizes is generated as multiplication of basic fixed values [1, 2, 3, 5, 10] by this param
     */
    sizeMultiplier: PropTypes.number,

    /**
     * if true filtering and searching input to be added
     */
    searchable: PropTypes.bool,

    /**
     * message displayed when there's no data
     */
    noDataMessage: PropTypes.string,

    /**
     * CSS style
     */
    style: PropTypes.shape({})
};

// @ts-expect-error TS(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DataSegment.defaultProps = {
    className: '',
    fetchData: () => {},
    totalSize: -1,
    pageSize: 0,
    sizeMultiplier: 3,
    searchable: false,
    noDataMessage: 'No data available',
    style: undefined
};
