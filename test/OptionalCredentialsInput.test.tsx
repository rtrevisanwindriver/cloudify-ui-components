import React from 'react';
import { mount } from 'enzyme';
import { OptionalCredentialsInput } from 'components';
import { noop } from 'lodash';

describe('<OptionalCredentialsInput />', () => {
    it('renders disabled', () => {
        const wrapper = mount(
            <OptionalCredentialsInput
                enabled={false}
                onCredentialsChange={noop}
                onEnabledChange={noop}
                onBlur={noop}
                errorsProvider={noop}
            />
        );
        const disabledInputs = wrapper.find('input[disabled=true]');
        expect(disabledInputs.length).toEqual(2);
    });

    it('renders enabled', () => {
        const onChange = jest.fn();

        const wrapper = mount(
            <OptionalCredentialsInput
                enabled
                onCredentialsChange={onChange}
                onEnabledChange={noop}
                onBlur={noop}
                errorsProvider={noop}
            />
        );
        const disabledInputs = wrapper.find('input[disabled=true]');
        expect(disabledInputs.length).toEqual(0);

        wrapper
            .find('input')
            .last()
            .simulate('change', { target: { value: 'test' } });
        expect(onChange).toHaveBeenCalled();
    });
});
