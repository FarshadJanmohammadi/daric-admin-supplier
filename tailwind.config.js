/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            inherit: 'inherit',
            current: 'current',
            black: 'black',
            white: 'white',
            brand: {
                100: 'rgb(221,179,27)',
                200: 'rgb(167,136,28)',
            },
            background: {
                100: 'rgb(249, 249, 249)',
                200: 'rgb(255, 255, 255)',
                300: 'rgb(238, 240, 246)',
                400: 'rgb(231, 234, 243)',
                500: 'rgb(215, 245, 234)',
                600: 'rgb(225, 228, 236)',
                700: 'rgb(243, 243, 245)',
                800: 'rgb(253, 253, 253)',
                900: 'rgb(213, 236, 246)',
                1000: 'rgb(255, 235, 235)',

                // just for background input
                input: 'rgb(238, 240, 246)',

                // just for asset status page
                calPolyGreen: 'rgb(26, 89, 94)',
                caribbeanGreen: 'rgb(34, 180, 150)',
                illusion: 'rgba(104, 115, 238)',
                supremeMagenta: 'rgb(233, 76, 189)',
                supremeOrange: 'rgb(236, 120, 83)',
                cadburyPurple: 'rgb(63, 78, 236)',
            },
            icons: {
                100: 'rgb(149, 156, 173)',
                200: 'rgb(181, 186, 198)',
            },
            text: {
                100: 'rgb(84, 83, 91)',
                200: 'rgb(138, 147, 164)',
                300: 'rgb(255, 255, 255)',
            },
            success: {
                100: 'rgb(237, 249, 243)',
                200: 'rgb(219, 239, 229)',
                300: 'rgb(169, 236, 182)',
                400: 'rgb(1, 188, 141)',
            },
            error: {
                100: 'rgb(255, 242, 242)',
                200: 'rgb(255, 234, 234)',
                300: 'rgb(224, 64, 64)',
            },
            warning: {
                100: 'rgb(255, 177, 26)',
                200: 'rgb(244, 114, 19)',
            },
            lines: {
                100: 'rgb(240, 241, 243)',
                200: 'rgb(226, 229, 239)',
                300: 'rgb(232,234,236,0.78)',
            },
            info: {
                100: 'rgb(83, 168, 255)',
                200: 'rgb(0, 87, 255)',
            },
            purple: {
                100: 'rgb(204, 0, 255 )',
            },
            ocean: {
                100: 'rgba(0, 240, 255)',
            },

            dark: {
                brand: {
                    100: 'rgb(221,179,27)',
                    200: 'rgb(167,136,28)',
                },
                background: {
                    100: 'rgb(19, 30, 37)',
                    200: 'rgb(23, 34, 41)',
                    300: 'rgb(29, 41, 51)',
                    400: 'rgb(33, 45, 54)',
                    500: 'rgb(20, 46, 51)',
                    600: 'rgb(98, 111, 139)',
                    700: 'rgb(243, 243, 245)',
                    800: 'rgb(27, 39, 46)',
                    900: 'rgb(17, 44, 59)',
                    1000: 'rgb(32, 31, 38)',

                    // just for background input
                    input: 'rgb(15, 24, 29)',

                    // just for asset status page
                    calPolyGreen: 'rgb(26, 89, 94)',
                    caribbeanGreen: 'rgb(34, 180, 150)',
                    illusion: 'rgb(104, 115, 238)',
                    supremeMagenta: 'rgb(233, 76, 189)',
                    supremeOrange: 'rgb(236, 120, 83)',
                    cadburyPurple: 'rgb(63, 78, 236)',
                },
                icons: {
                    100: 'rgb(162, 172, 195)',
                    200: 'rgb(124, 143, 186)',
                },
                text: {
                    100: 'rgb(233, 233, 233)',
                    200: 'rgb(123, 142, 173)',
                    300: 'rgb(255, 255, 255)',
                },
                success: {
                    100: 'rgb(14, 27, 22)',
                    200: 'rgb(32, 53, 50)',
                    300: 'rgb(59, 144, 116)',
                    400: 'rgb(1, 188, 141)',
                },

                error: {
                    100: 'rgb(53, 18, 22)',
                    200: 'rgb(75, 34, 39)',
                    300: 'rgb(224, 64, 64)',
                },
                warning: {
                    100: 'rgb(255, 177, 26)',
                    200: 'rgb(244, 114, 19)',
                },
                lines: {
                    100: 'rgb(35, 46, 57)',
                    200: 'rgb(98, 111, 139)',
                    300: 'rgba(255,255,255,0.1)',
                },
                info: {
                    100: 'rgb(83, 168, 255)',
                    200: 'rgb(0, 87, 255)',
                },
                purple: {
                    100: 'rgb(204, 0, 255 )',
                },

                ocean: {
                    100: 'rgba(0, 240, 255)',
                },
            },
        },
        fontSize: {
            xxs: ['0.8rem'], // 8px
            xs: ['1rem'], // 10px
            sm: ['1.2rem'], // 12px
            base: ['1.4rem'], // 14px
            lg: ['1.6rem'], // 16px
            xl: ['1.8rem'], // 18px
            '2xl': ['2rem'], // 20px
            '3xl': ['2.4rem'], // 24px
        },

        lineHeight: {
            2: '1.6rem',
            3: '1.8rem',
            4: '2rem',
            5: '2.4rem',
            6: '2.8rem',
            7: '3.2rem',
            8: '3.6rem',
            9: '4rem',
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.75',
            loose: '2',
        },

        borderRadius: {
            none: 0,
            sm: '2px',
            DEFAULT: '4px',
            base: '6px',
            md: '8px',
            lg: '12px',
            xl: '16px',
            '2xl': '20px',
            circle: '50%',
            oval: '9999px',
        },

        spacing: {
            0: 0,
            2: '0.2rem',
            4: '0.4rem',
            6: '0.6rem',
            8: '0.8rem',
            10: '1rem',
            12: '1.2rem',
            14: '1.4rem',
            16: '1.6rem',
            18: '1.8rem',
            20: '2rem',
            24: '2.4rem',
            28: '2.8rem',
            32: '3.2rem',
            36: '3.6rem',
            40: '4rem',
            44: '4.4rem',
            48: '4.8rem',
        },

        boxShadow: {
            none: 'none',
            tooltip: '0px 0px 2px 0px rgba(0, 0, 0, 0.16)',
            sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
            DEFAULT: '0px 4px 4px -1px rgba(0, 0, 0, 0.1)',
            md: '0px 8px 8px -1 rgba(0, 0, 0, 0.1)',
            lg: '0px 12px 12px 0px rgba(0, 0, 0, 0.1)',
            card: '0px 2px 11px 0px rgba(0, 0, 0, 0.05)',
            section: 'rgba(0, 0, 0, 0.1) 0px 2px 9px 2px',
        },
    },
    plugins: [],
};
