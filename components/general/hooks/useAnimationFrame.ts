import { useEffect } from "react";

export const useAnimationFrame = (cb: () => void, fps: number = 40) =>
  useEffect(() => {
    let now;
    let then = Date.now();
    let interval = 1000 / fps;
    let delta;

    function invokeCallback() {
      requestAnimationFrame(invokeCallback);

      now = Date.now();
      delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);

        cb();
      }
    }

    invokeCallback();
  }, [fps, cb]);

export const useAnimationFrameInfinite = (cb: () => void) =>
  useEffect(() => {
    function invokeCallback() {
      requestAnimationFrame(cb);

      requestAnimationFrame(invokeCallback);
    }

    invokeCallback();
  }, [cb]);
