import React from 'react'
import Link from 'next/link'

export default function page() {
    return (
        <>
            <h1 className='mb-5 text-slate-400 cursor-default text-lg'>
                <Link className='text-slate-500 cursor-pointer hover:text-slate-400' href={'/dashboard/products'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-6 h-6 m-2 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Товары
                </Link> / Поставки
            </h1>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >text</h2>
                        </th>
                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >text2</h2>
                        </th>

                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >text3</h2>
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </>
    )
}
