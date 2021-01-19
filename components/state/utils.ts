import { DefaultValue, useRecoilCallback } from "recoil";
import { cardWidth } from "../canvas/card/canvas-card";
import * as cardState from "./cards";
import { CardDimensions } from "./cards";

export const useCreateInitialCard = () =>
  useRecoilCallback(({ set }) => {
    return (dimensions: Partial<CardDimensions>) => {
      const id = "new-card" + new Date().getTime();
      set(cardState.initialCardValues, (cards) => ({
        ...cards,
        [id]: { id, ...dimensions },
      }));
    };
  });

export const useSetCardDimensions = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, dimensions: Partial<CardDimensions>) => {
      set(cardState.cardDimensions(id), (card) => ({
        ...card,
        ...dimensions,
      }));
    };
  });

export const useSetCardSettings = () =>
  useRecoilCallback(({ set }) => {
    return (id: string, settings: Partial<cardState.CardSettings>) => {
      set(cardState.cardSettings(id), (card) => ({
        ...card,
        ...settings,
      }));
    };
  });

export const useGetCardDimensions = () =>
  useRecoilCallback(({ snapshot }) => (id: string) => {
    return snapshot.getLoadable(cardState.cardDimensions(id)).contents;
  });

export const syncStorageEffect = () => ({ setSelf, trigger }) => {
  // Initialize atom value to the remote storage state
  if (trigger === "get") {
    // Avoid expensive initialization
    setSelf([
      { id: "alpha", x: 0, y: 0, width: cardWidth },
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
