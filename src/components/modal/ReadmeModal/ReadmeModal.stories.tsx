import React from 'react';
import { Button } from 'semantic-ui-react';
import type { ComponentStory } from '@storybook/react';

// eslint-disable-next-line import/no-webpack-loader-syntax
import exampleReadme from 'raw-loader!./example-content.html';
import ReadmeModal from './ReadmeModal';
import type { ReadmeModalProps } from './ReadmeModal';

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

type ReadmeModalStory = ComponentStory<typeof ReadmeModal>;

type TemplateProps = Pick<ReadmeModalProps, 'content' | 'className'>;
const Template = ({ content, className = '' }: TemplateProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)} content="Show Readme" />
            <ReadmeModal className={className} content={content} open={open} onHide={() => setOpen(false)} />
        </div>
    );
};

export const Basic: ReadmeModalStory = Template.bind({});
Basic.args = {
    content: exampleReadme
};

export const LongContent: ReadmeModalStory = Template.bind({});
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
