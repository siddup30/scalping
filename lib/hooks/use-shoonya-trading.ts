"use client";

import { useState } from 'react';
import { shoonyaClient } from '@/lib/api/shoonya-client';
import { OrderPayload } from '@/lib/types/trading';
import { useTradingStore } from '@/lib/store/trading-store';
import { useToast } from '@/components/ui/use-toast';

export function useShoonyaTrading() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const addTradeHistory = useTradingStore((state) => state.addTradeHistory);

  const placeOrder = async (orderPayload: OrderPayload) => {
    setIsLoading(true);
    try {
      const response = await shoonyaClient.placeOrder({
        symbol: orderPayload.symbol,
        qty: orderPayload.quantity,
        price: orderPayload.price,
        orderType: orderPayload.orderType === 'MARKET' ? 'MKT' : 'LMT',
        transactionType: orderPayload.transactionType,
      });

      if (response.status) {
        addTradeHistory({
          id: response.orderId || Date.now().toString(),
          symbol: orderPayload.symbol,
          quantity: orderPayload.quantity,
          price: orderPayload.price,
          type: orderPayload.transactionType,
          timestamp: response.requestTime || new Date().toISOString(),
        });

        toast({
          title: 'Order Placed Successfully',
          description: `Order ID: ${response.orderId}`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Order Failed',
          description: response.message,
        });
      }

      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Order placement failed';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: message,
      });
      return { status: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    placeOrder,
    isLoading,
  };
}