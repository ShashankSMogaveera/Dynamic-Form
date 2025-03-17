// import React from "react";

// interface ProgressBarProps {
//   config: any; 
//   keyMap?: {
//     stepsKey?: string;
//     labelKey?: string;
//   };
//   currentIndex: number;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ config, keyMap, currentIndex }) => {
//   const stepsKey = keyMap?.stepsKey || "steps"; 
//   const labelKey = keyMap?.labelKey || "label"; 

//   const steps = config[stepsKey] || [];
//   const progress = steps.length > 0 ? ((currentIndex + 1) / steps.length) * 100 : 0;
//   const currentStep = steps[currentIndex] || {}; 
//   return (
//     <div>
//       <div style={{ width: `${progress}%`, height: "10px", background: "green" }}></div>
//       <p>
//         {currentStep[labelKey] || "Step"} ({currentIndex + 1} of {steps.length || "Unknown"})
//       </p>
//     </div>
//   );
// };

// export default ProgressBar;
