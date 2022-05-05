import type { ComponentProps, ReactElement } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import type { DropdownItemProps } from 'semantic-ui-react';

import Form from '../../../form/Form';

interface PaginationInfoProps {
    pageSize: number;
    onPageSizeChange: (pageSize: string) => void;
    totalSize: number;
    currentPage: number;
    sizeMultiplier: number;
}

export default function PaginationInfo({
    pageSize,
    onPageSizeChange,
    currentPage,
    totalSize,
    sizeMultiplier
}: PaginationInfoProps): ReactElement | null {
    const handleChange: ComponentProps<typeof Form.Dropdown>['onChange'] = (_e, { value }) => {
        // NOTE: assumes the values are all strings
        onPageSizeChange(value as string);
    };

    if (totalSize <= 0 && currentPage === 1) {
        return null;
    }

    let start = (currentPage - 1) * pageSize + 1;
    const stop = Math.min(start + pageSize - 1, totalSize);

    if (start > stop) {
        start = stop;
    }

    const pageSizes = PaginationInfo.pageSizes(sizeMultiplier);

    const options = pageSizes.map((item): DropdownItemProps => ({ text: item, value: item }));
    if (!pageSizes.includes(pageSize)) {
        options.unshift({ text: pageSize, value: pageSize });
    }

    return (
        <Form>
            Page size:&nbsp;
            <Form.Dropdown
                compact
                upward
                search
                selection
                allowAdditions
                value={pageSize}
                additionLabel="Set "
                options={options}
                clearable={false}
                onChange={handleChange}
                id="pageSizeField"
            />
            &nbsp;&nbsp;{start} to {stop}
            {totalSize > 0 && <span>&nbsp;of {totalSize} entries</span>}
        </Form>
    );
}

PaginationInfo.pageSizes = (multiplier: number) => [1, 2, 3, 5, 10].map(item => multiplier * item);

PaginationInfo.propTypes = {
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    totalSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    sizeMultiplier: PropTypes.number
};

PaginationInfo.defaultProps = {
    currentPage: 1,
    sizeMultiplier: 5
};
