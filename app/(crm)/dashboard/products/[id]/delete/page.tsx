'use client'
import React from 'react';
import { deleteProduct } from "@/app/services/dashboard/products/product/getProduct";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function page({ params }: { params: { id: string } }) {
    const art = params.id;
    const [err, setErr] = React.useState<string>('');
    const { push } = useRouter();

    React.useEffect(() => {
        if (err === 'DELETE') {
            push('/dashboard/products/');
        }
    }, [err])

    return (
        <div className='flex flex-col item-center'>
            <h1 className='item-center m-auto'><span className='text-red-300'>Удалить</span> товар с артикулом {art}?</h1>
            <div className='flex flex-row justify-center gap-4'>
                <button className='mt-8 border py-2 px-8 rounded-lg bg-slate-400 hover:bg-slate-600 hover:text-slate-100'
                    onClick={async () => {
                        const delRes = await deleteProduct(art);
                        setErr(delRes)
                    }}
                >да</button>
                <Link className='mt-8 border py-2 px-8 rounded-lg bg-slate-400 hover:bg-slate-600 hover:text-slate-100'
                    href={`/dashboard/products/${art}/edit`}
                >нет</Link>
            </div>

            {err && err !== 'DELETE' && <p className='pt-8 text-red-300 text-center mt-auto mb-auto'>Нельзя. Товар присуствтует в документах поставок</p>}
        </div>
    )
}
