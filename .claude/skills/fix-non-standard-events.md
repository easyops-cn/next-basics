# 修复不符合转换规则的事件名称

## 问题

某些构件的事件名称不符合标准的转换规则 `event.name.format → onEventNameFormat`,导致无法自动生成正确的 JSX 类型定义。

例如:
- `cascader.dropdownVisible.change` - `dropdownVisible` 是驼峰命名,转换后会变成 `onCascaderDropdownvisibleChange` (错误)
- `link.click` - 缺少包名前缀,不符合 `package.brick.action` 格式
- `general.select.debounceSearch` - `debounceSearch` 是驼峰命名

## 解决方案

**保持向后兼容的同时添加新的规范化事件名称**

### 策略

1. **保留原有事件** - 不破坏现有代码
2. **新增规范化事件** - 符合 `package.brick-name.action` 格式,每个部分用点号分隔
3. **同时触发两个事件** - 在同一个处理函数中发出
4. **在 jsx.ts 中使用新事件名** - 类型定义使用规范化的事件名

### 事件名称规范化规则

将不规范的事件名转换为符合格式的名称:

| 原事件名 | 规范化事件名 | JSX 处理器名 |
|---------|------------|-------------|
| `cascader.dropdownVisible.change` | `cascader.dropdown.visible.change` | `onCascaderDropdownVisibleChange` |
| `link.click` | `general.link.click` | `onGeneralLinkClick` |
| `general.select.debounceSearch` | `general.select.debounce.search` | `onGeneralSelectDebounceSearch` |
| `avatar.uploadModal.change` | `avatar.upload.change` | `onAvatarUploadChange` |

**核心原则**:
- 使用点号分隔所有单词
- 每个单词全小写
- 避免驼峰命名(camelCase)出现在事件名中

## 实现方式

### 情况 1: 使用 @event 装饰器 + EventEmitter

```typescript
/**
 * @detail `Type`
 * @description 原有事件描述
 */
@event({ type: "原事件名" })
private originalEvent: EventEmitter<Type>;

private handleSomething = (data: Type): void => {
  // 保留原有事件 (向后兼容)
  this.originalEvent.emit(data);

  // 新增规范化事件
  this.dispatchEvent(
    new CustomEvent("规范化事件名", {
      detail: data,
    })
  );
};
```

**示例**:

```typescript
/**
 * @detail `Record<string, any>`
 * @description 下拉框显示状态变化时触发
 */
@event({ type: "cascader.dropdownVisible.change" })
private dropdownVisibleChange: EventEmitter<Record<string, any>>;

private handleDropdownVisibleChange = (visible: boolean): void => {
  const detail = { visible };

  // 保留原有事件 (向后兼容)
  this.dropdownVisibleChange.emit(detail);

  // 新增规范化事件
  this.dispatchEvent(
    new CustomEvent("cascader.dropdown.visible.change", {
      detail,
    })
  );
};
```

### 情况 2: 直接使用 dispatchEvent

```typescript
private handleSomething = (data: Type): void => {
  // 保留原有事件 (向后兼容)
  this.dispatchEvent(
    new CustomEvent("原事件名", {
      detail: data,
    })
  );

  // 新增规范化事件
  this.dispatchEvent(
    new CustomEvent("规范化事件名", {
      detail: data,
    })
  );
};
```

**示例**:

```typescript
private handleLinkClick = (event: MouseEvent): void => {
  const detail = { event };

  // 保留原有事件 (向后兼容)
  this.dispatchEvent(
    new CustomEvent("link.click", {
      detail,
    })
  );

  // 新增规范化事件
  this.dispatchEvent(
    new CustomEvent("general.link.click", {
      detail,
    })
  );
};
```

## jsx.ts 类型定义

**重要**: 在 jsx.ts 中只定义规范化后的事件名称的处理器类型。

```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forms--general-cascader': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralCascaderElementProps & {
        // ❌ 不要使用原事件名
        // onCascaderDropdownvisibleChange?: (event: CustomEvent<Record<string, any>>) => void;

        // ✅ 使用规范化的事件名
        onCascaderDropdownVisibleChange?: (event: CustomEvent<Record<string, any>>) => void;
        onCascaderChange?: (event: CustomEvent<Record<string, any>>) => void;
        // ... 其他事件
      };

      'forms--general-link': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralLinkElementProps & {
        // ✅ 使用规范化的事件名
        onGeneralLinkClick?: (event: CustomEvent<Record<string, any>>) => void;
      };
    }
  }
}
```

## 自动化脚本支持

修复脚本应该:

1. **检测不符合规则的事件名**
   - 包含驼峰命名的部分 (如 `dropdownVisible`, `debounceSearch`)
   - 缺少包名前缀的事件 (如 `link.click`)

2. **生成规范化事件名**
   ```python
   def normalize_event_name(event_name, package_name, brick_name):
       """
       将事件名规范化
       例如: cascader.dropdownVisible.change → cascader.dropdown.visible.change
       """
       # 检测驼峰命名并拆分
       parts = []
       for part in event_name.split('.'):
           # 将驼峰拆分为单词 (dropdownVisible → dropdown.visible)
           words = re.sub('([a-z])([A-Z])', r'\1.\2', part).lower()
           parts.extend(words.split('.'))

       # 检查是否缺少包名前缀
       if not parts[0] in [package_name, 'general']:
           parts.insert(0, 'general')

       return '.'.join(parts)
   ```

3. **修改组件代码**
   - 在事件触发处添加 `dispatchEvent` 调用
   - 保留原有的 `EventEmitter.emit()` 调用

4. **更新 jsx.ts**
   - 使用规范化后的事件名生成处理器类型

## 验证

修复后运行验证脚本应该:

1. ✅ 所有事件都能在 jsx.ts 中找到对应的处理器
2. ✅ 处理器名称符合 `on[PascalCase]` 格式
3. ✅ 原有事件仍然触发(向后兼容)
4. ✅ 新事件也正常触发

## 示例: 完整修复流程

### 修复前

```typescript
// general-cascader/index.tsx
@event({ type: "cascader.dropdownVisible.change" })
private dropdownVisibleChange: EventEmitter<Record<string, any>>;

private handleDropdownVisibleChange = (visible: boolean): void => {
  this.dropdownVisibleChange.emit({ visible });
};
```

```typescript
// jsx.ts
'forms--general-cascader': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralCascaderElementProps;
// ❌ 缺少事件处理器
```

### 修复后

```typescript
// general-cascader/index.tsx
@event({ type: "cascader.dropdownVisible.change" })
private dropdownVisibleChange: EventEmitter<Record<string, any>>;

private handleDropdownVisibleChange = (visible: boolean): void => {
  const detail = { visible };

  // 保留原有事件
  this.dropdownVisibleChange.emit(detail);

  // 新增规范化事件
  this.dispatchEvent(
    new CustomEvent("cascader.dropdown.visible.change", {
      detail,
    })
  );
};
```

```typescript
// jsx.ts
'forms--general-cascader': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & GeneralCascaderElementProps & {
  onCascaderDropdownVisibleChange?: (event: CustomEvent<Record<string, any>>) => void;
  onCascaderChange?: (event: CustomEvent<Record<string, any>>) => void;
  // ... 其他事件
};
// ✅ 事件处理器已添加,使用规范化的名称
```

## 注意事项

1. **始终保留原有事件** - 确保向后兼容
2. **规范化名称要一致** - 在组件代码和 jsx.ts 中使用相同的规范化名称
3. **注释说明** - 在代码中添加注释说明为什么要发出两个事件
4. **测试** - 确保两个事件都正常工作

## 相关文件

- 提示词技能文件: `.claude/skills/fix-non-standard-events.md`
- 验证脚本: `validate-all-jsx-types.js`
- 事件名转换函数: `convertEventNameToHandler()` in `validate-all-jsx-types.js`
