"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useTradingStore } from "@/lib/store/trading-store";

export default function WatchList() {
  const [newSymbol, setNewSymbol] = useState("");
  const { watchlist, addToWatchlist, removeFromWatchlist } = useTradingStore();

  const handleAddSymbol = () => {
    if (newSymbol && !watchlist.includes(newSymbol)) {
      addToWatchlist(newSymbol.toUpperCase());
      setNewSymbol("");
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Watchlist</h2>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add symbol..."
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddSymbol()}
        />
        <Button onClick={handleAddSymbol} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {watchlist.map((symbol) => (
          <div
            key={symbol}
            className="flex justify-between items-center p-2 bg-secondary rounded-md"
          >
            <span className="font-medium">{symbol}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromWatchlist(symbol)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}