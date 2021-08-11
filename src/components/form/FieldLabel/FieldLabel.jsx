import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import PopupHelp from 'components/popups/PopupHelp';

/**
 * FieldLabel creates input field description with help popup (PopupHelp component).
 * All props supported by the `label` element are passed down to it.
 *
 * @return {null}
 */
export default function FieldLabel({ label, help, ...labelProps }) {
    return !_.isEmpty(label) ? (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label {...labelProps}>
            {label}{' '}
            {!_.isEmpty(help) && (
                <span>
                    <PopupHelp content={help} />
                </span>
            )}
        </label>
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
