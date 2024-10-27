"use client";

import { create } from 'zustand';
import { Trade } from '@/lib/types/trading';

interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  pnl: number;
}

interface TradingStore {
  tradeHistory: Trade[];
  positions: Position[];
  watchlist: string[];
  addTradeHistory: (trade: Trade) => void;
  clearTradeHistory: () => void;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  updatePositions: (positions: Position[]) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  tradeHistory: [],
  positions: [],
  watchlist: [],
  addTradeHistory: (trade) =>
    set((state) => ({
      tradeHistory: [trade, ...state.tradeHistory],
    })),
  clearTradeHistory: () => set({ tradeHistory: [] }),
  addToWatchlist: (symbol) =>
    set((state) => ({
      watchlist: [...state.watchlist, symbol],
    })),
  removeFromWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.filter((s) => s !== symbol),
    })),
  updatePositions: (positions) => set({ positions }),
}));