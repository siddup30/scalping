"use client";

import { ShoonyaCredentials, LoginResponse, OrderResponse } from '@/lib/types/shoonya';

class ShoonyaClient {
  private static instance: ShoonyaClient;
  private baseUrl = 'https://api.shoonya.com/NorenWClientTP/';
  private token: string | null = null;
  private userId: string | null = null;

  private constructor() {}

  static getInstance(): ShoonyaClient {
    if (!ShoonyaClient.instance) {
      ShoonyaClient.instance = new ShoonyaClient();
    }
    return ShoonyaClient.instance;
  }

  async login(credentials: ShoonyaCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}QuickAuth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'API',
          apkversion: 'js:1.0.0',
          uid: credentials.userId,
          pwd: credentials.password,
          factor2: credentials.apiKey,
          vc: credentials.vendorCode || '',
          imei: credentials.imei || '',
        }),
      });

      const data = await response.json();
      if (data.stat === 'Ok') {
        this.token = data.susertoken;
        this.userId = credentials.userId;
        return {
          status: true,
          message: 'Login successful',
          susertoken: data.susertoken,
          actid: data.actid,
          email: data.email,
          uid: data.uid,
          brnchid: data.brnchid,
          orarr: data.orarr,
        };
      }
      return { status: false, message: data.emsg || 'Login failed' };
    } catch (error) {
      return { status: false, message: 'Network error' };
    }
  }

  async placeOrder(params: {
    symbol: string;
    qty: number;
    price: number;
    orderType: string;
    transactionType: string;
  }): Promise<OrderResponse> {
    if (!this.token || !this.userId) {
      return { status: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${this.baseUrl}PlaceOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          uid: this.userId,
          actid: this.userId,
          exch: 'NSE',
          tsym: params.symbol,
          qty: params.qty.toString(),
          prc: params.price.toString(),
          prd: 'I', // Intraday
          trantype: params.transactionType,
          prctyp: params.orderType,
          ret: 'DAY',
        }),
      });

      const data = await response.json();
      if (data.stat === 'Ok') {
        return {
          status: true,
          message: 'Order placed successfully',
          orderId: data.norenordno,
          requestTime: new Date().toISOString(),
        };
      }
      return { status: false, message: data.emsg || 'Order placement failed' };
    } catch (error) {
      return { status: false, message: 'Network error' };
    }
  }

  async getQuote(symbol: string): Promise<any> {
    if (!this.token || !this.userId) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${this.baseUrl}GetQuotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          uid: this.userId,
          exch: 'NSE',
          token: symbol,
        }),
      });

      const data = await response.json();
      if (data.stat === 'Ok') {
        return data;
      }
      throw new Error(data.emsg || 'Failed to fetch quote');
    } catch (error) {
      throw error;
    }
  }
}

export const shoonyaClient = ShoonyaClient.getInstance();