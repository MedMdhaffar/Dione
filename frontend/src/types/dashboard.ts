export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_1h: number;
  price_change_percentage_6h: number;
  price_change_percentage_18h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface NFTCollection {
  id: string;
  name: string;
  image: string;
  floor_price: number;
  volume_24h: number;
  volume_change_24h: number;
  market_cap: number;
  owners: number;
  total_supply: number;
  price_change_1h: number;
  price_change_6h: number;
  price_change_18h: number;
  price_change_24h: number;
}

export interface GenerationOptions {
  type: 'video' | 'post';
  platforms: ('tiktok' | 'instagram' | 'facebook' | 'twitter' | 'youtube')[];
}