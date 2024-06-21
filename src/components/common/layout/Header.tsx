import useTheme from '@/hooks/useTheme';

import {
    AlarmSVG,
    ArrowRightSVG,
    AvatarSVG,
    DevicesSVG,
    MoonSVG,
    PalletColorSVG,
    RemainClockSVG,
    SunSVG,
} from '@/components/icons';
import useUiStore from '@/features/useUiStore';
import clsx from 'clsx';
import { useState } from 'react';
import Clock from '../Clock';
import { Popover, PopoverContent, PopoverDescription, PopoverHeading, PopoverTrigger } from '../Popover';

const Header = () => {
    const { theme, setTheme } = useTheme();

    const [systemTheme, setSystemTheme] = useState(false);

    const element = document.documentElement;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const { sidebarToggle, setSidebarToggle } = useUiStore((state) => state);

    const onWindowMatch = () => {
        //
        if (darkQuery.matches) {
            element.classList.add('dark');
            setTheme('dark');
        } else {
            element.classList.remove('dark');
            setTheme('light');
        }
    };

    return (
        <header
            style={{ minHeight: '8rem', maxHeight: '8rem' }}
            className=' flex items-center justify-center bg-background-200 p-16 pr-0 dark:bg-dark-background-200 '
        >
            <div className='relative flex flex-1 items-center justify-between'>
                <button
                    className={clsx(
                        'absolute -right-28 top-1/2 translate-y-1/2 rounded-circle bg-background-100 p-8 dark:bg-dark-background-100',
                    )}
                    onClick={() => setSidebarToggle()}
                    style={{ zIndex: 9999 }}
                >
                    <div
                        style={{
                            maxWidth: '3.4rem',
                            maxHeight: '3.4rem',
                        }}
                        className=' flex items-center justify-center rounded-circle border border-brand-200/20 bg-brand-200/20 p-8 text-brand-100 dark:border-dark-brand-200/20 dark:bg-dark-brand-200/20 dark:text-dark-brand-100'
                    >
                        <ArrowRightSVG className={clsx(sidebarToggle && 'rotate-180 transition-transform')} />
                    </div>
                </button>
                <Popover placement='bottom-start'>
                    <PopoverTrigger className='pr-16'>
                        <AvatarSVG width='3.2rem' height='3.2rem' className='text-icons-100 dark:text-dark-icons-100' />
                    </PopoverTrigger>
                    <PopoverContent
                        style={{ minWidth: '20rem' }}
                        className='z-50 mt-16 flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'
                    >
                        <PopoverHeading className='flex flex-col gap-8 border-b border-b-brand-100/40  py-8 text-base text-text-100 dark:border-b-dark-brand-100/20 dark:text-dark-text-100'>
                            <span className='text-text-100 dark:text-dark-text-100'>محمدحسین رضایی (کاربر عادی)</span>
                            <span className='text-text-200 dark:text-dark-text-200'>
                                mohammadhosein.rezaee@gmail.com
                            </span>
                        </PopoverHeading>
                        <PopoverDescription className='flex items-center justify-between text-center text-text-100 dark:text-dark-text-100'>
                            <div className='flex items-center gap-4'>
                                <RemainClockSVG className='text-icons-100 dark:text-dark-icons-100' />
                                <span>آخرین ورود:</span>
                            </div>
                            <span>14:17 - 1403/03/03</span>
                        </PopoverDescription>
                    </PopoverContent>
                </Popover>

                <div className='flex items-center gap-32'>
                    <Popover placement='bottom'>
                        <PopoverTrigger>
                            {theme === 'dark' ? (
                                <MoonSVG
                                    className='text-info-100 dark:text-dark-info-100'
                                    width='3.2rem'
                                    height='3.2rem'
                                />
                            ) : (
                                <SunSVG
                                    className=' text-warning-100 dark:text-dark-warning-100'
                                    width='3.2rem'
                                    height='3.2rem'
                                />
                            )}
                        </PopoverTrigger>
                        <PopoverContent
                            style={{ minWidth: '20rem' }}
                            className='z-50 mt-16 flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'
                        >
                            <PopoverHeading className='flex items-center justify-center gap-8 text-base font-bold text-text-100 dark:text-dark-text-100'>
                                <PalletColorSVG className='text-icons-100 dark:text-dark-icons-100' />
                                <span className='text-text-100 dark:text-dark-text-100'>رنگ پس‌زمینه</span>
                            </PopoverHeading>
                            <PopoverDescription className='flex flex-col gap-8 text-center text-text-200 dark:text-dark-text-200'>
                                <button
                                    onClick={() => {
                                        setSystemTheme(false);
                                        setTheme('light');
                                        element.classList.remove('dark');
                                    }}
                                    className={clsx('flex items-center gap-8 p-8', {
                                        'rounded-md bg-brand-100/20 dark:bg-dark-brand-100/20':
                                            theme === 'light' && !systemTheme,
                                    })}
                                >
                                    <SunSVG className='text-icons-100 dark:text-dark-icons-100' />
                                    <span className='text-text-100 dark:text-dark-text-100'>روشن</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setSystemTheme(false);
                                        setTheme('dark');
                                    }}
                                    className={clsx('flex items-center gap-8 p-8', {
                                        'rounded-md bg-brand-100/20 dark:bg-dark-brand-100/20':
                                            theme === 'dark' && !systemTheme,
                                    })}
                                >
                                    <MoonSVG className='text-icons-100 dark:text-dark-icons-100' />
                                    <span className='text-text-100 dark:text-dark-text-100'>تیره</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setSystemTheme(true);
                                        onWindowMatch();
                                    }}
                                    className={clsx('flex items-center gap-8 p-8', {
                                        'rounded-md bg-brand-100/20 dark:bg-dark-brand-100/20': systemTheme,
                                    })}
                                >
                                    <DevicesSVG className='text-icons-100 dark:text-dark-icons-100' />
                                    <span className='text-text-100 dark:text-dark-text-100'>مطابق سیستم عامل</span>
                                </button>
                            </PopoverDescription>
                        </PopoverContent>
                    </Popover>

                    <Popover placement='bottom'>
                        <PopoverTrigger>
                            <AlarmSVG className='text-text-100 transition-colors hover:text-text-100/80 dark:text-dark-text-100 hover:dark:text-dark-text-100/80' />
                        </PopoverTrigger>
                        <PopoverContent
                            style={{ minWidth: '20rem' }}
                            className='z-50 mt-16 flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'
                        >
                            <PopoverHeading className='text-base font-bold text-text-100 dark:text-dark-text-100'>
                                پیام‌ها
                            </PopoverHeading>
                            <PopoverDescription className='text-center text-text-200 dark:text-dark-text-200'>
                                پیامی وجود ندارد.
                            </PopoverDescription>
                        </PopoverContent>
                    </Popover>

                    <div
                        style={{ minWidth: '0.1rem', minHeight: '4rem' }}
                        className='bg-brand-100/40 dark:bg-dark-brand-100/20'
                    />

                    <Clock />
                </div>
            </div>
        </header>
    );
};

export default Header;
