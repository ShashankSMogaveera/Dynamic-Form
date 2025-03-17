"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../components/Specialized/MultiStepForm";
import ProgressBar from "../components/Reusable/ProgressBar";
import formConfig from "../formConfig.json";
import { initializeForm } from "../store/formSlice";
import { useTheme } from "../components/ThemeProvider";

export default function FormPage() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => state.form.currentIndex) || 0;
 
  useEffect(() => {
    dispatch(initializeForm(formConfig));
  }, [dispatch]);
  const itemlist= formConfig.steps.map(item=> ({title: item.label}))
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-10"
      style={{
        backgroundColor: "var(--background)", // Background matches the theme
        color: "var(--foreground)", // Text color matches the theme
      }}
    >
      <div
        className="w-full max-w-2xl shadow-md p-6 rounded-md"
        style={{ backgroundColor: "#ffffff", color: "black" }} // Form stays white with black text
      >
        <h1 className="text-center text-2xl font-bold mb-4">Multi-Step Form</h1>
        {/* <ProgressBar config={formConfig} currentIndex={currentIndex} /> */}
        <ProgressBar itemList={itemlist}/>
        <MultiStepForm config={formConfig} />
      </div>
    </div>
  );
}