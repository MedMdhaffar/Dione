export interface CoinProps {
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export interface NftProps {
  id: string;
  contract_address: string;
  asset_platform_id: string;
  name: string;
  symbol: string;
  image: {
    small: string;
    small_2x?: string;
  };
  banner_image?: string;
  description?: string;
  native_currency: string;
  native_currency_symbol: string;
  market_cap_rank: number;
  floor_price: {
    native_currency: number;
    usd: number;
  };
  market_cap: {
    native_currency: number;
    usd: number;
  };
  volume_24h: {
    native_currency: number;
    usd: number;
  };
  floor_price_24h_percentage_change?: {
    usd: number;
    native_currency: number;
  };
  number_of_unique_addresses: number;
  total_supply: number;
  idx?: number; // optional if used for key
}

export interface GenerationOptions {
  type: 'video' | 'post';
  platforms: ('twitter')[];
}
