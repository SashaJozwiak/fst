'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { INavElement } from '../Header';
import s from './navigation.module.css'

interface NavigationProps {
    navlinks: INavElement[];
}

export const Navigation = (props: NavigationProps) => {

    const pathname = usePathname();
    const [active, setActive] = useState(pathname);

    //console.log(pathname)

    return (
        <>

            <div className='flex text-center text-slate-300 leading-5 p-4 '>
                <Link href={'/'} onClick={() => setActive('')}> {/* //p-2 */}
                    <h1 className='hover:text-slate-100 hover:shadow-none border-4 p-2 border-double rounded rounded-b-xl shadow-xl '>
                        {props.navlinks[0].title.toUpperCase()}<br />
                        studio
                    </h1>
                </Link>
            </div >

            <div className="flex justify-center text-center gap-2 text-slate-200 leading-5 p-4 pb-0">
                {props.navlinks.map((link, id) => {
                    const isActive = () => (link.path === active ? true : false);
                    return (
                        id > 0 &&
                        <Link
                            onClick={() => setActive(link.path)}
                            key={link.id} href={link.path}
                            className={`${isActive() && s.active} hover:bg-white hover:text-slate-500 rounded-t-xl`}>
                            <h1 className='p-2 w-[148px]'>
                                <span className='text-3xl'>{link.title} </span>
                                <br />
                                <span className='text-base'>{link.subTitle}</span>
                            </h1>
                        </Link>
                    )
                })}
            </div >

        </>
    )
}
