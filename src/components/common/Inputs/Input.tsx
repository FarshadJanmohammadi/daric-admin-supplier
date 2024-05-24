import useTheme from '@/hooks/useTheme';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'prefix' | 'placeholder' | 'onChange' | 'type' | 'id'
    > {
    onChange: (v: string) => void;
    value: string | number | null;
    prefix?: React.ReactNode;
    placeholder: React.ReactNode;
    separator?: boolean;
    valueSeparator?: boolean;
    inputPlaceholder?: string;
    classes?: RecordClasses<'root' | 'input'>;
    type?: 'text' | 'number';
    id: string;
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
    type = 'text',
    id,
}: InputProps) => {
    const { theme } = useTheme();

    const isActive = value !== '' && value !== null;

    return (
        <div className={clsx([classes?.root, styles.root], theme === 'dark' && styles.dark)}>
            <input
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                id={id}
                type={type}
                dir='rtl'
                autoComplete='off'
                className={clsx([classes?.input, styles.input], isActive && styles.active)}
            ></input>
            <label htmlFor={id} className={styles.placeholder}>
                {placeholder}
            </label>
        </div>
    );
};

export default Input;
