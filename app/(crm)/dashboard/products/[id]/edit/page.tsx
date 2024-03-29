import Link from 'next/link';

import { writeFile } from 'fs/promises'
import { join } from 'path'

import { redirect } from 'next/navigation';

import { revalidatePath } from 'next/cache';
import { MainForm } from '@/app/components/dashboard/Products/Product/MainForm';
import { ImgUpload } from '../../../../../components/dashboard/Products/Product/ImgUpload';
import { Description } from '@/app/components/dashboard/Products/Product/Description';

import { changeProduct, getProduct, imgName, changeDescription } from '@/app/services/dashboard/products/product/getProduct';
import { addCategory, getCategories } from '@/app/services/dashboard/products/product/categories';

export default async function page({ params }: { params: { id: string } }) {
    const art = params.id;
    const data: any = await getProduct(art);
    const categories: any = await getCategories();
    //console.log(categories)

    async function upload(FormData: FormData) {
        'use server'

        const file: File | null = FormData.get('img') as unknown as File

        if (!file) {
            throw new Error(`No file uploaded's`)
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('/2024/shop/public', 'products_img', `${art}.webp`)
        await writeFile(path, buffer)
        console.log(`open ${path} to see the uploaded file`)
        await imgName(art);
        await redirect(`/dasboard/products/${data.art}/edit`);
    }

    async function setData(FormData: FormData) {
        'use server'

        //console.log(FormData)
        const newData = {
            title: FormData.get('title'),
            category: FormData.get('category'),
            izm: FormData.get('izm'),
            price: FormData.get('price'),
            price_2: FormData.get('price_2'),
            price_3: FormData.get('price_3'),
            bonuses: FormData.get('bonuses'),
            vitrine: FormData.get('vitrine') === 'on' ? true : false
        }

        await changeProduct(art, newData);

        const newCat = FormData.get('newCat');
        console.log(newCat)
        if (newCat) {
            await addCategory(newCat);
        }
        //redirect(`/product/${art}/edit`)
        revalidatePath(`/product/${art}/edit`);

    }

    async function setDescription(FormData: FormData) {
        'use server'
        const value = await FormData.get('description') as string;
        await changeDescription(art, value);
        revalidatePath(`/product/${art}/edit`);
    }

    return (
        <>
            <header className='flex flex-row justify-between'>
            <h1 className='mb-5 text-slate-400 cursor-default text-lg'>
                <Link className='text-slate-500 cursor-pointer hover:text-slate-400' href={'/dashboard/products'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-6 h-6 mb-2 mx-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Товары
                </Link> / {data.title}
            </h1>

                <Link href={`/dashboard/products/${art}/delete`}
                    className='h-10 w-48 hover:cursor-pointer disabled:opacity-55 disabled:cursor-default mt-2 mb-2 px-4 py-2 bg-red-100 rounded-full 
                    text-sm font-semibold text-slate-600 hover:text-slate-100 hover:bg-red-300
                    text-center'>
                    Удалить товар
                </Link>
            </header>

            <MainForm art={art} data={data} setData={setData} categories={categories} />
            <ImgUpload imgLink={data.img_link} uploadFn={upload} />
            <Description description={data.content} setDescription={setDescription} />
        </>
    )
}
