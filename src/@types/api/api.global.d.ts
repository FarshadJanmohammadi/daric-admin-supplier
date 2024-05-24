declare interface ServerResponse<T = unknown> {
    statusCode: 200;
    isSuccess: true;
    message: 'string';
    messageEn: 'string';
    data: T;
    validationErrors: [
        {
            propertyName: 'string';
            errors: ['string'];
        },
    ];
    errorCode: 0;
}

// declare interface PaginationResponse<T = unknown> extends PaginationParams {
// 	result: T;
// 	pageSize: number;
// 	succeeded: boolean;
// 	errors: null | [string];
// }

// declare interface PaginationParams {
// 	pageNumber: number;
// 	totalPages: number;
// 	totalCount: number;
// 	pageSize: number;
// 	hasPreviousPage: boolean;
// 	hasNextPage: boolean;
// }
