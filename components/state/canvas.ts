import { memoizeOne } from "memoize-one";
import { atom } from "recoil";

const cardWithID = memoizeOne((id) =>
  atom({
    key: id,
    default: "", // default value (aka initial value)
  })
);
