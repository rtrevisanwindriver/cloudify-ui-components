import React from 'react';
import type { FunctionComponent } from 'react';
import { Header } from 'semantic-ui-react';
import type { HeaderProps } from 'semantic-ui-react';

/**
 * `Form.Divider` is a component to divide form fields in Form component, to create sections.
 *
 * It creates a header (see [Header](https://react.semantic-ui.com/elements/header)) component with horizontal line below.
 * You can pass any prop allowed by Header component.
 *
 * Accessible as `Form.Divider`.
 */
const FormDivider: FunctionComponent<HeaderProps> = props => <Header as="h4" dividing {...props} />;

export default FormDivider;
