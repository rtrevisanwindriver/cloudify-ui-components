import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// @ts-expect-error TS(2307) FIXME: Cannot find module 'raw-loader!./example-content.h... Remove this comment to see the full error message
// eslint-disable-next-line import/no-webpack-loader-syntax
import exampleReadme from 'raw-loader!./example-content.html';
import ReadmeModal from './ReadmeModal';

export default {
    title: 'Modal/ReadmeModal',
    component: ReadmeModal,
    argTypes: {
        open: {
            control: {
                disable: true
            }
        }
    }
};

// @ts-expect-error TS(7031) FIXME: Binding element 'content' implicitly has an 'any' ... Remove this comment to see the full error message
const Template = ({ content, className }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Readme" />
            <ReadmeModal className={className} content={content} open={open} onHide={() => setOpen(false)} />
        </div>
    );
};

Template.propTypes = {
    content: PropTypes.string.isRequired,
    className: PropTypes.string
};

Template.defaultProps = {
    className: ''
};

export const Basic = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '{ ({ conte... Remove this comment to see the full error message
Basic.args = {
    content: exampleReadme
};

export const LongContent = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '{ ({ conte... Remove this comment to see the full error message
LongContent.args = {
    content: Array.from({ length: 3 })
        .map(
            () => `<h2>Header for a repeated section</h2>

                ${Array.from({ length: 5 })
                    .fill(
                        `
                    <p>
                        Here is a paragraph, whose sentence will be repeated multiple times. Here is a paragraph, whose sentence will be repeated multiple times.
                        Here is a paragraph, whose sentence will be repeated multiple times. Here is a paragraph, whose sentence will be repeated multiple times.
                        Here is a paragraph, whose sentence will be repeated multiple times. Here is a paragraph, whose sentence will be repeated multiple times.
                    </p>
                `
                    )
                    .join('\n')}`
        )
        .join('\n')
};
