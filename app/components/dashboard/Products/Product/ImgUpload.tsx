/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'

export const ImgUpload = ({ imgLink, uploadFn }: any) => {
    const [img, setImg] = React.useState<any>('');

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImg(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (<>

        <form className='flex flex-row gap-4 mb-4' action={uploadFn}>

            <img src={`/products_img/${imgLink}.webp`} alt="product photo"
                className='mt-4 rounded-lg w-72 h-52' />

            <div className='flex-col gap-4'>
                <label className='mt-4' htmlFor="img">
                    <input type="file"
                        onChange={handleImageChange}
                        id="img" name="img"
                        accept="image/png, image/jpeg, image/webp"
                        className='mt-2 block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-200 file:text-slate-700
                        hover:file:bg-slate-500 hover:file:text-slate-100'
                    />
                </label>

                {img && <div><img src={img} alt="product photo"
                    className='mt-4 rounded-lg w-52' />
                    <input className='mt-2 px-4 py-2 bg-slate-200 rounded-full text-sm font-semibold text-slate-700 hover:text-slate-100 hover:bg-slate-500' type="submit" value="Загрузить" />
                </div>}
            </div>

        </form>
        <hr />
    </>
    )
}
