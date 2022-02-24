enum GenericFieldEnum {
    /**
     * alphanumeric input field
     */
    STRING_TYPE = 'string',

    /**
     * password input field
     */
    PASSWORD_TYPE = 'password',

    /**
     * numeric input field
     */
    NUMBER_TYPE = 'number',

    /**
     * two-state input field
     */
    BOOLEAN_TYPE = 'boolean',

    /**
     * boolean with no default
     */
    BOOLEAN_LIST_TYPE = 'booleanList',

    /**
     * dropdown alphanumeric list field
     */
    LIST_TYPE = 'list',

    /**
     * dropdown numeric list field
     */
    NUMBER_LIST_TYPE = 'numberList',

    /**
     * dropdown multiselection list
     */
    MULTI_SELECT_LIST_TYPE = 'multiSelectList',

    /**
     * dropdown editable list
     */
    EDITABLE_LIST_TYPE = 'editableList',

    /**
     * dropdown editable numeric list
     */
    NUMBER_EDITABLE_LIST_TYPE = 'numberEditableList',

    /**
     * custom input field
     */
    CUSTOM_TYPE = 'custom'
}

export default GenericFieldEnum;
