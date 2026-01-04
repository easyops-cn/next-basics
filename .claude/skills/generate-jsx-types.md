# Generate JSX Types

为 `bricks/` 目录下的所有包(或指定包)批量生成或更新 JSX TypeScript 类型定义。

## 快速开始

### 如何启动

**方式 1: 处理所有包** (默认)
```
请执行 generate-jsx-types skill
```

**方式 2: 指定特定包**
```
只为 forms, basic-bricks, presentational-bricks 这 3 个包生成 JSX 类型
```

**方式 3: 从检查点恢复**
```
继续 generate-jsx-types,从检查点恢复
```

### 这个 Skill 会做什么

1. **扫描识别**: 扫描 `bricks/` 下的所有包,识别 V2/V3 构件
2. **生成接口**: 在组件源文件中创建/更新 Props 接口
3. **添加 implements**: 为所有 brick 类添加 `implements XXXProps`
4. **生成 jsx.ts**: 为每个包生成 JSX 类型声明文件
5. **更新配置**: 更新 tsconfig.json 和 package.json (旧架构)
6. **运行 build**: 执行 `npm run build:types` 并修复类型错误
7. **严格验证**: 使用 `validate-all-jsx-types.js` 验证所有规则
8. **生成报告**: 汇总成功/失败的包及详细错误

## ⚠️ 核心规则(必须严格遵守)

### 规则 1: Props 接口位置

✅ **正确**: Props 接口**必须**在组件源文件中定义和导出

```typescript
// 在 src/general-input/index.tsx 中
export interface GeneralInputElementProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

export class GeneralInputElement extends UpdatingElement implements GeneralInputElementProps {
  @property({ attribute: false })
  placeholder: string;
  // ...
}
```

❌ **错误**: 在 jsx.ts 中定义 Props 接口

**验证命令**:
```bash
# jsx.ts 中不允许有 interface XXXProps 定义
grep -E "^(export )?(interface|type) \w+Props" bricks/*/src/jsx.ts
# 必须返回空
```

### 规则 2.1: implements 声明

✅ **正确**: 所有 brick 类**必须** `implements XXXProps`

```typescript
export class GeneralInputElement extends UpdatingElement implements GeneralInputElementProps {
  // ...
}
```

❌ **错误**: 类没有 implements 声明

### 规则 2.2: Props 接口质量

✅ **正确**: Props 接口必须包含具体的属性定义

```typescript
export interface GeneralInputElementProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  size?: "small" | "default" | "large";
}
```

❌ **错误**: 只有索引签名,没有具体属性 (反模式)

```typescript
// ❌ 这样完全绕过了类型检查!
export interface GeneralInputElementProps {
  [key: string]: any;
}
```

**为什么这是严重问题**: 失去所有类型安全,IDE 无法提示,拼写错误无法检测

### 规则 3: Tag Name 转换

✅ **正确**: 将 `.` 替换为 `--`

```typescript
// 源码中: "forms.general-input"
// jsx.ts 中: "forms--general-input"
```

❌ **错误**: tag name 包含点号

**验证命令**:
```bash
# jsx.ts 中的 tag name 不能包含点号
grep -E '"[^"]*\.[^"]*":' bricks/*/src/jsx.ts
# 必须返回空
```

### 规则 4: 事件名转换

✅ **正确**: 转换为 `on[PascalCase]` 格式

```typescript
// "general.input.change" → onGeneralInputChange
onGeneralInputChange?: (event: CustomEvent<string>) => void;
```

❌ **错误**: 不符合格式

### 规则 5: 事件完整性

✅ **正确**: 组件中的所有事件都必须在 jsx.ts 中有对应处理器

## 技术实现指南

### 参考脚本

执行此任务时,必须参考以下两个脚本:

1. **生成脚本**: `bricks/forms/generate-jsx-types.js`
   - 展示了如何添加 Props 接口
   - 展示了如何添加 implements 声明
   - 展示了如何生成 jsx.ts

2. **验证脚本**: `validate-all-jsx-types.js`
   - 实现了所有 6 条规则的验证逻辑
   - 定义了验证通过的标准
   - **最终验证必须使用此脚本**

### 执行流程

#### 阶段 0: 准备

1. **检查扫描结果**:
   ```bash
   # 确保 brick-scan-result.json 存在
   ls brick-scan-result.json
   ```

2. **读取包列表**:
   - 从 `brick-scan-result.json` 读取所有包信息
   - 如果用户指定了特定包,只处理这些包
   - 否则处理所有包

#### 阶段 1: 处理每个包

**对于每个包,按以下顺序执行**:

**步骤 1: 读取包信息**
```javascript
const scanResult = JSON.parse(fs.readFileSync('brick-scan-result.json'));
const pkg = scanResult.packages.find(p => p.name === 'forms');
// pkg.bricks 包含所有构件信息
```

**步骤 2: 为每个构件添加 Props 接口**

参考 `bricks/forms/generate-jsx-types.js` 的实现:

```javascript
for (const brick of pkg.bricks) {
  const { className, propsInterface, filePath } = brick;

  // 1. 检查是否已有 Props 接口
  const hasInterface = content.includes(`interface ${propsInterface}`);

  // 2. 如果没有,在类定义之前添加
  if (!hasInterface) {
    const interfaceDeclaration = `export interface ${propsInterface} {
  [key: string]: any;  // TODO: 从 @property 提取属性
}

`;
    // 在 class 之前插入
    content = content.replace(
      new RegExp(`(export\\s+class\\s+${className})`),
      interfaceDeclaration + '$1'
    );
  }
}
```

**步骤 3: 添加 implements 声明**

```javascript
// 检查是否已有 implements
const hasImplements = /class\s+ClassName\s+extends\s+\w+\s+implements/.test(content);

if (!hasImplements) {
  // 添加 implements
  content = content.replace(
    /(export\s+class\s+ClassName\s+extends\s+\w+)([^{]*{)/,
    '$1 implements ClassNameProps$2'
  );
}
```

**步骤 4: 提取事件**

```javascript
function extractEvents(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const events = [];

  // 方式 1: @event 装饰器
  const eventMatches = content.matchAll(/@event\(\s*{\s*type:\s*["']([^"']+)["']/g);
  for (const match of eventMatches) {
    events.push(match[1]);
  }

  // 方式 2: new CustomEvent()
  const customMatches = content.matchAll(/new\s+CustomEvent\s*\(\s*["']([^"']+)["']/g);
  for (const match of customMatches) {
    events.push(match[1]);
  }

  return [...new Set(events)]; // 去重
}

function eventNameToHandlerName(eventName) {
  // "general.input.change" → "onGeneralInputChange"
  const parts = eventName.split('.');
  return 'on' + parts.map(part =>
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}
```

**步骤 5: 生成 jsx.ts**

**重要**: jsx.ts 中**只有 import 和 declare global**,**绝不定义** Props 接口

```typescript
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import type { GeneralInputElement, GeneralInputElementProps } from './general-input';
// ... 更多 imports

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'forms--general-input': DetailedHTMLProps<
        HTMLAttributes<GeneralInputElement>,
        GeneralInputElement
      > & GeneralInputElementProps & {
        onGeneralInputChange?: (event: CustomEvent<string>) => void;
        onGeneralInputBlur?: (event: CustomEvent) => void;
      };
      // ... 更多构件
    }
  }
}
```

**注意事项**:
- Tag name 必须转换: `.` → `--`
- 从组件源文件 import Props 接口
- 事件处理器内联定义在 `& { }` 中

**步骤 6: 更新配置文件**

**对于旧架构包** (next-basics):

修改 `tsconfig.json`:
```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist-types",
    "emitDeclarationOnly": false
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/jsx.ts"
  ],
  "exclude": [
    "**/*.spec.ts",
    "**/*.spec.tsx"
  ]
}
```

修改 `package.json`:
```json
{
  "types": "dist-types/jsx.d.ts",
  "files": ["dist", "dist-types", "deploy", "version.ini"],
  "scripts": {
    "build:types": "tsc --emitDeclarationOnly --declaration --declarationDir dist-types --project tsconfig.json"
  },
  "exports": {
    ".": "./dist-types/jsx.d.ts",
    "./*": "./dist-types/*/index.d.ts"
  }
}
```

更新项目根目录 `.gitignore` (只需一次):
```gitignore
dist
dist-types
```

**步骤 7: 运行 build:types 并修复错误**

```bash
cd bricks/forms
npm run build:types
```

如果有类型错误:
- 优先推断正确类型
- 装饰器属性必须正确
- 其他位置可以务实处理 (any 或 @ts-ignore)
- 最多重试 5 轮修复

**成功标准**: `npm run build:types` 退出码为 0

#### 阶段 2: 严格验证

**对每个包,使用 validate-all-jsx-types.js 中的逻辑验证**:

```bash
# 最终验证(所有包)
node validate-all-jsx-types.js
```

验证内容:
1. ✅ 规则 1: jsx.ts 不包含 Props 定义
2. ✅ 规则 2.1: 所有类有 implements
3. ✅ 规则 2.2: Props 接口无索引签名反模式
4. ✅ 规则 3: tag name 无点号
5. ✅ 规则 4: 事件名符合格式
6. ✅ 规则 5: 事件完整性
7. ✅ 规则 6: build:types 成功

**只有全部验证通过,才能标记该包为成功**

#### 阶段 3: 生成报告

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
最终报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 成功: 28 个包
   ✓ forms (45 个构件)
   ✓ basic-bricks (12 个构件)
   ✓ presentational-bricks (67 个构件)
   ...

⚠️ 失败: 6 个包

   ❌ cmdb-instances (3 个错误):
      [规则 2.2] 5 个 Props 接口只有 [key: string]: any
         示例: InstanceListElement (InstanceListElementProps) 等
      [规则 5] 2 个事件缺少处理器
         示例: instance.select → onInstanceSelect 等
      [build] build:types 失败,剩余 1 个类型错误
         src/instance-list/index.tsx:120 - TS2345

   ❌ workflow (1 个错误):
      [build] build:types 失败
         src/workflow-node/index.tsx:45 - TS2322

📊 统计:
   总包数: 34
   已生成 jsx.ts: 32 个包
   验证通过: 28 个包 (156/178 个构件)
   验证失败: 6 个包
   尚未生成: 2 个包

下一步操作:
1. 检查失败的包,手动修复错误
2. 运行: cd bricks/<package-name> && npm run build:types
3. 重新验证: node validate-all-jsx-types.js
```

## 不规范事件名处理

某些事件名不符合标准转换规则:
- `cascader.dropdownVisible.change` - 驼峰命名
- `link.click` - 缺少包名前缀

**解决方案**: 双事件派发
1. 保留原事件 (向后兼容)
2. 新增规范化事件 (如 `cascader.dropdown.visible.change`)
3. jsx.ts 使用规范化名称

详见: [fix-non-standard-events.md](./fix-non-standard-events.md)

## 批次处理和会话恢复

### 批次处理建议

如果包很多 (30+),建议分批处理:
- 按构件总数分批: 每批 40-60 个构件
- 动态调整批次大小

### 检查点机制

保存进度到 `.jsx-gen-progress.json`:
```json
{
  "version": "1.0",
  "completedPackages": ["forms", "basic-bricks"],
  "failedPackages": [
    { "name": "cmdb-instances", "errors": ["..."] }
  ],
  "remainingPackages": ["workflow", "presentational-bricks"]
}
```

新会话可以从检查点恢复

## 使用 Subagent 执行

此 skill 使用 **general-purpose subagent** 执行:

```typescript
Task({
  subagent_type: "general-purpose",
  description: "Generate JSX types for bricks",
  prompt: `
    为 bricks/ 目录下的所有包生成 JSX 类型定义。

    参考脚本:
    - bricks/forms/generate-jsx-types.js (生成实现)
    - validate-all-jsx-types.js (验证逻辑)

    执行步骤:
    1. 读取 brick-scan-result.json
    2. 处理每个包:
       - 添加 Props 接口(在组件源文件中)
       - 添加 implements 声明
       - 提取事件
       - 生成 jsx.ts
       - 更新配置
       - 运行 build:types 并修复错误
    3. 运行 validate-all-jsx-types.js 验证
    4. 生成最终报告

    严格要求:
    - 所有规则必须满足
    - 验证脚本必须通过
    - build:types 必须成功
  `
});
```

## ⚠️ 最终验证是关键

**无论用什么方式执行,最后都必须运行验证脚本**:

```bash
node validate-all-jsx-types.js

npm run build
```


**只有验证脚本通过,任务才算真正完成**

验证脚本会:
- 检查所有 6 条规则
- 给出详细的错误位置
- 提供修复建议
- 返回非零退出码(如果失败)

## 技术参考

- **生成实现**: `bricks/forms/generate-jsx-types.js`
- **验证逻辑**: `validate-all-jsx-types.js`
- **扫描结果**: `brick-scan-result.json`
- **事件修复**: [fix-non-standard-events.md](./fix-non-standard-events.md)
- **项目规范**: [CLAUDE.md](../CLAUDE.md)
- **Plop 模板**: `next-core-v3/packages/yo/src/plopfile.js`
