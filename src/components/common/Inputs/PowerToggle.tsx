import { PowerSVG } from '@/components/icons';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

type TPowerToggleProps = {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
};

const PowerToggle = ({ active, setActive }: TPowerToggleProps) => {
    // const { theme } = useTheme();
    return (
        <button
            onClick={() => setActive((prev) => !prev)}
            className={clsx({
                'text-icons-200 dark:text-dark-icons-200': !active,
                'text-success-400 dark:text-dark-success-400': active,
            })}
        >
            <PowerSVG width='3.6rem' height='3.6rem' />
        </button>
    );
};

export default PowerToggle;
