import useTheme from '@/hooks/useTheme';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'prefix' | 'placeholder' | 'onChange' | 'type'
    > {
    onChange: (v: string) => void;
    value: string | number | null;
    prefix?: React.ReactNode;
    placeholder: React.ReactNode;
    separator?: boolean;
    valueSeparator?: boolean;
    inputPlaceholder?: string;
    classes?: RecordClasses<'root' | 'input'>;
    type: 'text' | 'number';
}

const Input = ({
    onChange,
    value,
    // prefix,
    placeholder,
    // separator,
    // valueSeparator,
    // inputPlaceholder,
    classes,
    type,
}: InputProps) => {
    const { theme } = useTheme();

    return (
        <div className={clsx([classes?.root, styles.root], theme === 'dark' && styles.dark)}>
            <input
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                id='inputID'
                type={type}
                dir='rtl'
                className={clsx([classes?.input, styles.input], value !== '' && value !== null && styles.active)}
            ></input>
            <label htmlFor='inputID' className={styles.placeholder}>
                {placeholder}
            </label>
        </div>
    );
};

export default Input;
