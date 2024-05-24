import Moveable from '@/components/common/Moveable';
import { EraserSVG, MinimizeSVG, XSVG } from '@/components/icons';
import { cn } from '@/utils/helpers';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps extends IBaseModalConfiguration {
    portalElement?: HTMLElement;
    style?: Partial<Record<'root' | 'container' | 'modal', React.CSSProperties>>;
    size?: 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
    classes?: RecordClasses<'root' | 'container' | 'modal' | 'transparent'>;
    children: React.ReactNode;
    top?: string | number;
    transparent?: boolean;
    onClose: () => void;
}

interface ModalHeaderProps {
    label: React.ReactNode;
    onClose: () => void;
    onExpanded?: () => void;
    onClear?: () => void;
    onMinimize?: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            portalElement,
            moveable = false,
            transparent = false,
            minimize = false,
            children,
            style,
            classes,
            size,
            top,
            onClose,
        },
        ref,
    ) => {
        const rootRef = useRef<HTMLDivElement>(null);

        console.log(minimize, 'minimize');

        const modalRef = useRef<HTMLDivElement | null>(null);

        const onWindowClick = (e: MouseEvent, removeListener: () => void) => {
            try {
                const eModal = modalRef.current;
                const eRoot = rootRef.current;
                if (!eRoot || !eModal) return;

                const target = (e.target ?? e.currentTarget) as Node;

                if (target && !eModal.contains(target) && eRoot.contains(target)) {
                    onClose();
                    removeListener();
                }
            } catch (e) {
                //
            }
        };

        const onWindowKeyDown = (e: KeyboardEvent, removeListener: () => void) => {
            try {
                if (e.key !== 'Escape') return;

                onClose();
                removeListener();
            } catch (e) {
                //
            }
        };

        useImperativeHandle(ref, () => rootRef.current!);

        useLayoutEffect(() => {
            const controller = new AbortController();

            window.addEventListener('mousedown', (e) => onWindowClick(e, () => controller.abort()), {
                signal: controller.signal,
            });

            window.addEventListener('keydown', (e) => onWindowKeyDown(e, () => controller.abort()), {
                signal: controller.signal,
            });

            return () => {
                controller.abort();
            };
        }, []);

        useEffect(() => {
            try {
                document.body.style.overflow = 'hidden';

                return () => {
                    document.body.style.overflow = '';
                };
            } catch (e) {
                //
            }
        }, []);

        return createPortal(
            <div
                ref={rootRef}
                style={style?.root}
                className={cn(
                    'presence',
                    styles.root,
                    classes?.root,
                    minimize && styles.minimize,
                    transparent && [styles.transparent, classes?.transparent],
                )}
            >
                <div style={style?.container} className={cn(styles.container, classes?.container)}>
                    <Moveable ref={modalRef} enabled={moveable}>
                        <div
                            style={{ top, ...style?.modal }}
                            className={cn(styles.modal, size && styles[size], classes?.modal)}
                        >
                            {children}
                        </div>
                    </Moveable>
                </div>
            </div>,
            portalElement ?? document.body,
        );
    },
);

const Header = ({ label, onClose, onClear, onMinimize }: ModalHeaderProps) => {
    return (
        <div className='relative flex h-48 w-full items-center justify-between bg-background-300 p-16 dark:bg-dark-background-300'>
            <h2 className='select-none text-lg font-semibold text-text-100 dark:text-dark-text-100'>{label}</h2>
            <div className='flex items-center gap-16'>
                {!!onClear && (
                    <button onClick={onClear} type='button' className=' text-icons-100 dark:text-dark-icons-100'>
                        <EraserSVG width='2.2rem' height='2.2rem' />
                    </button>
                )}

                <button onClick={onMinimize} type='button' className='text-icons-100 dark:text-dark-icons-100'>
                    <MinimizeSVG width='2.2rem' height='2.2rem' />
                </button>

                <button onClick={onClose} type='button' className='text-icons-100 dark:text-dark-icons-100'>
                    <XSVG width='2.2rem' height='2.2rem' />
                </button>
            </div>
        </div>
    );
};

export { Header };
export default Modal;
