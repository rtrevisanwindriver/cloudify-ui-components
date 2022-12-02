import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import { noop, includes, isEqual } from 'lodash';
import { Button, Icon, Message } from 'semantic-ui-react';
import Confirm from 'components/modal/Confirm';
import Popup from 'components/popups/Popup';
import VisibilityIcon from '../VisibilityIcon';
import { defaultVisibility, visibilities } from '../consts';
import type { Visibility } from '../types';
import type { VisibilityIconProps } from '../VisibilityIcon/VisibilityIcon';

export interface ResourceVisibilityProps extends Pick<VisibilityIconProps, 'visibility' | 'className'> {
    /**
     * function to be called when user confirm changing visibility
     */
    onSetVisibility?: (visibility: Visibility) => void;

    /**
     * array of visibilities the item is allowed to change to
     */
    allowedSettingTo?: Visibility[];
}

/**
 * ResourceVisibility - an icon representing resource visibility. If allowed setting different visibility than current,
 * clicking the icon will show a popup with the visibility options. To approve the visibility change a confirm modal is shown.
 * All props except `onSetVisibility` and `allowedSettingTo` are passed down to the underlaying `VisibilityIcon` component.
 */
export default function ResourceVisibility({
    visibility = defaultVisibility,
    onSetVisibility = noop,
    allowedSettingTo = [],
    className
}: ResourceVisibilityProps) {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [popupOpened, setPopupOpened] = useState(false);
    const [newVisibility, setNewVisibility] = useState<Visibility | null>(null);

    const setTenantAllowed =
        includes(allowedSettingTo, visibilities.TENANT.name) && isEqual(visibility, visibilities.PRIVATE.name);
    const setGlobalAllowed =
        includes(allowedSettingTo, visibilities.GLOBAL.name) && !isEqual(visibility, visibilities.GLOBAL.name);
    const canChangeVisibility = setGlobalAllowed || setTenantAllowed;

    const icon = (
        <VisibilityIcon
            visibility={visibility}
            link={setGlobalAllowed}
            onClick={(e: MouseEvent<unknown>) => e.stopPropagation()}
            disabled={!canChangeVisibility}
            showTitle={!popupOpened}
            className={className}
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
                    onCancel={e => {
                        e.stopPropagation();
                        setOpenConfirm(false);
                        setNewVisibility(null);
                    }}
                    onConfirm={e => {
                        e.stopPropagation();
                        onSetVisibility(newVisibility as Visibility);
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
