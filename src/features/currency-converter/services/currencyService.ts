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

class CurrencyService {
  private cache = new Map<string, { data: ExchangeRates; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000;

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  async fetchExchangeRates(
    baseCurrency: string = 'USD'
  ): Promise<ExchangeRates> {
    const cached = this.cache.get(baseCurrency);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    try {
      const url =
        baseCurrency === 'USD'
          ? 'https://api.fxratesapi.com/latest'
          : `https://api.fxratesapi.com/latest?base=${baseCurrency}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FxRatesResponse = await response.json();

      if (!data.success) {
        throw new Error('API returned unsuccessful response');
      }

      this.cache.set(baseCurrency, {
        data: data.rates,
        timestamp: Date.now(),
      });

      return data.rates;
    } catch (error) {
      throw new Error(
        `Failed to fetch exchange rates: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const currencyService = new CurrencyService();
export type { ConversionResult, ExchangeRates, ExchangeRateInfo };
