export interface OrderPayload {
  symbol: string;
  quantity: number;
  price: number;
  orderType: 'MARKET' | 'LIMIT';
  transactionType: 'BUY' | 'SELL';
}

export interface Trade {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  type: string;
  timestamp: string;
}