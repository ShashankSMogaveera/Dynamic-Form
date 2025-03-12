"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../components/Specialized/MultiStepForm";
import ProgressBar from "../components/Specialized/ProgressBar";
import locationDetailsConfig from "../locationDetailsConfig.json";
import { initializeForm } from "../store/formSlice";
import { useTheme } from "../components/ThemeProvider";

export default function LocationDetailsPage() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => state.form.currentIndex) || 0; // Get current step index from Redux
  const {theme}=useTheme()

  useEffect(() => {
    dispatch(initializeForm(locationDetailsConfig));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-md p-6 rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4">Location Details Form</h1>
        <ProgressBar config={locationDetailsConfig} currentIndex={currentIndex} />
        <MultiStepForm config={locationDetailsConfig} />
      </div>
    </div>
  );
}
