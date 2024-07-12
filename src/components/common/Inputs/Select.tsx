import { XFillSVG } from '@/components/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

interface ISelectProps {
    classes?: Partial<Record<'root' | 'container' | 'placeholder', ClassesValue>>;
    placeholder?: string;
    error?: FieldError | undefined;
    items: { value: string; label: string }[];
    value: { value: string; label: string };
    onChange: (item: { value: string; label: string }) => void;
}

const Select = ({ items, classes, error, value, onChange, placeholder, ...rest }: ISelectProps) => {
    const [showItems, setShowItems] = useState(false);

    const onChangeSelect = (item: { value: string; label: string }) => {
        onChange(item);
    };

    return (
        <div className={clsx(classes?.root, 'relative flex flex-1 flex-col gap-8')}>
            <div
                className={clsx(
                    classes?.container,
                    error && ' border border-error-300 dark:border-dark-error-300',
                    'transition-color   flex min-h-48 flex-1 items-center overflow-hidden rounded-md border border-lines-200 bg-background-200 text-base focus-within:border focus-within:border-brand-100  dark:border-dark-lines-200 dark:bg-dark-background-200 dark:focus-within:border-dark-brand-100',
                )}
            >
                <span
                    className={clsx(
                        classes?.placeholder,
                        ' absolute z-10 bg-inherit p-4 text-base text-text-200 transition-transform dark:bg-inherit dark:text-dark-text-200',
                        {
                            'right-14 translate-y-0': !value,
                            'right-12 -translate-y-3/4 font-bold': value,
                        },
                    )}
                >
                    {placeholder}
                </span>

                <input
                    dir='ltr'
                    type='text'
                    value={value.label}
                    onFocus={() => setShowItems(true)}
                    onBlur={() => setShowItems(false)}
                    className='z-20 h-full w-full  bg-transparent px-16 text-left text-text-100 placeholder:text-right placeholder:text-text-200 dark:text-dark-text-100 dark:placeholder:text-dark-text-200'
                    {...rest}
                />
            </div>
            <AnimatePresence>
                {showItems && (
                    <ul className='absolute right-0 top-48 z-30 flex w-full flex-col rounded-md bg-background-300 py-8 dark:bg-dark-background-300'>
                        {items.map((item, index) => (
                            <li
                                className={clsx(
                                    'cursor-pointer border-b-lines-100 p-8 text-text-100 dark:border-b-dark-lines-100 dark:text-dark-text-100 [&:not(:last-child)]:border-b',
                                    {
                                        'bg-brand-200 transition-colors dark:bg-dark-brand-200 ':
                                            item.value === value.value,
                                        '  hover:bg-brand-200/50  dark:hover:bg-dark-brand-200/50':
                                            item.value !== value.value,
                                    },
                                )}
                                key={index}
                                onClick={() => onChangeSelect(item)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                )}
            </AnimatePresence>

            <AnimatePresence mode='popLayout'>
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='z-10 flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                    >
                        <XFillSVG width='1.6rem' height='1.6rem' />
                        <span>{error.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Select;
