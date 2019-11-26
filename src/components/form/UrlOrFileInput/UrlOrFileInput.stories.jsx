import React from 'react';
import Form from '../Form/Form';

export default {
    title: 'Form.UrlOrFile',
    component: Form.UrlOrFile
};

export const basic = () => (
    <Form>
        <Form.Field label="File or URL">
            <Form.UrlOrFile
                name="blueprint"
                placeholder="Provide the blueprint's URL or click browse to select a file"
                onChangeUrl={() => {}}
                onBlurUrl={() => {}}
                onChangeFile={() => {}}
            />
        </Form.Field>
    </Form>
);
