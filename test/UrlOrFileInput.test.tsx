import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import UrlOrFileInput from '../src/components/form/UrlOrFileInput';

describe('<UrlOrFileInput />', () => {
    it('selects a file and resets its state on reset button click', () => {
        // @ts-expect-error TS(7034) FIXME: Variable 'wrapper' implicitly has type 'any' in so... Remove this comment to see the full error message
        let wrapper;
        act(() => {
            // @ts-expect-error TS(2741) FIXME: Property 'onBlurUrl' is missing in type '{ onChang... Remove this comment to see the full error message
            wrapper = mount(<UrlOrFileInput onChangeUrl={_.noop} onChangeFile={_.noop} placeholder="" name="test" />);
        });

        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        expect(wrapper.find('.label').text()).toEqual('URL');

        const name = 'test';
        // @ts-expect-error TS(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
        act(() => wrapper.find('FileInput').prop('onChange')({ name }));

        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        expect(wrapper.find('.label').text()).toEqual('File');
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        expect(wrapper.find('input[type="text"]').instance().value).toEqual(name);

        act(() => {
            // @ts-expect-error TS(7005) FIXME: Variable 'wrapper' implicitly has an 'any' type.
            wrapper.find('Button').last().props().onClick({ preventDefault: _.noop });
        });

        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        expect(wrapper.find('.label').text()).toEqual('URL');
        // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
        expect(wrapper.find('input[type="text"]').instance().value).toEqual('');
    });
});
