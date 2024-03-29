import { createContext } from 'react';

const DataTableContext = createContext({
    sortColumn: '',
    sortAscending: true,
    /**
     * @type {((name: string) => void)}
     */
    setSortColumn: (_name: string): void => {
        throw new Error('setSortColumn not implemented');
    }
});

export default DataTableContext;
