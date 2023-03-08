export const iso8601ToString = (iso8601: string, offset?: number) => {
  const tzoffset = (offset || new Date(iso8601).getTimezoneOffset()) * 60000;
  const localISOTime = new Date(
    new Date(iso8601).getTime() - tzoffset
  ).toLocaleString();

  return localISOTime;
};
