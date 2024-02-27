import React from 'react'
import { getAllItems } from '@/app/services/shop/getItems'
import Image from 'next/image';

import s from './cat.module.css'

import { getAllPg } from '@/app/services/shop/getAllFromPg'


export default async function Catalog() {
    //const items = await getAllItems();

    const items: any = await getAllPg();


    //console.log(items)

    return (
        <div className={s.cat} >
            {
                items.map((item: any) => {
                    return (
                        <div key={item.art} className={s.item}>
                            {/* <Image src={item.image}
                                className='h-48 mx-auto my-0'
                                width={180} height={180}
                                //style={{ borderRadius: "20px", margin: "10px auto" }}
                                alt={`${item.tlte} image`}
                            /> */}
                            {item.title}
                            <p>{Math.ceil(item.price)}</p>
                            <p>{Math.ceil(item.price_2)}</p>
                            <p>{Math.ceil(item.price_3)}</p>
                            <div>{item.bonuses}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
