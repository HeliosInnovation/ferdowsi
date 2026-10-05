import { describe, expect, expectTypeOf, it } from 'vitest';
import { toEnglishDigits, toPersianDigits } from './digits';

describe('toPersianDigits', () => {
  it('converts every Latin digit', () => {
    expect(toPersianDigits('0123456789')).toBe('۰۱۲۳۴۵۶۷۸۹');
  });

  it('normalizes Arabic-Indic digits to Persian', () => {
    expect(toPersianDigits('٠١٢٣٤٥٦٧٨٩')).toBe('۰۱۲۳۴۵۶۷۸۹');
    expect(toPersianDigits('٤5٦')).toBe('۴۵۶');
  });

  it('leaves Persian digits untouched', () => {
    expect(toPersianDigits('۱۲۳')).toBe('۱۲۳');
  });

  it('accepts numbers', () => {
    expect(toPersianDigits(1403)).toBe('۱۴۰۳');
    expect(toPersianDigits(-3.5)).toBe('-۳.۵');
  });

  it('leaves non-digit characters untouched', () => {
    expect(toPersianDigits('سال 1403/01/15')).toBe('سال ۱۴۰۳/۰۱/۱۵');
  });

  it('returns an empty string for empty input', () => {
    expect(toPersianDigits('')).toBe('');
  });

  it('returns a string', () => {
    expectTypeOf(toPersianDigits).returns.toEqualTypeOf<string>();
  });
});

describe('toEnglishDigits', () => {
  it('converts every Persian digit', () => {
    expect(toEnglishDigits('۰۱۲۳۴۵۶۷۸۹')).toBe('0123456789');
  });

  it('converts every Arabic-Indic digit', () => {
    expect(toEnglishDigits('٠١٢٣٤٥٦٧٨٩')).toBe('0123456789');
  });

  it('handles mixed Persian, Arabic and Latin digits', () => {
    expect(toEnglishDigits('۱٢3')).toBe('123');
  });

  it('leaves non-digit characters untouched', () => {
    expect(toEnglishDigits('تلفن: ۰۹۱۲-۳۴۵')).toBe('تلفن: 0912-345');
  });

  it('round-trips with toPersianDigits', () => {
    expect(toEnglishDigits(toPersianDigits('2024-12-31'))).toBe('2024-12-31');
  });
});
