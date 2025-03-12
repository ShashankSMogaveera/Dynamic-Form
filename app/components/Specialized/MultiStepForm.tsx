// "use client";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { nextStep, prevStep, updateFormData } from "../../store/formSlice";
// import InputField from "../Reusable/InputField";
// import formConfig from "../../formConfig.json";
// import { RootState } from "../../store/store";
// import { validateField } from "../../utils/validation";

// const MultiStepForm = () => {
//   const dispatch = useDispatch();
//   const stepName = useSelector((state: RootState) => state.form.stepName);
//   const formData = useSelector((state: RootState) => state.form.formData) as { [key: string]: string };
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const currentStepConfig = formConfig.steps.find((s) => s.name === stepName);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const fieldConfig = currentStepConfig?.fields.find((f) => f.name === name);
//     const errorMsg = fieldConfig ? validateField(fieldConfig, value) : "";

//     setErrors((prev) => ({
//       ...prev,
//       [name]: errorMsg,
//     }));

//     dispatch(updateFormData({ [name]: value }));
//   };

//   const validateStep = (): boolean => {
//     let isValid = true;
//     const newErrors: { [key: string]: string } = {};

//     currentStepConfig?.fields.forEach((field) => {
//       const errorMsg = validateField(field, formData[field.name] || "");
//       if (errorMsg) {
//         isValid = false;
//         newErrors[field.name] = errorMsg;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleNext = () => {
//     if (validateStep()) {
//       dispatch(nextStep());
//     }
//   };

//   const handlePrev = () => dispatch(prevStep());

//   return (
//     <div>
//       <h2>{currentStepConfig?.label}</h2>
//       {currentStepConfig?.fields.map((field) => (
//         <InputField
//           key={field.name}
//           label={field.label}
//           type={field.type}
//           name={field.name}
//           value={formData[field.name] || ""}
//           onChange={handleChange}
//           error={errors[field.name]}
//         />
//       ))}
//       <div>
//         {formConfig.steps.findIndex((s) => s.name === stepName) > 0 && (
//           <button onClick={handlePrev} className="px-4 py-2 bg-gray-500 text-white rounded-md">
//             Previous
//           </button>
//         )}
//         {formConfig.steps.findIndex((s) => s.name === stepName) < formConfig.steps.length - 1 ? (
//           <button onClick={handleNext} className="px-4 py-2 bg-black text-white rounded-md ml-2">
//             Next
//           </button>
//         ) : (
//           <button className="px-4 py-2 bg-green-600 text-white rounded-md ml-2">
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MultiStepForm;

"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, updateFormData } from "../../store/formSlice";
import InputField from "../Reusable/InputField";
import { RootState } from "../../store/store";
import { validateField } from "../../utils/validation";

interface MultiStepFormProps {
  config: any; // You can define a stricter type if needed
}

const MultiStepForm = ({ config }: MultiStepFormProps) => {
  const dispatch = useDispatch();
  const stepName = useSelector((state: RootState) => state.form.stepName);
  const formData = useSelector((state: RootState) => state.form.formData) as { [key: string]: string };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentStepConfig = config.steps.find((s: any) => s.name === stepName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldConfig = currentStepConfig?.fields.find((f: any) => f.name === name);
    const errorMsg = fieldConfig ? validateField(fieldConfig, value) : "";

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));

    dispatch(updateFormData({ [name]: value }));
  };

  const validateStep = (): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    currentStepConfig?.fields.forEach((field: any) => {
      const errorMsg = validateField(field, formData[field.name] || "");
      if (errorMsg) {
        isValid = false;
        newErrors[field.name] = errorMsg;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      dispatch(nextStep(config));
    }
  };

  const handlePrev = () => dispatch(prevStep(config));

  return (
    <div>
      <h2>{currentStepConfig?.label}</h2>
      {currentStepConfig?.fields.map((field: any) => (
        <InputField
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
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
          <button className="px-4 py-2 bg-green-600 text-white rounded-md ml-2">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
