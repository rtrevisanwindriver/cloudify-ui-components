import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';

import { Button } from 'semantic-ui-react';
import DataSegment from '../src/components/data/DataSegment';

describe('<DataSegment />', () => {
    const selectItemMock = jest.fn();
    const content = [{ k: 1 }, { k: 2 }, { k: 3, s: true }, { k: 4 }, { k: 5 }].map(item => {
        return (
            // @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message
            <DataSegment.Item key={item.k} selected={item.s} onClick={item.s ? selectItemMock : null}>
                <div>Data {item.k}</div>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Item' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
            </DataSegment.Item>
        );
    });

    it('renders', () => {
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; pageSize: number; sor... Remove this comment to see the full error message
            <DataSegment pageSize={25} sortColumn="col1" sortAscending={false}>
                {content}
            </DataSegment>
        );
        expect(wrapper.exists()).toEqual(true);
    });

    it('renders data segments', () => {
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; pageSize: number; sor... Remove this comment to see the full error message
            <DataSegment pageSize={25} sortColumn="col1" sortAscending={false}>
                {content}
            </DataSegment>
        );
        wrapper.setProps({ totalSize: 5 });

        expect(wrapper.find('.segmentList .segment').length).toEqual(5);
    });

    it('allows selecting segment', () => {
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; pageSize: number; sor... Remove this comment to see the full error message
            <DataSegment pageSize={25} sortColumn="col1" sortAscending={false}>
                {content}
            </DataSegment>
        );

        expect(wrapper.find('.segmentList .secondary.segment').length).toEqual(1);
        expect(wrapper.find('.segmentList .secondary.segment').childAt(0).text()).toEqual('Data 3');
    });

    it('allows to handle segment click', () => {
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; pageSize: number; sor... Remove this comment to see the full error message
            <DataSegment pageSize={25} sortColumn="col1" sortAscending={false}>
                {content}
            </DataSegment>
        );
        wrapper.find('.segmentList .secondary.segment').simulate('click');

        expect(selectItemMock).toHaveBeenCalledTimes(1);
    });

    it('allows to handle data fetching', () => {
        const fetchDataMock = jest.fn();
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; fetchData: Mock<any, ... Remove this comment to see the full error message
            <DataSegment fetchData={fetchDataMock} pageSize={25} sortColumn="col1" sortAscending={false}>
                {content}
            </DataSegment>
        );

        wrapper.setProps({ pageSize: 5 });

        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith({
            gridParams: { _search: '', currentPage: 1, pageSize: 5 }
        });
    });

    it('renders search filter', () => {
        const fetchDataMock = jest.fn();
        // @ts-expect-error TS(2345) FIXME: Argument of type '(f: (...args: any) => any) => (.... Remove this comment to see the full error message
        const debounceSpy = jest.spyOn(_, 'debounce').mockImplementation(f => f);

        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; fetchData: Mock<any, ... Remove this comment to see the full error message
            <DataSegment fetchData={fetchDataMock} pageSize={25} sortColumn="col1" sortAscending={false} searchable>
                {content}
            </DataSegment>
        );

        wrapper.find('input[placeholder="Search..."]').simulate('change', { target: { value: 'test' } });
        expect(wrapper.state()).toEqual({ searchText: 'test', searching: true });

        expect(fetchDataMock).toHaveBeenCalledTimes(1);
        expect(fetchDataMock).toHaveBeenCalledWith({
            gridParams: { _search: 'test', currentPage: 1, pageSize: 25 }
        });

        debounceSpy.mockRestore();
    });

    it('renders action items', () => {
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: (Element | Element[])[]; totalSi... Remove this comment to see the full error message
            <DataSegment totalSize={0} pageSize={25} sortColumn="col1" sortAscending={false} searchable>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message */}
                <DataSegment.Action>
                    <Button icon="rocket" />
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message */}
                </DataSegment.Action>
                {content}
            </DataSegment>
        );

        expect(wrapper.find('.segmentList .actionField button').length).toEqual(1);
    });

    it('renders no data message if empty', () => {
        const wrapper = mount(
            // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; totalSize: number; pa... Remove this comment to see the full error message
            <DataSegment totalSize={0} pageSize={25} sortColumn="col1" sortAscending={false} searchable>
                {content}
            </DataSegment>
        );

        expect(wrapper.find('.segmentList .icon.message').length).toEqual(1);
        expect(wrapper.find('.segmentList .icon.message').text()).toEqual('No data available');
        expect(wrapper.find('.segmentList .gridPagination').exists()).toEqual(false);
    });
});
