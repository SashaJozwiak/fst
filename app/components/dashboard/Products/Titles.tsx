'use client'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const Titles = ({ columns }: any) => {

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

    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                {
                    columns.map((item: string) => {
                        return (
                            <th
                                key={item}
                                scope="col"
                                className="px-4 py-2 text-center">
                                <h2 onClick={() => handleSort(item)}
                                    className="cursor-pointer"
                                >{item}</h2>
                            </th>
                        )
                    }
                    )
                }
            </tr>
        </thead >

    )
}
