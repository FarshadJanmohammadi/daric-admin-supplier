declare interface ServerResponse<T = unknown> {
    statusCode: 200;
    isSuccess: true;
    message: 'string';
    messageEn: 'string';
    data: T;
    validationErrors: Array<{
        propertyName: 'string';
        errors: Array<string>;
    }> | null;
    errorCode: 0;
}
