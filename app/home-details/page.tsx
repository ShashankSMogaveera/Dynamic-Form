"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "../components/Specialized/MultiStepForm";
import Homedetails from "../homeDetails.json"
import { initializeForm } from "@/app/store/formSlice";
import ProgressBar from "../components/Reusable/ProgressBar";

export default function HomeDetailsPage() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => state.form.currentIndex) || 0;
  const itemList= Homedetails.steps.map(item=> ({title: item.name}));
  useEffect(() => {
    dispatch(initializeForm(Homedetails));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-md p-6 rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4">HomeDetails Form</h1>
        <ProgressBar itemList={itemList}/>
        <MultiStepForm config={Homedetails} />
      </div>
    </div>
  );
}
