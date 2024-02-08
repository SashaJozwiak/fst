import React from 'react'
import { getAllItems } from '@/app/services/shop/getItems'
import Image from 'next/image';

import s from './cat.module.css'


export default async function Catalog() {
    const items = await getAllItems();

    console.log(items)

    return (
        <div className={s.cat} >
            {
                items.map((item: any) => {
                    return (
                        <div key={item.id} className={s.item}>
                            <Image src={item.image}
                                className='h-48 mx-auto my-0'
                                width={180} height={180}
                                //style={{ borderRadius: "20px", margin: "10px auto" }}
                                alt={`${item.tlte} image`}
                            />
                            {item.title}
                        </div>
                    )
                })
            }
        </div>
    )
}
