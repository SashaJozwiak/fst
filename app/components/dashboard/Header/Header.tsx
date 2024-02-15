/* import { Navigation } from "./Navigation/Navigation";
import { Minidash } from './Minidash/Minidash' */
import NavLinks from "./Navlinks/Navlinks";
import Link from "next/link";
import { PowerIcon } from '@heroicons/react/24/outline';

export interface INavElement {
    id: number,
    path: string,
    title: string,
    subTitle: string,
}

const navLinks: INavElement[] = [
    {
        id: 0,
        path: '/',
        title: 'Florista',
        subTitle: 'studio',
    },
    {
        id: 1,
        path: '/shop',
        title: 'Цветы',
        subTitle: 'и подарки',
    },
    {
        id: 2,
        path: '/decor',
        title: 'Декор',
        subTitle: 'и оформление',
    },
    {
        id: 3,
        path: '/events',
        title: 'Свадьбы',
        subTitle: 'и мероприятия',
    },
    {
        id: 4,
        path: '/education',
        title: 'Курсы',
        subTitle: 'и мастер-классы',
    },

]

export const Header = () => {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-slate-500 p-0 md:h-40"
                href="/"
            >
                <div className="flex-column w-34 text-white md:w-40 m-auto md:none">
                    {/*  <AcmeLogo /> */}
                    <h1 className=' hover:text-slate-100 hover:shadow-none border-4 p-2 border-double rounded rounded-b-xl shadow-xl text-xl text-center'>
                        FLORISTA<br />
                        studio
                    </h1>

                    <p className="text-lg text-center">всё хорошо <span className="text-3xl">☺</span></p>
                </div>
            </Link>

            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-slate-50 md:block"></div>
                <form action={''}>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-slate-100 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Выйти</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
