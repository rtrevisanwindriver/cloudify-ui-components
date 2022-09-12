import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

// @ts-expect-error TS(7031) FIXME: Binding element 'edition' implicitly has an 'any' ... Remove this comment to see the full error message
export default function LicenseEdition({ edition }) {
    return !_.isEmpty(edition) && <span style={{ verticalAlign: 'middle' }}> {edition}</span>;
}

LicenseEdition.propTypes = {
    edition: PropTypes.string
};

LicenseEdition.defaultProps = {
    edition: ''
};
