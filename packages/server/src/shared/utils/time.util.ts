export function convertTimeToMs(time: string): number {
  const timePattern = /^(\d+)([smhd])$/;
  const match = time.match(timePattern);

  if (!match) {
    throw new Error('Invalid time unit');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      throw new Error('Invalid time unit');
  }
}
