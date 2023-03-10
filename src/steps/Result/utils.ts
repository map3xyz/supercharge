export const timeToExpiration = (
  originalTime: number,
  durationSeconds: number
) => {
  const time = new Date().getTime();
  const durationMilliseconds = durationSeconds * 1000;
  const expiresAt = new Date(originalTime + durationMilliseconds).getTime();
  const millisecondsRemaining = expiresAt - time;

  const seconds = Math.floor((millisecondsRemaining / 1000) % 60);
  const minutes = Math.floor((millisecondsRemaining / (1000 * 60)) % 60);
  const hours = Math.floor((millisecondsRemaining / (1000 * 60 * 60)) % 24);
  const timeString = `${
    hours ? hours.toString().padStart(2, '0') + ':' : ''
  }${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  if (millisecondsRemaining < 0) {
    return '00:00';
  }

  return timeString;
};
