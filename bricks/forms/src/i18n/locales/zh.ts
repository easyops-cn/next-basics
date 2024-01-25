import { Locale, K } from "../constants";

const locale: Locale = {
  [K.FORMS]: "Forms",
  [K.CMDB_INSTANCE_SELECT_PANEL_ADD_LINK]: "添加",
  [K.CMDB_INSTANCE_SELECT_PANEL_MODAL_TITLE]: "批量添加",
  [K.TO]: "到",
  [K.START_TIME_END_TIME_CANNOT_EQUAL]: "开始时间和结束时间不能相等",
  [K.START_TIME_REQUIRED]: "开始时间必填",
  [K.END_TIME_REQUIRED]: "结束时间必填",
  [K.BACKGROUND_SEARCH]: "输入关键字搜索",
  [K.DRAGGABLE_UPLOAD_TEXT]: "单击或拖拽图像到此区域上传",
  [K.DRAGGABLE_UPLOAD_HINT]: "支持扩展名：.jpg .jpeg .png .gif ...",
  [K.SELECT_ICON]: "选择图标",
  [K.SET_COLOR]: "颜色",
  [K.ICON]: "图标",
  [K.CLEAR]: "清空",
  [K.COPY_SUCCESS]: "复制成功",
  [K.USERS]: "用户",
  [K.USER_GROUPS]: "用户组",
  [K.SWITCH]: "切换{{type}}",
  [K.FILTER_FROM_CMDB]: "从 CMDB 中筛选{{type}}",
  [K.USERS_RESULT_LABEL]: "用户（仅显示前20项，更多结果请搜索）",
  [K.USER_GROUPS_RESULT_LABEL]: "用户组（仅显示前20项，更多结果请搜索）",
  [K.NO_DATA]: "暂无数据",
  [K.ATTRIBUTE_DEFAULT_VALUE]: "属性默认值：",
  [K.CONFIRM]: "确认",
  [K.CANCEL]: "取消",
  [K.GLOBALLY_UNIQUE_IDENTIFIER]: "全局唯一标识符",
  [K.ATTRIBUTE_NAME]: "属性名称",
  [K.ATTRIBUTE_ID]: "属性ID",
  [K.ATTRIBUTE_TYPE]: "属性类型",
  [K.MUST_NEED_ATTRIBUTE_ID]: "属性ID为必填项",
  [K.ATTRIBUTE_ID_LIMIT]:
    "请输入1至32个字符，仅支持字母、数字和下划线(不能以数字开头)",
  [K.PLEASE_INPUT_ATTRIBUTE_ID]: "请输入属性ID",
  [K.ATTRIBUTE_NAME_LIMIT]: "属性名称为必填项",
  [K.PLEASE_INPUT_ATTRIBUTE_NAME]: "请输入属性名称",
  [K.VALUE_TYPE]: "值类型",
  [K.PLEASE_SELECT_VALUE_TYPE]: "请选择值类型",
  [K.ATTRIBUTE_CATEGROY]: "属性分类",
  [K.PLEASE_INPUT_ATTRIBUTE_CATEGROY]: "请输入属性分类",
  [K.REQUIRED]: "必填",
  [K.READONLY]: "只读",
  [K.UNIQUE]: "唯一",
  [K.LIMIT]: "限制",
  [K.REGULAR]: "正则:",
  [K.FORMAT]: "格式:",
  [K.CLICK_TO_SELECT_DATE]: "date,点击选择",
  [K.ENUMERATION_VALUE]: "枚举值:",
  [K.ENUM_REGEX_JSON]: "枚举值/正则/JSON Schema",
  [K.PLEASE_INPUT_ENUMERATED_VALUE]: "输入枚举值，以回车间隔",
  [K.FLOAT_LIMIT]: "小数点后最多可输入四位",
  [K.THIS_IS_NOT_MANDATORY]: "可不填",
  [K.DISPLAY_AS]: "显示为:",
  [K.MULTI_LINE_STR]: "多行字符串",
  [K.DEFAULT]: "默认",
  [K.STRUCTURE_ITEM_ID]: "结构项ID",
  [K.STRUCTURE_ITEM_NAME]: "结构项名称",
  [K.TYPE]: "类型",
  [K.HANDEL]: "操作",
  [K.STRUCTURE_BODY_DEFINATION]: "结构体定义:",
  [K.NEW_DEFINATION]: "新建定义",
  [K.IFEM]: "从已有模型中引入",
  [K.ADD_STRUCTURE_ITEM]: "添加结构项",
  [K.SELECT_MODEL]: "选择模型",
  [K.CITE_MODEL]: "引用模型",
  [K.EDIT_STRUCTURE_ITEM]: "编辑结构项",
  [K.INPUT_STRUCTURE_ITEM_ID]: "请输入结构项ID",
  [K.INPUT_STRUCTURE_ITEM_NAME]: "请输入结构项名称",
  [K.STRUCTURE_ITEM_ID_LIMIT]:
    "请输入1至32个字符，以字母开头，只能包含字母、数字和下划线",
  [K.ENTER_TYPE]: "请输入类型",
  [K.SELECT_ATTRIBUTE]: "选择属性",
  [K.SELECT_ONE_CMDB_RESOURCE_MODEL]: "选择一个CMDB资源模型",
  [K.TAG]: "标签",
  [K.ARRAY_LIMIT]: "输入数组，用逗号或空格分隔保存",
  [K.INITIAL]: "起始值",
  [K.PLEASE_ENTER_A_LEGAL_PREFIX]:
    "前缀标识符请输入小于等于11个字符（支持字母、数字、下划线和短横线）",
  [K.PLEASE_ENTER_A_LEGAL_STARTING_VALUE]: "起始值已超出限定的长度",
  [K.NUMBER_LENGTH]: "流水号长度",
  [K.PREFIX_IDENTIFIER]: "前缀标识符 (可不填)",
  [K.ADVANCED]: "高级",
  [K.THE_DEFAULT_IS_ONE]: "默认值为1",
  [K.STRING_TYPE]: "字符型",
  [K.PLEASE_ENTER_THE_LENGTH_OF_THE_SERIAL_NUMBER]: "请输入流水号长度",
  [K.DEFAULT_DIFFERENT_REGULAR]: "默认值与正则不符",
  [K.FIXED_VALUE]: "固定值",
  [K.BUILT_IN_FUNCTION]: "内置函数",
  [K.SELF_INCREASE_ID]: "自增ID",
  [K.SERIAL_NUMBER]: "流水号",
  [K.CUSTOM_TEMPLATE]: "自定义模板",
  [K.CUSTOM_TEMPLATE_PROMPT]:
    "可自定义属性数据的模板，可获取现有属性作为模板变量，以满足丰富的默认值场景。",
  [K.CUSTOM_TEMPLATE_PROMPT2]:
    "如，新增主机的“操作系统”的属性，默认值来源于现有的操作系统类型和操作系统内核发行版本属性，可配置为",
  [K.ENUMS]: "多选枚举型",
  [K.INTEGER]: "整型",
  [K.DATE]: "日期",
  [K.ENUMERATION]: "枚举型（单选）",
  [K.ARRAY]: "数组",
  [K.FOREIGN_KEY_SINGLE_INSTANCE]: "外键(单个实例)",
  [K.FOREIGN_KEY_MULTIPLE_INSTANCES]: "外键(多个实例)",
  [K.STRUCTURE_ONE_LINE]: "结构体（只可添加一行信息）",
  [K.STRUCTURE_MULTIPLE_LINES]: "结构体数组（可添加多行信息，原名'结构体'）",
  [K.BOOLEAN]: "布尔型",
  [K.FLOAT]: "浮点型",
  [K.TIME]: "时间",
  [K.TITLE_ADD_STRUCTURE_ITEM]: "添加结构项",
  [K.TITLE_EDIT_STRUCTURE_ITEM]: "编辑结构项",
  [K.NOTICE]: "提示",
  [K.DELETE_STRUCTURE_ITEM_PREFIX]: "确认要删除结构项",
  [K.DELETE_STRUCTURE_ITEM_POSTFIX]: "吗?",
  [K.DAY]: "天",
  [K.WEEK]: "周",
  [K.HOUR]: "小时",
  [K.SECOND]: "秒",
  [K.MINUTE]: "分",
  [K.MILLSECOND]: "毫秒",
  [K.CLICK_AND_DRAP_FIEL]: "请点击或拖拽文件到此区域",
  [K.VOLUME_TOO_BIG]: "上传文件体积大于限定体积",
  [K.ADD]: "添加",
  [K.MONTH]: "月",
  [K.CORRECT_CRONT_MSG]: "请填写正确的时间格式",
  [K.DUPLICATE_STRUCTURE_ITEM_ID]: "{{id}}与已有结构项ID重复，请重新指定！",
  [K.ATTRIBUTE_DESCRIPTION]: "属性说明",
  [K.ATTRIBUTE_DESCRIPTION_LIMIT]: "请输入1至50个字符",
  [K.PLEASE_INPUT_ATTRIBUTE_DESCRIPTION]: "请输入属性说明",
  [K.VALIDATION_FAILED]: "{{label}}校验失败",
  [K.PLACEHOLDER_SYSTEM_ONLY_DISPLAYS]: "系统只显示4位小数",
  [K.TODAY]: "今天",
  [K.THIS_WEEK]: "本周",
  [K.THIS_MONTH]: "本月",
  [K.THIS_QUARTER]: "本季度",
  [K.THIS_YEAR]: "今年",
  [K.USE_LINK_TO_UPLOAD]: "通过链接上传",
  [K.USE_LINK_TO_UPLOAD_PLACEHOLDER]:
    "请输入图片的链接，多个链接之间用换行分隔",
  [K.UPLOAD_IMG_NUMBER_LIMIT]: "最多只能上传 {{maxNumber}} 张图片",
};

export default locale;
