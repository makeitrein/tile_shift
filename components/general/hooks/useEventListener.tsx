import { useEffect, useRef } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
/**
 * useEventListener
 * Hook for handling EventListeners
 * @return {object} width, height
 */
export function useEventListener(
  eventName: string,
  handler: (props: any) => void,
  element: HTMLElement | Window = window,
  passive: boolean = true
) {
  // Create a ref that stores handler
  const savedHandler = useRef(null);

  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener, { passive });

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
