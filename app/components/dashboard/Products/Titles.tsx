'use client'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export const Titles = ({ columns }: { columns: string[] }) => {

    const [sortDirection, setSortDirection] = React.useState(true);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSort = (item: string) => {
        setSortDirection(!sortDirection)
        const params = new URLSearchParams(searchParams);
        params.set('sortName', item);
        if (sortDirection) {
            params.set('sortDirection', 'ASC');
        } else {
            params.set('sortDirection', 'DESC');
        }
        replace(`${pathname}?${params.toString()}`);

    }

    const Button = ({ keyDiv, keySVG }: { keyDiv: string, keySVG: string }) => {
        return (
            <div key={`3${keyDiv}`} className='inline'>
                <svg key={`2${keySVG}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline w-3 h-3 ms-2 mb-[3px] cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
        </div >
        )
    }


    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {
                    columns.map((item: string) => {
                        return (
                            <th
                                key={item}
                                scope="col"
                                className="px-4 py-2 text-center">
                                <h2 key={`1${item}`} onClick={() => handleSort(item)}
                                    className="cursor-pointer inline"
                                >{item}</h2>
                                {item === 'category' ? <Button keyDiv={item} keySVG={item} /> : null}
                            </th>
                        )
                    }
                    )
                }
            </tr>
        </thead >

    )
}
