// "use client";
// import { useSelector } from "react-redux";
// import formConfig from "../../formConfig.json";
// import { RootState } from "../../store/store";

// const ProgressBar = () => {
//   const stepName = useSelector((state: RootState) => state.form.stepName);
//   const currentIndex = formConfig.steps.findIndex((s) => s.name === stepName);
//   const progress = ((currentIndex + 1) / formConfig.steps.length) * 100;

//   return (
//     <div>
//       <div style={{ width: `${progress}%`, height: "10px", background: "green" }}></div>
//       <p>
//         {formConfig.steps[currentIndex].label} ({currentIndex + 1} of {formConfig.steps.length})
//       </p>
//     </div>
//   );
// };

// export default ProgressBar;

// "use client";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";

// interface ProgressBarProps {
//   config: any;
// }

// const ProgressBar = ({ config }: ProgressBarProps) => {
//   const stepName = useSelector((state: RootState) => state.form.stepName);
//   const currentIndex = config.steps.findIndex((s: any) => s.name === stepName);
//   const progress = ((currentIndex + 1) / config.steps.length) * 100;

//   return (
//     <div>
//       <div style={{ width: `${progress}%`, height: "10px", background: "green" }}></div>
//       <p>
//   {config.steps?.[currentIndex]?.label ?? "Step Unknown"} ({currentIndex + 1} of {config.steps?.length ?? 0})
// </p>
//     </div>
//   );
// };

// export default ProgressBar;


import React from "react";

interface ProgressBarProps {
  config: any; // Accept any JSON structure
  keyMap?: {
    stepsKey?: string;
    labelKey?: string;
  };
  currentIndex: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ config, keyMap, currentIndex }) => {
  const stepsKey = keyMap?.stepsKey || "steps"; // Default to 'steps'
  const labelKey = keyMap?.labelKey || "label"; // Default to 'label'

  const steps = config[stepsKey] || [];
  const progress = steps.length > 0 ? ((currentIndex + 1) / steps.length) * 100 : 0;
  const currentStep = steps[currentIndex] || {}; // Avoid undefined errors

  return (
    <div>
      <div style={{ width: `${progress}%`, height: "10px", background: "green" }}></div>
      <p>
        {currentStep[labelKey] || "Step"} ({currentIndex + 1} of {steps.length || "Unknown"})
      </p>
    </div>
  );
};

export default ProgressBar;
