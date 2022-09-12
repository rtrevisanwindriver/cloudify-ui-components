import React from 'react';
import { mount } from 'enzyme';
import JsonInput from '../src/components/form/JsonInput';

describe('<JsonInput />', () => {
    it('renders', () => {
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; }' is not assignable to type... Remove this comment to see the full error message
        const wrapper = mount(<JsonInput name="json" />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows editing in raw view', () => {
        const onChangeMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; onChange: Moc... Remove this comment to see the full error message
        const wrapper = mount(<JsonInput name="json" value="some" onChange={onChangeMock} />);

        expect(wrapper.state()).toEqual({
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        });

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper.find('TextArea').prop('onChange')({}, { name: 'json', value: 'something' });

        expect(wrapper.state()).toEqual({
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        });
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'json',
            value: 'something'
        });
    });

    it('allows editing in JSON view', () => {
        const onChangeMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; onChange: Moc... Remove this comment to see the full error message
        const wrapper = mount(<JsonInput name="json" value="{}" onChange={onChangeMock} />);

        expect(wrapper.state()).toEqual({
            isRawView: false,
            isParsableToJson: true,
            isMouseOver: false
        });

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper.find('ReactJsonViewWrapper').prop('onChange')({ updated_src: { a: 'b' } });

        expect(wrapper.state()).toEqual({
            isRawView: false,
            isParsableToJson: true,
            isMouseOver: false
        });
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'json',
            value: '{"a":"b"}'
        });
    });

    it('allows switching raw/JSON view when value is parsable to JSON', () => {
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; }' is not ass... Remove this comment to see the full error message
        const wrapper = mount(<JsonInput name="json" value="start" />);

        expect(wrapper.state()).toEqual({
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        });

        wrapper.setProps({ value: '{"a":"b"}' });

        wrapper.simulate('mouseenter');
        wrapper
            .find('Icon')
            .filterWhere(icon => icon.prop('name') === 'edit')
            .first()
            .simulate('click');

        expect(wrapper.state()).toEqual({
            isRawView: false,
            isParsableToJson: true,
            isMouseOver: true
        });
    });

    it('disallows switching raw/JSON view when value is not parsable to JSON', () => {
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; }' is not ass... Remove this comment to see the full error message
        const wrapper = mount(<JsonInput name="json" value="start" />);

        expect(wrapper.state()).toEqual({
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: false
        });

        wrapper.setProps({ value: '{"a":invalid json}' });

        wrapper.simulate('mouseenter');
        wrapper
            .find('Icon')
            .filterWhere(icon => icon.prop('name') === 'edit')
            .first()
            .simulate('click');

        expect(wrapper.state()).toEqual({
            isRawView: true,
            isParsableToJson: false,
            isMouseOver: true
        });
    });

    it('shows help for the user about JSON view', () => {
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: string; }' is not ass... Remove this comment to see the full error message
        const wrapper = mount(<JsonInput name="json" value='{"a":"b"}' />);

        wrapper.simulate('mouseenter');
        expect(
            wrapper
                .find('Icon')
                .filterWhere(icon => icon.prop('name') === 'info')
                .exists()
        ).toEqual(true);
    });
});
