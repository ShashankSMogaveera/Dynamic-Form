import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepData {
  [key: string]: Record<string, string>; 
}

interface FormState {
  stepName: string;
  formSteps: StepData; 
}

const initialState: FormState = {
  stepName: "",
  formSteps: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    initializeForm: (state, action: PayloadAction<any>) => {
      const steps = action.payload.steps;
      state.stepName = steps[0].name;
      state.formSteps = steps.reduce((acc: StepData, step: any) => {
        acc[step.name] = {}; 
        return acc;
      }, {});
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
    updateFormData: (state, action: PayloadAction<{ stepName: string; data: Record<string, string> }>) => {
      const { stepName, data } = action.payload;
      if (state.formSteps[stepName]) {
        state.formSteps[stepName] = { ...state.formSteps[stepName], ...data };
      }
    },
    updateStepName: (state, action: PayloadAction<string>) => {
      state.stepName = action.payload;
    },
  },
});

export const { initializeForm, nextStep, prevStep, updateFormData, updateStepName } = formSlice.actions;
export default formSlice.reducer;
