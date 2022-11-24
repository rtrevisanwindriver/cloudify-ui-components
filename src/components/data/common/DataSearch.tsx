import React from 'react';
import { Form } from 'semantic-ui-react';

interface DataSearchProps {
    /**
     * string value of the input search field
     */
    search: string;

    /**
     * function called on search input value change
     */
    onSearch: (value: string) => void;

    /**
     * if set, then search input will be in loading state
     */
    searching?: boolean;
}

export default function DataSearch({ onSearch, search, searching = false }: DataSearchProps) {
    return (
        <Form.Field>
            <Form.Input
                icon="search"
                placeholder="Search..."
                value={search}
                onChange={e => onSearch(e.target.value)}
                loading={searching}
            />
        </Form.Field>
    );
}
