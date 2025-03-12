import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  stepName: string;
  formData: Record<string, string>;
}

const initialState: FormState = {
  stepName: "",
  formData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    initializeForm: (state, action: PayloadAction<any>) => {
      state.stepName = action.payload.steps[0].name;
      state.formData = {};
    },
    nextStep: (state, action: PayloadAction<any>) => {
      const config = action.payload;
      const currentIndex = config.steps.findIndex((s: any) => s.name === state.stepName);
      if (currentIndex < config.steps.length - 1) {
        state.stepName = config.steps[currentIndex + 1].name;
      }
    },
    prevStep: (state, action: PayloadAction<any>) => {
      const config = action.payload;
      const currentIndex = config.steps.findIndex((s: any) => s.name === state.stepName);
      if (currentIndex > 0) {
        state.stepName = config.steps[currentIndex - 1].name;
      }
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { initializeForm, nextStep, prevStep, updateFormData } = formSlice.actions;
export default formSlice.reducer;
