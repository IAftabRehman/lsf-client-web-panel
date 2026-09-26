import { useState, useEffect } from 'react';
import { mcpSyncService } from '@/services/mcpSyncService';
import { StitchSyncPayload } from '@/types/stitch.types';

/**
 * Custom hook to stream and manage Stitch MCP project wireframes and design tokens
 */
export function useMcpProject() {
  const [data, setData] = useState<StitchSyncPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadMcpData() {
      try {
        setIsLoading(true);
        const payload = await mcpSyncService.getStitchSyncPayload();
        if (isMounted) {
          setData(payload);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadMcpData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
