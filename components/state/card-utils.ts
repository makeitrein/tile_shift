import { useRecoilCallback } from "recoil";
import { cardHeight, cardWidth } from "../canvas/card/card";
import * as cardState from "./cards";
import { Card, CardDimensions } from "./cards";

export const defaultCardValues: Card = {
  id: "",
  x: 0,
  y: 0,
  theme: "white",
  width: cardWidth,
  height: cardHeight,
  content: "",
  isDragging: false,
  isWysiwygEditorFocused: false,
};

export const cardId = () => "new-card" + new Date().getTime();

export const useCreateInitialCard = () =>
  useRecoilCallback(({ set }) => {
    return (dimensions: Partial<CardDimensions>, id?: string) => {
      set(cardState.initialCardValues, (cards) => ({
        ...cards,
        [id]: { ...defaultCardValues, id, ...dimensions },
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
