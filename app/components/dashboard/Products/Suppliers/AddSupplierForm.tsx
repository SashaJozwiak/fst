
import React from 'react'

export const AddSupplierForm = ({ addSupplierFn }: any) => {
    return (
        <>
            <form action={async function (e) {
                'use server'
                await addSupplierFn(e)

            }}>
                <input id='name' name='name' className="m-2 px-2 border w-40" type="text" placeholder="Имя" />
                <input id='tel' name='tel' className="m-2 px-2 border w-40" type="text" placeholder="Телефон" />
                <input id='email' name='email' className="m-2 px-2 border w-40" type="text" placeholder="email" />
                <input id='comment' name='comment' className="m-2 px-2 border w-40" type="text" placeholder="comment" />
                <input type="submit" className='px-4 border bg-slate-200 hover:bg-slate-300 cursor-pointer rounded-lg' value='+' />
            </form>
        </>
    )
}
