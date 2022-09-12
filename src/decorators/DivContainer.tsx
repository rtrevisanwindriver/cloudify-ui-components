import React from 'react';
import PropTypes from 'prop-types';

// @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
export default function DivContainer({ children, backgroundColor, height }) {
    return <div style={{ position: 'relative', height, backgroundColor }}>{children}</div>;
}
DivContainer.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundColor: PropTypes.string,
    height: PropTypes.number
};
DivContainer.defaultProps = {
    backgroundColor: 'white',
    height: 150
};
