import { CurrencyType } from '@/types/currency';

type ExchangeRates = {
  [currencyCode: string]: number;
};

type FxRatesResponse = {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  date: string;
  base: string;
  rates: ExchangeRates;
};

type ConversionResult = {
  convertedAmount: number;
  exchangeRate: number;
  inverseRate: number;
};

type ExchangeRateInfo = {
  base: string;
  date: string;
  timestamp: number;
  rates: ExchangeRates;
};

type CurrenciesResponse = {
  [currencyCode: string]: CurrencyType;
};

const apiUrl = import.meta.env.VITE_CURRENCY_API_URL;

export const fetchExchangeRates = async (
  baseCurrency: string = 'USD'
): Promise<ExchangeRates> => {
  try {
    const url =
      baseCurrency === 'USD'
        ? `${apiUrl}/latest`
        : `${apiUrl}?base=${baseCurrency}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests');
      } else {
        throw new Error(response.statusText);
      }
    }

    const data: FxRatesResponse = await response.json();

    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }

    return data.rates;
  } catch (error) {
    throw new Error(
      `Failed to fetch exchange rates: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const fetchAllCurrencies = async (): Promise<CurrencyType[]> => {
  try {
    const response = await fetch(`${apiUrl}/currencies`);

    if (response.ok) {
      const data: CurrenciesResponse = await response.json();

      return Object.entries(data).map(([, currency]) => currency);
    }

    throw new Error('Failed to fetch currencies from API');
  } catch (error) {
    throw new Error(
      `Failed to fetch currencies: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export type {
  ConversionResult,
  ExchangeRates,
  ExchangeRateInfo,
  CurrencyType,
  CurrenciesResponse,
};
