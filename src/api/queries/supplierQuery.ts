import apiRoutes from '@/api/routes';
import { createQuery } from '@/utils/helpers';
import axios from 'axios';

export const useSuppliersReportsQuery = createQuery<
    ISuppliersReports[] | null,
    ['suppliersReportsQuery', boolean | null]
>({
    staleTime: 0,
    queryKey: ['suppliersReportsQuery', null],
    queryFn: async ({ signal, queryKey }) => {
        const status = queryKey[1];
        try {
            const response = await axios.post<ServerResponse<ISuppliersReports[]>>(
                apiRoutes.supplier.getAll,
                {
                    status,
                },
                {
                    signal,
                },
            );
            const data = response.data;

            if (response.status !== 200 || !data.isSuccess) throw new Error(data.validationErrors?.[0].errors[0] ?? '');

            return data.data;
        } catch (e) {
            return null;
        }
    },
});

export const useInformationQuery = createQuery<
    ISupplierInformation[] | null,
    ['supplierInformation', string | undefined]
>({
    staleTime: 0,
    queryKey: ['supplierInformation', undefined],
    queryFn: async ({ signal, queryKey }) => {
        const mobileNumber = queryKey[1];
        try {
            const response = await axios.post<ServerResponse<ISupplierInformation[]>>(
                apiRoutes.supplier.get,
                {
                    mobileNumber,
                },
                {
                    signal,
                },
            );
            const data = response.data;

            if (response.status !== 200 || !data.isSuccess) throw new Error(data.validationErrors?.[0].errors[0] ?? '');

            return data.data;
        } catch (e) {
            return null;
        }
    },
});
