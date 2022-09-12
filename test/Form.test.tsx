import React from 'react';
import { mount } from 'enzyme';
import Form from '../src/components/form/Form';

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
        // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'string | El... Remove this comment to see the full error message
        const wrapper = mount(<Form errors={null} scrollToError />);
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
                // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
                onChange={(e, f) => {
                    // @ts-expect-error TS(2345) FIXME: Argument of type 'InputOnChangeData' is not assign... Remove this comment to see the full error message
                    fieldNameValue = Form.fieldNameValue(f);
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
                // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
                onChange={(e, f) => {
                    // @ts-expect-error TS(2345) FIXME: Argument of type 'CheckboxProps' is not assignable... Remove this comment to see the full error message
                    fieldNameValue = Form.fieldNameValue(f);
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
                // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
                onChange={(e, f) => {
                    // @ts-expect-error TS(2345) FIXME: Argument of type 'InputOnChangeData' is not assign... Remove this comment to see the full error message
                    fieldNameValue = Form.fieldNameValue(f);
                }}
            />
        );

        wrapper.find('input').simulate('change', { target: { value: '50' } });
        expect(fieldNameValue).toEqual({ count: 50 });

        wrapper.find('input').simulate('change', { target: { value: '3.14' } });
        expect(fieldNameValue).toEqual({ count: 3.14 });
    });

    it('provides Form.fieldNameValue function handling field without name set', () => {
        // @ts-expect-error TS(6133) FIXME: 'e' is declared but its value is never read.
        const wrapper = mount(<Form.Input onChange={(e, f) => Form.fieldNameValue(f)} />);

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
