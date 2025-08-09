// redux/collectionsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import  { createSlice } from "@reduxjs/toolkit";

interface Collection {
  id: string;
  name: string;
}

interface CollectionsState {
  list: Collection[];
  activeCollectionId: string | null;
}

const initialState: CollectionsState = {
  list: [],
  activeCollectionId: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    addCollection: (state, action: PayloadAction<Collection>) => {
      state.list.push(action.payload);
      state.activeCollectionId = action.payload.id;
    },
    setActiveCollection: (state, action: PayloadAction<string | null>) => {
      state.activeCollectionId = action.payload;
    },
  },
});

export const { addCollection, setActiveCollection } = collectionsSlice.actions;
export default collectionsSlice.reducer;
