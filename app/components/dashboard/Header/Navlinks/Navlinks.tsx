'use client';
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    CubeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Главная', href: '/dashboard', icon: HomeIcon },
    { name: 'Товары', href: '/dashboard/products', icon: CubeIcon },
    { name: 'Заказы', href: '/dashboard/orders', icon: DocumentDuplicateIcon },
    { name: 'Клиенты', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-slate-500 hover:text-slate-100 text-slate-700 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-slate-500 text-white': pathname.startsWith(link.href) && link.href !== '/dashboard'
                            },
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
