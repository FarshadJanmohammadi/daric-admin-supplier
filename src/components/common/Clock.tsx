import dayjs from 'libs/dayjs';
import { memo, useEffect, useState } from 'react';

const Clock = memo(() => {
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(dayjs());
        }, 1000);

        () => {
            clearInterval(timer);
        };
    }, [time]);

    return (
        <div className='flex flex-col items-center gap-4 text-sm font-medium text-text-100 sm:flex-row sm:gap-16 sm:text-base sm:font-bold dark:text-dark-text-100'>
            <span>{dayjs(time).calendar('jalali').locale('fa').format('HH:mm:ss')}</span>
            <span>{dayjs(time).calendar('jalali').locale('fa').format(`DD MMMM YYYY`)}</span>
        </div>
    );
});

export default Clock;
