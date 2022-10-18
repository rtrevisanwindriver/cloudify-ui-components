import React from 'react';
import type { ChangeEvent } from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import type { InputProps } from 'semantic-ui-react';
import DateRangeInput from 'components/form/DateRangeInput';
import type { DatePickerProps } from 'components/form/DatePicker/DatePicker';

const mountedInputName = 'date';
type InputOnChange = InputProps['onChange'];
type DatePickerOnChange = DatePickerProps['onChange'];
type OnChangeEvent = ChangeEvent<HTMLInputElement>;

describe('<DateRangeInput />', () => {
    let dateNowSpy: jest.SpyInstance<number, []>;

    beforeAll(() => {
        dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(2019, 10, 1).valueOf()); // 2019-11-01 00:00
    });

    afterAll(() => {
        dateNowSpy.mockRestore();
    });

    it('renders', () => {
        const wrapper = mount(
            <DateRangeInput
                name={mountedInputName}
                value={{ range: 'Custom', start: '2019-01-01 00:00', end: '2019-02-01 00:00' }}
            />
        );
        expect(wrapper.exists()).toEqual(true);
    });

    it('handles date change from start/end date pickers', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount<DateRangeInput>(<DateRangeInput name={mountedInputName} onChange={onChangeMock} />);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        const simulateStartDateInputChange = wrapper
            .find('DatePicker')
            .filterWhere(datePicker => datePicker.props().name === 'startDate')
            .prop('onChange') as DatePickerOnChange;

        simulateStartDateInputChange?.({} as OnChangeEvent, {
            name: 'startDate',
            value: moment('2019-11-15 00:00')
        }); // 15th Nov

        expect(onChangeMock).not.toHaveBeenCalled();
        expect(wrapper.state().start).toEqual('2019-11-15 00:00');
        expect(wrapper.state().dirty).toEqual(true);

        const simulaEndDateInputChange = wrapper
            .find('DatePicker')
            .filterWhere(datePicker => datePicker.props().name === 'endDate')
            .prop('onChange') as DatePickerOnChange;
        simulaEndDateInputChange?.({} as OnChangeEvent, {
            name: 'endDate',
            value: moment('2019-11-20 00:00')
        }); // 20th Nov

        expect(onChangeMock).not.toHaveBeenCalled();
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
                start: moment().subtract(4, 'hours').format(DateRangeInput.DATETIME_FORMAT),
                end: ''
            }
        };
        const onChangeMock = jest.fn();
        const wrapper = mount(<DateRangeInput name={mountedInputName} ranges={ranges} onChange={onChangeMock} />);

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
                start: moment().subtract(4, 'hours').format(DateRangeInput.DATETIME_FORMAT),
                end: ''
            }
        };
        const value = { range: rangeName, start: ranges[rangeName].start, end: ranges[rangeName].end };
        const onChangeMock = jest.fn();
        const wrapper = mount<DateRangeInput>(
            <DateRangeInput name={mountedInputName} ranges={ranges} value={value} onChange={onChangeMock} />
        );

        expect(wrapper.state().start).toEqual('2019-10-31 20:00');
        expect(wrapper.state().end).toEqual('');
        expect(wrapper.state().range).toEqual(rangeName);

        wrapper.find('input').simulate('focus');
        wrapper.find('button[name="Custom Range"]').simulate('click');

        expect(wrapper.state().start).toEqual('2019-10-31 20:00');
        expect(wrapper.state().end).toEqual('2019-11-01 00:00');
        expect(wrapper.state().range).toEqual('Custom Range');
    });

    it('handles date change from date input fields', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount<DateRangeInput>(<DateRangeInput name={mountedInputName} onChange={onChangeMock} />);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        const simulateStartInputChange = wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'start')
            .prop('onChange') as InputOnChange;
        simulateStartInputChange?.({} as OnChangeEvent, { name: 'start', value: '2019-11-15 00:00' }); // 15th Nov
        expect(onChangeMock).not.toHaveBeenCalled();
        expect(wrapper.state().start).toEqual('2019-11-15 00:00');
        expect(wrapper.state().dirty).toEqual(true);

        const simulateEndInputChange = wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'end')
            .prop('onChange') as InputOnChange;
        simulateEndInputChange?.({} as OnChangeEvent, { name: 'end', value: '2019-11-20 00:00' }); // 20th Nov

        expect(onChangeMock).not.toHaveBeenCalled();
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
        const wrapper = mount<DateRangeInput>(<DateRangeInput name={mountedInputName} defaultValue={defaultValue} />);

        expect(wrapper.state().start).toEqual('');
        expect(wrapper.state().end).toEqual('');
        expect(wrapper.state().range).toEqual('');
        expect(wrapper.state().dirty).toEqual(true);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        wrapper
            .find('Button')
            .filterWhere(button => button.props().content === 'Reset')
            .first()
            .simulate('click');
        expect(wrapper.state().start).toEqual('2019-01-01 01:10');
        expect(wrapper.state().end).toEqual('2019-02-02 02:20');
        expect(wrapper.state().range).toEqual('Default Custom Range');
        expect(wrapper.state().dirty).toEqual(false);
    });

    it('handles cancel button', () => {
        const onCancelMock = jest.fn();
        const wrapper = mount<DateRangeInput>(<DateRangeInput name={mountedInputName} onCancel={onCancelMock} />);

        expect(wrapper.state().start).toEqual('');
        expect(wrapper.state().end).toEqual('');
        expect(wrapper.state().range).toEqual('');
        expect(wrapper.state().dirty).toEqual(false);

        wrapper.find('input').simulate('focus');
        expect(wrapper.find('Popup').first().prop('open')).toEqual(true);

        const simulateStartInputChange = wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'start')
            .prop('onChange') as InputOnChange;
        simulateStartInputChange?.({} as OnChangeEvent, { name: 'start', value: '2019-11-15 00:00' }); // 15th Nov
        expect(wrapper.state().start).toEqual('2019-11-15 00:00');
        expect(wrapper.state().dirty).toEqual(true);

        const simulateEndInputChange = wrapper
            .find('Input')
            .filterWhere(input => input.props().name === 'end')
            .prop('onChange') as InputOnChange;
        simulateEndInputChange?.({} as OnChangeEvent, { name: 'end', value: '2019-11-20 00:00' }); // 20th Nov

        expect(wrapper.state().end).toEqual('2019-11-20 00:00');

        wrapper
            .find('Button')
            .filterWhere(button => button.props().content === 'Cancel')
            .first()
            .simulate('click');

        expect(wrapper.state().start).toEqual('');
        expect(wrapper.state().end).toEqual('');
        expect(wrapper.state().range).toEqual('');
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
