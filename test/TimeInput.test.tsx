import React from 'react';
import { mount } from 'enzyme';
import TimeInput from '../src/components/form/TimeInput';

describe('<TimeInput />', () => {
    it('renders', () => {
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={() => {}} />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows changing hours', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={onChangeMock} />);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('Dropdown')
            .filterWhere(dropdown => dropdown.prop('name') === 'hours')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { value: '15' });

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'time',
            value: '15:00'
        });
    });

    it('allows changing minutes', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={onChangeMock} />);

        // @ts-expect-error TS(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        wrapper
            .find('Dropdown')
            .filterWhere(dropdown => dropdown.prop('name') === 'minutes')
            // @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 2.
            .prop('onChange')({}, { value: '15' });

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'time',
            value: '00:15'
        });
    });
});
