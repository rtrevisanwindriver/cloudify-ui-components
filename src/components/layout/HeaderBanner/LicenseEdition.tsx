import { isEmpty } from 'lodash';
import React from 'react';

interface LicenseEditionProps {
    edition?: string;
}

export default function LicenseEdition({ edition = '' }: LicenseEditionProps) {
    return !isEmpty(edition) ? <span style={{ verticalAlign: 'middle' }}> {edition}</span> : null;
}
