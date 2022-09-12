import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PopupHelp from '../../popups/PopupHelp';

/**
 * FieldLabel creates input field description with help popup (PopupHelp component).
 * All props supported by the `label` element are passed down to it.
 *
 * @return {null}
 */
// @ts-expect-error TS(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
export default function FieldLabel({ label, help, ...labelProps }) {
    return !_.isEmpty(label) ? (
        <>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label {...labelProps} style={{ display: 'inline-block' }}>
                {label}
            </label>
            {!_.isEmpty(help) && (
                <span>
                    {' '}
                    <PopupHelp content={help} />
                </span>
            )}
            <div />
        </>
    ) : null;
}

FieldLabel.propTypes = {
    /**
     * field label
     */
    label: PropTypes.string,
    /**
     * help description
     */
    help: PropTypes.node
};

FieldLabel.defaultProps = {
    label: '',
    help: ''
};
