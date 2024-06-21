import { usePagination } from '@/hooks';
import clsx from 'clsx';
import { ArrowLeftSVG, ArrowRightSVG } from '../icons';

interface PaginationProps extends Record<'totalCount' | 'pageNumber' | 'pageSize' | 'totalPages', number> {
    siblingCount?: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (pn: number) => void;
    onPageSizeChange: (ps: number) => void;
    currentPage: number;
}
const Pagination = ({
    onPageChange,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPageSizeChange,
    hasNextPage,
    hasPreviousPage,
    totalPages,
    ...props
}: PaginationProps) => {
    const pag = usePagination({
        ...props,
        siblingCount: props.siblingCount ?? 1,
    });

    const onNext = () => {
        if (!hasNextPage) return;
        onPageChange(Math.min(totalPages, props.pageNumber + 1));
    };

    const onPrevious = () => {
        if (!hasPreviousPage) return;
        onPageChange(Math.max(props.pageNumber - 1, 1));
    };

    return (
        <ul className='flex items-center gap-8'>
            <li className='flex h-48 w-48 items-center justify-center rounded-md bg-background-100 text-icons-100  dark:bg-dark-background-100 dark:text-dark-icons-100'>
                <button className='flex-1 flex justify-center items-center' onClick={onPrevious} disabled={!hasPreviousPage} type='button'>
                    <ArrowRightSVG width='1.6rem' height='1.6rem' />
                </button>
            </li>
            <div className='flex items-center gap-8'>
                {pag.map((pn) => (
                    <li
                        className={clsx('dak flex h-48 w-48 items-center justify-center rounded-md ', {
                            'bg-brand-100 font-bold text-text-100 dark:bg-dark-brand-100 dark:text-text-100':
                                pn === props.pageNumber,
                            'bg-background-100 text-text-100 dark:bg-dark-background-100 dark:text-dark-text-100':
                                pn !== props.pageNumber,
                        })}
                        key={pn}
                    >
                        <button
                            className='flex-1'
                            disabled={typeof pn === 'string'}
                            onClick={typeof pn === 'string' ? undefined : () => onPageChange(pn)}
                            type='button'
                        >
                            {pn}
                        </button>
                    </li>
                ))}
            </div>
            <li className='flex h-48 w-48 items-center justify-center rounded-md bg-background-100 text-icons-100  dark:bg-dark-background-100 dark:text-dark-icons-100'>
                <button
                    className='flex flex-1 items-center justify-center'
                    onClick={onNext}
                    disabled={!hasNextPage}
                    type='button'
                >
                    <ArrowLeftSVG width='1.6rem' height='1.6rem' />
                </button>
            </li>
        </ul>
    );
};

export default Pagination;
