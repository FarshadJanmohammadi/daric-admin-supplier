import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingPortal,
    offset,
    size,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useListNavigation,
    useRole,
    useTypeahead,
} from '@floating-ui/react';
import clsx from 'clsx';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface ISelectProps {
    options: Array<{ value: string; label: string }>;
    placeholder: string;
    onChange: (...event: unknown[]) => void;
}

const Select = ({ options, placeholder, onChange }: ISelectProps) => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

    const { refs, floatingStyles, context } = useFloating<HTMLElement>({
        placement: 'bottom',
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(5),
            flip({ padding: 10 }),
            size({
                apply({ rects, elements, availableHeight }) {
                    Object.assign(elements.floating.style, {
                        maxHeight: `${availableHeight}px`,
                        minWidth: `${rects.reference.width}px`,
                    });
                },
                padding: 10,
            }),
        ],
    });

    const listRef = React.useRef<Array<HTMLElement | null>>([]);
    const listContentRef = React.useRef(options);
    const isTypingRef = React.useRef(false);

    const click = useClick(context, { event: 'mousedown' });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'listbox' });
    const listNav = useListNavigation(context, {
        listRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        // This is a large list, allow looping.
        loop: true,
    });
    const typeahead = useTypeahead(context, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        listRef: listContentRef,
        activeIndex,
        selectedIndex,
        onMatch: isOpen ? setActiveIndex : setSelectedIndex,
        onTypingChange(isTyping) {
            isTypingRef.current = isTyping;
        },
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        dismiss,
        role,
        listNav,
        typeahead,
        click,
    ]);

    const handleSelect = (index: number, value?: { value: string; label: string }) => {
        setSelectedIndex(index);
        setIsOpen(false);
        onChange(value);
    };

    const selectedItemLabel = selectedIndex !== null ? options[selectedIndex] : undefined;

    return (
        <>
            <div
                tabIndex={0}
                ref={refs.setReference}
                aria-labelledby='select-label'
                aria-autocomplete='none'
                className='flex h-48 flex-1 items-center rounded-md bg-background-input px-24 text-text-200 dark:bg-dark-background-input dark:text-dark-text-200'
                {...getReferenceProps()}
            >
                {selectedItemLabel ? t(`form.${selectedItemLabel?.label}_select`) : placeholder}
            </div>
            {isOpen && (
                <FloatingPortal>
                    <FloatingFocusManager context={context} modal={false}>
                        <div
                            ref={refs.setFloating}
                            style={{
                                ...floatingStyles,
                                zIndex: 9999,
                            }}
                            className='z-50 rounded-md border border-brand-200/20 bg-background-100 text-text-200 dark:border-dark-brand-200/20 dark:bg-dark-background-100 dark:text-dark-text-200'
                            {...getFloatingProps()}
                        >
                            {options.map((item, i) => (
                                <div
                                    key={item.value}
                                    ref={(node) => {
                                        listRef.current[i] = node;
                                    }}
                                    role='option'
                                    tabIndex={i === activeIndex ? 0 : -1}
                                    aria-selected={i === selectedIndex && i === activeIndex}
                                    style={{
                                        padding: 10,
                                        cursor: 'default',
                                        background: i === activeIndex ? '' : '',
                                    }}
                                    className={clsx(
                                        i === activeIndex &&
                                            'bg-brand-100/20 text-brand-100 dark:bg-dark-brand-100/20 dark:text-dark-brand-100',
                                    )}
                                    {...getItemProps({
                                        // Handle pointer select.
                                        onClick() {
                                            handleSelect(i, item);
                                        },
                                        // Handle keyboard select.
                                        onKeyDown(event) {
                                            if (event.key === 'Enter') {
                                                event.preventDefault();
                                                handleSelect(i);
                                            }

                                            if (event.key === ' ' && !isTypingRef.current) {
                                                event.preventDefault();
                                                handleSelect(i);
                                            }
                                        },
                                    })}
                                >
                                    {t(`form.${item.label}_select`)}
                                </div>
                            ))}
                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>
            )}
        </>
    );
};

export default Select;
