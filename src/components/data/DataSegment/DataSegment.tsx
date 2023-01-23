import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { debounce } from 'lodash';

import { Form, Icon, Message } from 'semantic-ui-react';
import DataSearch from '../common/DataSearch';
import DataAction from '../common/DataAction';
import Pagination from '../common/Pagination';
import type { FetchDataFunction } from '../common/types';

import SegmentItem from './SegmentItem';
import './DataSegment.css';

export interface DataSegmentProps {
    /**
     * function used to fetch data
     */
    fetchData: FetchDataFunction;

    /**
     * total number of data segments, if not specified pagination will not be set. It is used to calculate pagination pages.
     */
    totalSize?: number;

    /**
     * number of displayed rows on page
     */
    pageSize?: number;

    /**
     * CSS classname
     */
    className?: string;

    /**
     * param related to pagination. List of page sizes is generated as multiplication of basic fixed values [1, 2, 3, 5, 10] by this param
     */
    sizeMultiplier?: number;

    /**
     * if true filtering and searching input to be added
     */
    searchable?: boolean;

    /**
     * message displayed when there's no data
     */
    noDataMessage?: string;

    /**
     * CSS style
     */
    style?: React.CSSProperties;
}

interface DataSegmentState {
    searchText: string;
    searching: boolean;
}

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
export class DataSegment extends Component<DataSegmentProps, DataSegmentState> {
    static Item = SegmentItem;

    static Action = DataAction;

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        className: '',
        fetchData: () => {},
        totalSize: -1,
        pageSize: 0,
        sizeMultiplier: 3,
        searchable: false,
        noDataMessage: 'No data available',
        style: undefined
    };

    paginationRef = React.createRef<Pagination>();

    debouncedSearch = debounce(
        () => {
            this.paginationRef?.current?.reset(() => {
                return Promise.resolve(this.callFetchData()).then(() => this.setState({ searching: false }));
            });
        },
        300,
        { maxWait: 2000 }
    );

    constructor(props: DataSegmentProps, context: unknown) {
        super(props, context);

        this.state = {
            searchText: '',
            searching: false
        };

        this.callFetchData = this.callFetchData.bind(this);
    }

    callFetchData() {
        const { fetchData } = this.props;
        const { searchText } = this.state;
        if (!this.paginationRef.current) return Promise.resolve();

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
        const { children, totalSize, pageSize, searchable, className, sizeMultiplier, noDataMessage, style } =
            this.props;
        const { searchText, searching } = this.state;
        let segmentAction = null;
        const segments: ReactNode[] = [];

        React.Children.forEach(children, child => {
            if (child && typeof child === 'object' && 'type' in child) {
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
                    ref={this.paginationRef}
                >
                    {totalSize === 0 ? (
                        <Message icon>
                            <Icon name="ban" />
                            <span>{noDataMessage}</span>
                        </Message>
                    ) : (
                        segments
                    )}
                </Pagination>
            </div>
        );
    }
}

export default DataSegment;
