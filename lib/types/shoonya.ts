export interface ShoonyaCredentials {
  userId: string;
  password: string;
  apiKey: string;
  vendorCode?: string;
  imei?: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  susertoken?: string;
  actid?: string;
  email?: string;
  uid?: string;
  brnchid?: string;
  orarr?: string[];
}

export interface QuoteData {
  exchange: string;
  tradingSymbol: string;
  ltp: number;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  lastTradeTime: string;
  bidPrice: number;
  askPrice: number;
}

export interface OrderResponse {
  status: boolean;
  message: string;
  orderId?: string;
  requestTime?: string;
}