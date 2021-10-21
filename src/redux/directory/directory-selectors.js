import { createSelector } from "reselect";

const selectDir = (state) => state.mydirectory;

export const selectCollections = createSelector(
  selectDir,
  (dir) => dir.sections
);
