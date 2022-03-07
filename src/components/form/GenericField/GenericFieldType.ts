enum GenericFieldType {
    /**
     * alphanumeric input field
     */
    STRING = 'string',

    /**
     * password input field
     */
    PASSWORD = 'password',

    /**
     * numeric input field
     */
    NUMBER = 'number',

    /**
     * two-state input field
     */
    BOOLEAN = 'boolean',

    /**
     * boolean with no default
     */
    BOOLEAN_LIST = 'booleanList',

    /**
     * dropdown alphanumeric list field
     */
    LIST = 'list',

    /**
     * dropdown numeric list field
     */
    NUMBER_LIST = 'numberList',

    /**
     * dropdown multiselection list
     */
    MULTI_SELECT_LIST = 'multiSelectList',

    /**
     * dropdown editable list
     */
    EDITABLE_LIST = 'editableList',

    /**
     * dropdown editable numeric list
     */
    NUMBER_EDITABLE_LIST = 'numberEditableList',

    /**
     * custom input field
     */
    CUSTOM = 'custom'
}

export default GenericFieldType;
