import { EyeShieldSVG, EyeSVG, XFillSVG } from '@/components/icons';
import { numberWithoutComma, sepNumbers, toEnglishNumber } from '@/utils/helpers';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ChangeEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface InputPropsType
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'value' | 'min' | 'max' | 'placeholder' | 'type'
    > {
    value: string;
    onChange: (v: string) => void;
    preText?: string;
    postText?: string;
    min?: number;
    max?: number;
    numToPersian?: boolean;
    isSepNumber?: boolean;
    classes?: Partial<Record<'root' | 'container' | 'placeholder', ClassesValue>>;
    placeholder?: string;
    error?: FieldError | undefined;
    type: 'text' | 'password' | 'number';
}

const Input = ({
    onChange,
    value,
    max = 1e15,
    postText = '',
    placeholder = '',
    isSepNumber = false,
    error,
    type,
    classes,
    ...inputProps
}: InputPropsType) => {
    const [isShowPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            console.log(e.target.value);
            const numWithoutComma = numberWithoutComma(toEnglishNumber(e.target.value));

            if (Number(numWithoutComma) > max || isNaN(Number(numWithoutComma))) return;

            if (isSepNumber) {
                onChange(sepNumbers(numWithoutComma));
            } else {
                onChange(numWithoutComma);
            }
        } else {
            onChange(e.target.value);
        }
    };

    return (
        <div className={clsx(classes?.root, 'relative flex flex-1 flex-col gap-8')}>
            <div
                className={clsx(
                    classes?.container,
                    'transition-color   flex min-h-48 flex-1 items-center overflow-hidden rounded-md  bg-background-200 text-base focus-within:border focus-within:border-brand-100   dark:bg-dark-background-200 dark:focus-within:border-dark-brand-100',
                    {
                        'border border-error-300 dark:border-dark-error-300': error,
                        'border border-lines-200 dark:border-dark-lines-200': !error,
                    },

                    '',
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
                    value={value}
                    onChange={handleChange}
                    dir='ltr'
                    type={
                        type === 'number' || type === 'text'
                            ? 'text'
                            : type === 'password' && isShowPassword
                              ? 'text'
                              : 'password'
                    }
                    className='z-20 h-full w-full bg-transparent  px-16 text-left text-text-100 placeholder:text-right placeholder:text-text-200  dark:text-dark-text-100 dark:placeholder:text-dark-text-200'
                    {...inputProps}
                />
                {postText && <span className='pl-8 text-text-200 dark:text-dark-text-200'>{postText}</span>}

                {type === 'password' && value && (
                    <button
                        type='button'
                        className='absolute right-0 z-30 pr-16 text-icons-200 dark:text-dark-icons-200'
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {isShowPassword ? <EyeShieldSVG /> : <EyeSVG />}
                    </button>
                )}
            </div>
            <AnimatePresence mode='popLayout'>
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className=' flex items-center gap-8 px-8 text-error-300 dark:text-dark-error-300'
                    >
                        <XFillSVG width='1.6rem' height='1.6rem' />
                        <span>{error.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;
