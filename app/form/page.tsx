"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../components/Specialized/MultiStepForm";
import ProgressBar from "../components/Specialized/ProgressBar";
import formConfig from "../formConfig.json";
import { initializeForm } from "../store/formSlice";
import { useTheme } from "../components/ThemeProvider";

export default function FormPage() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => state.form.currentIndex) || 0; 
  const {theme}=useTheme()

  useEffect(() => {
    dispatch(initializeForm(formConfig));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-md p-6 rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4">Multi-Step Form</h1>
        <ProgressBar config={formConfig} currentIndex={currentIndex} />
        <MultiStepForm config={formConfig} />
      </div>
    </div>
  );
}
