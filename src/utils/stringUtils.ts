export const getHasPrefixList = (
  prefix: string,
  names: string[] = [],
): string[] =>
  names.filter((name) => {
    if (!name.includes(prefix)) {
      return false;
    }

    let index = 0;
    for (let i = 0; i < name.length; i++) {
      if (name[i] === name[i].toUpperCase()) {
        index = i;
        break;
      }
    }

    if (name.slice(0, index) !== prefix) {
      return false;
    }
    return true;
  });

export const removePrefixList = (prefix: string, names: string[] = []) => {
  const filteredNames = getHasPrefixList(prefix, names);
  return filteredNames?.map((name) => {
    const pureName = name.slice(prefix.length);
    return pureName.charAt(0).toLowerCase() + pureName.slice(1);
  });
};

export const randomString = (length: number) =>
  crypto.randomUUID().slice(0, length);
