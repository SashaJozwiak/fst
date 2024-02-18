/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import { getTable } from '@/app/services/dashboard/products/productsTable';
import { Titles } from '@/app/components/dashboard/Products/Titles';
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
    const columns = ['id', 'title', 'amount', 'price', 'price_2', 'price_3', 'bonuses']
    const columnsRu = ['Арт.', 'Название', 'Кол-во', 'Цена', 'Цена 2', 'Цена 3', 'Бонусы']
    const data: any = await getTable(columns, searchParams?.sortName, searchParams?.sortDirection);

    console.log(searchParams)

    return (
        <>
            <div className='p-4'>
                <h1>Dashboard - products</h1>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <Titles columns={columns} />
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item: any) => {
                            return (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 py-2 px-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 " />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>

                                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                        {item.id}
                                    </th>
                                    <td className="px-0 py-2 text-center">
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {item.amount}
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
