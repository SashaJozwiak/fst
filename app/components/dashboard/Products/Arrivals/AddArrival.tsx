'use client'
import React from 'react'
import { addArrival } from '@/app/services/dashboard/products/arrivals/getArrivals';

export const AddArrival = () => {
    return (
        <button onClick={async () => {
            await addArrival();
        }}
            className='p-4 bg-slate-200 hover:bg-slate-400 hover:text-white rounded-lg mb-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
    )
}
