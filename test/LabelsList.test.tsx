import { mount } from 'enzyme';
import React from 'react';
import LabelsList from '../src/components/cloudify/LabelsList';

describe('<LabelsList />', () => {
    const onChange = jest.fn();
    const labels = [
        { key: 'key1', value: 'inSystem', isInSystem: true },
        { key: 'key2', value: 'notInSystem', isInSystem: false }
    ];
    const wrapper = mount(<LabelsList labels={labels} onChange={onChange} />);

    test('renders properly', () => {
        expect(wrapper.find('.label:not(.blue)').contains(labels[0].key)).toBeTruthy();
        expect(wrapper.find('.label.blue').contains(labels[1].key)).toBeTruthy();
    });

    test('handle delete icon click', () => {
        wrapper.find('.label:not(.blue) .delete').simulate('click');
        expect(onChange).toHaveBeenCalledWith([labels[1]]);
    });
});
