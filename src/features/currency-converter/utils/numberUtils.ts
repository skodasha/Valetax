import { KeyboardEvent } from 'react';

export const normalizeDecimalSeparator = (value: string): string => {
  return value.replace(',', '.');
};

const canAddCharacter = (currentValue: string, newChar: string): boolean => {
  if (!/[\d.,]/.test(newChar)) return false;

  if (newChar === '.' || newChar === ',') {
    return !currentValue.includes('.') && !currentValue.includes(',');
  }

  return true;
};

export const handleAmountKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
  currentValue: string
) => {
  const newChar = e.key;

  if (e.key.length > 1) return;

  if (!canAddCharacter(currentValue, newChar)) {
    e.preventDefault();
  }
};
