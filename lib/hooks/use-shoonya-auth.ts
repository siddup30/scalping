"use client";

import { useState } from 'react';
import { shoonyaClient } from '@/lib/api/shoonya-client';
import { ShoonyaCredentials, LoginResponse } from '@/lib/types/shoonya';

export function useShoonyaAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);

  const login = async (credentials: ShoonyaCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await shoonyaClient.login(credentials);
      setLoginResponse(response);
      if (!response.status) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      return { status: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    loginResponse,
    isAuthenticated: !!loginResponse?.susertoken,
  };
}