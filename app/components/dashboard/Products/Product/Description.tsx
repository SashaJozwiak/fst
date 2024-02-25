'use client'

import React from 'react'

export const Description = ({ description, setDescription }: any) => {
    const [isEdit, setIsEdit] = React.useState<boolean>(false);

    return (
        <>
            <form action={async function (e) {
                await setDescription(e);
                await setIsEdit(false);
            }}>
                <label htmlFor="description" className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Описание товара</label>
                <textarea onChange={() => setIsEdit(true)} name="description" id="description" rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
                        border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Описать товар..." defaultValue={description || `Нет описания`} />
                <input type='submit' value='Сохранить'
                    className='hover:cursor-pointer disabled:opacity-55 disabled:cursor-default mt-2 mb-2 px-4 py-2 bg-slate-200 rounded-full 
                text-sm font-semibold text-slate-700 enabled:hover:text-slate-100
                 enabled:hover:bg-slate-500'
                    disabled={!isEdit}
                />
            </form >
        </>
    )
}
