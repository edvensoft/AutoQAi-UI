import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Collection {
  id: string;
  name: string;
}

interface CollectionsState {
  list: Collection[];
}

const initialState: CollectionsState = {
    list: [],
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.list.push(action.payload);
    },
    // You can add more reducers like removeCollection, updateCollection, etc.
  },
});

export const { addCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
