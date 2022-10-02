const kindNameSeparator = '$';
export function kindName(kind: string, name: string) {
  return kind + kindNameSeparator + name;
}

export function fromKindName(kindName: string) {
  const parts = kindName.split(kindNameSeparator);
  if (parts.length != 2) {
    console.log('fromKindName invalid parameter: ', kindName);
    return { kind: undefined, name: undefined };
  }
  console.log('fromKindName valid parameter: ', kindName, parts);
  return { kind: parts[0], name: parts[1] };
}

export function resourceURI(ctx: string, ns: string, kind: string, name: string): string {
  return `/ctx/${ctx}/ns/${ns}/obj/${kindName(kind, name)}`;
}
