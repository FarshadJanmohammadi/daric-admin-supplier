import {
    DaricLogo,
    DaricLogoText,
    GridSVG,
    LiveSVG,
    MonitorSVG,
    OutBoxSVG,
    PhoneSVG,
    ProfileSVG,
    RemainClockSVG,
    ReportsSVG,
} from '@/components/icons';
import useModalStore from '@/features/useModalStore';
import useUiStore from '@/features/useUiStore';
import pagesRoutes from '@/routes';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';

const MenuItems = () => {
    const { t } = useTranslation();

    const { sidebarToggle } = useUiStore((state) => state);

    const location = useLocation();

    const navigate = useNavigate();

    const ITEMS = useMemo(
        () => [
            {
                id: 'dashboard',
                path: pagesRoutes.dashboard,
                icon: <GridSVG width='2.4rem' height='2.4rem' />,
            },
            {
                id: 'suppliers',
                path: pagesRoutes.suppliers,
                icon: <ProfileSVG width='2.4rem' height='2.4rem' />,
            },
            {
                id: 'market_live',
                path: pagesRoutes.marketLive,
                icon: <LiveSVG width='2.4rem' height='2.4rem' />,
            },
            {
                id: 'market_monitoring',
                path: pagesRoutes.marketMonitoring,
                icon: <MonitorSVG width='2.4rem' height='2.4rem' />,
            },
            {
                id: 'trades_histories',
                path: pagesRoutes.tradesHistories,
                icon: <ReportsSVG width='2.4rem' height='2.4rem' />,
            },
            {
                id: 'telephone_trades',
                path: pagesRoutes.telephoneTrades,
                icon: <PhoneSVG width='2.4rem' height='2.4rem' />,
            },
        ],
        [],
    );

    return (
        <ul className='flex flex-col items-center gap-32 pt-32'>
            {ITEMS.map(({ id, icon, path }) => (
                <li
                    className={clsx(
                        ' flex h-48 w-full cursor-pointer items-center gap-8 p-8 px-16 text-lg transition-all',
                        {
                            'rounded-md bg-brand-200/20 font-medium text-brand-100 dark:bg-dark-brand-200/20 dark:text-dark-brand-100':
                                location.pathname === path,
                            '    font-normal text-text-100 dark:text-dark-text-100': location.pathname !== path,
                        },
                        {
                            'justify-center': !sidebarToggle,
                            'justify-start': sidebarToggle,
                        },
                    )}
                    key={id}
                    onClick={() => navigate(path)}
                >
                    <Tooltip placement='left'>
                        <TooltipTrigger>
                            <div>{icon}</div>
                        </TooltipTrigger>
                        <TooltipContent
                            style={{ zIndex: 9999, display: sidebarToggle ? 'none' : 'block' }}
                            className='   rounded-md bg-background-input px-16 py-8 text-base font-bold text-text-100 dark:bg-dark-background-input dark:text-dark-text-100'
                        >
                            {t(`sidebar.${id}`)}
                        </TooltipContent>
                    </Tooltip>
                    <AnimatePresence>
                        {sidebarToggle && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.5,
                                }}
                            >
                                <span className='text-nowrap'>{t(`sidebar.${id}`)}</span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </li>
            ))}
        </ul>
    );
};

const Sidebar = () => {
    const { t } = useTranslation();

    const { sidebarToggle } = useUiStore((state) => state);

    const location = useLocation();

    const { toggleConfirmLogoutModal } = useModalStore((state) => state);

    return (
        <div
            style={{
                width: sidebarToggle ? '27rem' : '10rem',
                transition: 'width 300ms',
                zIndex: 999,
            }}
            className='flex flex-col justify-between border-l border-l-brand-200/20 bg-background-200 p-16 dark:border-l-dark-brand-200/20 dark:bg-dark-background-200'
        >
            <div className='flex flex-col gap-48'>
                <Link className='self-start' to='/'>
                    <div className={clsx('flex items-center justify-center gap-2')}>
                        <div className='flex items-center justify-center'>
                            <DaricLogo width='5.4rem' height='5.4rem' />
                        </div>
                        <AnimatePresence>
                            {sidebarToggle && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.7,
                                    }}
                                    className=''
                                >
                                    <DaricLogoText width='8.4rem' height='5.4rem' />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
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
                        <Tooltip placement='left'>
                            <TooltipTrigger disabled>
                                <RemainClockSVG width='2.6rem' height='2.6rem' />
                            </TooltipTrigger>
                            <TooltipContent
                                style={{ zIndex: 9999, display: sidebarToggle ? 'none' : 'block' }}
                                className='   rounded-md bg-background-input px-16 py-8 text-base font-bold text-text-100 dark:bg-dark-background-input dark:text-dark-text-100'
                            >
                                {t('sidebar.sessions')}
                            </TooltipContent>
                        </Tooltip>
                        <AnimatePresence>
                            {sidebarToggle && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                    className='truncate text-nowrap '
                                >
                                    {t('sidebar.sessions')}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </li>
                <li
                    className={clsx('flex w-full items-center p-16 text-lg transition-colors', {
                        'rounded-md bg-brand-100/20 font-medium text-brand-100 dark:bg-dark-brand-100/20 dark:text-dark-brand-100':
                            location.pathname === '/sessions',
                        '  font-normal text-text-100 dark:text-dark-text-100': location.pathname !== '/sessions',
                    })}
                >
                    <button onClick={() => toggleConfirmLogoutModal({})} className='flex items-center gap-8'>
                        <Tooltip placement='left'>
                            <TooltipTrigger>
                                <OutBoxSVG
                                    className='text-error-300 dark:text-dark-error-300'
                                    width='2.6rem'
                                    height='2.6rem'
                                />
                            </TooltipTrigger>
                            <TooltipContent
                                style={{ zIndex: 9999, display: sidebarToggle ? 'none' : 'block' }}
                                className='   rounded-md bg-background-input px-16 py-8 text-base font-bold text-error-300  dark:bg-dark-background-input dark:text-dark-error-300'
                            >
                                {t('sidebar.logout')}
                            </TooltipContent>
                        </Tooltip>
                        <AnimatePresence>
                            {sidebarToggle && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.5,
                                    }}
                                    className='truncate text-nowrap text-error-300 dark:text-dark-error-300'
                                >
                                    {t('sidebar.logout')}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
