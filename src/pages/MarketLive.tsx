import { useMarketLivePairListQuery, useMarketLiveReportsQuery } from '@/api/queries/marketQueries';
import Radiobox from '@/components/common/Inputs/Radiobox';
import Loading from '@/components/common/Loading';
import NoData from '@/components/common/NoData';
import Pagination from '@/components/common/Pagination';
import LightweightTable, { IColDef } from '@/components/common/Table/LightWeightTable';
import { initialMarketLivePageSetting } from '@/constant';
import { dateFormatter, sepNumbers } from '@/utils/helpers';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MarketLive = () => {
    const { t } = useTranslation();

    const [pageSetting, setPageSetting] = useState(initialMarketLivePageSetting);

    const setPageSettingFiled = <T extends keyof typeof pageSetting>(field: T, value: (typeof pageSetting)[T]) => {
        setPageSetting((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const { data: marketLiveData, isLoading: marketLiveLoading } = useMarketLiveReportsQuery({
        queryKey: ['marketLiveReports', pageSetting],
    });

    const { data: marketLivePairListData } = useMarketLivePairListQuery({
        queryKey: ['marketLivePairLis'],
    });

    console.log(marketLivePairListData, 'marketLivePairListData');

    console.log(marketLiveData, 'marketLiveData');

    const dataIsEmpty = useMemo(() => {
        return _.isArray(marketLiveData?.data) && _.size(marketLiveData.data) === 0;
    }, [marketLiveData]);

    const columnDefs = useMemo<Array<IColDef<IMarketLiveReports>>>(
        () => [
            {
                colId: 'id',
                headerName: t('market_live_page.id_column'),
                valueGetter: (_row, rowIndex) => rowIndex,
                valueFormatter: (row) => {
                    return (
                        <div className='flex items-center'>
                            <Radiobox checked={false} label='' onChange={() => null} />
                            <span className='flex-1'>{String((row.rowIndex ?? 0) + 1)}</span>
                        </div>
                    );
                },
            },
            {
                colId: 'createDateTime',
                headerName: t('market_live_page.date_column'),
                valueGetter: (row) => dateFormatter(row.createDateTime, 'date'),
            },
            {
                colId: 'createDateTime',
                headerName: t('market_live_page.time_column'),
                valueGetter: (row) => dateFormatter(row.createDateTime, 'time'),
            },
            {
                colId: 'price',
                headerName: t('market_live_page.price_column'),
                valueGetter: (row) => sepNumbers(String(row.price)),
                cellClass: '!text-sm',
            },
            {
                colId: 'amount',
                headerName: t('market_live_page.amount_column'),
                valueGetter: (row) => sepNumbers(String(row.amount)),
            },
        ],
        [],
    );

    return (
        <main className='h-full flex-1 overflow-hidden rounded bg-background-200 p-8 dark:bg-dark-background-200'>
            <div className='flex flex-col gap-32'>
                <div className='flex items-center justify-end text-text-100 dark:text-dark-text-100'>
                    <div className='flex items-center gap-16'>
                        <div className='flex items-center gap-4'>
                            <div className='flex min-h-16 min-w-16 items-center justify-center rounded-circle border border-success-400 dark:border-dark-success-400'>
                                <div className='rounded-circle bg-success-400 p-4 dark:bg-dark-success-400'></div>
                            </div>
                            <span className='text-text-200 dark:text-dark-text-200'>مظنه طلای آب شده:</span>
                            <span>{sepNumbers(String(34343423))} ریال</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <div className='flex min-h-16 min-w-16 items-center justify-center rounded-circle border border-success-400 dark:border-dark-success-400'>
                                <div className='rounded-circle bg-success-400 p-4 dark:bg-dark-success-400'></div>
                            </div>
                            <span className='text-text-200 dark:text-dark-text-200'>نرخ گرم طلای آب شده:</span>
                            <span>{sepNumbers(String(32132132))} ریال</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-16'>
                    <div>
                        <div
                            className='flex flex-col overflow-hidden rounded'
                            style={{
                                height: 'calc(100dvh - 36.2rem)',
                                transition: 'height 250ms ease',
                            }}
                        >
                            <div className='bg-success-200 p-16 text-center text-xl font-bold text-dark-success-400 dark:bg-success-200'>
                                خرید
                            </div>
                            <LightweightTable
                                columnDefs={columnDefs}
                                rowData={_.filter(marketLiveData?.data, { side: 0 })}
                                reverseColors={false}
                            />
                        </div>
                        {marketLiveLoading && (
                            <div style={{ backdropFilter: 'blur(1px)' }} className='absolute left-0 top-0 size-full'>
                                <Loading />
                            </div>
                        )}
                        {dataIsEmpty && !marketLiveLoading && (
                            <div className='center absolute'>
                                <NoData />
                            </div>
                        )}
                    </div>

                    <div>
                        <div
                            className='flex flex-col overflow-hidden rounded'
                            style={{
                                height: 'calc(100dvh - 36.2rem)',
                                transition: 'height 250ms ease',
                            }}
                        >
                            <div className='bg-error-200 p-16 text-center text-xl font-bold text-dark-error-300 dark:bg-error-200'>
                                فروش
                            </div>
                            <LightweightTable
                                columnDefs={columnDefs}
                                rowData={_.filter(marketLiveData?.data, { side: 1 })}
                                reverseColors={false}
                            />
                        </div>
                        {marketLiveLoading && (
                            <div style={{ backdropFilter: 'blur(1px)' }} className='absolute left-0 top-0 size-full'>
                                <Loading />
                            </div>
                        )}
                        {dataIsEmpty && !marketLiveLoading && (
                            <div className='center absolute'>
                                <NoData />
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex items-center justify-between text-text-100 dark:text-dark-text-100'>
                    <div className='flex items-center gap-8'>
                        <span className='text-text-200 dark:text-dark-text-200'>مجموع خریدها:</span>
                        <span>{sepNumbers(String(34343434))} ریال</span>
                    </div>
                    <div className='flex items-center gap-8'>
                        <span className='text-text-200 dark:text-dark-text-200'>مجموع میانگین وزنی خرید:</span>
                        <span>{sepNumbers(String(34343434))} ریال</span>
                    </div>
                    <div className='flex items-center gap-8'>
                        <span className='text-text-200 dark:text-dark-text-200'>اختلاف حجم:</span>
                        <span>{sepNumbers(String(34343434))} ریال</span>
                    </div>
                    <div className='flex items-center gap-8'>
                        <span className='text-text-200 dark:text-dark-text-200'>مجموع فروش ها:</span>
                        <span>{sepNumbers(String(34343434))} ریال</span>
                    </div>
                    <div className='flex items-center gap-8'>
                        <span className='text-text-200 dark:text-dark-text-200'>مجموع میانگین وزنی فروش</span>
                        <span>{sepNumbers(String(34343434))} ریال</span>
                    </div>
                </div>

                <div className='py-22 flex items-center justify-end'>
                    <Pagination
                        hasNextPage={marketLiveData?.hasNextPage ?? false}
                        hasPreviousPage={marketLiveData?.hasPreviousPage ?? false}
                        totalPages={marketLiveData?.totalPages ?? 0}
                        totalCount={marketLiveData?.totalRecord ?? 0}
                        currentPage={pageSetting?.pageNumber ?? 1}
                        pageSize={pageSetting?.pageSize ?? 0}
                        onPageChange={(value) => setPageSettingFiled('pageNumber', value)}
                        onPageSizeChange={(value) => setPageSettingFiled('pageSize', value)}
                        pageNumber={marketLiveData?.pageIndex ?? 0}
                    />
                </div>
            </div>
        </main>
    );
};

export default MarketLive;
