import React from 'react';
import { mount } from 'enzyme';
import Confirm from '../src/components/modal/Confirm';

describe('<Confirm />', () => {
    global.requestAnimationFrame = () => 0;
    global.cancelAnimationFrame = () => {};

    it('renders', () => {
        const wrapper = mount(<Confirm content="test title" open={false} />);
        expect(wrapper.exists()).toEqual(true);
    });

    it('shows up', () => {
        const wrapper = mount(<Confirm content="test title" open={false} />);
        expect(wrapper.exists('.modal.active')).toEqual(false);
        wrapper.setProps({ open: true });
        expect(wrapper.exists('.modal.active')).toEqual(true);
        expect(wrapper.find('.modal .content').text()).toEqual('test title');
    });

    it('clicks ok button', () => {
        const wrapper = mount(<Confirm content="test title" open />);
        const confirmCallback = jest.fn();
        wrapper.setProps({ onConfirm: confirmCallback, onCancel: () => {} });
        wrapper.find('.modal .actions .ui.button.primary').simulate('click');
        expect(confirmCallback).toHaveBeenCalled();
    });

    it('clicks cancel button', () => {
        const wrapper = mount(<Confirm content="test title" open />);
        const cancelCallback = jest.fn();
        wrapper.setProps({ onCancel: cancelCallback, onConfirm: () => {} });
        wrapper.find('.modal .actions .ui.button').first().simulate('click');
        expect(cancelCallback).toHaveBeenCalled();
    });

    it('unmounts', () => {
        const wrapper = mount(<Confirm content="test title" open />);
        wrapper.unmount();
        expect(wrapper.exists('.ui.dimmer .modal')).toEqual(false);
    });
});
