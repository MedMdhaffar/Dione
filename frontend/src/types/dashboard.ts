export interface CoinProps {
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

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
  platforms: ('twitter')[];
}