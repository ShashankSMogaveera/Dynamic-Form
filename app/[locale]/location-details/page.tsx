"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../../components/Specialized/MultiStepForm";
import ProgressBar from "../../components/Reusable/ProgressBar";
import locationDetailsConfig from "../../locationDetailsConfig.json";
import { initializeForm } from "../../store/formSlice";
import { useTheme } from "../../components/ThemeProvider";

export default function LocationDetailsPage({ params }: { params: { locale: string } }) {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => state.form.currentIndex) || 0; 
  const {theme}=useTheme()
  const itemList = locationDetailsConfig.steps.map(item => ({title: item.name}))

  useEffect(() => {
    dispatch(initializeForm(locationDetailsConfig));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-md p-6 rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4">Location Details Form</h1>
        <ProgressBar itemList={itemList}/>
        <MultiStepForm config={locationDetailsConfig} locale={params.locale}/>
      </div>
    </div>
  );
}
