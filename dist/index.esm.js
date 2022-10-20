import "./index.esm.css";
import {jsx as $4MPRY$jsx, jsxs as $4MPRY$jsxs, Fragment as $4MPRY$Fragment} from "react/jsx-runtime";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@map3xyz/components/dist/index.css";
import {Modal as $4MPRY$Modal, Button as $4MPRY$Button, Badge as $4MPRY$Badge, ReadOnlyText as $4MPRY$ReadOnlyText} from "@map3xyz/components";
import {AnimatePresence as $4MPRY$AnimatePresence, motion as $4MPRY$motion} from "framer-motion";
import {useState as $4MPRY$useState, useContext as $4MPRY$useContext, useEffect as $4MPRY$useEffect, useReducer as $4MPRY$useReducer, createContext as $4MPRY$createContext, useRef as $4MPRY$useRef} from "react";
import {createRoot as $4MPRY$createRoot} from "react-dom/client";
import {QRCodeSVG as $4MPRY$QRCodeSVG} from "qrcode.react";











const $6b7119262a76a333$var$SvgLogo = (props)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 359 300",
        xmlSpace: "preserve",
        role: "img",
        ...props,
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsxs)("linearGradient", {
                id: "Logo__a",
                gradientUnits: "userSpaceOnUse",
                x1: -2656.257,
                y1: -1606.56,
                x2: -2469.722,
                y2: -1606.56,
                gradientTransform: "rotate(141.518 -1439.188 -228.03)",
                children: [
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0,
                        style: {
                            stopColor: "#fff33b"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.059,
                        style: {
                            stopColor: "#ffe029"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.13,
                        style: {
                            stopColor: "#ffd218"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.203,
                        style: {
                            stopColor: "#fec90f"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.281,
                        style: {
                            stopColor: "#fdc70c"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.668,
                        style: {
                            stopColor: "#f3903f"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.888,
                        style: {
                            stopColor: "#ed683c"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 1,
                        style: {
                            stopColor: "#e7733f"
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "url(#Logo__a)",
                d: "M322.752 281.792c.01 15.751-19.741 22.819-29.727 10.638L148.494 113.064l119.721-95.181c21.96-17.459 54.372-1.832 54.39 26.222l.147 237.687z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)("linearGradient", {
                id: "Logo__b",
                gradientUnits: "userSpaceOnUse",
                x1: -428.414,
                y1: 928.076,
                x2: -241.879,
                y2: 928.076,
                gradientTransform: "rotate(-38.482 -1254.137 -28.705)",
                children: [
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0,
                        style: {
                            stopColor: "#fff33b"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.059,
                        style: {
                            stopColor: "#ffe029"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.13,
                        style: {
                            stopColor: "#ffd218"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.203,
                        style: {
                            stopColor: "#fec90f"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.281,
                        style: {
                            stopColor: "#fdc70c"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.668,
                        style: {
                            stopColor: "#f3903f"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 0.888,
                        style: {
                            stopColor: "#ed683c"
                        }
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("stop", {
                        offset: 1,
                        style: {
                            stopColor: "#eb583c"
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "url(#Logo__b)",
                d: "M36.248 18.208C36.238 2.457 55.989-4.611 65.975 7.57l144.531 179.366-119.721 95.181c-21.96 17.459-54.372 1.832-54.39-26.222l-.147-237.687z"
            })
        ]
    });
var $6b7119262a76a333$export$2e2bcd8739ae039 = $6b7119262a76a333$var$SvgLogo;




const $bdbf379108fa6dba$var$InnerWrapper = ({ children: children  })=>{
    return /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
        className: "w-full px-4 py-3",
        children: children
    });
};
var $bdbf379108fa6dba$export$2e2bcd8739ae039 = $bdbf379108fa6dba$var$InnerWrapper;




const $44e8e929fd5cdf17$var$ProgressBar = ({ progress: progress  })=>{
    return /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
        className: "relative h-1 w-full rounded-lg bg-neutral-100 dark:bg-neutral-800",
        children: /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
            className: "absolute left-0 h-full rounded-lg bg-blue-600 transition-all duration-150",
            style: {
                width: progress * 100 + "%"
            }
        })
    });
};
var $44e8e929fd5cdf17$export$2e2bcd8739ae039 = $44e8e929fd5cdf17$var$ProgressBar;




let $68c68372be4a9678$export$fb587a27d5a722e7;
(function(Steps) {
    Steps[Steps["AssetSelection"] = 0] = "AssetSelection";
    Steps[Steps["NetworkSelection"] = 1] = "NetworkSelection";
    Steps[Steps["PaymentMethod"] = 2] = "PaymentMethod";
    Steps[Steps["EnterAmount"] = 3] = "EnterAmount";
    Steps[Steps["QRCode"] = 4] = "QRCode";
    Steps[Steps["__LENGTH"] = 5] = "__LENGTH";
})($68c68372be4a9678$export$fb587a27d5a722e7 || ($68c68372be4a9678$export$fb587a27d5a722e7 = {}));
let $68c68372be4a9678$export$31bb55db0b3e4187;
(function(Method) {
    Method["binance"] = "binance";
    Method["cb-pay"] = "cb-pay";
    Method["metamask"] = "metamask";
    Method["qr"] = "qr";
})($68c68372be4a9678$export$31bb55db0b3e4187 || ($68c68372be4a9678$export$31bb55db0b3e4187 = {}));
const $68c68372be4a9678$var$initialState = {
    coin: undefined,
    depositAddress: {
        data: undefined,
        status: "idle"
    },
    method: undefined,
    network: undefined,
    step: $68c68372be4a9678$export$fb587a27d5a722e7.AssetSelection,
    theme: undefined
};
const $68c68372be4a9678$export$390f32400eaf98c9 = ({ children: children , coin: coin , generateDepositAddress: generateDepositAddress , network: network , theme: theme  })=>{
    let step = 0;
    if (coin) step = 1;
    if (coin && network) step = 2;
    if (coin && network) step = 3;
    const [state, dispatch] = (0, $4MPRY$useReducer)((state, action)=>{
        switch(action.type){
            case "SET_COIN":
                return {
                    ...state,
                    coin: action.payload
                };
            case "SET_NETWORK":
                return {
                    ...state,
                    network: action.payload
                };
            case "SET_STEP":
                return {
                    ...state,
                    step: action.payload
                };
            case "SET_PAYMENT_METHOD":
                return {
                    ...state,
                    method: action.payload
                };
            case "GENERATE_DEPOSIT_ADDRESS_SUCCESS":
                return {
                    ...state,
                    depositAddress: {
                        data: action.payload,
                        status: "success"
                    }
                };
            case "GENERATE_DEPOSIT_ADDRESS_ERROR":
                return {
                    ...state,
                    depositAddress: {
                        data: undefined,
                        status: "error"
                    }
                };
            case "GENERATE_DEPOSIT_ADDRESS_LOADING":
                return {
                    ...state,
                    depositAddress: {
                        data: undefined,
                        status: "loading"
                    }
                };
            case "GENERATE_DEPOSIT_ADDRESS_IDLE":
                return {
                    ...state,
                    depositAddress: {
                        data: undefined,
                        status: "idle"
                    }
                };
            default:
                return state;
        }
    }, {
        ...$68c68372be4a9678$var$initialState,
        coin: coin,
        network: network,
        step: step,
        theme: theme
    });
    return /*#__PURE__*/ (0, $4MPRY$jsx)($68c68372be4a9678$export$841858b892ce1f4c.Provider, {
        value: [
            state,
            dispatch,
            {
                generateDepositAddress: generateDepositAddress
            }
        ],
        children: children
    });
};
const $68c68372be4a9678$export$841858b892ce1f4c = /*#__PURE__*/ (0, $4MPRY$createContext)([
    $68c68372be4a9678$var$initialState,
    ()=>null,
    {
        generateDepositAddress: ()=>new Promise((resolve)=>resolve(""))
    }, 
]);






const $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8 = [
    {
        label: "Bitcoin",
        logo: {
            svg: "https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg"
        },
        name: "bitcoin"
    },
    {
        label: "Ethereum",
        logo: {
            svg: "https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg"
        },
        name: "ethereum"
    },
    {
        label: "Ethereum Classic",
        logo: {
            png: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/classic/info/logo.png"
        },
        name: "ethereum-classic"
    },
    {
        label: "USDC",
        logo: {
            png: "https://raw.githubusercontent.com/map3xyz/ethereum-tokenlist/master/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
        },
        name: "usdc"
    }, 
];
const $d8f5e4867dc7bbaa$var$AssetSelection = ()=>{
    const [state, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const selectedCoin = $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8.find((coin)=>coin.name === state.coin);
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: [
                    /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                        className: "text-lg font-semibold dark:text-white",
                        children: "Select Asset"
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("h5", {
                        className: "text-xs text-neutral-400",
                        children: "Select the Asset you want to deposit."
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                className: "flex flex-col dark:text-white",
                children: $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8.map((coin)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800",
                        onClick: ()=>{
                            dispatch({
                                payload: coin.name,
                                type: "SET_COIN"
                            });
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                        className: "flex w-4 justify-center",
                                        children: /*#__PURE__*/ (0, $4MPRY$jsx)("img", {
                                            className: "h-4",
                                            src: coin.logo.svg || coin.logo.png
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                        children: coin.label
                                    })
                                ]
                            }),
                            coin === selectedCoin ? /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                className: "fa fa-check-circle text-green-400"
                            }) : /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                className: "fa fa-chevron-right text-xxs"
                            })
                        ]
                    }, coin.name))
            })
        ]
    });
};
var $d8f5e4867dc7bbaa$export$2e2bcd8739ae039 = $d8f5e4867dc7bbaa$var$AssetSelection;














const $e9fc485e32047442$export$f09b1917886389c3 = [
    {
        code: "BTC",
        name: "BTC"
    },
    {
        code: "ETH",
        name: "ETH"
    },
    {
        code: "LTC",
        name: "LTC"
    },
    {
        code: "BCH",
        name: "BCH"
    },
    {
        code: "XRP",
        name: "XRP"
    },
    {
        code: "MATIC",
        name: "MATIC"
    },
    {
        code: "ADA",
        name: "ADA"
    },
    {
        code: "DOT",
        name: "DOT"
    },
    {
        code: "UNI",
        name: "UNI"
    }, 
];
const $e9fc485e32047442$var$NetworkSelection = ()=>{
    const [state, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const selectedNetwork = $e9fc485e32047442$export$f09b1917886389c3.find((network)=>network.code === state.network);
    const selectedCoin = (0, $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8).find((coin)=>coin.name === state.coin);
    if (!selectedCoin) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: [
                    /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                        className: "text-lg font-semibold dark:text-white",
                        children: "Select Network"
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsxs)("h5", {
                        className: "text-xs text-neutral-400",
                        children: [
                            "Select the Network to deposit ",
                            /*#__PURE__*/ (0, $4MPRY$jsx)("b", {
                                children: selectedCoin.label
                            }),
                            " on."
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                className: "w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                children: [
                    "Deposit",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedCoin.label
                        })
                    }),
                    " ",
                    "on"
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                className: "flex flex-col dark:text-white",
                children: $e9fc485e32047442$export$f09b1917886389c3.map((network)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800",
                        onClick: ()=>{
                            dispatch({
                                payload: network.code,
                                type: "SET_NETWORK"
                            });
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                children: network.code
                            }),
                            selectedNetwork?.code === network.code ? /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                className: "fa fa-check-circle text-green-400"
                            }) : /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                className: "fa fa-chevron-right text-xxs"
                            })
                        ]
                    }, network.code))
            })
        ]
    });
};
var $e9fc485e32047442$export$2e2bcd8739ae039 = $e9fc485e32047442$var$NetworkSelection;







const $d4bf502028e0348a$var$SvgMetamask = (props)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        xmlSpace: "preserve",
        id: "Metamask__Layer_1",
        x: 0,
        y: 0,
        viewBox: "0 0 318.6 318.6",
        role: "img",
        ...props,
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsx)("style", {
                children: ".Metamask__st1,.Metamask__st6{fill:#e4761b;stroke:#e4761b;stroke-linecap:round;stroke-linejoin:round}.Metamask__st6{fill:#f6851b;stroke:#f6851b}"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#e2761b",
                stroke: "#e2761b",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m274.1 35.5-99.5 73.9L193 65.8z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                d: "m44.4 35.5 98.7 74.6-17.5-44.3zm193.9 171.3-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9L50.1 263l56.7-15.6-26.5-40.6z",
                className: "Metamask__st1"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                d: "m103.6 138.2-15.8 23.9 56.3 2.5-2-60.5zm111.3 0-39-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zm71.1-16.5 33.9 16.5-4.7-39.3z",
                className: "Metamask__st1"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#d7c1b3",
                stroke: "#d7c1b3",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m211.8 247.4-33.9-16.5 2.7 22.1-.3 9.3zm-105 0 31.5 14.9-.2-9.3 2.5-22.1z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#233447",
                stroke: "#233447",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m138.8 193.5-28.2-8.3 19.9-9.1zm40.9 0 8.3-17.4 20 9.1z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#cd6116",
                stroke: "#cd6116",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m106.8 247.4 4.8-40.6-31.3.9zM207 206.8l4.8 40.6 26.5-39.7zm23.8-44.7-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.2 23.1 20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#e4751f",
                stroke: "#e4751f",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m87.8 162.1 23.6 46-.8-22.9zm120.3 23.1-1 22.9 23.7-46zm-64-20.6-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0-2.7 18 1.2 45 6.7-34.1z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                d: "m179.8 193.5-6.7 34.1 4.8 3.3 29.2-22.8 1-22.9zm-69.2-8.3.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z",
                className: "Metamask__st6"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#c0ad9e",
                stroke: "#c0ad9e",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m180.3 262.3.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#161616",
                stroke: "#161616",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m177.9 230.9-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                fill: "#763d16",
                stroke: "#763d16",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "m278.3 114.2 8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("path", {
                d: "m267.2 153.5-52.3-15.3 15.9 23.9-23.7 46 31.2-.4h46.5zm-163.6-15.3-52.3 15.3-17.4 54.2h46.4l31.1.4-23.6-46zm71 26.4 3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z",
                className: "Metamask__st6"
            })
        ]
    });
var $d4bf502028e0348a$export$2e2bcd8739ae039 = $d4bf502028e0348a$var$SvgMetamask;






const $d752ec9124ef7f1d$export$e13b82b2b0368a6a = [
    {
        enabled: true,
        icon: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
            className: "fa fa-qrcode h-4 w-4"
        }),
        label: "QR Code",
        name: (0, $68c68372be4a9678$export$31bb55db0b3e4187).qr
    },
    {
        enabled: false,
        icon: /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
            className: "h-4 w-4",
            children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $d4bf502028e0348a$export$2e2bcd8739ae039), {})
        }),
        label: "MetaMask",
        name: (0, $68c68372be4a9678$export$31bb55db0b3e4187).metamask
    }, 
];
const $d752ec9124ef7f1d$var$PaymentMethod = ()=>{
    const [state, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const selectedMethod = $d752ec9124ef7f1d$export$e13b82b2b0368a6a.find((method)=>method.name === state.method);
    const selectedCoin = (0, $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8).find((coin)=>coin.name === state.coin);
    const selectedNetwork = (0, $e9fc485e32047442$export$f09b1917886389c3).find((network)=>network.name === state.network);
    if (!selectedCoin || !selectedNetwork) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: [
                    /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                        className: "text-lg font-semibold dark:text-white",
                        children: "Payment Method"
                    }),
                    /*#__PURE__*/ (0, $4MPRY$jsx)("h5", {
                        className: "text-xs text-neutral-400",
                        children: "How do you want to deposit?"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                className: "w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                children: [
                    "Deposit",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedCoin?.label || ""
                        })
                    }),
                    " ",
                    "on",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedNetwork?.name || ""
                        })
                    }),
                    " ",
                    "via"
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                className: "flex flex-col dark:text-white",
                children: $d752ec9124ef7f1d$export$e13b82b2b0368a6a.map((method)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: `flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800 ${method.enabled ? "" : "!cursor-not-allowed opacity-50 hover:bg-white dark:hover:bg-neutral-900"}`,
                        onClick: ()=>{
                            if (!method.enabled) return;
                            if (method.name === (0, $68c68372be4a9678$export$31bb55db0b3e4187).qr) {
                                dispatch({
                                    payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).QRCode,
                                    type: "SET_STEP"
                                });
                                dispatch({
                                    payload: method.name,
                                    type: "SET_PAYMENT_METHOD"
                                });
                            } else {
                                dispatch({
                                    payload: method.name,
                                    type: "SET_PAYMENT_METHOD"
                                });
                                dispatch({
                                    payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).EnterAmount,
                                    type: "SET_STEP"
                                });
                            }
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    method.icon,
                                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                        children: method.label
                                    }),
                                    !method.enabled && /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                                        color: "yellow",
                                        children: "Coming Soon"
                                    })
                                ]
                            }),
                            selectedMethod?.label === method.label ? /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                className: "fa fa-check-circle text-green-400"
                            }) : /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                className: "fa fa-chevron-right text-xxs"
                            })
                        ]
                    }, method.label))
            })
        ]
    });
};
var $d752ec9124ef7f1d$export$2e2bcd8739ae039 = $d752ec9124ef7f1d$var$PaymentMethod;


const $389c6829553d16e1$var$BASE_FONT_SIZE = 48;
const $389c6829553d16e1$var$rates = {
    "BTC/USD": 20000
};
const $389c6829553d16e1$var$EnterAmount = ()=>{
    const dummyInputRef = (0, $4MPRY$useRef)(null);
    const dummySymbolRef = (0, $4MPRY$useRef)(null);
    const inputRef = (0, $4MPRY$useRef)(null);
    const formRef = (0, $4MPRY$useRef)(null);
    const quoteRef = (0, $4MPRY$useRef)(null);
    const [state, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const [formValue, setFormValue] = (0, $4MPRY$useState)({
        base: "0",
        inputSelected: "fiat",
        quote: "0"
    });
    (0, $4MPRY$useEffect)(()=>{
        dummyInputRef.current.innerText = formValue.base;
        let nextInputWidth = dummyInputRef.current.getBoundingClientRect().width;
        const symbolWidth = dummySymbolRef.current.getBoundingClientRect().width;
        const formWidth = formRef.current.getBoundingClientRect().width;
        if (inputRef.current && formRef.current) {
            if (nextInputWidth + symbolWidth > formWidth) {
                const percentFontChange = formWidth / (nextInputWidth + symbolWidth);
                const fontSize = Math.floor($389c6829553d16e1$var$BASE_FONT_SIZE * percentFontChange) - 1;
                nextInputWidth = formWidth;
                formRef.current.style.fontSize = `${fontSize}px`;
                inputRef.current.style.width = `${nextInputWidth}px`;
            } else {
                inputRef.current.style.width = `${nextInputWidth}px`;
                formRef.current.style.fontSize = `${$389c6829553d16e1$var$BASE_FONT_SIZE}px`;
            }
        }
    }, [
        formValue
    ]);
    (0, $4MPRY$useEffect)(()=>{
        const rate = $389c6829553d16e1$var$rates["BTC/USD"];
        const base = parseFloat(formValue.base || "0");
        const quote = formValue.inputSelected === "crypto" ? base * rate : base / rate;
        setFormValue((formValue)=>({
                ...formValue,
                quote: formValue.inputSelected === "crypto" ? quote.toFixed(2) : quote.toFixed(8)
            }));
    }, [
        formValue.base
    ]);
    const toggleBase = ()=>{
        if (inputRef.current) {
            inputRef.current.value = quoteRef.current.innerText;
            inputRef.current.focus();
            setFormValue((formValue)=>({
                    base: quoteRef.current.innerText,
                    inputSelected: formValue.inputSelected === "fiat" ? "crypto" : "fiat",
                    quote: formValue.base
                }));
        }
    };
    const selectedMethod = (0, $d752ec9124ef7f1d$export$e13b82b2b0368a6a).find((method)=>method.name === state.method);
    const selectedCoin = (0, $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8).find((coin)=>coin.name === state.coin);
    const selectedNetwork = (0, $e9fc485e32047442$export$f09b1917886389c3).find((network)=>network.name === state.network);
    if (!selectedCoin || !selectedNetwork || !selectedMethod) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                    className: "text-lg font-semibold dark:text-white",
                    children: "Enter Amount"
                })
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                className: "w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                children: [
                    "Deposit",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedCoin.label
                        })
                    }),
                    " ",
                    "on",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedNetwork.name
                        })
                    }),
                    " ",
                    "via",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: /*#__PURE__*/ (0, $4MPRY$jsxs)("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    selectedMethod.icon,
                                    " ",
                                    selectedMethod.label
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: /*#__PURE__*/ (0, $4MPRY$jsxs)("form", {
                    className: "flex flex-col items-center justify-center py-8 text-5xl font-semibold dark:text-white",
                    onChange: (event)=>{
                        const target = event.target;
                        setFormValue((formValue)=>({
                                ...formValue,
                                [target.name]: target.value
                            }));
                    },
                    ref: formRef,
                    children: [
                        /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                            className: "relative box-border flex max-w-full items-center justify-center",
                            children: [
                                formValue.inputSelected === "fiat" ? /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                    className: "text-inherit",
                                    children: "$"
                                }) : null,
                                /*#__PURE__*/ (0, $4MPRY$jsx)("input", {
                                    autoFocus: true,
                                    className: "flex h-14 max-w-full bg-transparent text-center text-inherit outline-0 ring-0",
                                    name: "base",
                                    placeholder: "0",
                                    ref: inputRef,
                                    style: {
                                        minWidth: `${$389c6829553d16e1$var$BASE_FONT_SIZE}px`
                                    },
                                    type: "number"
                                }),
                                /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                    className: "invisible absolute -left-96 -top-96 pl-6 !text-5xl",
                                    ref: dummyInputRef
                                }),
                                /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                    className: "invisible absolute -left-96 -top-96 pl-6 !text-5xl",
                                    ref: dummySymbolRef,
                                    children: formValue.inputSelected === "crypto" ? "BTC" : "$"
                                }),
                                formValue.inputSelected === "crypto" ? /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                    className: "text-inherit",
                                    children: "BTC"
                                }) : null
                            ]
                        }),
                        /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                            className: "mt-8 flex items-center justify-center text-neutral-400",
                            children: [
                                /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                                    className: "text-xs",
                                    children: [
                                        formValue.inputSelected === "crypto" ? /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                            children: "$\xa0"
                                        }) : null,
                                        /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                            ref: quoteRef,
                                            children: formValue.quote
                                        }),
                                        formValue.inputSelected === "fiat" ? /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                            children: "\xa0BTC"
                                        }) : null
                                    ]
                                }),
                                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                    className: "ml-4 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                                        className: "flex cursor-pointer flex-col text-xxs transition-colors duration-100 hover:text-blue-600 hover:dark:text-blue-600",
                                        onClick: toggleBase,
                                        role: "button",
                                        children: [
                                            /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                                className: "fa fa-chevron-up"
                                            }),
                                            /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                                className: "fa fa-chevron-down"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
var $389c6829553d16e1$export$2e2bcd8739ae039 = $389c6829553d16e1$var$EnterAmount;













const $194171c89e26756c$var$QRCode = ()=>{
    const [state, dispatch, { generateDepositAddress: generateDepositAddress  }] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    if (!state.coin || !state.network || !state.method) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    const selectedCoin = (0, $d8f5e4867dc7bbaa$export$6150bd9ed04f9da8).find((coin)=>coin.name === state.coin);
    const selectedNetwork = (0, $e9fc485e32047442$export$f09b1917886389c3).find((network)=>network.name === state.network);
    const selectedMethod = (0, $d752ec9124ef7f1d$export$e13b82b2b0368a6a).find((method)=>method.name === state.method);
    if (!selectedCoin || !selectedNetwork || !selectedMethod) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    (0, $4MPRY$useEffect)(()=>{
        const run = async ()=>{
            try {
                dispatch({
                    type: "GENERATE_DEPOSIT_ADDRESS_LOADING"
                });
                const address = await generateDepositAddress(selectedCoin.name, selectedNetwork.code);
                dispatch({
                    payload: address,
                    type: "GENERATE_DEPOSIT_ADDRESS_SUCCESS"
                });
            } catch (e) {
                dispatch({
                    type: "GENERATE_DEPOSIT_ADDRESS_ERROR"
                });
            }
        };
        run();
        return ()=>{
            dispatch({
                type: "GENERATE_DEPOSIT_ADDRESS_IDLE"
            });
        };
    }, []);
    return /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                    className: "text-lg font-semibold dark:text-white",
                    children: "Scan QR Code"
                })
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                className: "w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                children: [
                    "Deposit",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedCoin.label
                        })
                    }),
                    " ",
                    "on",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: selectedNetwork.name
                        })
                    }),
                    " ",
                    "via",
                    " ",
                    /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Badge), {
                            color: "blue",
                            size: "large",
                            children: /*#__PURE__*/ (0, $4MPRY$jsxs)("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    selectedMethod.icon,
                                    " ",
                                    selectedMethod?.label
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: [
                    state.depositAddress.status === "loading" && /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                        className: "flex h-64 items-center justify-center text-sm",
                        children: /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                            className: "flex flex-col items-center gap-2 font-semibold",
                            children: [
                                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                    className: "animate-spin dark:text-white",
                                    children: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                        className: "fa fa-gear"
                                    })
                                }),
                                /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                    className: "dark:text-white",
                                    children: "Generating Address..."
                                })
                            ]
                        })
                    }),
                    state.depositAddress.status === "error" && /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                        className: "flex h-64 items-center justify-center text-sm",
                        children: /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                            className: "flex flex-col items-center gap-2 font-semibold",
                            children: [
                                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                    className: "animate-spin font-semibold text-red-600",
                                    children: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                        className: "fa fa-circle-xmark"
                                    })
                                }),
                                /*#__PURE__*/ (0, $4MPRY$jsx)("span", {
                                    className: "text-red-600",
                                    children: "Error generating deposit address."
                                })
                            ]
                        })
                    }),
                    state.depositAddress.status === "success" && state.depositAddress.data && /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex w-full flex-col items-center justify-center gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                                className: "text-xs text-neutral-400",
                                children: [
                                    "Only send ",
                                    selectedCoin.label,
                                    " on the ",
                                    selectedNetwork.name,
                                    " ",
                                    "Network to this address."
                                ]
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                className: "flex w-full justify-center",
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$QRCodeSVG), {
                                    bgColor: state.theme === "dark" ? "#262626" : "#FFFFFF",
                                    className: "rounded-lg",
                                    fgColor: state.theme === "dark" ? "#FFFFFF" : "#000000",
                                    imageSettings: {
                                        excavate: true,
                                        height: 40,
                                        src: selectedCoin.logo.svg || selectedCoin.logo.png || "",
                                        width: 40
                                    },
                                    includeMargin: true,
                                    size: 256,
                                    style: {
                                        border: state.theme === "dark" ? "1px solid #404040" : "1px solid #e5e5e5"
                                    },
                                    value: state.depositAddress.data
                                })
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, $4MPRY$jsx)("label", {
                                        className: "text-xs dark:text-white",
                                        children: "Deposit Address"
                                    }),
                                    /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$ReadOnlyText), {
                                        copyButton: true,
                                        value: state.depositAddress.data
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
var $194171c89e26756c$export$2e2bcd8739ae039 = $194171c89e26756c$var$QRCode;


const $090815f5086f7f29$var$TRANSITION = 300;
const $090815f5086f7f29$var$Map3Sdk = ({ onClose: onClose  })=>{
    const [open, setOpen] = (0, $4MPRY$useState)(false);
    const [state, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const { step: step  } = state;
    (0, $4MPRY$useEffect)(()=>{
        setOpen(true);
    }, []);
    const handleClose = ()=>{
        setOpen(false);
        setTimeout(()=>{
            onClose();
        }, $090815f5086f7f29$var$TRANSITION);
    };
    const isLastStep = state.step === (0, $68c68372be4a9678$export$fb587a27d5a722e7).__LENGTH - 1;
    return /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
        children: /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Modal), {
            className: "map3",
            footerBackground: true,
            onCancel: handleClose,
            onConfirm: ()=>isLastStep ? handleClose() : dispatch({
                    payload: step + 1,
                    type: "SET_STEP"
                }),
            size: "small",
            transition: $090815f5086f7f29$var$TRANSITION,
            visible: open,
            children: [
                /*#__PURE__*/ (0, $4MPRY$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                    children: /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex w-full items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsx)("button", {
                                className: step === 0 ? "invisible" : "visible",
                                onClick: ()=>dispatch({
                                        payload: step - 1,
                                        type: "SET_STEP"
                                    }),
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                    className: "fa transition-color fa-long-arrow-left duration-75 dark:text-neutral-600 dark:hover:text-neutral-400"
                                })
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsx)((0, $44e8e929fd5cdf17$export$2e2bcd8739ae039), {
                                progress: step / ((0, $68c68372be4a9678$export$fb587a27d5a722e7).__LENGTH - 1)
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)("button", {
                                    onClick: handleClose,
                                    children: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                                        className: "fa transition-color fa-close duration-75 dark:text-neutral-600 dark:hover:text-neutral-400"
                                    })
                                })
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                    className: "!mt-0 w-full",
                    children: /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$AnimatePresence), {
                        exitBeforeEnter: true,
                        children: [
                            step === (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection && /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$motion).div, {
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                initial: {
                                    opacity: 0
                                },
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $d8f5e4867dc7bbaa$export$2e2bcd8739ae039), {})
                            }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                            step === (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection && /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$motion).div, {
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                initial: {
                                    opacity: 0
                                },
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $e9fc485e32047442$export$2e2bcd8739ae039), {})
                            }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                            step === (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod && /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$motion).div, {
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                initial: {
                                    opacity: 0
                                },
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $d752ec9124ef7f1d$export$2e2bcd8739ae039), {})
                            }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                            step === (0, $68c68372be4a9678$export$fb587a27d5a722e7).EnterAmount && /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$motion).div, {
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                initial: {
                                    opacity: 0
                                },
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $389c6829553d16e1$export$2e2bcd8739ae039), {})
                            }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                            step === (0, $68c68372be4a9678$export$fb587a27d5a722e7).QRCode && /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$motion).div, {
                                animate: {
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                initial: {
                                    opacity: 0
                                },
                                children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $194171c89e26756c$export$2e2bcd8739ae039), {})
                            }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step])
                        ]
                    })
                }),
                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                    className: "!mt-0 w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800",
                    children: /*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex items-end justify-between",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsxs)("a", {
                                "aria-label": "Map3.xyz",
                                className: "flex items-end gap-1 text-xxs text-neutral-400",
                                href: "https://map3.xyz",
                                target: "_blank",
                                children: [
                                    "Powered by",
                                    " ",
                                    /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                        className: "h-3",
                                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $6b7119262a76a333$export$2e2bcd8739ae039), {
                                            className: "h-3"
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Button), {
                                onClick: ()=>{
                                    if (isLastStep) handleClose();
                                    else dispatch({
                                        payload: step + 1,
                                        type: "SET_STEP"
                                    });
                                },
                                children: isLastStep ? "Close" : "Next"
                            })
                        ]
                    })
                })
            ]
        })
    });
};
class $090815f5086f7f29$export$c06370d2ab5297a3 {
    constructor(config){
        if (!config.generateDepositAddress) throw new Error("generateDepositAddress is required");
        if (!config.theme) config.theme = "light";
        this.config = config;
        this.onClose = ()=>{
            this.root.unmount();
            document.body.classList.remove("dark");
        };
        const element = document.createElement("div");
        element.id = "map3";
        document.body.appendChild(element);
        if (config.theme === "dark") document.body.classList.add("dark");
        this.root = (0, $4MPRY$createRoot)(element);
    }
    open() {
        this.root.render(/*#__PURE__*/ (0, $4MPRY$jsx)((0, $68c68372be4a9678$export$390f32400eaf98c9), {
            ...this.config,
            children: /*#__PURE__*/ (0, $4MPRY$jsx)($090815f5086f7f29$var$Map3Sdk, {
                onClose: this.onClose
            })
        }));
    }
    close() {
        this.onClose();
    }
}
const $090815f5086f7f29$export$421c3119381668 = (args)=>{
    return new $090815f5086f7f29$export$c06370d2ab5297a3(args);
};
// @ts-ignore
window.initMap3Sdk = $090815f5086f7f29$export$421c3119381668;
var $090815f5086f7f29$export$2e2bcd8739ae039 = $090815f5086f7f29$var$Map3Sdk;


export {$090815f5086f7f29$export$c06370d2ab5297a3 as Map3, $090815f5086f7f29$export$421c3119381668 as initMap3Sdk, $090815f5086f7f29$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.esm.js.map
