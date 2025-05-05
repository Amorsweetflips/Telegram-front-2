// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url, token, onMessage) {
  const ws = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) return;
    ws.current = new WebSocket(`${url}?token=${token}`);
    ws.current.onopen = () => setReady(true);
    ws.current.onmessage = (evt) => onMessage(JSON.parse(evt.data));
    ws.current.onclose = () => setReady(false);
    return () => ws.current.close();
  }, [url, token, onMessage]);

  return ready;
}
