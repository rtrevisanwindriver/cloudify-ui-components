import React from 'react';
import _ from 'lodash';
import { Button, Input, Segment } from 'semantic-ui-react';

import LiveEditDecorator from 'decorators/LiveEditDecorator';

import DataTable from './DataTable';

const logs = {
    items: [
        {
            id: 68,
            blueprint_id: 'hello-world',
            deployment_id: 'hello-world-openstack'
        },
        {
            id: 62,
            blueprint_id: 'hello-world',
            deployment_id: 'hello-world-azure'
        },
        {
            id: 8,
            blueprint_id: 'nodecellar',
            deployment_id: 'nodecellar-gcp'
        },
        {
            id: 55,
            blueprint_id: 'nodecellar',
            deployment_id: 'nodecellar-aws'
        },
        {
            id: 14,
            blueprint_id: 'nodecellar',
            deployment_id: 'nodecellar-local'
        }
    ],
    metadata: {
        pagination: {
            total: 10,
            offset: 0,
            size: 5
        }
    }
};

export default {
    title: 'Data/DataTable',
    component: DataTable,
    decorators: [LiveEditDecorator({ Button, Input, Segment, DataTable, logs })]
};

export const pagination = () => {
    const [pageSize, setPageSize] = React.useState(5);

    return (
        <DataTable
            // @ts-expect-error TS(2322) FIXME: Type '{ children: (Element | Element[])[]; fetchDa... Remove this comment to see the full error message
            fetchData={({ gridParams: { pageSize: ps } }) => setPageSize(ps)}
            totalSize={logs.metadata.pagination.total}
            pageSize={pageSize}
        >
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="ID" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Blueprint" name="blueprint_id" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Deployment" name="deployment_id" />
            {logs.items.map(item => (
                // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
                <DataTable.Row key={item.id}>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>{item.id}</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>{item.deployment_id}</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
                </DataTable.Row>
            ))}
        </DataTable>
    );
};

export const selectable = () => {
    const [selected, setSelected] = React.useState(logs.items[0].id);
    return (
        // @ts-expect-error TS(2322) FIXME: Type '{ children: (Element | Element[])[]; totalSi... Remove this comment to see the full error message
        <DataTable totalSize={logs.metadata.pagination.total} pageSize={logs.metadata.pagination.size}>
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="ID" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Blueprint" name="blueprint_id" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Deployment" name="deployment_id" />
            {logs.items.map(item => (
                // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
                <DataTable.Row key={item.id} selected={selected === item.id} onClick={() => setSelected(item.id)}>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>{item.id}</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>{item.deployment_id}</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
                </DataTable.Row>
            ))}
        </DataTable>
    );
};

export const searchFilter = () => (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: (Element | Element[])[]; totalSi... Remove this comment to see the full error message
    <DataTable totalSize={logs.metadata.pagination.total} pageSize={logs.metadata.pagination.size} searchable>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="ID" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
            <DataTable.Row key={item.id}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>
        ))}
    </DataTable>
);

export const actionButtons = () => (
    <DataTable>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Action>
            <Button color="green" content="Deploy" icon="rocket" />
            <Button color="red" content="Remove" icon="remove" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Action' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        </DataTable.Action>

        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="ID" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
            <DataTable.Row key={item.id}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>
        ))}
    </DataTable>
);

export const filterInputs = () => (
    <DataTable>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Filter' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Filter>
            <Input placeholder="Blueprint" />
            <Input placeholder="Deployment" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Filter' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        </DataTable.Filter>

        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="ID" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
            <DataTable.Row key={item.id}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>
        ))}
    </DataTable>
);
export const rowSpanAndStyle = () => {
    const grouped = _(logs.items)
        .groupBy('blueprint_id')
        .map((items, blueprintId) => ({ blueprintId, items }))
        .value();

    return (
        <DataTable>
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="ID" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Blueprint" name="blueprint_id" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Deployment" name="deployment_id" />
            {_.map(grouped, ({ items, blueprintId }) =>
                _.map(items, ({ id, deployment_id: deploymentId }, index) => (
                    // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
                    <DataTable.Row key={id}>
                        {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                        <DataTable.Data style={{ fontWeight: 'bold' }}>{id}</DataTable.Data>
                        {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                        {index === 0 && <DataTable.Data rowSpan={items.length}>{blueprintId}</DataTable.Data>}
                        {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                        <DataTable.Data>{deploymentId}</DataTable.Data>
                        {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
                    </DataTable.Row>
                ))
            )}
        </DataTable>
    );
};

export const colSpan = () => (
    <DataTable>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="ID" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Blueprint" name="blueprint_id" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Deployment" name="deployment_id" />
        {logs.items.flatMap(item => [
            // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
            <DataTable.Row key={item.id}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>,
            // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
            <DataTable.Row key={`${item.id}-additional`}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data colSpan={3}>This row spans all columns</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>
        ])}
    </DataTable>
);

export const columnTooltips = () => (
    <DataTable>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="ID" tooltip="The ID of the deployment" />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column
            label="Blueprint"
            name="blueprint_id"
            tooltip={
                <>
                    The name of the <strong>blueprint</strong>
                </>
            }
        />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column
            label="Deployment"
            name="deployment_id"
            tooltip={
                <>
                    The name of the <strong>deployment</strong>
                </>
            }
        />
        {logs.items.map(item => (
            // @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message
            <DataTable.Row key={item.id}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.blueprint_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>{item.deployment_id}</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>
        ))}
    </DataTable>
);

export const expandableRow = () => {
    const [selected, setSelected] = React.useState('prestashop');

    return (
        <DataTable>
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Name" name="id" width="40%" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Date" name="date" width="30%" />
            {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
            <DataTable.Column label="Description" width="30%" />

            {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            <DataTable.Row key="drupal" selected={selected === 'drupal'} onClick={() => setSelected('drupal')}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>Drupal application</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>2016-03-04</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>description for portal</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>

            {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            <DataTable.Row key="wordpress" selected={selected === 'wordpress'} onClick={() => setSelected('wordpress')}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>Wordpress blog</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>2016-01-05</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>description for blog</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>

            {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            <DataTable.Row key="joomla" selected={selected === 'joomla'} onClick={() => setSelected('joomla')}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>Joomla website</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>2015-08-14</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                <DataTable.Data>description for website</DataTable.Data>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
            </DataTable.Row>

            {/* @ts-expect-error TS(2339) FIXME: Property 'RowExpandable' does not exist on type 't... Remove this comment to see the full error message */}
            <DataTable.RowExpandable expanded={selected === 'prestashop'}>
                {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
                <DataTable.Row
                    key="prestashop"
                    selected={selected === 'prestashop'}
                    onClick={() => setSelected('prestashop')}
                >
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>Prestashop store</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>2017-01-05</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Data' does not exist on type 'typeof Dat... Remove this comment to see the full error message */}
                    <DataTable.Data>description for e-commerce solution</DataTable.Data>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'Row' does not exist on type 'typeof Data... Remove this comment to see the full error message */}
                </DataTable.Row>
                {/* @ts-expect-error TS(2339) FIXME: Property 'DataExpandable' does not exist on type '... Remove this comment to see the full error message */}
                <DataTable.DataExpandable key="prestashop">
                    <Segment>Additional info when row becomes expanded</Segment>
                    {/* @ts-expect-error TS(2339) FIXME: Property 'DataExpandable' does not exist on type '... Remove this comment to see the full error message */}
                </DataTable.DataExpandable>
                {/* @ts-expect-error TS(2339) FIXME: Property 'RowExpandable' does not exist on type 't... Remove this comment to see the full error message */}
            </DataTable.RowExpandable>
        </DataTable>
    );
};

export const empty = () => (
    // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; totalSize: number; }'... Remove this comment to see the full error message
    <DataTable totalSize={0}>
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Name" name="id" width="40%" centerAligned />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Date" name="date" width="30%" centerAligned />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Description" width="30%" centerAligned />
    </DataTable>
);

export const emptyWithCustomMessage = () => (
    <DataTable
        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; totalSize: number; no... Remove this comment to see the full error message
        totalSize={0}
        noDataMessage={
            <div style={{ margin: '2rem' }}>
                <p>No Results found.</p>
                <p>Try changing the filter or the search phrase.</p>
            </div>
        }
    >
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Name" name="id" width="40%" centerAligned />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Date" name="date" width="30%" centerAligned />
        {/* @ts-expect-error TS(2339) FIXME: Property 'Column' does not exist on type 'typeof D... Remove this comment to see the full error message */}
        <DataTable.Column label="Description" width="30%" centerAligned />
    </DataTable>
);
emptyWithCustomMessage.storyName = 'Empty with a custom message';
