"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultiStepForm from "@/app/components/Specialized/MultiStepForm";
import ProgressBar from "@/app/components/Reusable/ProgressBar";
import formConfig from "@/app/formConfig.json";
import { initializeForm } from "@/app/store/formSlice";
import { useIntl } from "react-intl";
import { useTheme } from "@/app/components/ThemeProvider";
import { useParams } from "next/navigation";

export default function FormPage() {
    const params=useParams()
    const locale=params.locale as string || "en";
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: any) => state.form.currentIndex) || 0;
  const intl = useIntl()

  useEffect(() => {
    dispatch(initializeForm(formConfig));
  }, [dispatch]);
  const itemlist = formConfig.steps.map(item => ({ title: item.name }))
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-10"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        className="w-full max-w-2xl shadow-md p-6 rounded-md"
        style={{ backgroundColor: "#ffffff", color: "black" }}
      >
        <h1 className="text-center text-2xl font-bold mb-4">{intl.formatMessage({ id: "title" })}</h1>
        <ProgressBar itemList={itemlist} />
        <MultiStepForm config={formConfig} locale={locale}/>
      </div>
    </div>
  );
}