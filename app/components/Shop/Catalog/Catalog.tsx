import React from 'react'
import { getAllItems } from '@/app/services/shop/getItems'
import Image from 'next/image';

import s from './cat.module.css'

import { getAllPg } from '@/app/services/shop/getAllFromPg'


export default async function Catalog() {
    //const items = await getAllItems();

    const items: any = await getAllPg();

    return (
        <div className={s.cat} >
            {
                items.map((item: any) => {
                    console.log(item.img_link)
                    return (
                        <div key={item.art} className={s.item}>
                            <Image src={`/products_img/${item.img_link}.webp`}
                                className='h-48 mx-auto my-0 rounded-lg'
                                width={260} height={260}
                                //style={{ borderRadius: "20px", margin: "10px auto" }}
                                alt={`${item.title} image`}
                            />
                            <h3 className='w-full text-2xl text-slate-600'>{item.title}</h3>
                            <div className='flex w-full justify-around'>
                                <p className='px-1 block bg-slate-200 rounded-md text-2xl text-slate-800'>{Math.ceil(item.price)} ₽</p>
                                <p className='px-1 block bg-slate-100 rounded-md text-xl text-slate-500'>{Math.ceil(item.price_2)} ₽</p>
                                <p className='px-1 block bg-slate-100 rounded-md text-xl text-slate-500'>{Math.ceil(item.price_3)} ₽</p>
                            </div>

                            <div className='flex w-full justify-around'>
                                <button className='bg-slate-600 border py-1 px-4 mb-2 rounded-md text-slate-200'>В корзину</button>
                                <div className='text-slate-800 mt-2'>Бонусы: {item.bonuses}₽</div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}
