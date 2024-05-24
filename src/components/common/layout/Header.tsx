import useTheme from '@/hooks/useTheme';

import { AlarmSVG, DevicesSVG, MoonSVG, PalletColorSVG, RemainClockSVG, SunSVG } from '@/components/icons';
import clsx from 'clsx';
import { useState } from 'react';
import Clock from '../Clock';
import { Popover, PopoverContent, PopoverDescription, PopoverHeading, PopoverTrigger } from '../Popover';

const Header = () => {
    const { theme, setTheme } = useTheme();

    const [systemTheme, setSystemTheme] = useState(false);

    const element = document.documentElement;

    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

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
            style={{ minHeight: '10rem', maxHeight: '10rem' }}
            className='flex items-center justify-end gap-16 bg-background-200 p-16 dark:bg-dark-background-200'
        >
            <div className='flex items-center gap-32'>
                <Clock />

                <div
                    style={{ minWidth: '0.1rem', minHeight: '4rem' }}
                    className='bg-brand-100/40 dark:bg-dark-brand-100/20'
                />

                <Popover placement='bottom'>
                    <PopoverTrigger>
                        {theme === 'dark' ? (
                            <MoonSVG className='text-info-100 dark:text-dark-info-100' width='3.2rem' height='3.2rem' />
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
                        className='mt-16 flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'
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
                        className='mt-16 flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'
                    >
                        <PopoverHeading className='text-base font-bold text-text-100 dark:text-dark-text-100'>
                            پیام‌ها
                        </PopoverHeading>
                        <PopoverDescription className='text-center text-text-200 dark:text-dark-text-200'>
                            پیامی وجود ندارد.
                        </PopoverDescription>
                    </PopoverContent>
                </Popover>

                <Popover placement='bottom'>
                    <PopoverTrigger>
                        <svg width='56' height='56' viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <g clipPath='url(#clip0_10384_76342)'>
                                <rect width='56' height='56' rx='28' fill='#1D2933' />
                                <path
                                    d='M22.0365 36.2405V36.3209C22.0143 38.023 20.5832 39.3028 17.7431 40.1605C21.1653 42.6493 24.5876 44.6405 28.0098 44.6405C31.432 44.6405 34.8543 42.6493 38.2765 40.1605C35.4557 39.3018 34.0246 38.02 33.9831 36.3151C33.9831 36.0113 33.9854 35.5797 33.9874 34.7694C33.9874 34.6407 33.9877 34.5089 33.9884 34.374C34.1924 34.4027 34.175 34.3845 33.9884 34.3326C33.994 32.201 34.0031 29.3347 34.0158 26.4218C36.6911 22.9541 35.7083 18.8887 34.87 18.9901C33.8424 19.1153 24.9378 10.6653 23.2298 10.232C21.5218 9.79878 17.1831 11.1975 16.4365 15.0941C15.6898 18.9908 15.3777 28.8128 18.2098 32.7341C19.0157 33.85 20.285 34.2865 22.0178 34.0436C22.0202 34.8591 22.0251 35.3169 22.0365 36.2405Z'
                                    fill='url(#paint0_linear_10384_76342)'
                                />
                                <path
                                    d='M22.0312 34.0369C26.1379 33.5702 28.7513 31.7969 28.7513 31.7969C28.7513 31.7969 25.9251 35.552 22.0312 36.2769V34.0369Z'
                                    fill='#FFBE94'
                                />
                                <path
                                    d='M35.3804 26.482C36.6666 23.3889 41.8204 17.0895 37.3778 13.1695C35.8844 5.88947 27.6338 6.69531 22.1271 8.37531C18.4261 9.50445 15.6311 11.7353 15.0338 10.0553C11.3004 13.1695 13.1701 16.2153 15.6311 17.0895C17.8648 17.8828 21.6418 18.6761 28.0642 17.9295C29.2115 17.796 28.9712 21.3096 29.5843 21.6895C30.504 22.2594 31.2178 18.6761 33.7393 19.7521C36.2608 20.828 34.7644 25.8169 32.0578 25.8169C31.1244 25.8169 30.6578 28.383 33.1778 29.5963C35.0071 30.4953 34.5447 28.4918 35.3804 26.482Z'
                                    fill='#3E766C'
                                />
                                <path
                                    d='M47.6016 45.8626C49.3786 49.4759 50.4016 57.8093 50.4016 57.8093H5.60156C5.60156 57.8093 6.62487 49.475 8.40156 45.8626C10.1783 42.2502 20.5536 38.8997 20.5536 38.8997C22.5533 43.0051 33.5284 43.0051 35.4441 38.8984C35.4441 38.8984 45.8245 42.2493 47.6016 45.8626Z'
                                    fill='#3E766C'
                                />
                            </g>
                            <defs>
                                <linearGradient
                                    id='paint0_linear_10384_76342'
                                    x1='27.0992'
                                    y1='10.1562'
                                    x2='27.0992'
                                    y2='44.6405'
                                    gradientUnits='userSpaceOnUse'
                                >
                                    <stop stopColor='#FFD4B3' />
                                    <stop offset='1' stopColor='#FFDCC2' />
                                </linearGradient>
                                <clipPath id='clip0_10384_76342'>
                                    <rect width='56' height='56' rx='28' fill='white' />
                                </clipPath>
                            </defs>
                        </svg>
                    </PopoverTrigger>
                    <PopoverContent
                        style={{ minWidth: '20rem' }}
                        className='mt-16 flex flex-col gap-32 rounded-md border border-brand-100/40 bg-background-200 p-16 shadow-md dark:border-dark-brand-100/20 dark:bg-dark-background-200'
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
            </div>
        </header>
    );
};

export default Header;
