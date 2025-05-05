import { useEffect, useRef } from 'react';

export function useWebSocket(url, token, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    // don’t even try to connect if no chat yet
    if (!url || url.endsWith('/ws/null')) return;

    const ws = new WebSocket(`${url}?token=${token}`);
    ws.onmessage = e => onMessage(JSON.parse(e.data));
    ws.onerror   = console.error;

    wsRef.current = ws;
    return () => ws.close();
  }, [url, token, onMessage]);

  return wsRef.current;
}
