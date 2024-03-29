import React from 'react';
import { mount } from 'enzyme';
import type { FormCheckboxProps, FormInputProps } from 'semantic-ui-react';
import { Form } from 'components';

type OnInputChangeData = FormInputProps & HTMLInputElement;
type OnCheckboxChangeData = FormCheckboxProps & HTMLInputElement;

describe('<Form />', () => {
    it('renders', () => {
        const wrapper = mount(<Form />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('formats errors for ErrorMessage component', () => {
        const wrapper = mount(<Form errors="Invalid field" scrollToError />);
        expect(wrapper.find('ErrorMessage').prop('error')).toEqual(['Invalid field']);

        wrapper.setProps({ errors: { a: 'Invalid a', b: 'Invalid b' } });
        expect(wrapper.find('ErrorMessage').prop('error')).toEqual(['Invalid a', 'Invalid b']);
    });

    it('scrolls to errors automatically', () => {
        const wrapper = mount(<Form errors={{}} scrollToError />);
        const formElement = wrapper.getDOMNode();

        expect(formElement).toBeDefined();
        const scrollSpy = jest.fn();
        formElement.scrollIntoView = scrollSpy;

        wrapper.setProps({ errors: { a: 'Invalid a', b: 'Invalid b' } });
        expect(scrollSpy).toHaveBeenCalledTimes(1);
    });

    it('provides Form.fieldNameValue function handling field value', () => {
        let fieldNameValue;
        const wrapper = mount(
            <Form.Input
                name="username"
                onChange={(_e, data) => {
                    fieldNameValue = Form.fieldNameValue(data as OnInputChangeData);
                }}
            />
        );

        wrapper.find('input').simulate('change', { target: { value: 'user' } });

        expect(fieldNameValue).toEqual({ username: 'user' });
    });

    it('provides Form.fieldNameValue function handling field value for checkbox input', () => {
        let fieldNameValue;
        const wrapper = mount(
            <Form.Checkbox
                label="Newsletter"
                name="newsletter"
                onChange={(_e, data) => {
                    fieldNameValue = Form.fieldNameValue(data as OnCheckboxChangeData);
                }}
            />
        );

        expect(wrapper.find('input').prop('checked')).toEqual(false);
        wrapper.find('input').simulate('change');
        expect(fieldNameValue).toEqual({ newsletter: true });

        wrapper.setProps({ checked: true });
        wrapper.find('input').simulate('change');
        expect(fieldNameValue).toEqual({ newsletter: false });
    });

    it('provides Form.fieldNameValue function handling field value for number input', () => {
        let fieldNameValue;
        const wrapper = mount(
            <Form.Input
                type="number"
                name="count"
                onChange={(_e, data) => {
                    fieldNameValue = Form.fieldNameValue(data as OnInputChangeData);
                }}
            />
        );

        wrapper.find('input').simulate('change', { target: { value: '50' } });
        expect(fieldNameValue).toEqual({ count: 50 });

        wrapper.find('input').simulate('change', { target: { value: '3.14' } });
        expect(fieldNameValue).toEqual({ count: 3.14 });
    });

    it('provides Form.fieldNameValue function handling field without name set', () => {
        const wrapper = mount(<Form.Input onChange={(_e, data) => Form.fieldNameValue(data as OnInputChangeData)} />);

        expect.assertions(1);
        expect(() =>
            wrapper.find('input').simulate('change', {
                target: {
                    value: 'something'
                }
            })
        ).toThrowError(new Error('Required name attribute is not provided!'));
    });
});
