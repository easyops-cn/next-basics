export interface DependencyItem {
  name: string;
  constraint: string;
  [k: string]: unknown;
}

export function compareVersion(local: string, remote: string): string | false {
  const compare = (version1: number[], version2: number[]): number[] => {
    let index = 0;
    const length = Math.max(version1.length, version2.length);
    const getValue = (number: number): number => number ?? 0;
    while (index < length) {
      if (getValue(version1[index]) === getValue(version2[index])) {
        index++;
        continue;
      }
      if (getValue(version1[index]) > getValue(version2[index])) {
        return version1;
      }
      return version2;
    }
    // equal
    return version1;
  };

  if (local?.startsWith("^") && remote?.startsWith("^")) {
    const versionReg = new RegExp(/(\d+)/g);
    const version1 = local.match(versionReg);
    const version2 = remote.match(versionReg);

    if (!version1 || !version2) return false;

    return `^${compare(version1.map(Number), version2.map(Number)).join(".")}`;
  }

  return false;
}

export function mergeVersion(
  curDeps: DependencyItem[],
  remoteDeps: DependencyItem[]
): DependencyItem[] {
  const remoteMap = new Map(remoteDeps?.map((item) => [item.name, item]));
  let result: DependencyItem[] = [];
  for (let i = 0; i < curDeps?.length; i++) {
    const curDep = curDeps[i];
    const remoteDep = remoteMap.get(curDep.name);
    if (remoteDep) {
      // find, compare the version
      const version = compareVersion(curDep.constraint, remoteDep.constraint);
      if (version) {
        result.push({
          ...curDep,
          ...remoteDep,
          constraint: version as string,
        });
      } else {
        // compare fail, concat both of them
        result = result.concat([curDep, remoteDep]);
      }
      // delete cache
      remoteMap.delete(curDep.name);
    } else {
      result.push(curDep);
    }
  }

  return result.concat([...remoteMap.values()]);
}
