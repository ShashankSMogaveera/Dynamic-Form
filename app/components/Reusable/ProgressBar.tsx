'use client'
import React, { useState } from 'react';
import { Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { incrementCurrentByValue } from '@/app/store/ProgressSlice';

interface ProgressBarProps {
  title: string;
}

interface ProgressBarComponentProps {
  itemList: ProgressBarProps[];
}

const ProgressBar: React.FC<ProgressBarComponentProps> = ({ itemList }) => {
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
