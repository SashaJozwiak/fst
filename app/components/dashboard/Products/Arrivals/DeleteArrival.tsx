'use client'
import React from 'react'
//import { deleteArrival } from '@/app/services/dashboard/products/arrivals/getArrivals'

export const DeleteArrivalButton = ({ art, deleteArrival }: { art: number, deleteArrival: any }) => {

    return (
        <button onClick={async () => {
            console.log(art)
            await deleteArrival(art);
        }}
            type='submit' className='border text-red-300 hover:bg-slate-200 m-auto rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
        </button>
    )
}
