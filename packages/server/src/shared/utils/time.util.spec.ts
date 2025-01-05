import { convertTimeToMs } from './time.util';

describe('convertTimeToMs', () => {
  it('should convert seconds to milliseconds', () => {
    expect(convertTimeToMs('10s')).toBe(10000);
  });

  it('should convert minutes to milliseconds', () => {
    expect(convertTimeToMs('5m')).toBe(300000);
  });

  it('should convert hours to milliseconds', () => {
    expect(convertTimeToMs('2h')).toBe(7200000);
  });

  it('should convert days to milliseconds', () => {
    expect(convertTimeToMs('1d')).toBe(86400000);
  });

  it('should throw an error for invalid time format', () => {
    expect(() => convertTimeToMs('10')).toThrow('Invalid time unit');
  });

  it('should throw an error for invalid time unit', () => {
    expect(() => convertTimeToMs('10x')).toThrow('Invalid time unit');
  });
});
