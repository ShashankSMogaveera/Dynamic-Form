'use client';
import React from 'react';
import { Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { setCurrentByValue, setError } from '@/app/store/ProgressSlice';
import { updateStepName } from '@/app/store/formSlice'; 

interface ProgressBarProps {
  title: string;
}

interface ProgressBarComponentProps {
  itemList: ProgressBarProps[];
}

const ProgressBar: React.FC<ProgressBarComponentProps> = ({ itemList }) => {
  const dispatch = useDispatch();
  const {current,isError,totalProgress} = useSelector((state: RootState) => state.progress);
  const steps = itemList.map((item) => item.title);

  function handleStepClick(value:number) {
    if(current>=steps.length) {
      alert('form already submitted')
    }else if (value <= totalProgress) { 
      dispatch(setError({ value: false }));
      dispatch(setCurrentByValue({ value: value }));
      dispatch(updateStepName(steps[value])); 
    }else{
      dispatch(setError({ value: false }));
      alert('fill all required data to navigate')
    }
  }
  
  // console.log(current)
  // console.log(steps[current])
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

