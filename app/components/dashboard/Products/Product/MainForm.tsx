'use client'
import React from 'react'

export const MainForm = ({ art, data, setData }: any) => {
    const [isEdit, setIsEdit] = React.useState<boolean>(false);

    return (
        <>
            <form action={async function (e) {
                await setData(e);
                await setIsEdit(false);
            }}>
                <div className='flex flex-wrap gap-2'>
                    <label htmlFor="art" className='opacity-65 mb-2 block text-base font-medium text-slate-700'>
                        Арт.
                        <input
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
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
                            onChange={() => setIsEdit(true)}
                            className='disabled:opacity-80 text-center block w-24 py-2 px-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500'
                            type="number"
                            id="bonuses"
                            name="bonuses"
                            defaultValue={data.bonuses}
                        />
                    </label>
                </div>

                <input type='submit'
                    value='Сохранить'
                    className={`hover:cursor-pointer disabled:opacity-55 disabled:cursor-default mt-2 mb-2 px-4 py-2 bg-slate-200 rounded-full 
                    text-sm font-semibold text-slate-700 enabled:hover:text-slate-100
                     enabled:hover:bg-slate-500`}
                    disabled={!isEdit}
                />
                <hr />

            </form >
        </>
    )
}
