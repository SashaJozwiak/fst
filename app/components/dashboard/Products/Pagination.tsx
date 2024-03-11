'use client'
import React from 'react'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/app/services/forall/pagination';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Pagination({ totalItems }: { totalItems: number }) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    //console.log(currentPage, totalItems);
    const allPages = generatePagination(currentPage, Math.ceil(totalItems / 10));

    //console.log(currentPage)
    //console.log(totalItems)
    //console.log(allPages)

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;

    };


    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4" aria-label="Table navigation">

            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <Link href={createPageURL(Number(currentPage - 1))} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight
                     text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100
                      hover:text-gray-700 ${currentPage < 2 && 'pointer-events-none text-gray-200'}`}>
                        <ArrowLeftIcon className='w-4' />
                    </Link>
                </li>

                {allPages.map((page: number | string, id: number) => {
                    return (
                        <li
                            key={String(page) + id}>
                            <Link href={createPageURL(Number(page))} className={`flex items-center justify-center px-3 h-8 leading-tight
                         text-gray-500 ${page === currentPage ? 'bg-slate-200' : 'bg-white'} border border-gray-300 hover:bg-slate-200 hover:text-gray-700
                          ${page === '...' && 'pointer-events-none text-gray-300'}`}>
                                {page}</Link>
                        </li>
                    )
                })}

                <li>
                    <Link href={createPageURL(Number(currentPage + 1))} className={`flex items-center justify-center 
                    px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 
                    rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${Math.ceil(totalItems / 10) <= currentPage && 'pointer-events-none text-gray-200'}`}>
                        <ArrowRightIcon className='w-4' />
                    </Link>
                </li>

            </ul>
        </nav>
    )
}
