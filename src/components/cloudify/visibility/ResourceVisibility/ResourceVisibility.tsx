import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Icon, Message } from 'semantic-ui-react';
import Confirm from 'components/modal/Confirm';
import Popup from 'components/popups/Popup';
import VisibilityIcon from '../VisibilityIcon';
import { visibilities, visibilityPropType } from '../consts';

/**
 * ResourceVisibility - an icon representing resource visibility. If allowed setting different visibility than current,
 * clicking the icon will show a popup with the visibility options. To approve the visibility change a confirm modal is shown.
 * All props except `onSetVisibility` and `allowedSettingTo` are passed down to the underlaying `VisibilityIcon` component.
 */

// @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
export default function ResourceVisibility(props) {
    const { visibility, onSetVisibility, allowedSettingTo, ...otherVisibilityIconProps } = props;

    const [openConfirm, setOpenConfirm] = useState(false);
    const [newVisibility, setNewVisibility] = useState(null);
    const [popupOpened, setPopupOpened] = useState(false);

    const setTenantAllowed =
        _.includes(allowedSettingTo, visibilities.TENANT.name) && _.isEqual(visibility, visibilities.PRIVATE.name);
    const setGlobalAllowed =
        _.includes(allowedSettingTo, visibilities.GLOBAL.name) && !_.isEqual(visibility, visibilities.GLOBAL.name);
    const canChangeVisibility = setGlobalAllowed || setTenantAllowed;

    const icon = (
        <VisibilityIcon
            visibility={visibility}
            link={setGlobalAllowed}
            // @ts-expect-error TS(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            onClick={e => e.stopPropagation()}
            bordered
            disabled={!canChangeVisibility}
            showTitle={!popupOpened}
            {...otherVisibilityIconProps}
        />
    );

    const popupContent = (
        <div
            style={{
                marginTop: '10px',
                textAlign: 'center'
            }}
        >
            <Message warning content="This operation cannot be reverted" />
            {setTenantAllowed && (
                <Button
                    animated
                    color="green"
                    onClick={e => {
                        e.stopPropagation();
                        setOpenConfirm(true);
                        // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                        setNewVisibility(visibilities.TENANT.name);
                        setPopupOpened(false);
                    }}
                >
                    <Button.Content visible>Tenant</Button.Content>
                    <Button.Content hidden>
                        <Icon name="user" />
                    </Button.Content>
                </Button>
            )}
            {setGlobalAllowed && (
                <Button
                    animated
                    color="blue"
                    onClick={e => {
                        e.stopPropagation();
                        setOpenConfirm(true);
                        // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                        setNewVisibility(visibilities.GLOBAL.name);
                        setPopupOpened(false);
                    }}
                >
                    <Button.Content visible>Global</Button.Content>
                    <Button.Content hidden>
                        <Icon name="globe" />
                    </Button.Content>
                </Button>
            )}
        </div>
    );

    const popup = (
        <Popup
            flowing
            trigger={icon}
            on="click"
            header="Change resource visibility"
            content={popupContent}
            open={popupOpened}
            onOpen={() => setPopupOpened(true)}
            onClose={() => setPopupOpened(false)}
        />
    );

    return canChangeVisibility ? (
        <span>
            {popup}
            {(setTenantAllowed || setGlobalAllowed) && (
                <Confirm
                    content={`Are you sure you want to change resource visibility to ${newVisibility}?`}
                    open={openConfirm}
                    // @ts-expect-error TS(2322) FIXME: Type '{ content: string; open: boolean; onCancel: ... Remove this comment to see the full error message
                    onCancel={e => {
                        e.stopPropagation();
                        setOpenConfirm(false);
                        setNewVisibility(null);
                    }}
                    // @ts-expect-error TS(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
                    onConfirm={e => {
                        e.stopPropagation();
                        onSetVisibility(newVisibility);
                        setOpenConfirm(false);
                        setNewVisibility(null);
                    }}
                />
            )}
        </span>
    ) : (
        icon
    );
}

ResourceVisibility.propTypes = {
    /**
     * resource visibility - in ['private', 'tenant, 'global', 'unknown']
     */
    visibility: visibilityPropType,

    /**
     * function to be called when user confirm changing visibility
     */
    onSetVisibility: PropTypes.func,

    /**
     * array of visibilities the item is allowed to change to
     */
    allowedSettingTo: PropTypes.arrayOf(visibilityPropType),

    /**
     * name of the style class to be added
     */
    className: PropTypes.string
};

ResourceVisibility.defaultProps = {
    visibility: visibilities.UNKNOWN.name,
    onSetVisibility: () => {},
    allowedSettingTo: [],
    className: ''
};
