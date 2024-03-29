import firebase from "firebase";
import { isEmpty } from "lodash";
import { db } from "../../firebaseClient";
import { TileContent, TileDimensions, TileSettings } from "./tiles";
export const tilesPath = "tiles";
export const arrowsPath = "arrows";

export const tileDimensionsRef = (tileId: string) =>
  db.ref(`${tilesPath}/${tileId}/dimensions`);
export const tileSettingsRef = (tileId: string) =>
  db.ref(`${tilesPath}/${tileId}/settings`);
export const tileContentRef = (tileId: string) =>
  db.ref(`${tilesPath}/${tileId}/content`);

export const setTileDimensionsRef = (tileId: string, data: TileDimensions) =>
  tileDimensionsRef(tileId).set(data);
export const updateTileDimensionsRef = (
  tileId: string,
  data: Partial<TileDimensions>
) => tileDimensionsRef(tileId).set(data);

export const setTileSettingsRef = (tileId: string, data: TileSettings) =>
  tileSettingsRef(tileId).set(data);
export const updateTileSettingsRef = (
  tileId: string,
  data: Partial<TileSettings>
) => tileSettingsRef(tileId).update(data);

export const setTileContentRef = (tileId: string, data: TileContent) =>
  tileContentRef(tileId).set(data);
export const updateTileContentRef = (
  tileId: string,
  data: Partial<TileDimensions>
) => tileContentRef(tileId).update(data);

export const arrowRef = (arrowId: string) => db.ref(`${arrowsPath}/${arrowId}`);

export const tilesRef = () => db.ref(tilesPath);
export const arrowsRef = () => db.ref(arrowsPath);

export const generateId = (basePath: string) => {
  const ref = db.ref(basePath);
  const newRef = ref.push();
  return newRef.key;
};

export const generateTileId = () => generateId(tilesPath);
export const generateArrowId = () => generateId(arrowsPath);
export const generateArrowRef = () => arrowRef(generateId(arrowsPath));

// const updater = firebaseClient.auth().currentUser?.uid || "";
const updater = "updater-" + Math.random();

export const syncData = (ref: firebase.database.Reference) => ({
  setSelf,
  onSet,
}) => {
  ref.on("value", (data) => {
    const value = data.val();
    if (!isEmpty(value) && value.updater !== updater) {
      setSelf(value);
    }
  });

  ref.once("value", (data) => {
    const value = data.val();
    if (!isEmpty(value)) {
      setSelf(value);
    }
  });

  onSet((tileInfo) => {
    ref.update({ ...tileInfo, updater });
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
