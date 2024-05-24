// import apiRoutes from '@/api/routes';
// import { createQuery, oneMonthAgo, today } from '@/utils/helper';
// import axios from 'axios';

// export const useAddSupplierQuery = createQuery<Hawala.IHawalaExchange | null, ['hawalaExchange']>({
//     staleTime: 0,
//     queryKey: ['hawalaExchange'],
//     queryFn: async ({ signal }) => {
//         try {
//             const response = await axios.post<ServerResponse<Hawala.IHawalaExchange>>(apiRoutes.hawala.exchange, {
//                 signal,
//             });
//             const data = response.data;

//             if (response.status !== 200 || !data.isSuccess) throw new Error(data.validationErrors?.[0].errors[0] ?? '');

//             return data.data;
//         } catch (e) {
//             return null;
//         }
//     },
// });
