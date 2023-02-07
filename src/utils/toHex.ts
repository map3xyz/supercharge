export const toHex = (value: number) => {
  if (
    typeof value === 'string' &&
    ((value as unknown) as string).startsWith('0x')
  ) {
    return value;
  }

  return '0x' + value.toString(16);
};
