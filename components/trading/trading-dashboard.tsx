"use client";

import { Card } from "@/components/ui/card";
import OrderPanel from "./order-panel";
import WatchList from "./watchlist";
import PositionsPanel from "./positions-panel";
import TradeHistory from "./trade-history";

export default function TradingDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-6">
        <WatchList />
      </div>
      
      <div className="space-y-6 md:col-span-2">
        <Card className="p-6">
          <OrderPanel />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Positions</h2>
          <PositionsPanel />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trade History</h2>
          <TradeHistory />
        </Card>
      </div>
    </div>
  );
}