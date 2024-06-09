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

export const errorMessage = (message?: string | null) => {
    return message ? message : 'خطایی رخ داده است';
};

export const toEnglishNumber = (str: string): string => {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    for (let i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
    }

    return str;
};

export const toFixed = (v: number, l = 3, round = true) => {
    if (isNaN(v) || v === Infinity) return '−';

    if (l === 0) return sepNumbers(v.toFixed(0));

    const value = v.toFixed(l);
    const [integer, decimal] = value.split('.');

    const decimalAsNumber = Number(`.${decimal}`) * 1;
    if (!decimalAsNumber) return sepNumbers(integer);

    return sepNumbers(integer) + '.' + (round ? String(decimalAsNumber).slice(2) : decimal);
};

export const numFormatter = (num: number, formatNavigateNumber = true) => {
    try {
        if (isNaN(num)) return '−';

        const suffixes = ['', ' K', ' M', ' B', ' T'];
        const divisor = 1e3;
        let index = 0;
        let isNegative = false;

        if (num < 0) {
            isNegative = true;
            num = Math.abs(num);
        }

        while (num >= divisor && index < suffixes.length - 1) {
            num /= divisor;
            index++;
        }

        let formattedNum = num.toFixed(3).replace(/\.?0+$/, '') + suffixes[index];

        if (isNegative) {
            formattedNum = formatNavigateNumber ? `(${formattedNum})` : `-${formattedNum}`;
        }

        return `\u200e${formattedNum}`;
    } catch (e) {
        return '−';
    }
};
