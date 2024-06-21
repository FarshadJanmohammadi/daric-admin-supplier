import apiRoutes from '@/api/routes';
import { initialMarketLivePageSetting } from '@/constant';
import { createQuery } from '@/utils/helpers';
import axios from 'axios';

export const useMarketLiveReportsQuery = createQuery<
    PaginationResponse<IMarketLiveReports[]> | null,
    ['marketLiveReports', MarketLive.IPageSetting]
>({
    staleTime: 0,
    queryKey: ['marketLiveReports', initialMarketLivePageSetting],
    queryFn: async ({ signal, queryKey }) => {
        const { pageNumber, pageSize } = queryKey[1];
        try {
            const response = await axios.get<PaginationResponse<IMarketLiveReports[]>>(apiRoutes.marketLive.getAll, {
                signal,
                params: { page: pageNumber, pageSize },
            });
            const data = response.data;

            // if (response.status !== 200 || !data.isSuccess) throw new Error(data.validationErrors?.[0].errors[0] ?? '');

            return data;
        } catch (e) {
            return null;
        }
    },
});

export const useMarketLivePairListQuery = createQuery<IMarketLivePairList[] | null, ['marketLivePairLis']>({
    staleTime: 0,
    queryKey: ['marketLivePairLis'],
    queryFn: async ({ signal }) => {
        try {
            const response = await axios.get<IMarketLivePairList[]>(apiRoutes.marketLive.pairList, {
                signal,
                params: { src: 'TMN', dest: 'GOLD18' },
            });
            const data = response.data;

            // if (response.status !== 200 || !data.isSuccess) throw new Error(data.validationErrors?.[0].errors[0] ?? '');

            return data;
        } catch (e) {
            return null;
        }
    },
});
