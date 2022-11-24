import type { ReactElement } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { Icon, Grid, Message, Pagination as PaginationNavigation } from 'semantic-ui-react';
import Popup from 'components/popups/Popup';
import PaginationInfo from './PaginationInfo';

import './Pagination.css';

interface PaginationProps {
    fetchData: () => void;
    totalSize: number;
    pageSize: number;
    sizeMultiplier: number;
}

interface PaginationState {
    pageSize: number;
    currentPage: number;
    showWarningPopup: boolean;
}

export default class Pagination extends Component<PaginationProps, PaginationState> {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        children: PropTypes.node.isRequired,
        fetchData: PropTypes.func.isRequired,
        totalSize: PropTypes.number,
        pageSize: PropTypes.number,
        sizeMultiplier: PropTypes.number
    };

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        totalSize: 0,
        pageSize: PaginationInfo.pageSizes(5)[0],
        sizeMultiplier: 5
    };

    constructor(props: PaginationProps) {
        super(props);

        this.state = {
            pageSize: props.pageSize,
            currentPage: 1,
            showWarningPopup: false
        };

        this.changePage = this.changePage.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    componentDidUpdate(prevProps: PaginationProps): void {
        const { pageSize, totalSize } = this.props;
        const { currentPage } = this.state;

        const changedProps: { pageSize?: number; currentPage?: number } = {};

        if (prevProps.pageSize !== pageSize) {
            changedProps.pageSize = pageSize;
        }

        if (totalSize >= 0 && currentPage !== 1) {
            const pageCount = Math.ceil(totalSize / pageSize);
            if (currentPage > pageCount) {
                changedProps.currentPage = 1;
            }
        }

        if (!isEmpty(changedProps)) {
            this.changePage(changedProps.currentPage || currentPage, changedProps.pageSize);
        }
    }

    changePageSize(size: string): void {
        const minPageSize = 1;
        const maxPageSize = 500;
        const popupShowTimeout = 3000;

        const { fetchData, sizeMultiplier } = this.props;
        let pageSize = parseInt(size, 10);
        let showWarningPopup = false;

        if (Number.isNaN(pageSize) || pageSize < minPageSize || pageSize > maxPageSize) {
            [pageSize] = PaginationInfo.pageSizes(sizeMultiplier);
            showWarningPopup = true;
        }

        this.setState({ pageSize, currentPage: 1, showWarningPopup }, () => {
            if (showWarningPopup) {
                setTimeout(() => this.setState({ showWarningPopup: false }), popupShowTimeout);
            }
            return fetchData();
        });
    }

    changePage(page: number, pageSize?: number): void {
        const { fetchData } = this.props;
        const { pageSize: pageSizeState } = this.props;

        this.setState({ currentPage: page, pageSize: pageSize || pageSizeState }, () => fetchData());
    }

    reset(callback: () => void): void {
        this.setState({ currentPage: 1 }, callback);
    }

    render(): ReactElement {
        const { children, totalSize, sizeMultiplier } = this.props;
        const { currentPage, pageSize: pageSizeState, showWarningPopup } = this.state;
        const showPagination =
            totalSize > PaginationInfo.pageSizes(sizeMultiplier)[0] || totalSize > pageSizeState || currentPage > 1;
        const totalPages = Math.ceil(totalSize / pageSizeState);

        const isFirstPage = currentPage === 1;
        const isLastPage = currentPage === totalPages;

        return (
            <div>
                {children}

                {showPagination && (
                    <Grid columns={2} className="gridPagination">
                        <Grid.Column>
                            <Popup open={showWarningPopup} wide="very">
                                <Popup.Trigger>
                                    <PaginationInfo
                                        currentPage={currentPage}
                                        pageSize={pageSizeState}
                                        totalSize={totalSize}
                                        onPageSizeChange={this.changePageSize}
                                        sizeMultiplier={sizeMultiplier}
                                    />
                                </Popup.Trigger>
                                <Popup.Content>
                                    <Message warning>
                                        <Icon name="warning sign" />
                                        Only integer values between 1 and 500 are allowed.
                                    </Message>
                                </Popup.Content>
                            </Popup>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            {totalSize > 0 && (
                                <PaginationNavigation
                                    activePage={currentPage}
                                    totalPages={totalPages}
                                    // NOTE: assume the `activePage` is always a number
                                    onPageChange={(_e, { activePage }) => this.changePage(activePage as number)}
                                    siblingRange={0}
                                    ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                                    firstItem={{
                                        content: <Icon name="angle double left" />,
                                        icon: true,
                                        disabled: isFirstPage
                                    }}
                                    lastItem={{
                                        content: <Icon name="angle double right" />,
                                        icon: true,
                                        disabled: isLastPage
                                    }}
                                    prevItem={{
                                        content: <Icon name="angle left" />,
                                        icon: true,
                                        disabled: isFirstPage
                                    }}
                                    nextItem={{
                                        content: <Icon name="angle right" />,
                                        icon: true,
                                        disabled: isLastPage
                                    }}
                                />
                            )}
                        </Grid.Column>
                    </Grid>
                )}
            </div>
        );
    }
}

// NOTE: build-storybook throws an error if is added as a static property in the class
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Pagination as any).PAGE_SIZE_LIST = PaginationInfo.pageSizes;
