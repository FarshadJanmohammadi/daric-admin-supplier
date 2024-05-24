import dayjs from '@/libs/dayjs';

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
