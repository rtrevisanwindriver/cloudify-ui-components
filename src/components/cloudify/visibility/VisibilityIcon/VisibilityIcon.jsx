import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';

import Popup from 'components/popups/Popup';
import { visibilities, visibilityPropType } from '../consts';

/**
 * VisibilityIcon - a component showing an visibility icon depending on resource visibility.
 *
 * All props supported by the `Icon` component are passed down to it.
 */
export default function VisibilityIcon(props) {
    const { visibility, showTitle, ...restProps } = props;
    const data = _.find(visibilities, { name: visibility }) || visibilities.UNKNOWN;

    return showTitle ? (
        <Popup trigger={<Icon name={data.icon} color={data.color} {...restProps} />} content={data.title} />
    ) : (
        <Icon name={data.icon} color={data.color} {...restProps} />
    );
}

VisibilityIcon.propTypes = {
    /**
     * visibility, one from ['private', 'tenant', 'global', 'unknown']
     */
    visibility: visibilityPropType,
    /**
     * if set to true, then on hovering icon title will be shown in popup
     */
    showTitle: PropTypes.bool
};

VisibilityIcon.defaultProps = {
    showTitle: true,
    visibility: visibilities.UNKNOWN.name
};
