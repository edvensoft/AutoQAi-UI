// redux/collectionsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import  { createSlice } from "@reduxjs/toolkit";

interface Collection {
  id: string;
  name: string;
}

type TestCases = {
	id: string;
	test_case_id: string;
	name: string;
	steps: string;
	expected_output: string;
  test_case_chat_id?:string
}

interface CollectionsState {
  list: Collection[];
  testCases:TestCases[],
  activeCollectionId: string | null;
}

const initialState: CollectionsState = {
  list: [],
  testCases:[],
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
    setCollections:(state, action: PayloadAction<Collection[]>)=>{
      state.list = action.payload;
    },
    addTestCases:(state, action: PayloadAction<TestCases>)=>{
      state.testCases.push(action.payload);
    },
    setTestCases:(state, action: PayloadAction<TestCases[]>)=>{
      state.testCases = action.payload;
    },
    deleteTestCaseById:(state, action: PayloadAction<string>)=>{
      state.testCases = state.testCases.filter(item=>item.id !== action.payload);
    },
    setActiveCollection: (state, action: PayloadAction<string | null>) => {
      state.activeCollectionId = action.payload;
    },
  },
});

export const { addCollection, setActiveCollection,setCollections,setTestCases,addTestCases,deleteTestCaseById } = collectionsSlice.actions;
export default collectionsSlice.reducer;
