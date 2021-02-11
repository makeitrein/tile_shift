import nookies from "nookies";
import { atom } from "recoil";
import { firebaseClient } from "../../firebaseClient";

export const authState = atom({
  key: "BOARD/board",
  default: null,
  effects_UNSTABLE: [
    ({ setSelf, get }) => {
      if (typeof window !== undefined) {
        (window as any).nookies = nookies;
      }
      return firebaseClient.auth().onIdTokenChanged(async (user) => {
        console.log(`token changed!`);
        if (!user) {
          console.log(`no token found...`);
          setSelf(null);
          nookies.destroy(null, "token");
          nookies.set(null, "token", "", {});
          return;
        }

        console.log(`updating token...`);
        const token = await user.getIdToken();
        setSelf(user);
        nookies.destroy(null, "token");
        nookies.set(null, "token", token, {});
      });
    },
    () => {
      const handle = setInterval(async () => {}, 10 * 60 * 1000);

      // clean up setInterval
      return () => clearInterval(handle);
    },
  ],
});
