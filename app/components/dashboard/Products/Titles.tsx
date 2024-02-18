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
        <>
            {
                columns.map((item: string) => {
                    return (
                        <th onClick={() => handleSort(item)}
                            key={item}
                            scope="col"
                            className="px-4 py-2 text-center cursor-pointer">
                            {item}
                        </th>
                    )
                }
                )
            }
        </>
    )
}
