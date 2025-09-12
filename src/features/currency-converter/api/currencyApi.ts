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

const apiUrl = import.meta.env.VITE_CURRENCY_API_URL;

export const fetchExchangeRates = async (
  baseCurrency: string = 'USD'
): Promise<ExchangeRates> => {
  try {
    const url =
      baseCurrency === 'USD' ? apiUrl : `${apiUrl}?base=${baseCurrency}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
export type { ConversionResult, ExchangeRates, ExchangeRateInfo };
