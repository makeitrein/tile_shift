import { DefaultValue, useRecoilCallback } from "recoil";
import { canvasCard } from "./canvas";

export const useUpdateCard = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, data: Object) => {
      set(canvasCard(id), (card) => ({
        ...card,
        ...data,
      }));
    };
  });

export const useGetCard = () =>
  useRecoilCallback(({ snapshot }) => (id: string) => {
    return snapshot.getLoadable(canvasCard(id)).contents;
  });

export const syncStorageEffect = () => ({ setSelf, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === "get") {
    // Avoid expensive initialization
    setSelf([
      { id: "alpha", x: 0, y: 0 },
      { id: "betta", x: 150, y: 150 },
      { id: "kenny", x: 350, y: 350 },
    ]); // Call synchronously to initialize
  }
};

export const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  if (!process.browser) {
    return;
  }
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
