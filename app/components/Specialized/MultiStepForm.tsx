"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, updateFormData,initializeForm } from "../../store/formSlice";
import InputField from "../Reusable/InputField";
import { RootState } from "../../store/store";
import { validateField } from "../../utils/validation";
import { decrementCurret, incrementCurrent, incrementCurrentByValue, setError } from "@/app/store/ProgressSlice";

interface MultiStepFormProps {
  config: any;
}

const MultiStepForm = ({ config }: MultiStepFormProps) => {
  const dispatch = useDispatch();
  const stepName = useSelector((state: RootState) => state.form.stepName);
  const formData = useSelector((state: RootState) => state.form.formData) as { [key: string]: string };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const currentStepConfig = config.steps.find((s: any) => s.name === stepName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    let finalValue = value;
    if (type === "checkbox") {
      finalValue = checked ? "true" : "false";
    }

    const fieldConfig = currentStepConfig?.fields.find((f: any) => f.name === name);
    const errorMsg = fieldConfig ? validateField(fieldConfig, finalValue) : "";

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));

    dispatch(updateFormData({ [name]: finalValue }));
  };

  const validateStep = (): boolean => {
    let isValid = true;
    dispatch(setError({value:false}));
    const newErrors: { [key: string]: string } = {};
    dispatch(setError({value:false}));
    currentStepConfig?.fields.forEach((field: any) => {
      const errorMsg = validateField(field, formData[field.name] || "");
      if (errorMsg) {
        isValid = false;
        dispatch(setError({value:true}));
        newErrors[field.name] = errorMsg;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      dispatch(nextStep(config));
      dispatch(incrementCurrent());
      console.log("next")
    }
  };

  const handlePrev = () => {
    dispatch(setError({value: false}));
    dispatch(prevStep(config));
    dispatch(decrementCurret())
  }

  const handleSubmit = () => {
    if (validateStep()) {
      localStorage.setItem("submittedFormData", JSON.stringify(formData));
      setSubmittedData(formData);
      dispatch(incrementCurrent());
      setIsSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false); 
    setSubmittedData(null); 
    dispatch(incrementCurrentByValue({value:0}));
    dispatch(initializeForm(config));
  };

  return (
    <div>
      
      {!isSubmitted ? (
        <>
          {/* <h2>{currentStepConfig?.label}</h2> */}
          {currentStepConfig?.fields.map((field: any) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              options={field.options}
              error={errors[field.name]}
            />
          ))}

          <div>
            {config.steps.findIndex((s: any) => s.name === stepName) > 0 && (
              <button onClick={handlePrev} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Previous
              </button>
            )}
            {config.steps.findIndex((s: any) => s.name === stepName) < config.steps.length - 1 ? (
              <button onClick={handleNext} className="px-4 py-2 bg-black text-white rounded-md ml-2">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-md ml-2">
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="mt-6 p-4 border rounded-md bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Submitted Data:</h3>
          <ul>
            {Object.entries(submittedData || {}).map(([key, value]) => (
              <li key={key} className="mb-1">
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <button onClick={handleResetForm} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Fill Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;

