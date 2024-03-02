'use client'
import React from 'react'
import Link from 'next/link'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { addNewProduct, addProductToArrival, deleteProductFromList } from '@/app/services/dashboard/products/arrivals/getArrivals';
import { ArrivTable } from './ArrivTable';


export const Arrival = ({ titles, data, dataSearch, art }: any) => {
    const [isAdd, setIsAdd] = React.useState(false); //можно добавить новый
    const [isHave, setIsHave] = React.useState(false); //товар уже есть в списке

    const [newProduct, setNewProduct] = React.useState('');//значение в поиске

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(`Searching...${term}`);
        setNewProduct(term)
        setIsHave(false)

        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
            handleAdd(true)
        } else {
            params.delete('query');
            handleAdd(false)
        }

        replace(`${pathname}?${params.toString()}`);

    }, 800);

    const handleAdd = useDebouncedCallback((value: boolean) => {
        if (value === true && dataSearch.length === 0) {
            setIsAdd(true)
        } else if (value === false && dataSearch.length === 0) {
            setIsAdd(false)
        }
        else if (value === true && dataSearch.length !== 0) {
            setIsAdd(false)
        } else if (value === false && dataSearch.length !== 0) {
            setIsAdd(value)
        }
    }, 1000)

    return (<>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {titles.map((title: any) => {
                            return (
                                <td key={title} scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >{title}</h2>
                                </td>
                            )
                        })}
                    </tr>
                </thead>

                <ArrivTable art={art} data={data} deleteProductFromList={deleteProductFromList} />

            </table>
        </div>

        <div className='flex flex-row gap-2 item-center mt-4 flex-wrap'>

            <div className='flex flex-row items-center gap-2 '>
                <form className="max-w-60 mx-left">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => handleSearch(e.target.value)} type="search" id="default-search"
                            className="outline-none block w-full ps-10  text-slate-900 border-2 border-slate-300 
                        rounded-lg bg-gray-50 focus:ring-slate-500 focus:border-slate-500"
                            placeholder="Найти товар..." autoComplete='off' required />
                    </div>
                </form>
                {isHave && <p className='text-red-300'>Такой товар уже есть в документе</p>}
            </div>

            {isAdd &&
                <button
                    onClick={async () => {
                        await addNewProduct(newProduct, art)
                    }
                    }
                    className='py-[5px] px-4 border bg-slate-300 rounded-lg hover:text-white hover:bg-slate-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            }

            <button className='font-semibold 
                m-auto border rounded-lg px-2 py-1 bg-slate-400 hover:bg-slate-600 hover:text-slate-200 text-slate-700
                '>Сохранить</button>

            <div className='ml-auto item-center text-center text-slate-500 py-2'>
                <h1 className='text-center item-center'>Cумма: 00000</h1>
            </div>
        </div>

        <ul className='rounded-xl pt-1'>
            {dataSearch?.length > 0 && dataSearch.map((item: any) => {
                return (
                    <li onClick={async () => {
                        const pArt = item.art;
                        const found = data.find((item: any) => item.product_art === pArt)

                        if (!found) {
                            await addProductToArrival(pArt, art)
                        } else {
                            setIsHave(true)
                        }
                    }}
                        key={item.art}
                        className='bg-slate-100 hover:bg-slate-300 ps-2 w-72 cursor-pointer'
                    >
                        <span className='font-semibold'>{item.art}</span> {item.title}
                    </li>
                )
            })
            }
        </ul>
    </>
    )
}
