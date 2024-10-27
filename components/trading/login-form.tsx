"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useShoonyaAuth } from "@/lib/hooks/use-shoonya-auth";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    userId: "",
    password: "",
    apiKey: "",
    vendorCode: "",
  });

  const { login, isLoading, error } = useShoonyaAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Login to Shoonya</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">User ID</label>
          <Input
            required
            value={credentials.userId}
            onChange={(e) =>
              setCredentials({ ...credentials, userId: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">API Key</label>
          <Input
            required
            value={credentials.apiKey}
            onChange={(e) =>
              setCredentials({ ...credentials, apiKey: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Vendor Code (Optional)</label>
          <Input
            value={credentials.vendorCode}
            onChange={(e) =>
              setCredentials({ ...credentials, vendorCode: e.target.value })
            }
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Card>
  );
}