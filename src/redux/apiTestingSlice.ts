// redux/collectionsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


interface ApiTestingState {
    currentStep: number;
    totalSteps: number;
    dataFetch: {
        loading: boolean;
        error: string | null;
        data: any;
    };
}

const initialState: ApiTestingState = {
    currentStep: 3,
    totalSteps: 6,
    dataFetch: {
        loading: false,
        error: null,
        data: null,
    },
};



const apiTestingSlice = createSlice({
    name: "steps",
    initialState,
    reducers: {
        nextStep: (state) => {
            if (state.currentStep < state.totalSteps) {
                state.currentStep += 1;
            }
        },
        prevStep: (state) => {
            if (state.currentStep > 1) {
                state.currentStep -= 1;
            }
        },
        goToStep: (state, action: PayloadAction<number>) => {
            const step = action.payload;
            if (step >= 1 && step <= state.totalSteps) {
                state.currentStep = step;
            }
        },
        resetSteps: (state) => {
            state.currentStep = 1;
        },
        fetchDataStart: (state) => {
            state.dataFetch.loading = true;
            state.dataFetch.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<any>) => {
            state.dataFetch.loading = false;
            state.dataFetch.data = action.payload;
        },
        fetchDataFailure: (state, action: PayloadAction<string>) => {
            state.dataFetch.loading = false;
            state.dataFetch.error = action.payload;
        },
        clearFetchData: (state) => {
            state.dataFetch = {
                loading: false,
                error: null,
                data: null,
            };
        },
    },
});


export const {
    nextStep,
    prevStep,
    goToStep,
    resetSteps,
    fetchDataStart,
    fetchDataSuccess,
    fetchDataFailure,
    clearFetchData, } = apiTestingSlice.actions;
export default apiTestingSlice.reducer;
