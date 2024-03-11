import React, { useEffect } from 'react'
import Link from 'next/link'

//import { finMarzha } from '@/app/services/dashboard/products/arrivals/finMnMarzha'

export const ArrivTable = ({ art, data, deleteProductFromList, dataList, setDataList, isUpdate, setIsUpdate, status }: any) => {
    //const [dataList, setDataList] = React.useState(data);

    function changeDataList(id: any, property: string, value: number) {
        //console.log(id, property, value)

        if (property === 'amount') {

            const result = dataList.map((item: any) => {
                return (
                    item.product_art === id ? {
                        ...item,
                        [property]: value,
                        'cost_price': (item.cost_price_sum / value).toFixed(2) || 0,
                        //'cost_price_sum': item.cost_price * item.amount || 0,
                    }
                        : item
                )
            }
            )
            return setDataList(result);
        }

        if (property === 'cost_price') {
            const result = dataList.map((item: any) => {

                return (
                    item.product_art === id ? {
                        ...item,
                        [property]: value,
                        //amount: item.cost_price_sum / value || 0,
                        'cost_price_sum': Number((value * item.amount).toFixed(2)) || 0,
                    }
                        : item
                )
            }
            )
            return setDataList(result);
        }

        if (property === 'cost_price_sum') {
            const result = dataList.map((item: any) => {
                return (
                    item.product_art === id ? {
                        ...item,
                        [property]: value,
                        //amount: value / item.cost_price || 0,
                        'cost_price': (value / item.amount).toFixed(2) || 0,
                    }
                        : item
                )
            }
            )
            return setDataList(result);
        } else {
            const result = dataList.map((item: any) => {
                return (
                    item.product_art === id ? {
                        ...item,
                        [property]: value
                    }
                        : item
                )
            }
            )
            return setDataList(result);
        }

    }

    const calcProcentArrPrice = (id: any, newPrice: any) => {
        const isOldPrice = (el: any) => {
            return el.product_art === id
        };
        const item: any = data.find(isOldPrice)

        const diffProcent = () => {
            if (item?.cost_price > 0) {
                return Number(newPrice / item.cost_price * 100 - 100).toFixed(2);
            }
            return 0
        }

        return +diffProcent();
    }

    const marzha = (sebest: any, price: any) => {

        const procentage = ((price - sebest) / sebest * 100).toFixed(2)
        if (sebest > 0) {
            return +procentage;
        }
        return 0;
    }

    const finMarzha = (lastPrice: any, bonuses: any, costPrice: any) => {
        const arrB: any = [];

        function sumBonuses(bon: any) {
            if (bon < 1) {
                return;
            }
            arrB.push(bon)
            sumBonuses(bon / 2)
        }

        sumBonuses(bonuses)
        const res = arrB.reduce((partialSum: any, a: any) => partialSum + a, 0)
        const finRes = (lastPrice - costPrice - res) / costPrice * 100

        if (costPrice > 0) {
            return +finRes.toFixed(2);
        }
        return 0;
    }

    return (
        <tbody>
            {dataList.map((item: any) => {
                return (
                    <tr key={item.product_art} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th className="px-4 py-2 text-center text-black">
                            {item.product_art}
                        </th>
                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                            <Link href={`/dashboard/products/${item.product_art}/edit`}>
                                {item.title}
                            </Link>
                        </td>

                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                            {item.curr_amount}
                        </td>

                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                            <input onChange={(e) => changeDataList(item.product_art, 'amount', Number(e.target.value))}
                                className='w-20 border text-center'
                                type='number'
                                step="0.10"
                                value={item.amount || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false}
                            />
                        </td>

                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                            <input onChange={(e) => changeDataList(item.product_art, 'cost_price_sum', Number(e.target.value))}
                                //id='cost_price_sum'
                                className='w-20 border text-center'
                                type='number'
                                step="0.10"
                                value={item.cost_price_sum || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false} />
                        </td>

                        <td className="relative px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                            <input onChange={(e) => changeDataList(item.product_art, 'cost_price', Number(e.target.value))}
                                //id='cost_price'
                                className='w-20 border text-center z-30'
                                type='number'
                                step="0.10"
                                value={item.cost_price || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false} />
                            <p className={`absolute bg-white ml-[25%] text-xs px-2 opacity-65 z-20 top-[-8.5px] cursor-default 
                            ${calcProcentArrPrice(item.product_art, item.cost_price) > 0 ? `text-red-300`
                                    : calcProcentArrPrice(item.product_art, item.cost_price) < 0 ? `text-green-500` : `text-slate-400`
                                }
                            `}>{calcProcentArrPrice(item.product_art, item.cost_price) || 0}%</p>
                        </td>

                        <td className="relative px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                            <input onChange={(e) => changeDataList(item.product_art, 'price', Number(e.target.value))}
                                className='w-20 border text-center z-30'
                                id='price'
                                type='number'
                                step="0.10"
                                value={item.price || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false} />
                            <p className={`absolute bg-white text-xs px-2 ml-[25%] opacity-65 z-20 top-[-8.5px] cursor-default 
                            ${marzha(item.cost_price, item.price) < 0 ? `text-red-300`
                                    : marzha(item.cost_price, item.price) > 0 ? `text-green-500` : `text-slate-400`
                                }
                            `}>{marzha(item.cost_price, item.price)}%</p>
                        </td>

                        <td className="relative px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                            <input onChange={(e) => changeDataList(item.product_art, 'price_2', Number(e.target.value))}
                                className='w-20 border text-center' type='number' step="0.10"
                                value={item.price_2 || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false} />
                            <p className={`absolute bg-white text-xs px-2 ml-[20%] opacity-65 z-20 top-[-8.5px] cursor-default 
                            ${marzha(item.cost_price, item.price_2) < 0 ? `text-red-300`
                                    : marzha(item.cost_price, item.price_2) > 0 ? `text-green-500` : `text-slate-400`
                                }
                            `}>{marzha(item.cost_price, item.price_2)}%</p>
                        </td>

                        <td className="relative px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                            <input onChange={(e) => changeDataList(item.product_art, 'price_3', Number(e.target.value))}
                                className=' w-20 border text-center' type='number' step="0.10"
                                value={item.price_3 || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false} />
                            <p className={`absolute bg-white text-xs px-2 ml-[20%] opacity-65 z-20 top-[-8.5px] cursor-default 
                            ${marzha(item.cost_price, item.price_3) < 0 ? `text-red-300`
                                    : marzha(item.cost_price, item.price_3) > 0 ? `text-green-500` : `text-slate-400`
                                }
                            `}>{marzha(item.cost_price, item.price_3)}%</p>
                        </td>

                        <td className="relative px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                            <input onChange={(e) => changeDataList(item.product_art, 'bonuses', Number(e.target.value))}
                                className='w-20 border text-center' type='number' step="0.10"
                                value={item.bonuses || 0}
                                disabled={status === 'Проведено' || status === 'Открыто' ? true : false} />
                            <p className={`absolute bg-white text-xs px-2 ml-[20%] opacity-65 z-20 top-[-8.5px] cursor-default 
                            ${finMarzha(item.price_3, item.bonuses, item.cost_price) < 0 ? `text-red-300`
                                    : finMarzha(item.price_3, item.bonuses, item.cost_price) > 0 ? `text-green-500` : `text-slate-400`
                                }
                            `}> {finMarzha(item.price_3, item.bonuses, item.cost_price)}%</p>
                        </td>

                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">
                            <button
                                onClick={async () => {
                                    await deleteProductFromList(item.product_art, art)
                                    await setIsUpdate(true);
                                }}
                                className='border text-red-300 hover:bg-slate-200 rounded-xl'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}
