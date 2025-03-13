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
    return (
            <main className=' my-4'>
                <Steps
                current={current}
                items={itemList}
                />
            </main>
    )
};

export default ProgressBar;
