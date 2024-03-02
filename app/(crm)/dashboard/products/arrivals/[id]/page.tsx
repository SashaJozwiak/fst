import React from 'react'
import Link from 'next/link';
import { getArrival, getSearchList } from '@/app/services/dashboard/products/arrivals/getArrivals';
import { Arrival } from '@/app/components/dashboard/Products/Arrivals/Arrival/Arrival';

type PostsPageSearchParams = {
    status: string;
    query?: string | undefined;
};
type Props = {
    params: { id: string };
    searchParams?: PostsPageSearchParams;
};

export default async function page(props: Props) {
    const art = props.params.id;
    const status = props.searchParams?.status;
    const query = props.searchParams?.query;

    const columns = ['Арт', 'Товар', 'Остаток', 'Кол-во', 'Цена сум.', 'Цена зак.', 'Цена розн.', 'Цена 2', 'Цена 3', 'Бонусы', `Уд.`];
    const data: any = await getArrival(art)
    const dataSearch: any = await getSearchList(query)
    console.log(data)
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
            <Arrival titles={columns} data={data} dataSearch={dataSearch} art={art} />
        </>

    )
}
