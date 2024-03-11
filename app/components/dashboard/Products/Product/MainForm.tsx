'use client'
import React from 'react'

//import { finMarzha } from '@/app/services/dashboard/products/arrivals/finMnMarzha';

export const MainForm = ({ art, data, setData, categories }: any) => {

    const [newCat, setNewCat] = React.useState('');

    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<boolean>(data.vitrine);

    const finMarzha = (lastPrice: any, bonuses: any, costPrice: any) => {
        const arrB: any = [];

        function sumBonuses(bon: any) {
            if (bon < 1) {
                return;
            }
            arrB.push(bon)
            sumBonuses(bon / 2)
        }

        sumBonuses(bonuses)
        const res = arrB.reduce((partialSum: any, a: any) => partialSum + a, 0)
        const finRes = (lastPrice - costPrice - res) / costPrice * 100

        if (costPrice > 0) {
            return +finRes.toFixed(2);
        }
        return 0;
    }

    return (
        <>
            <form action={async function (e) {
                await setData(e);
                setIsEdit(false);
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
                            className='block w-64 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-slate-500 focus:border-slate-500 '
                            name="category"
                            id='category'
                            defaultValue={data.category}
                        >
                            {categories.map((cat: any) => <option key={cat.id} value={cat.category}>{cat.category}</option>)}
                        </select>
                    </label>

                    <input
                        onChange={(e) => setNewCat(e.target.value)}
                        name='newCat'
                        value={newCat}
                        className='py-[5px] px-4 border mt-6 h-9'
                        type='search' />


                    <button
                        type='submit'
                        className='py-[5px] px-4 border mt-6 h-9 bg-slate-300 rounded-lg hover:text-white hover:bg-slate-400'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>

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
                            defaultValue={data.cost_price}
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
                            defaultValue={data.amount * data.cost_price}
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
                            value={finMarzha(data.price_3, data.bonuses, data.cost_price)}
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
                            defaultValue={((data.price - data.cost_price) / data.cost_price * 100).toFixed(2)}
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
                            defaultValue={(data.cost_price / 100 * finMarzha(data.price_3, data.bonuses, data.cost_price)).toFixed(2)}
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
                    <legend className='flex justify-end items-center py-2 mt-4'>
                        <input onChange={() => {
                            setIsEdit(true)
                            setChecked(!checked)
                        }
                        } checked={checked}
                            id='vitrine' name='vitrine' className='appearance-none  h-6 w-6 checked:bg-slate-400 border-2 border-dotted rounded-lg cursor-pointer' type='checkbox'></input>
                        <label htmlFor="vitrine" className='ml-2 cursor-pointer'>На витрине</label>
                    </legend>

                </div>
                <div className='flex justify-between'>
                    <input type='submit'
                        value='Сохранить'
                        className={`h-10 hover:cursor-pointer disabled:opacity-55 disabled:cursor-default mt-2 mb-2 px-4 py-2 bg-slate-200 rounded-full 
                        text-sm font-semibold text-slate-700 enabled:hover:text-slate-100
                        enabled:hover:bg-slate-500`}
                        disabled={!isEdit}
                    />

                </div>
                <hr />
            </form >
        </>
    )
}
