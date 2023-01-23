import type { InputHTMLAttributes, MouseEvent } from 'react';
import React from 'react';
import type { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { noop } from 'lodash';
import { act } from 'react-dom/test-utils';
import type { UrlOrFileInputProps } from 'components/form/UrlOrFileInput/UrlOrFileInput';
import type { ButtonProps } from 'semantic-ui-react';
import { FileInput, UrlOrFileInput } from 'components';

describe('<UrlOrFileInput />', () => {
    it('selects a file and resets its state on reset button click', () => {
        const wrapper = mount<UrlOrFileInputProps>(
            <UrlOrFileInput onChangeUrl={noop} onChangeFile={noop} onBlurUrl={noop} placeholder="" name="test" />
        );
        const name = 'test';
        const labelWrapper = wrapper.find('.label');
        const inputWrapper = wrapper.find('input[type="text"]') as ReactWrapper<
            InputHTMLAttributes<HTMLInputElement>,
            unknown,
            JSX.IntrinsicElements['input']
        >;

        expect(labelWrapper.text()).toEqual('URL');

        act(() => wrapper.find(FileInput).prop('onChange')?.({ name } as File));

        expect(labelWrapper.text()).toEqual('File');

        expect(inputWrapper.instance().value).toEqual(name);

        act(() => {
            wrapper
                .find('Button')
                .last()
                .props()
                .onClick?.({ preventDefault: noop } as MouseEvent<ButtonProps>);
        });

        expect(labelWrapper.text()).toEqual('URL');
        expect(inputWrapper.instance().value).toEqual('');
    });
});
