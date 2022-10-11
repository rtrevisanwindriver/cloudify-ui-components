import React from 'react';
import type { CSSProperties, FunctionComponent } from 'react';

type DivContainerProps = Pick<CSSProperties, 'backgroundColor' | 'height'>;

const DivContainer: FunctionComponent<DivContainerProps> = ({
    children,
    backgroundColor = 'white',
    height = '150'
}) => {
    return <div style={{ position: 'relative', height, backgroundColor }}>{children}</div>;
};

export default DivContainer;
