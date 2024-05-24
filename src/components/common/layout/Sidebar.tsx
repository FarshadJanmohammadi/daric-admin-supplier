import { GridSVG, OutBoxSVG, ProfileSVG, RemainClockSVG, XFillSVG } from '@/components/icons';
import pagesRoutes from '@/routes';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeading, DialogTrigger } from '../Dialog';

const MenuItems = () => {
    const { t } = useTranslation();

    const location = useLocation();

    const ITEMS = useMemo(
        () => [
            {
                id: 'dashboard',
                path: pagesRoutes.dashboard,
                icon: <GridSVG width='2rem' height='2rem' />,
            },
            {
                id: 'suppliers-manage',
                path: pagesRoutes.supplierManage,
                icon: <ProfileSVG width='2rem' height='2rem' />,
            },
        ],
        [],
    );

    return (
        <ul className='flex flex-col items-center gap-32'>
            {ITEMS.map(({ id, icon, path }) => (
                <li
                    className={clsx('flex w-full items-center p-16 text-lg transition-colors', {
                        'rounded-md bg-brand-100/20 font-medium text-brand-100 dark:bg-dark-brand-100/20 dark:text-dark-brand-100':
                            location.pathname === path,
                        '    font-normal text-text-100 dark:text-dark-text-100': location.pathname !== path,
                    })}
                    key={id}
                >
                    <Link className='flex items-center gap-8' to={path}>
                        {icon}
                        <span className=''>{t(`sidebar.${id}`)}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const Sidebar = () => {
    const { t } = useTranslation();

    const location = useLocation();

    return (
        <div
            style={{ width: '25rem' }}
            className='flex flex-col justify-between border-l border-l-brand-200/20 bg-background-200 p-16 dark:border-l-dark-brand-200/20 dark:bg-dark-background-200'
        >
            <div className='flex flex-col gap-48'>
                <Link className='flex flex-col items-center' to='/'>
                    <div style={{ minWidth: '5.4rem', height: '5.4rem' }} className='flex items-center justify-start'>
                        <img className='h-full w-full object-contain' src='/assets/images/daric-logo-fa.png' />
                    </div>
                    <span className='pr-32 text-xs text-text-200 dark:text-dark-text-200'>
                        سامانه تامین‌ کنندگان داریکءء
                    </span>
                </Link>
                <MenuItems />
            </div>
            <ul className='py-16 '>
                <li
                    className={clsx('flex w-full items-center p-16 text-lg transition-colors', {
                        'rounded-md bg-brand-100/20 font-medium text-brand-100 dark:bg-dark-brand-100/20 dark:text-dark-brand-100':
                            location.pathname === '/sessions',
                        '  font-normal text-text-100 dark:text-dark-text-100': location.pathname !== '/sessions',
                    })}
                >
                    <Link className='flex items-center gap-8' to='/sessions'>
                        <RemainClockSVG width='2rem' height='2rem' />
                        <span className='truncate text-nowrap '>{t('sidebar.sessions')}</span>
                    </Link>
                </li>
                <li className='text-error-300 dark:text-dark-error-300 p-16'>
                    <Dialog>
                        <DialogTrigger className='flex items-center gap-8'>
                            <OutBoxSVG width='2rem' height='2rem' />
                            <span className='text-lg font-medium '>{t('sidebar.logout')}</span>
                        </DialogTrigger>
                        <DialogContent className='flex w-3/12 flex-col gap-16 rounded-md bg-background-200 p-16 dark:bg-dark-background-200'>
                            <DialogHeading className='flex items-center justify-between border-b border-brand-100/40 pb-8 text-text-100 dark:border-brand-100/20 dark:text-dark-text-100'>
                                <span className='text-base font-semibold'> خروج از حساب کاربری</span>
                                <DialogClose className='text-icons-100 transition-colors hover:text-icons-100/80 dark:text-dark-icons-100 hover:dark:text-dark-icons-100/80'>
                                    <XFillSVG width='2rem' height='2rem' />
                                </DialogClose>
                            </DialogHeading>
                            <DialogDescription className='pb-16 pt-16  text-text-200 dark:text-dark-text-200'>
                                آیا می‌خواهید از حساب کاربری خود خارج شوید؟
                            </DialogDescription>
                            <DialogClose className='bg-error-300 hover:bg-error-300/80 dark:bg-dark-error-300 hover:dark:bg-dark-error-300/80 rounded-md py-8 font-medium text-dark-text-100 transition-colors'>
                                خروج
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
