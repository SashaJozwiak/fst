'use client'
import React, { useEffect } from 'react'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { addNewProduct, addProductToArrival, deleteProductFromList } from '@/app/services/dashboard/products/arrivals/getArrivals';
import { ArrivTable } from './ArrivTable';
import { saveData, getPaid } from '@/app/services/dashboard/products/arrivals/getArrival';

export const Arrival = ({ titles, data, dataSearch, art }: any) => {

    const [isAdd, setIsAdd] = React.useState(false); //можно добавить новый
    const [isHave, setIsHave] = React.useState(false); //товар уже есть в списке
    const [isUpdate, setIsUpdate] = React.useState(false); //можно вытянуть data из db
    const [isCredit, setIsCredit] = React.useState(false); // задолжность

    const [dataList, setDataList] = React.useState(data);
    const [status, setStatus] = React.useState('');

    const [dataSum, setDataSum] = React.useState(0);
    const [opl, setOpl] = React.useState(0);

    const [newProduct, setNewProduct] = React.useState('');//значение в поиске

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        //console.log(dataList);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sumToPay = () => {
        const sum: number = dataList.reduce((sum: number, el: any) => Number(el.cost_price_sum) + sum, 0)
        setDataSum(sum);
    }

    useEffect(() => {
        //if (isUpdate) {
            setDataList(data);
            setIsUpdate(false);
        //}



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, /* dataSum, sumToPay */ /* isUpdate, sumToPay */])

    useEffect(() => {
        sumToPay()
        if (opl < dataSum) {
            setIsCredit(true);
        } else {
            setIsCredit(false);
        }
    }, [dataSum, opl, sumToPay]);


    useEffect(() => {
        async function pay() {
            const paid: any = await getPaid(art)
            setOpl(paid);
        }
        pay()

    }, [art])

    useEffect(() => {
        const getDefaultStatus = async () => {
            const params = new URLSearchParams(searchParams);
            const status = params.get('status');
            setStatus(status || '');
        }

        getDefaultStatus();
    }, [searchParams]);

    //console.log(status)

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

                <ArrivTable art={art}
                    data={data}
                    deleteProductFromList={deleteProductFromList}
                    dataList={dataList}
                    setDataList={setDataList}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    status={status}
                />

            </table>
        </div>

        <div className='flex flex-row gap-2 items-center mt-2 m-auto flex-wrap justify-between'>

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
                {isAdd &&
                <button
                    onClick={async () => {
                        await addNewProduct(newProduct, art)
                            await setIsUpdate(true);
                    }
                    }
                    className='py-[5px] px-4 border bg-slate-300 rounded-lg hover:text-white hover:bg-slate-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            }
                {isHave && <p className='text-red-300'>Такой товар уже есть в документе</p>}
            </div>

            <div className='flex items-center gap-2 m-auto'>
                <button onClick={async () => {
                    await saveData(art, dataList, dataSum, opl, status)
                }}
                    className='font-semibold 
                m-auto border rounded-lg px-2 py-1 bg-slate-300 hover:bg-slate-500 hover:text-slate-200 text-slate-700
                '>
                    Сохранить
                </button>

                <select onChange={async (e) => {
                    const newStatus = e.target.value;
                    setStatus(newStatus);

                }}
                    value={status}
                    className='p-0 m-0 border'>
                    <option value="Черновик">Черновик</option>
                    <option value="Открыто">Открыто</option>
                    {!isCredit && <option value="Проведено">Проведено</option>}

                </select>
            </div>

            <div className='flex flex-col m-auto text-center text-slate-500 py-2'>

                <h1 className='text-center items-center'>Cумма:
                    &nbsp;{dataSum}
                    &nbsp;руб.
                </h1>
                <h1>Опл:&nbsp;
                    <input onChange={(e) => {
                        setOpl(Number(e.target.value))

                        if (opl < dataSum) {
                            setIsCredit(true);
                        } else {
                            setIsCredit(false);
                        }
                        //console.log(isCredit)

                    }}
                        type='number' step="0.10" value={opl}
                        className='w-20 border'>
                    </input>&nbsp;
                    руб.</h1>

            </div>
        </div>

        <ul className='rounded-xl mt-[-10px]'>
            {dataSearch?.length > 0 && dataSearch.map((item: any) => {
                return (
                    <li onClick={async () => {
                        const pArt = item.art;
                        const found = data.find((item: any) => item.product_art === pArt)

                        if (!found) {
                            await addProductToArrival(pArt, art)
                            setIsUpdate(true)

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
