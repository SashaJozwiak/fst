import React from 'react'
import Link from 'next/link';
import { getArrival } from '@/app/services/dashboard/products/arrivals/getArrivals';

type PostsPageSearchParams = {
    status?: string;
};
type Props = {
    params: { id: string };
    searchParams: PostsPageSearchParams;
};

export default async function page(props: Props

) {
    const art = props.params.id;
    const status = props.searchParams.status;

    const data: any = await getArrival(art)

    console.log(art)
    console.log(status)

    return (
        <>
            <h1 className='mb-5 text-slate-400 cursor-default text-lg'>
                <Link className='text-slate-500 cursor-pointer hover:text-slate-400' href={'/dashboard/products/arrivals'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-6 h-6 mb-2 mx-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Поставки
                </Link> / Акт поставки № {art} ({status})
            </h1>
            <div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >Арт.</h2>
                                </th>
                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >Товар</h2>
                                </th>

                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >Кол-во</h2>
                                </th>

                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >Цена/ед.</h2>
                                </th>

                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >Цена/сум</h2>
                                </th>



                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >add</h2>
                                </th>

                                <th scope="col"
                                    className="px-4 py-2 text-center">
                                    <h2
                                        className="cursor-pointer inline"
                                    >add</h2>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item: any) => {
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
                                            {/* {item.amount} */}
                                            <input className='w-20 border text-center' type='number' step="0.10"
                                                defaultValue={item.amount || 0} />
                                        </td>

                                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                                            <input className='w-20 border text-center' type='number' step="0.10"
                                                defaultValue={item.cost_price || 0} />
                                        </td>

                                        <td className="px-0 py-1 text-sm font-bold text-center text-slate-500 hover:text-slate-800 border-dotted border-slate-500 border-b-1">

                                            <input className='w-20 border text-center' type='number' step="0.10"
                                                defaultValue={item.cost_price_sum || 0} />
                                        </td>




                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>

        </>

    )
}
