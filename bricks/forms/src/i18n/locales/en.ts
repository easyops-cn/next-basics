import { Locale, K } from "../constants";

const locale: Locale = {
  [K.FORMS]: "Forms",
  [K.CMDB_INSTANCE_SELECT_PANEL_ADD_LINK]: "Add",
  [K.CMDB_INSTANCE_SELECT_PANEL_MODAL_TITLE]: "Batch Add ",
  [K.TO]: "To",
  [K.START_TIME_END_TIME_CANNOT_EQUAL]:
    "Start Time and End Time can NOT be equal",
  [K.START_TIME_REQUIRED]: "Start Time is required",
  [K.END_TIME_REQUIRED]: "End Time is required",
  [K.BACKGROUND_SEARCH]: "input keyword to search",
  [K.DRAGGABLE_UPLOAD_TEXT]: "Click or drag image to this area to upload",
  [K.DRAGGABLE_UPLOAD_HINT]: "Supported extensions: .jpg .jpeg .png .gif ...",
  [K.SELECT_ICON]: "Select Icon",
  [K.SET_COLOR]: "Color",
  [K.ICON]: "Icon",
  [K.CLEAR]: "Clear",
  [K.COPY_SUCCESS]: "Copy success",
  [K.USERS]: "Users",
  [K.USER_GROUPS]: "User groups",
  [K.SWITCH]: "Switch to {{type}}",
  [K.FILTER_FROM_CMDB]: "Filter {{type}} from CMDB",
  [K.USERS_RESULT_LABEL]:
    "Users (only display the top 20 items, please search for more results)",
  [K.USER_GROUPS_RESULT_LABEL]:
    "User groups (only display the top 20 items, please search for more results)",
  [K.NO_DATA]: "No Data",
  [K.ATTRIBUTE_DEFAULT_VALUE]: "Attribute default value:",
  [K.CONFIRM]: "Confirm",
  [K.CANCEL]: "Cancel",
  [K.GLOBALLY_UNIQUE_IDENTIFIER]: "Globally unique identifier",
  [K.ATTRIBUTE_NAME]: "Attribute name",
  [K.ATTRIBUTE_ID]: "Attribute id",
  [K.MUST_NEED_ATTRIBUTE_ID]: "Attribute ID is required",
  [K.ATTRIBUTE_ID_LIMIT]:
    "Please enter 1 to 32 characters, only letters, numbers and underscores (cannot begin with numbers)",
  [K.PLEASE_INPUT_ATTRIBUTE_ID]: "Please input attribute id",
  [K.ATTRIBUTE_NAME_LIMIT]: "Attribute name is required",
  [K.VALUE_TYPE]: "Value type",
  [K.PLEASE_SELECT_VALUE_TYPE]: "Please select value type",
  [K.ATTRIBUTE_CATEGROY]: "Attribute categroy",
  [K.PLEASE_INPUT_ATTRIBUTE_CATEGROY]: "Please input attribute categroy",
  [K.REQUIRED]: "Required",
  [K.READONLY]: "Readonly",
  [K.UNIQUE]: "Unique",
  [K.PLEASE_INPUT_ATTRIBUTE_NAME]: "Please input attribute name",
  [K.LIMIT]: "Limit",
  [K.REGULAR]: "Regular expression:",
  [K.FORMAT]: "Format:",
  [K.CLICK_TO_SELECT_DATE]: "date,click to select",
  [K.ENUMERATION_VALUE]: "Enumeration value ",
  [K.ENUM_REGEX_JSON]: "Enumeration value/Regular expression/JSON Schema",
  [K.PLEASE_INPUT_ENUMERATED_VALUE]:
    "Enter the enumerated values, separated by carriage returns",
  [K.FLOAT_LIMIT]: "Up to four digits can be entered after the decimal point",
  [K.THIS_IS_NOT_MANDATORY]: "This is not mandatory",
  [K.DISPLAY_AS]: "Display as:",
  [K.MULTI_LINE_STR]: "Multiline string",
  [K.PASSWORD]: "Password",
  [K.DEFAULT]: "Default",
  [K.STRUCTURE_ITEM_NAME]: "Structure item name",
  [K.STRUCTURE_ITEM_ID]: "Structure item ID",
  [K.TYPE]: "Type",
  [K.HANDEL]: "Handel",
  [K.STRUCTURE_BODY_DEFINATION]: "Structure body definition",
  [K.NEW_DEFINATION]: "New definition",
  [K.ENUM_BODY_DEFINATION]: "Enumeration body definition",
  [K.TREE]: "Tree",
  [K.TREE_ENUM_TOOLTIP]:
    "The tree selection box is suitable for displaying and filtering data at multiple levels, with the levels separated by '/' and multiple enumeration items added with line breaks. After adding an enumeration value, you can preview the effect in the Attribute default value selection box.",
  [K.PLEASE_INPUT_TREE_ENUMERATED_VALUE]:
    "The tree selection box is suitable for displaying and filtering data at multiple levels, with the levels separated by '/' and multiple enumeration items added with line breaks. Example: \nA1/B1/C1/D1/E1\nA1/B1/C1/D1/E2\nA1/B1/C1/D1/E3\nA1/B1/C1/D2\nA1/B1/C1/D3\nA1/B1/C1/D4/E4\nAfter adding an enumeration value, you can preview the effect in the Attribute default value selection box.",
  [K.PLEASE_SELECT_TREE_ENUMERATED_VALUE]:
    "Please select the Attribute default value",
  [K.IFEM]: "Introducing from existing models",
  [K.ADD_STRUCTURE_ITEM]: "Add structure item",
  [K.SELECT_MODEL]: "Select model",
  [K.CITE_MODEL]: "Reference Model",
  [K.EDIT_STRUCTURE_ITEM]: "Edit structure item",
  [K.INPUT_STRUCTURE_ITEM_NAME]: "Please enter structure item name",
  [K.INPUT_STRUCTURE_ITEM_ID]: "Please enter structure item ID",
  [K.STRUCTURE_ITEM_ID_LIMIT]:
    "Please enter between 1 and 32 characters, beginning with a letter, including only letters, numbers, and underscores",
  [K.ENTER_TYPE]: "Please input type",
  [K.SELECT_ATTRIBUTE]: "Select attribute",
  [K.SELECT_ONE_CMDB_RESOURCE_MODEL]: "Select one CMDB resource model",
  [K.ATTRIBUTE_TYPE]: "Attribute type",
  [K.TAG]: "Tag",
  [K.ARRAY_LIMIT]:
    "You can enter multiple values, and enter space or carriage return to save",
  [K.THE_DEFAULT_IS_ONE]: "The default is one",
  [K.ADVANCED]: "Advance",
  [K.PREFIX_IDENTIFIER]: "Prefix Identifier (optional)",
  [K.NUMBER_LENGTH]: "The length of the number",
  [K.INITIAL]: "Start value",
  [K.PLEASE_ENTER_A_LEGAL_PREFIX]:
    "Prefix identifier please enter 11 characters or less (letters, numbers, underscores and dashes are supported)",
  [K.PLEASE_ENTER_A_LEGAL_STARTING_VALUE]:
    "The starting value has exceeded the length limit",
  [K.STRING_TYPE]: "String",
  [K.PLEASE_ENTER_THE_LENGTH_OF_THE_SERIAL_NUMBER]:
    "Please enter the length of the serial number",
  [K.CUSTOM_TEMPLATE]: "Custom template",
  [K.CUSTOM_TEMPLATE_PROMPT]:
    "You can customize a template for attribute data. Existing attributes (only basic types such as characters and integers are supported) can be used as template variables to meet various default value scenarios.",
  [K.CUSTOM_TEMPLATE_PROMPT2]:
    "For example, the default value of the OS attribute of the new host is derived from the existing OS type and OS kernel release version attributes. The value can be set to",
  [K.DEFAULT_DIFFERENT_REGULAR]:
    "Default values are inconsistent with regular values",
  [K.FIXED_VALUE]: "Fixed value",
  [K.BUILT_IN_FUNCTION]: "Built-in function",
  [K.SELF_INCREASE_ID]: "Self-increase ID",
  [K.SERIAL_NUMBER]: "Serial number",
  [K.ENUMS]: "Multiple choice enumeration",
  [K.INTEGER]: "Integer",
  [K.DATE]: "Date",
  [K.ENUMERATION]: "Single-choice enumeration",
  [K.ARRAY]: "Array",
  [K.FOREIGN_KEY_SINGLE_INSTANCE]: "Foreign key (single instance)",
  [K.FOREIGN_KEY_MULTIPLE_INSTANCES]: "Foreign key (multiple instances)",
  [K.STRUCTURE_ONE_LINE]: "Structure (can only add one line of information)",
  [K.STRUCTURE_MULTIPLE_LINES]:
    "Structure array (can add multiple lines of information, formerly known as 'structure')",
  [K.BOOLEAN]: "Boolean",
  [K.FLOAT]: "Float",
  [K.TIME]: "Time",
  [K.TITLE_EDIT_STRUCTURE_ITEM]: "Edit Structure Item",
  [K.TITLE_ADD_STRUCTURE_ITEM]: "Add Structure Item",
  [K.NOTICE]: "Notice",
  [K.DELETE_STRUCTURE_ITEM_PREFIX]:
    "Are you sure you want to delete the structure item",
  [K.DELETE_STRUCTURE_ITEM_POSTFIX]: "?",
  [K.WEEK]: "Week",
  [K.HOUR]: "Hour",
  [K.SECOND]: "Second",
  [K.MILLSECOND]: "Millsecond",
  [K.DAY]: "Day",
  [K.MINUTE]: "Minute",
  [K.CLICK_AND_DRAP_FIEL]: "Click or drag the file to this area",
  [K.VOLUME_TOO_BIG]:
    "The volume of the uploaded file exceeds the limit. Procedure",
  [K.ADD]: "Add",
  [K.MONTH]: "month",
  [K.CORRECT_CRONT_MSG]: "Please enter the correct time format",
  [K.DUPLICATE_STRUCTURE_ITEM_ID]:
    "{{id}} is the same as the attribute ID of an existing item, please re-specify!",
  [K.ATTRIBUTE_DESCRIPTION]: "Attribute description",
  [K.ATTRIBUTE_DESCRIPTION_LIMIT]: "Please enter 1 to 50 characters",
  [K.PLEASE_INPUT_ATTRIBUTE_DESCRIPTION]: "Please enter attribute description",
  [K.VALIDATION_FAILED]: "{{label}} validation failed",
  [K.PLACEHOLDER_SYSTEM_ONLY_DISPLAYS]:
    "The system only displays 4 decimal places",
  [K.TODAY]: "Today",
  [K.THIS_WEEK]: "This Week",
  [K.THIS_MONTH]: "This Month",
  [K.THIS_QUARTER]: "This Quarter",
  [K.THIS_YEAR]: "This Year",
  [K.USE_LINK_TO_UPLOAD]: "Use link to upload",
  [K.USE_LINK_TO_UPLOAD_PLACEHOLDER]:
    "Please enter a link to the picture. Multiple links are separated by a new line",
  [K.UPLOAD_IMG_NUMBER_LIMIT]:
    "Only {{maxNumber}} image can be uploaded at most",
  [K.ATTACHMENT]: "Attachment",
  [K.NO_SUPPORT_FILE_TYPE]: "The current file type is not supported",
  [K.TEMPLATE]: "Template",
  [K.EXPORT_TEMPLATE]: "Export Template",
  [K.IMPORT]: "Import",
  [K.DOWNLOAD_TEMPLATE]: "Template",
  [K.IMPORT_DATA]: "Import",
  [K.IMPORT_DATA_EMPTY]: "Import data is empty",
  [K.IMPORT_DATA_FORMAT_ERROR]: "Import data format error",
  [K.IMPORT_FAILED]: "Import failed",
  [K.INVALID_FILE_TYPE_DYNAMIC_FORM_ITEM]: "File type is not .xlsx .xls .csv",
  [K.FILE_NAME_VALIDATE_MESSAGE_LOG]:
    "Failed to validate the upload file name format",
};

export default locale;
