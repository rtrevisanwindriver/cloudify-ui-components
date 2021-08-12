import React, { FunctionComponent, useEffect } from 'react';
import { Grid, GridProps, Segment, SegmentProps, SemanticWIDTHS } from 'semantic-ui-react';

interface MessageContainerProps extends Omit<GridProps, 'textAlign'> {
    /**
     * primary content
     */
    children: SegmentProps['children'];

    /**
     * if set to true show its content is being loaded
     */
    loading?: boolean;

    /**
     * sets the Segment's margin
     */
    margin?: string;

    /**
     * sets the Segment's size
     */
    size?: SegmentProps['size'];

    /**
     * sets the horizontal alignment of the text
     */
    textAlign?: string;

    /**
     * if set to true the container will be wider
     */
    wide?: boolean;

    /**
     * function executed before rendering component
     */
    onRender?: () => void;
}

/**
 * MessageContainer is a component which uses [Grid](https://react.semantic-ui.com/collections/grid) and
 * [Segment](https://react.semantic-ui.com/elements/segment) components from Semantic-UI-React to display message box.
 * Can be displayed in full screen or inside another container.
 * All props supported by the `Grid` component are passed down to it.
 */
const MessageContainer: FunctionComponent<MessageContainerProps> = ({
    children,
    loading = false,
    margin = '80px auto',
    size = 'big',
    textAlign = 'center',
    wide = false,
    onRender = () => {},
    ...gridProps
}) => {
    useEffect(() => onRender(), []);

    const style = { margin, textAlign };
    const widths: Record<string, SemanticWIDTHS> = wide
        ? { mobile: 14, tablet: 14, computer: 12 }
        : { mobile: 12, tablet: 8, computer: 6 };

    return (
        <Grid centered container columns={1} {...gridProps}>
            <Grid.Column {...widths}>
                <Segment size={size} padded raised style={style} loading={loading}>
                    {children}
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default MessageContainer;
