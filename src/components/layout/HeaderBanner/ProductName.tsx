import PropTypes from 'prop-types';
import React from 'react';

// @ts-expect-error TS(7031) FIXME: Binding element 'name' implicitly has an 'any' typ... Remove this comment to see the full error message
export default function ProductName({ name }) {
    return <span style={{ verticalAlign: 'middle' }}>{name}</span>;
}

ProductName.propTypes = {
    name: PropTypes.string.isRequired
};
