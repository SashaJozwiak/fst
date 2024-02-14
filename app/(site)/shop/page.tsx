import React from 'react'
import Catalog from '../../components/Shop/Catalog/Catalog'

import s from './navshop.module.css'

export default function page() {
    return (
        <div className="flex-col border-slate-700 m-auto mt-6 p-18 flex justify-center max-w-[1440px] h-full gap-3">

            <div className="flex justify-between  border-slate-700 items-center px-4 "> {/* bg-slate-300 hover:bg-slate-400 */}
                <button className={`${s.btn} bg-slate-100 hover:bg-slate-300 border-2 flex w-[60px] h-[40px] items-center border-slate-500 hover:border-slate-800 rounded-t-xl px-2`}>
                    {/* <span className={s.nav}></span> */}
                    <div className={`${s.menu} border-b-4 border-r-4 border-slate-500 hover:border-slate-800 w-[20px] h-[20px] m-auto mb-3 rounded-sm rotate-45 p-2`}></div>
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
