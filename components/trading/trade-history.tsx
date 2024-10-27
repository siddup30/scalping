"use client";

import { useTradingStore } from "@/lib/store/trading-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function TradeHistory() {
  const { tradeHistory } = useTradingStore();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                {format(new Date(trade.timestamp), "HH:mm:ss")}
              </TableCell>
              <TableCell className="font-medium">{trade.symbol}</TableCell>
              <TableCell
                className={
                  trade.type === "BUY" ? "text-green-600" : "text-red-600"
                }
              >
                {trade.type}
              </TableCell>
              <TableCell>{trade.quantity}</TableCell>
              <TableCell>{trade.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}