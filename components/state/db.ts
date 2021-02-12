import firebase from "firebase";
import { isEmpty, pick } from "lodash";
import { db } from "../../firebaseClient";

export const tilesPath = "tiles";
export const arrowsPath = "arrows";
export const tileRef = (tileId?: string) => db.ref(`${tilesPath}/${tileId}`);

export const tileChildRef = (
  ref: firebase.database.Reference,
  dataType: "dimensions" | "settings" | "content"
) => ref.child(dataType);

export const arrowRef = (arrowId?: string) =>
  db.ref(`${arrowsPath}/${arrowId}`);
export const generateTileRef = () => tileRef(generateTileId());
export const generateArrowRef = () => arrowRef(generateArrowId());
export const tilesRef = () => db.ref(tilesPath);
export const arrowsRef = () => db.ref(arrowsPath);

export const pushDatabaseId = (basePath: string) => {
  const ref = db.ref(basePath);
  const newRef = ref.push();
  return newRef.key;
};

export const generateTileId = () => pushDatabaseId(tilesPath);
export const generateArrowId = () => pushDatabaseId(arrowsPath);

export const syncData = (
  ref: firebase.database.Reference,
  properties: string[]
) => ({ setSelf, onSet }) => {
  ref.on("value", (data) => {
    const relevantData = pick(data.val(), properties);
    if (!isEmpty(relevantData)) {
      setSelf(relevantData);
    }
  });

  onSet((tileInfo) => {
    ref.update(tileInfo);
  });

  return () => {
    ref.off();
  };
};

export const syncIds = (ref: firebase.database.Reference) => ({
  setSelf,
  onSet,
  trigger,
}) => {
  ref.on("child_added", (data) => {
    setSelf((ids) => [...ids, data.key]);
  });

  return () => {
    ref.off();
  };
};
