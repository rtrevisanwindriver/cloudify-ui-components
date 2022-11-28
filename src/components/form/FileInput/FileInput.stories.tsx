import React from 'react';
import { Button } from 'semantic-ui-react';
import _ from 'lodash';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import type { ComponentStory } from '@storybook/react';
import Form from '../Form/Form';

export default {
    title: 'Form/File',
    component: Form.File,
    decorators: [LiveEditDecorator({ Button })]
};

type FileStory = ComponentStory<typeof Form.File>;

export const basic: FileStory = () => (
    <Form>
        <Form.Field label="File">
            <Form.File name="file1" />
        </Form.Field>
    </Form>
);

export const noReset: FileStory = () => (
    <Form>
        <Form.Field label="File">
            <Form.File name="file2" showReset={false} />
        </Form.Field>
    </Form>
);

export const button: FileStory = () => (
    <Form.File
        name="file3"
        showInput={false}
        showReset={false}
        openButtonParams={{ className: 'rightFloated', content: 'Load File', labelPosition: 'left' }}
    />
);

export const controlled: FileStory = () => {
    const [value, setValue] = React.useState('');

    return (
        <>
            <Form.File
                name="file3"
                value={value ? `Selected file: ${value}` : ''}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //            https://github.com/FormidableLabs/react-live/issues/222
                //            should be fixed as part of RD-2849
                // @ts-expect-error TS(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
                onChange={(_file, fileName) => setValue(fileName)}
            />{' '}
            <Button onClick={_.ary(setValue, 0)}>Reset</Button>
        </>
    );
};
