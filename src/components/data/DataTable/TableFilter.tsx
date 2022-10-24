import { Form } from 'semantic-ui-react';

/**
 * Defines filter bar including filter fields which are displayed above the table.
 *
 * All props are passed to the underlaying `Form.Field` component.
 *
 * ```
 *  <DataTable>
 *
 *      ...
 *
 *      <DataTable.Filter>
 *          <Input placeholder="Package name"/>
 *          <Input placeholder="Distribution"/>
 *      </DataTable.Filter>
 *
 *      <DataTable.Action>
 *          <Button content='Upload' icon='add' labelPosition='left' />
 *      </DataTable.Action>
 *
 *  </DataTable>
 * ```
 */

export default Form.Field;
