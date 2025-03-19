'use client';
import React from 'react';
import { Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { incrementCurrentByValue } from '@/app/store/ProgressSlice';
import { updateStepName } from '@/app/store/formSlice'; 

interface ProgressBarProps {
  title: string;
}

interface ProgressBarComponentProps {
  itemList: ProgressBarProps[];
}

const ProgressBar: React.FC<ProgressBarComponentProps> = ({ itemList }) => {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.progress.current);
  const isError = useSelector((state: RootState) => state.progress.isError);
  const steps = itemList.map((item) => item.title);

  function handleStepClick(stepIndex: number) {
    if (stepIndex <= current) { 
      dispatch(incrementCurrentByValue({ value: stepIndex }));
      dispatch(updateStepName(steps[stepIndex])); 
    }
  }
  

  return (
    <main className="my-4">
      <Steps
        current={current}
        status={isError ? 'error' : undefined}
        labelPlacement="vertical"
        onChange={handleStepClick} 
        items={itemList}
      />
    </main>
  );
};

export default ProgressBar;


// 'use client';
// import React from 'react';
// import { Steps } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/app/store/store';
// import { incrementCurrentByValue } from '@/app/store/ProgressSlice';
// import { updateStepName } from '@/app/store/formSlice';
// import { validateField } from '@/app/utils/validation'; // Import validation utility

// interface ProgressBarProps {
//   title: string;
// }

// interface ProgressBarComponentProps {
//   itemList: ProgressBarProps[];
//   config: any; // Add config prop for validation
// }

// const ProgressBar: React.FC<ProgressBarComponentProps> = ({ itemList, config }) => {
//   const dispatch = useDispatch();
//   const current = useSelector((state: RootState) => state.progress.current);
//   const isError = useSelector((state: RootState) => state.progress.isError);
//   const formData = useSelector((state: RootState) => state.form.formData);
//   const steps = itemList.map((item) => item.title);

//   const handleStepClick = (stepIndex: number) => {
//     if (stepIndex <= current) {
//       // Allow navigation to previous steps
//       dispatch(incrementCurrentByValue({ value: stepIndex }));
//       dispatch(updateStepName(steps[stepIndex]));
//     } else if (stepIndex === current + 1) {
//       // Validate current step before allowing navigation to the next step
//       const currentStepConfig = config.steps.find((s: any) => s.name === steps[current]);
//       let isValid = true;
//       currentStepConfig?.fields.forEach((field: any) => {
//         const errorMsg = validateField(field, formData[field.name] || "");
//         if (errorMsg) {
//           isValid = false;
//         }
//       });

//       if (isValid) {
//         dispatch(incrementCurrentByValue({ value: stepIndex }));
//         dispatch(updateStepName(steps[stepIndex]));
//       }
//     }
//   };

//   return (
//     <main className="my-4">
//       <Steps
//         current={current}
//         status={isError ? 'error' : undefined}
//         labelPlacement="vertical"
//         onChange={handleStepClick} // Use the updated handleStepClick
//         items={itemList}
//       />
//     </main>
//   );
// };

// export default ProgressBar;