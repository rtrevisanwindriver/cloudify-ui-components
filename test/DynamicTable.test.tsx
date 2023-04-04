import React from 'react';
import { mount } from 'enzyme';
import { DynamicTable } from 'components';

describe('<DynamicTable />', () => {
    it('renders', () => {
        const columns = [
            { id: 'first', label: 'First column' },
            { id: 'second', label: 'Second column' }
        ];
        const value = [{ first: 'First row' }, { first: 'Second row' }];
        const onChange = jest.fn();

        const wrapper = mount(<DynamicTable name="" value={value} onChange={onChange} columns={columns} />);

        expect(wrapper.text()).toContain(columns[0].label);
        expect(wrapper.text()).toContain(columns[1].label);
        expect(wrapper.find('input[name="first"]').get(0).props.value).toEqual(value[0].first);
        expect(wrapper.find('input[name="first"]').get(1).props.value).toEqual(value[1].first);

        wrapper.find('.add').simulate('click');
        expect(onChange).toHaveBeenCalled();
    });
});
