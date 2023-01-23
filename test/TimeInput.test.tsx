import type { SyntheticEvent } from 'react';
import React from 'react';
import { mount } from 'enzyme';
import type { TimeInputProps } from 'components';
import { TimeInput } from 'components';

const mountedInputName = 'time';
type OnChange = TimeInputProps['onChange'];
type OnChangeType = SyntheticEvent<HTMLElement, Event>;

describe('<TimeInput />', () => {
    it('renders', () => {
        const wrapper = mount(<TimeInput name={mountedInputName} value="00:00" onChange={() => {}} />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('allows changing hours', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<TimeInput name={mountedInputName} value="00:00" onChange={onChangeMock} />);

        const onChange = wrapper
            .find('Dropdown')
            .filterWhere(dropdown => dropdown.prop('name') === 'hours')
            .prop('onChange') as OnChange;

        onChange({} as OnChangeType, { name: mountedInputName, value: '15' });

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'time',
            value: '15:00'
        });
    });

    it('allows changing minutes', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<TimeInput name="time" value="00:00" onChange={onChangeMock} />);

        const onChange = wrapper
            .find('Dropdown')
            .filterWhere(dropdown => dropdown.prop('name') === 'minutes')
            .prop('onChange') as OnChange;

        onChange({} as OnChangeType, { name: mountedInputName, value: '15' });

        expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object), {
            name: 'time',
            value: '00:15'
        });
    });
});
