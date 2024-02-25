/* eslint-disable react/no-unescaped-entities */
import React, { Suspense } from 'react'

import { getTable } from '@/app/services/dashboard/products/productsTable';
import { Titles } from '@/app/components/dashboard/Products/Titles';
import { Search } from '@/app/components/dashboard/Products/Search';
import Link from 'next/link';
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
    const columns = ['art', 'title', 'category', 'amount', 'cost_price', 'price', 'price_2', 'price_3', 'bonuses']
    //const columnsRu = ['Арт.', 'Название', 'Кол-во', 'Цена', 'Цена 2', 'Цена 3', 'Бонусы']
    const data: any = await getTable(columns, searchParams?.sortName, searchParams?.sortDirection, searchParams?.query);

    //console.log(data)

    return (
        <>
            <div className='p-2 flex justify-end gap-2'>

                {/* <button id="addProduct" data-dropdown-toggle="dropdownBgHover" className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-lg px-2 py-2 inline-flex items-center" type="button">
                    Поставщики
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ms-2 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button> */}
                <div className='flex flex-col justify-center'>
                    <Link href={'/dashboard/products/arrivals'} id="addProduct" data-dropdown-toggle="dropdownBgHover" className="text-slate-900 hover:text-white bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-lg px-2 py-2 inline-flex items-center" type="button">
                        Поставка
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ms-2 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                    <button className='flex justify-center mt-2 border bg-lime-600 rounded-lg hover:text-white hover:bg-lime-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col'>
                    <button id="addProduct" data-dropdown-toggle="dropdownBgHover" className=" text-slate-900 hover:text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-lg px-2 py-2 inline-flex items-center" type="button">
                        Списание
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ms-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                    </button>
                    <button className='flex justify-center mt-2 border bg-red-700 hover:bg-red-800 hover:text-white rounded-lg '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='flex'>
                <Search />
                <div className='flex h-10 pt-2'>
                    <button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" className="text-white bg-slate-500 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-2 py-1 inline-flex items-center" type="button">Категории
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>


                    <div id="dropdownBgHover" className="z-10 hidden w-48 bg-white rounded-lg shadow dark:bg-gray-700">
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input id="checkbox-item-4" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="checkbox-item-4" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input defaultChecked id="checkbox-item-5" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="checkbox-item-5" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Checked state</label>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label htmlFor="checkbox-item-6" className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Titles columns={columns} />
                    <tbody>
                        {data?.map((item: any) => {
                            return (
                                <tr key={item.art} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    {/* <td className="w-4 py-2 px-4">
                                        <div className="flex items-center">
                                            <input id={`checkbox-table-search-${item.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 " />
                                            <label htmlFor={`checkbox-table-search-${item.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td> */}

                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {item.art}
                                    </th>

                                    <td className="px-0 py-1 text-sm font-semibold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                                        <Link href={`/dashboard/products/${item.art}/edit`}>
                                            {item.title}
                                        </Link>
                                    </td>

                                    <td className="px-4 py-2 text-center">
                                        {item.category}

                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.amount}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.cost_price}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.price}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.price_2}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.price_3}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.bonuses}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div >
        </>
    )
}
