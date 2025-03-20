"use client";
import { genderFetch } from "../../../public/genderFetch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, updateFormData, initializeForm, updateStepName } from "../../store/formSlice";
import InputField from "../Reusable/InputField";
import { RootState } from "../../store/store";
import { validateField } from "../../utils/validation";
import { decrementCurret, incrementCurrent, setCurrentByValue, setError, setTotalProgress } from "@/app/store/ProgressSlice";

interface MultiStepFormProps {
  config: any;
}



const MultiStepForm = ({ config }: MultiStepFormProps) => {
  const dispatch = useDispatch();
  const stepName = useSelector((state: RootState) => state.form.stepName);
  const formSteps = useSelector((state: RootState) => state.form.formSteps);
  const current = useSelector((state: RootState) => state.progress.current);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedData, setSubmittedData] = useState<{ [key: string]: any } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stepIndex = config.steps.findIndex((s: any) => {
    console.log('config step '+s.name);
    console.log("step name ",stepName);
    return s.name === stepName});
  console.log(stepIndex)
  useEffect(() => {
    if (stepIndex !== -1) {
      dispatch(updateStepName(config.steps[stepIndex].name));
    }
  }, [stepIndex, dispatch]);

  const [genders, setGenders] = useState<string[]>([]);

  const currentStepConfig = config.steps.find((s: any) => s.name === stepName);
  const formData = formSteps || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await genderFetch(); 
        setGenders(data.genders); 
      } catch (error) {
        console.error("Failed to fetch genders:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    let finalValue = type === "checkbox" ? (checked ? "true" : "false") : value;

    const fieldConfig = currentStepConfig?.fields.find((f: any) => f.name === name);
    const errorMsg = fieldConfig ? validateField(fieldConfig, finalValue) : "";

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));

    dispatch(updateFormData({ stepName, data: { [name]: finalValue } }));
  };

  const validateStep = (): boolean => {
    let isValid = true;
    dispatch(setError({value:false}));
    const newErrors: { [key: string]: string } = {};
    dispatch(setError({ value: false }));

    currentStepConfig?.fields.forEach((field: any) => {
      const errorMsg = validateField(field, formData[stepName]?.[field.name] || "");
      if (errorMsg) {
        isValid = false;
        dispatch(setError({ value: true }));
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
    }
  };

  const handlePrev = () => {
    dispatch(setError({ value: false }));
    dispatch(prevStep(config));
    dispatch(decrementCurret());
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Final Form Data Before Submission:", formData);
      localStorage.setItem("submittedFormData", JSON.stringify(formData));

      setSubmittedData({ ...formData });
      dispatch(incrementCurrent());
      setIsSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    dispatch(setCurrentByValue({ value: 0 }));
    dispatch(initializeForm(config));
    dispatch(setTotalProgress({value: 0}));
  };

  return (
    <div>
      {!isSubmitted ? (
        <>
          {currentStepConfig?.fields.map((field: any) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={formData[stepName]?.[field.name] || ""}
              onChange={handleChange}
              options={field.name === "gender" ? genders : field.options}
              error={errors[field.name]}
            />
          ))}

          <div>
            {stepIndex > 0 && (
              <button onClick={handlePrev} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Previous
              </button>
            )}
            {stepIndex < config.steps.length - 1 ? (
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
          {submittedData && Object.keys(submittedData).length > 0 ? (
            <ul>
              {Object.entries(submittedData).map(([step, data]) => (
                <li key={step} className="mb-2">
                  <strong>{step}:</strong>
                  <ul>
                    {data &&
                      Object.entries(data).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {String(value)}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data submitted</p>
          )}
          <button onClick={handleResetForm} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Fill Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
