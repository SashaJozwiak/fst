import React from 'react'
import Catalog from '../components/Shop/Catalog/Catalog'

import s from './navshop.module.css'

export default function page() {
    return (
        <div className="flex-col border-slate-700 m-auto mt-6 p-18 flex justify-center max-w-[1440px] h-full gap-3">

            <div className="flex justify-between  border-slate-700 items-center px-4 ">
                <button className='flex w-[60px] h-[60px] items-center border-slate-700 rounded-xl bg-slate-300 hover:bg-slate-400 px-2'>
                    <span className={s.nav}></span>
                </button>
                <div>
                    search
                </div>
                <div>some filters</div>
            </div>
            <Catalog />
        </div>
    )
}
