import { atom } from "recoil";

export const authState = atom({
  key: "AUTH/auth-state",
  default: null,
});

// Using context to manage authentication - Next.js was not happy about Recoil during SSR... AuthContext sets authState values in a useEffect, check out auth-context.tsx to see the flow
