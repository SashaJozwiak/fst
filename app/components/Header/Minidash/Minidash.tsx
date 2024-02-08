import React from 'react'
import Image from "next/image";


import basketSVG from "./../../../assets/icons/basket.svg"
import liginSVG from "../../../assets/icons/login.svg"

export const Minidash = () => {
    return (
        <div className="flex text-slate-300 leading-5 pb-0 justify-end">
            <button
                className={`hover:bg-slate-600 hover:text-slate-500 text-slate-200 `}>
                <h1 className='p-2 w-6/7'>
                    <Image
                        className="p-2 min-w-none max-w-none basis-2/3 rounded-t-xl "
                        src={liginSVG}
                        alt="login SVG"
                        width={50}
                        height={50}
                    />
                </h1>
            </button>

            <button
                className={`hover:bg-slate-600 hover:text-slate-500 `}>
                <h1 className='p-2 w-6/7'>
                    <Image
                        className="min-w-none max-w-none basis-2/3 rounded-t-xl  "
                        src={basketSVG}
                        alt="basket SVG"
                        width={50}
                        height={50}
                    />
                </h1>
            </button>
        </div>
    )
}
