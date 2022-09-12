import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import DateRangeInput from '../src/components/form/DateRangeInput';

describe('<DateRangeInput />', () => {
    // @ts-expect-error TS(7034) FIXME: Variable 'dateNowSpy' implicitly has type 'any' in... Remove this comment to see the full error message
    let dateNowSpy;

    beforeAll(() => {
        dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2019, 10, 1).valueOf()); // 2019-11-01 00:00
    });

    afterAll(() => {
        // @ts-expect-error TS(7005) FIXME: Variable 'dateNowSpy' implicitly has an 'any' type... Remove this comment to see the full error message
        dateNowSpy.mockRestore();
    });

    it('renders', () => {
        const wrapper = mount(
            <DateRangeInput
                // @ts-expect-error TS(2322) FIXME: Type '{ name: string; value: { range: string; star... Remove this comment to see the full error message
                name="date"
                value={{ range: 'Custom', start: '2019-01-01 00:00', end: '2019-02-01 00:00' }}
            />
        );
        expect(wrapper.exists()).toEqual(true);
    });

    it('handles date change from start/end date pickers', () => {
        const onChangeMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; onChange: Mock<any, any>; }'... Remove this comment to see the full error message
        const wrapper = mount(<DateRangeInput name="date" onChange={onChangeMock} />);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('DatePicker')
            .filterWhere(datePicker => datePicker.props().name === 'startDate')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { name: 'startDate', value: moment('2019-11-15 00:00') }); // 15th Nov
        expect(onChangeMock).not.toHaveBeenCalled();
        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('2019-11-15 00:00');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(true);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('DatePicker')
            .filterWhere(datePicker => datePicker.props().name === 'endDate')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { name: 'endDate', value: moment('2019-11-20 00:00') }); // 20th Nov
        expect(onChangeMock).not.toHaveBeenCalled();
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('2019-11-20 00:00');

        wrapper.find('button.ok').first().simulate('click'); // Apply button
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'date',
            value: {
                range: 'Custom Range',
                start: '2019-11-15 00:00',
                end: '2019-11-20 00:00'
            }
        });
    });

    it('handles date change from predefined range buttons', () => {
        const ranges = {
            'Last 4 Hours': {
                // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
                start: moment().subtract(4, 'hours').format(DateRangeInput.DATETIME_FORMAT),
                end: ''
            }
        };
        const onChangeMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; ranges: { 'Last 4 Hours': { ... Remove this comment to see the full error message
        const wrapper = mount(<DateRangeInput name="date" ranges={ranges} onChange={onChangeMock} />);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        wrapper.find('button[name="Last 4 Hours"]').simulate('click');
        wrapper.find('button.ok').first().simulate('click'); // Apply button

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'date',
            value: {
                range: 'Last 4 Hours',
                start: '2019-10-31 20:00',
                end: ''
            }
        });
    });

    it('handles custom range button', () => {
        const rangeName = 'Last 4 Hours';
        const ranges = {
            [rangeName]: {
                // @ts-expect-error TS(2339) FIXME: Property 'DATETIME_FORMAT' does not exist on type ... Remove this comment to see the full error message
                start: moment().subtract(4, 'hours').format(DateRangeInput.DATETIME_FORMAT),
                end: ''
            }
        };
        const value = { range: rangeName, start: ranges[rangeName].start, end: ranges[rangeName].end };
        const onChangeMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; ranges: { "Last 4 Hours": { ... Remove this comment to see the full error message
        const wrapper = mount(<DateRangeInput name="date" ranges={ranges} value={value} onChange={onChangeMock} />);

        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('2019-10-31 20:00');
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().range).toEqual(rangeName);

        wrapper.find('input').simulate('focus');
        wrapper.find('button[name="Custom Range"]').simulate('click');

        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('2019-10-31 20:00');
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('2019-11-01 00:00');
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().range).toEqual('Custom Range');
    });

    it('handles date change from date input fields', () => {
        const onChangeMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; onChange: Mock<any, any>; }'... Remove this comment to see the full error message
        const wrapper = mount(<DateRangeInput name="date" onChange={onChangeMock} />);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'start')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { name: 'start', value: '2019-11-15 00:00' }); // 15th Nov
        expect(onChangeMock).not.toHaveBeenCalled();
        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('2019-11-15 00:00');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(true);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'end')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { name: 'end', value: '2019-11-20 00:00' }); // 20th Nov
        expect(onChangeMock).not.toHaveBeenCalled();
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('2019-11-20 00:00');

        wrapper.find('button.ok').first().simulate('click'); // Apply button
        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'date',
            value: {
                range: 'Custom Range',
                start: '2019-11-15 00:00',
                end: '2019-11-20 00:00'
            }
        });
    });

    it('handles resetting date to default value', () => {
        const defaultValue = { range: 'Default Custom Range', start: '2019-01-01 01:10', end: '2019-02-02 02:20' };
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; defaultValue: { range: strin... Remove this comment to see the full error message
        const wrapper = mount(<DateRangeInput name="date" defaultValue={defaultValue} />);

        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().range).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(true);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        wrapper
            .find('Button')
            .filterWhere(button => button.props().content === 'Reset')
            .first()
            .simulate('click');
        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('2019-01-01 01:10');
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('2019-02-02 02:20');
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().range).toEqual('Default Custom Range');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(false);
    });

    it('handles cancel button', () => {
        const onCancelMock = jest.fn();
        // @ts-expect-error TS(2322) FIXME: Type '{ name: string; onCancel: Mock<any, any>; }'... Remove this comment to see the full error message
        const wrapper = mount(<DateRangeInput name="date" onCancel={onCancelMock} />);

        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().range).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(false);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'start')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { name: 'start', value: '2019-11-15 00:00' }); // 15th Nov
        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('2019-11-15 00:00');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(true);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'end')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { name: 'end', value: '2019-11-20 00:00' }); // 20th Nov
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('2019-11-20 00:00');

        wrapper
            .find('Button')
            .filterWhere(button => button.props().content === 'Cancel')
            .first()
            .simulate('click');

        // @ts-expect-error TS(2339) FIXME: Property 'start' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().start).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'end' does not exist on type 'Readonly<{}... Remove this comment to see the full error message
        expect(wrapper.state().end).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().range).toEqual('');
        // @ts-expect-error TS(2339) FIXME: Property 'dirty' does not exist on type 'Readonly<... Remove this comment to see the full error message
        expect(wrapper.state().dirty).toEqual(false);
        expect(onCancelMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'date',
            value: {
                range: '',
                start: '',
                end: ''
            }
        });
    });
});
