(() => {
    /* DEVELOPMENT */
    const LOCAL_ENV = {
        API_PATH: 'http://192.168.90.7:8090',
        API_LANG: 'Fa',
        APP_NAME: 'سامانه تامین کنندگان داریک',
    };

    /* DEVELOPMENT */
    const DEV_ENV = {
        API_PATH: 'http://192.168.90.7:8090',
        API_LANG: 'Fa',
        APP_NAME: 'سامانه تامین کنندگان داریک',
    };

    /* PRODUCTION */
    const PRODUCTION_ENV = {
        API_PATH: 'http://sandbox.daricgold.com:8090',
        API_LANG: 'Fa',
        APP_NAME: 'سامانه تامین کنندگان داریک',
    };

    const URLIsValid = (url) => {
        const regex = new RegExp(url, 'ig');
        return regex.test(window.location.host);
    };

    const getEnvVariables = () => {
        if (URLIsValid('192.168')) return DEV_ENV;
        if (URLIsValid('sandbox')) return PRODUCTION_ENV;

        return LOCAL_ENV;
    };

    const addGlobalVar = () => {
        const environmentVariables = getEnvVariables();

        Object.defineProperty(window, 'api', {
            value: environmentVariables,
            writable: false,
        });
    };

    const initialLoad = () => {
        /* Add environment */
        addGlobalVar();
    };

    initialLoad();
})();
