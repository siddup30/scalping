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

export default function PositionsPanel() {
  const { positions } = useTradingStore();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Avg Price</TableHead>
            <TableHead>Current</TableHead>
            <TableHead>P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.symbol}>
              <TableCell className="font-medium">{position.symbol}</TableCell>
              <TableCell>{position.quantity}</TableCell>
              <TableCell>{position.averagePrice.toFixed(2)}</TableCell>
              <TableCell>{position.currentPrice.toFixed(2)}</TableCell>
              <TableCell
                className={position.pnl >= 0 ? "text-green-600" : "text-red-600"}
              >
                {position.pnl.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}