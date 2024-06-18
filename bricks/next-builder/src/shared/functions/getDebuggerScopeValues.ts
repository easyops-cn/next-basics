interface Scope {
  OuterEnv?: Scope;
  bindingMap: Map<string, BindingState>;
}

interface BindingState {
  value?: unknown;
  initialized?: boolean;
}

export interface ScopeValue {
  label: string;
  value: Record<string, unknown>;
  uninitializedVariables?: string[];
}

export interface YieldValue {
  type: "return" | "caught";
  value: unknown;
}

export function getDebuggerScopeValues(
  scope: Scope,
  yieldValue: YieldValue | undefined,
  failed?: boolean,
  failedReason?: unknown
): ScopeValue[] {
  const scopeValues: ScopeValue[] = [];

  if (yieldValue?.type === "return") {
    scopeValues.push({
      label: "Return",
      value: {
        return: yieldValue.value,
      },
    });
  }

  if (failed) {
    scopeValues.push({
      label: "Caught",
      value: {
        caught: failedReason,
      },
    });
  }

  let currentScope: Scope | undefined = scope;
  while (currentScope) {
    const value: Record<string, unknown> = {};
    const uninitializedVariables: string[] = [];
    let hasValue = false;
    for (const [k, v] of currentScope.bindingMap) {
      if (!currentScope.OuterEnv && k === "undefined") {
        continue;
      }
      hasValue = true;
      value[k] = v.value;
      if (!v.initialized) {
        uninitializedVariables.push(k);
      }
    }
    if (hasValue) {
      scopeValues.push({
        label: currentScope.OuterEnv ? "Scope" : "Global",
        value,
        uninitializedVariables,
      });
    }
    currentScope = currentScope.OuterEnv;
  }

  return scopeValues;
}
