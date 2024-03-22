import Link from "next/link"

export default async function page() {
    return <>
        <h1 className='mb-5 text-slate-400 cursor-default text-lg'>
            <Link className='text-slate-500 cursor-pointer hover:text-slate-400' href={'/dashboard/products'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-6 h-6 mb-2 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Товары
            </Link> / Списания
        </h1>

        <div className='flex justify-start'>
            <button
                className='p-4 bg-slate-200 hover:bg-slate-400 hover:text-white rounded-lg mb-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >Статус</h2>
                        </th>
                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >№</h2>
                        </th>

                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >Дата</h2>
                        </th>

                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >Сумма</h2>
                        </th>


                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >Сотрудник</h2>
                        </th>

                        <th scope="col"
                            className="px-4 py-2 text-center">
                            <h2
                                className="cursor-pointer inline"
                            >Уд.</h2>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </>
}
