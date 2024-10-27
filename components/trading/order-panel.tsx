"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderPayload } from "@/lib/types/trading";
import { useShoonyaTrading } from "@/lib/hooks/use-shoonya-trading";

export default function OrderPanel() {
  const [order, setOrder] = useState<Partial<OrderPayload>>({
    orderType: "MARKET",
    transactionType: "BUY",
  });

  const { placeOrder, isLoading } = useShoonyaTrading();

  const handlePlaceOrder = async () => {
    if (!order.symbol || !order.quantity) {
      return;
    }

    await placeOrder({
      symbol: order.symbol,
      quantity: order.quantity,
      price: order.price || 0,
      orderType: order.orderType || "MARKET",
      transactionType: order.transactionType || "BUY",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Place Order</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Symbol</label>
          <Input
            placeholder="Enter symbol"
            value={order.symbol || ""}
            onChange={(e) =>
              setOrder({ ...order, symbol: e.target.value.toUpperCase() })
            }
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Quantity</label>
          <Input
            type="number"
            placeholder="Enter quantity"
            value={order.quantity || ""}
            onChange={(e) =>
              setOrder({ ...order, quantity: parseInt(e.target.value) })
            }
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Order Type</label>
          <Select
            value={order.orderType}
            onValueChange={(value: "MARKET" | "LIMIT") =>
              setOrder({ ...order, orderType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select order type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MARKET">Market</SelectItem>
              <SelectItem value="LIMIT">Limit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Transaction Type</label>
          <Select
            value={order.transactionType}
            onValueChange={(value: "BUY" | "SELL") =>
              setOrder({ ...order, transactionType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select transaction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BUY">Buy</SelectItem>
              <SelectItem value="SELL">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {order.orderType === "LIMIT" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              placeholder="Enter price"
              value={order.price || ""}
              onChange={(e) =>
                setOrder({ ...order, price: parseFloat(e.target.value) })
              }
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-2">
        <Button
          variant="destructive"
          onClick={() =>
            setOrder({
              orderType: "MARKET",
              transactionType: "BUY",
            })
          }
        >
          Reset
        </Button>
        <Button onClick={handlePlaceOrder} disabled={isLoading}>
          {isLoading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}