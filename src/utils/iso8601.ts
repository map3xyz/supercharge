export const iso8601ToDate = (iso8601: string, offset?: number) => {
  const tzoffset = (offset || new Date(iso8601).getTimezoneOffset()) * 60000;
  const localISODate = new Date(new Date(iso8601).getTime() - tzoffset);

  return localISODate;
};

export const iso8601ToString = (iso8601: string, offset?: number) => {
  const date = iso8601ToDate(iso8601, offset);
  return date.toLocaleString();
};
