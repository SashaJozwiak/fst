import { changeProduct, getProduct } from '@/app/services/dashboard/products/product/getProduct';
import Image from 'next/image';
import React from 'react'

import { Img } from './img';

import { writeFile } from 'fs/promises'
import { join } from 'path'

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';


export default async function page({ params }: { params: { id: string } }) {
    const art = params.id;
    console.log(art)

    const data: any = await getProduct(art)
    console.log(data)

    async function upload(FormData: FormData) {
        'use server'

        console.log(FormData)
        const file: File | null = FormData.get('img') as unknown as File
        console.log(file);

        if (!file) {
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // With the file data in the buffer, you can do whatever you want with it.
        // For this, we'll just write it to the filesystem in a new location
        const path = join('/2024/shop/public', 'products_img', `${data.img_link}.webp`)
        await writeFile(path, buffer)
        console.log(`open ${path} to see the uploaded file`)


        revalidatePath(`/product/${data.img_link}/edit`);
        redirect(`/dasboard/products/${data.img_link}/edit`);

        //return { success: true };
    }

    async function getData(FormData: FormData) {
        'use server'
        console.log(FormData)
        const newData = {
            title: FormData.get('title'),
            category: FormData.get('category'),
            izm: FormData.get('izm'),
            price: FormData.get('price'),
            price_2: FormData.get('price_2'),
            price_3: FormData.get('price_3'),
            bonuses: FormData.get('bonuses'),
        }

        console.log(newData)

        changeProduct(art, newData);
        //redirect(`/product/${art}/edit`)
        revalidatePath(`/product/${art}/edit`);

    }

    return (
        <>
            <h1 className='mb-5 text-slate-400 cursor-default text-lg'>
                <Link className='text-slate-500 cursor-pointer hover:text-slate-400' href={'/dashboard/products'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-6 h-6 m-2 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Товары </Link>
                / {data.title} арт. {art}</h1>
            <form action={getData}>
                <div className='flex flex-wrap gap-2'>
                    <label htmlFor="art" className='opacity-65 mb-2 block text-base font-medium text-slate-700'>
                        Арт.
                        <input
                            className='disabled:opacity-65 block w-16 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="art"
                            name="art"
                            placeholder="Артикул"
                            disabled={true}
                            defaultValue={art}
                        />
                    </label>

                    <label htmlFor="title" className='mb-2 block text-base font-medium text-slate-700'>
                        Название
                        <input
                            className='block w-64 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 '
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Title"
                            defaultValue={data.title}
                        />
                    </label>

                    <label htmlFor="category" className='mb-2 block text-base font-medium text-slate-700'>
                        Категория
                        <select
                            className='block w-64 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 '
                            name="category"
                            id='category'
                            defaultValue={data.category}
                        >

                            <option value="цветы">Цветы</option>
                            <option value="букеты">Букеты</option>
                        </select>
                    </label>
                </div>

                <div className='flex flex-wrap gap-2'>



                    <label htmlFor="amount" className='mb-2 block text-base font-medium text-slate-700 opacity-65'>
                        Количество
                        <input
                            className='disabled:opacity-80 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="amount"
                            name="amount"
                            disabled={true}
                            defaultValue={data.amount}
                        />
                    </label>

                    <label htmlFor="cost_price_one" className='mb-2 block text-base font-medium text-slate-700 opacity-65'>
                        Себест. ед.
                        <input
                            className='disabled:opacity-65 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="cost_price_one"
                            name="cost_price_one"
                            disabled={true}
                            defaultValue={150.00}
                        />
                    </label>

                    <label htmlFor="cost_price_sum" className='opacity-65 mb-2 block text-base font-medium text-slate-700'>
                        Себест. сум
                        <input
                            className='disabled:opacity-65 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="cost_price_sum"
                            name="cost_price_sum"
                            disabled={true}
                            defaultValue={1500}
                        />
                    </label>

                    <label htmlFor="cost_price_procent" className='opacity-65 mb-2 block text-base font-medium text-slate-700'>
                        Мин.нац. %
                        <input
                            className='disabled:opacity-65 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="cost_price_procent"
                            name="cost_price_procent"
                            disabled={true}
                            defaultValue={30}
                        />
                    </label>

                    <label htmlFor="cost_price_procent_max" className=' opacity-65 mb-2 block text-base font-medium text-slate-700'>
                        Макс.нац. %
                        <input
                            className='disabled:opacity-65 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="cost_price_procent_max"
                            name="cost_price_procent_max"
                            disabled={true}
                            defaultValue={100}
                        />
                    </label>

                    <label htmlFor="min_profit" className=' opacity-65 mb-2 block text-base font-medium text-slate-700'>
                        Мин.прибыль
                        <input
                            className='disabled:opacity-65 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="min_profit"
                            name="min_profit"
                            disabled={true}
                            defaultValue={100}
                        />
                    </label>
                </div>

                <div className='flex flex-wrap gap-2'>
                    <label htmlFor="izm" className='mb-2 block text-base font-medium text-slate-700'>
                        Ед. изм.
                        <select
                            className='block w-20 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 '
                            name="izm"
                            id='izm'
                            defaultValue='шт.'
                        >

                            <option value="шт.">шт.</option>
                            <option value="м.">м.</option>
                            <option value="доли">доли</option>
                            <option value="вес">вес</option>
                        </select>
                    </label>

                    <label htmlFor="price" className='mb-2 block text-base font-medium text-slate-700'>
                        Цена 1
                        <input
                            className='disabled:opacity-80 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            defaultValue={data.price}
                        />
                    </label>

                    <label htmlFor="price_2" className='mb-2 block text-base font-medium text-slate-700'>
                        Цена 2
                        <input
                            className='disabled:opacity-80 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="price_2"
                            name="price_2"
                            defaultValue={data.price_2}
                        />
                    </label>


                    <label htmlFor="price_3" className='mb-2 block text-base font-medium text-slate-700'>
                        Цена 3
                        <input
                            className='disabled:opacity-80 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            id="price_3"
                            type="number"
                            name="price_3"
                            defaultValue={data.price_3}
                        />
                    </label>

                    <label htmlFor="bonuses" className='mb-2 block text-base font-medium text-slate-700'>
                        Бонусы
                        <input
                            className='disabled:opacity-80 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="bonuses"
                            name="bonuses"
                            defaultValue={data.bonuses}
                        />
                    </label>



                </div>

                <input type='submit'
                    value='save'
                    className='mt-2 px-4 mx-[20%] py-2 bg-slate-200 rounded-full 
                    text-sm font-semibold text-slate-700 hover:text-slate-100
                     hover:bg-slate-500'
                />

            </form >


            <Img imgLink={data.img_link} uploadFn={upload} />

        </>
    )
}
