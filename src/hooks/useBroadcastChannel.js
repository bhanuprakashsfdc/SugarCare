import { useEffect, useRef, useCallback } from 'react';

export function useBroadcastChannel(channelName, onMessage) {
  const channelRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const channel = new BroadcastChannel(channelName);
    channelRef.current = channel;

    if (onMessage) {
      channel.onmessage = (event) => onMessage(event.data);
    }

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [channelName, onMessage]);

  const postMessage = useCallback((data) => {
    if (channelRef.current) {
      channelRef.current.postMessage(data);
    }
  }, []);

  return { postMessage };
}
