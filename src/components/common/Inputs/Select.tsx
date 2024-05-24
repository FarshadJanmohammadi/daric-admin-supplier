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

const Select = ({ options, placeholder }: { options: Array<string>; placeholder: string }) => {
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

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(false);
    };

    const selectedItemLabel = selectedIndex !== null ? options[selectedIndex] : undefined;

    return (
        <>
            {/* <label id='select-label' onClick={() => refs.domReference.current?.focus()}>
                Select balloon color
            </label> */}
            <div
                tabIndex={0}
                ref={refs.setReference}
                aria-labelledby='select-label'
                aria-autocomplete='none'
                className='flex h-48 flex-1 items-center rounded-md bg-background-input px-24 text-text-200 dark:bg-dark-background-input dark:text-dark-text-200'
                {...getReferenceProps()}
            >
                {selectedItemLabel || placeholder}
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
                            {options.map((value, i) => (
                                <div
                                    key={value}
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
                                            handleSelect(i);
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
                                    {value}
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
