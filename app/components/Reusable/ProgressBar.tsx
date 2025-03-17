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
    const dispatch= useDispatch();
    const current= useSelector((state: RootState)=> state.progress.current)
    const isError= useSelector((state: RootState)=> state.progress.isError)
    // function handleChange(value: number){
    //     dispatch(incrementCurrentByValue({value:value}));        
    // }
    return (
            <main className=' my-4'>
                <Steps
                current={current}
                status={isError ? 'error': undefined}
                items={itemList}
                labelPlacement='vertical'   
                          
                // onChange={handleChange}
                />
            </main>
    )
};

export default ProgressBar;
