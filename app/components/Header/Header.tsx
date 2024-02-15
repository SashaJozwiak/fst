import { Navigation } from "./Navigation/Navigation";
import { Minidash } from './Minidash/Minidash'

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
        <header className="sticky top-0 opacity-95 z-10 max-w-[1440px] min-w-full bg-slate-500 text-slate-800 font-medium text-xl">
            <div className="flex justify-between max-w-[1440px] m-auto">
                <Navigation navlinks={navLinks} />
                <Minidash />
            </div>
        </header>
    );
}
