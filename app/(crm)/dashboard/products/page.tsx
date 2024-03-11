/* eslint-disable react/no-unescaped-entities */
import React, { Suspense } from 'react'

import { getTable } from '@/app/services/dashboard/products/productsTable';
import { Titles } from '@/app/components/dashboard/Products/Titles';
import { Search } from '@/app/components/dashboard/Products/Search';
import Link from 'next/link';
import Pagination from '@/app/components/dashboard/Products/Pagination';
//import { searchParams } from 'next/navigation';

export default async function page({
    searchParams,
}: {
    searchParams?: {
        sortName?: string;
        sortDirection: string;
        query?: string;
        page?: string;
    }
    }) {   

    const currentPage = Number(searchParams?.page) || 1;
    const columns = ['art', 'title', 'category', 'amount', 'cost_price', 'price', 'price_2', 'price_3', 'bonuses', 'vitrine'];
    const { data, totalItems }: any = await getTable(columns, searchParams?.sortName, searchParams?.sortDirection, searchParams?.query, currentPage);

    return (
        <>
            <div className='p-2 flex justify-end gap-2'>


                <div className='flex flex-col justify-center'>
                    <Link href={'/dashboard/products/arrivals'} id="arrivals" data-dropdown-toggle="dropdownBgHover" className="text-slate-900 hover:text-white bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-lg px-2 py-2 inline-flex items-center" type="button">
                        Поставки
                    </Link>
                    {/* <button className='p-1 flex justify-center mt-2 border bg-lime-600 rounded-lg hover:text-white hover:bg-lime-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button> */}
                </div>
                <div className='flex flex-col'>
                    <button id="removeProduct" data-dropdown-toggle="dropdownBgHover" className=" text-slate-900 hover:text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-lg px-2 py-2 inline-flex items-center" type="button">
                        Списания
                    </button>
                    {/* <button className='p-1 flex justify-center mt-2 border bg-red-700 hover:bg-red-800 hover:text-white rounded-lg '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button> */}
                </div>
            </div>

            <div className='flex'>
                <Search />
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Titles columns={columns} />
                    <tbody>
                        {data?.map((item: any) => {

                            return (
                                <tr key={`1${item.art}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <th /* key={item.art} */ scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {item.art}
                                    </th>

                                    <td /* key={item.title} */ className="px-0 py-1 text-sm font-semibold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                                        <Link href={`/dashboard/products/${item.art}/edit`}>
                                            {item.title}
                                        </Link>
                                    </td>

                                    <td /* key={item.category} */ className="px-4 py-2 text-center">
                                        {item.category}

                                    </td>
                                    <td /* key={item.amount} */ className="px-4 py-2 text-center">
                                        {item.amount}
                                    </td>
                                    <td /* key={item.cost_price} */ className="px-4 py-2 text-center">
                                        {item.cost_price}
                                    </td>
                                    <td /* key={item.price} */ className="px-4 py-2 text-center">
                                        {item.price}
                                    </td>
                                    <td /* key={item.price_2} */ className="px-4 py-2 text-center">
                                        {item.price_2}
                                    </td>
                                    <td /* key={item.price_3} */ className="px-4 py-2 text-center">
                                        {item.price_3}
                                    </td>
                                    <td /* key={item.bonuses} */ className="px-4 py-2 text-center">
                                        {item.bonuses}
                                    </td>
                                    <td /* key={item.bonuses} */ className="px-4 py-2 text-center m-auto">
                                        {item.vitrine === true ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-auto mr-auto w-6 h-6 text-green-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-auto mr-auto w-6 h-6 text-red-300">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Pagination totalItems={totalItems} />

            </div >

        </>
    )
}
