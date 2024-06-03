import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import Spinner from './Spinner';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
}

const Button = ({ loading, children, className, ...props }: IButtonProps) => {
    return (
        <button className={clsx(className, styles.btn, loading && styles.loading)} {...props}>
            {loading ? <Spinner /> : children}
        </button>
    );
};

export default Button;
