// redux/collectionsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Collection {
  created_at?: string,
  id: string,
  name: string,
  project_id?: string,
  updated_at?: string,
  user_id?: number
}

type TestCases = {
  id: string;
  test_case_id?: string;
  name: string;
  steps: string;
  expected_output: string;
  test_case_chat_id?: string
}
type Chat = {
  checkId: string,
  // id: string,
  // test_cases:TestCases[]
  collection_id:string,
  // chatId: string,
  // test_case_chat_id: string,
  // chatId: string;
  user_message: string;
  generateMessage: string;
  showVTC: boolean;
  loading: boolean;

}

interface CollectionsState {
  list: Collection[];
  testCases: TestCases[],
  chats: Chat[],
  activeCollectionId: string | null;
}


const initialState: CollectionsState = {
  list: [],
  testCases: [],
  chats: [],
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
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      // console.log('setCollect', action.payload)
      state.list = action.payload;
      // if (action.payload.length > 0) {
      //   state.activeCollectionId = action.payload[0].id;
      // }
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      // console.log('add', action.payload)
      state.chats.push(action.payload);
    },
    updateChat: (state, action: PayloadAction<Chat>) => {
      // console.log('update', action.payload)

      const chat = state.chats.find((c) => c.checkId === action.payload.checkId);
      if (chat) {
        chat.generateMessage = action.payload.generateMessage;
        chat.showVTC = action.payload.showVTC
        chat.loading = action.payload.loading
      }
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {

      state.chats = action.payload;
    },
    addTestCases: (state, action: PayloadAction<TestCases>) => {
      state.testCases.push(action.payload);
    },
    setTestCases: (state, action: PayloadAction<TestCases[]>) => {
      state.testCases = action.payload;
    },
    deleteTestCaseById: (state, action: PayloadAction<string>) => {
      state.testCases = state.testCases.filter(item => item.id !== action.payload);
    },
    setActiveCollection: (state, action: PayloadAction<string | null>) => {
      state.activeCollectionId = action.payload;
    },
  },
});

export const { addCollection, setActiveCollection, setCollections, addChat, setChats, updateChat, setTestCases, addTestCases, deleteTestCaseById } = collectionsSlice.actions;
export default collectionsSlice.reducer;
