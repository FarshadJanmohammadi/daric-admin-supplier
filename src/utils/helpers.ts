import dayjs from '@/libs/dayjs';
import {
    QueryClient,
    QueryKey,
    UndefinedInitialDataOptions,
    useMutation,
    UseMutationOptions,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const getDeviceColorSchema = (): 'dark' | 'light' => {
    try {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return isDark ? 'dark' : 'light';
    } catch (e) {
        return 'light';
    }
};

export const changePageTitle = (title: string, brokerNameIsExists = true) => {
    try {
        const titleElement = document.querySelector('title') as HTMLElement;
        const suffix = brokerNameIsExists ? ' | ' + 'سامانه تامین کنندگان داریک' : '';

        titleElement.textContent = '\u200F' + title + suffix;
    } catch (e) {
        //
    }
};

export const dateFormatter = (v: string | number, format: 'date' | 'time' | 'datetime' = 'datetime') => {
    const formats: Record<typeof format, string> = {
        time: 'HH:mm',
        date: 'YYYY/MM/DD',
        datetime: 'YYYY/MM/DD HH:mm',
    };

    const d = dayjs(v ?? new Date()).calendar('jalali');
    if (d.isValid()) return d.format(formats[format]);

    return '−';
};

export const sepNumbers = (num: string | undefined): string => {
    if (num === undefined || isNaN(Number(num))) return '−';

    const formattedIntegerPart: string = num?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedIntegerPart;
};

export const cn = (...args: ClassesValue[]) => {
    return twMerge(clsx(args));
};

export const createQuery = <TQueryFnData = unknown, TQueryKey extends QueryKey = QueryKey, TError = AxiosError>(
    initialOptions: UndefinedInitialDataOptions<TQueryFnData, TError, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
) => {
    return (options: Partial<typeof initialOptions>) => useQuery({ ...initialOptions, ...options }, queryClient);
};

export const createMutation = <TData = unknown, TVariables = void, TError = AxiosError, TContext = unknown>(
    initialOptions: UseMutationOptions<TData, TError, TVariables, TContext>,
    queryClient?: QueryClient,
) => {
    return (options: Partial<typeof initialOptions>) => useMutation({ ...initialOptions, ...options }, queryClient);
};
