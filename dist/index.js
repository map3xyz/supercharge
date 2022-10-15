import {jsx as $4MPRY$jsx, jsxs as $4MPRY$jsxs, Fragment as $4MPRY$Fragment} from "react/jsx-runtime";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Modal as $4MPRY$Modal, Button as $4MPRY$Button} from "@map3xyz/components";
import {AnimatePresence as $4MPRY$AnimatePresence, motion as $4MPRY$motion} from "framer-motion";
import {useState as $4MPRY$useState, useContext as $4MPRY$useContext, useEffect as $4MPRY$useEffect, useReducer as $4MPRY$useReducer, createContext as $4MPRY$createContext} from "react";
import {createRoot as $4MPRY$createRoot} from "react-dom/client";
import "@map3xyz/components/dist/index.css";










const $44e8e929fd5cdf17$var$ProgressBar = ({ progress: progress  })=>{
    return /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
        className: "relative h-1 w-full bg-neutral-100 dark:bg-neutral-800",
        children: /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
            className: "absolute left-0 h-full bg-blue-600 transition-all duration-150",
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
    Steps[Steps["__LENGTH"] = 4] = "__LENGTH";
})($68c68372be4a9678$export$fb587a27d5a722e7 || ($68c68372be4a9678$export$fb587a27d5a722e7 = {}));
const $68c68372be4a9678$var$initialState = {
    coin: null,
    network: null,
    step: $68c68372be4a9678$export$fb587a27d5a722e7.AssetSelection
};
const $68c68372be4a9678$export$390f32400eaf98c9 = ({ children: children  })=>{
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
            default:
                return state;
        }
    }, $68c68372be4a9678$var$initialState);
    return /*#__PURE__*/ (0, $4MPRY$jsx)($68c68372be4a9678$export$841858b892ce1f4c.Provider, {
        value: [
            state,
            dispatch
        ],
        children: children
    });
};
const $68c68372be4a9678$export$841858b892ce1f4c = /*#__PURE__*/ (0, $4MPRY$createContext)([
    $68c68372be4a9678$var$initialState,
    ()=>null, 
]);





const $d8f5e4867dc7bbaa$var$coins = [
    "Bitcoin",
    "Ethereum",
    "Litecoin",
    "Bitcoin Cash",
    "Ripple"
];
const $d8f5e4867dc7bbaa$var$AssetSelection = ()=>{
    const [_, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                className: "text-lg font-semibold dark:text-white",
                children: "Deposit Crypto"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("h5", {
                className: "text-xs text-neutral-600",
                children: "Select the asset you want to deposit."
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                className: "my-3 flex flex-col gap-1",
                children: $d8f5e4867dc7bbaa$var$coins.map((coin)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex cursor-pointer items-center",
                        onClick: ()=>{
                            dispatch({
                                payload: coin,
                                type: "SET_COIN"
                            });
                            dispatch({
                                payload: 1,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                className: "mr-2 h-3 w-3 rounded-full bg-neutral-700"
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                className: "text-sm dark:text-white",
                                children: coin
                            })
                        ]
                    }, coin))
            })
        ]
    });
};
var $d8f5e4867dc7bbaa$export$2e2bcd8739ae039 = $d8f5e4867dc7bbaa$var$AssetSelection;





const $e9fc485e32047442$var$networks = [
    "BTC",
    "ETH",
    "LTC",
    "BCH",
    "XRP",
    "MATIC",
    "ADA",
    "DOT",
    "UNI", 
];
const $e9fc485e32047442$var$NetworkSelection = ()=>{
    const [state, dispatch] = (0, $4MPRY$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    if (!state.coin) return null;
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                className: "text-lg font-semibold dark:text-white",
                children: "Deposit Crypto"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsxs)("h5", {
                className: "text-xs text-neutral-600",
                children: [
                    "Select the network to deposit ",
                    state.coin,
                    " in."
                ]
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                className: "my-3 flex flex-col gap-1",
                children: $e9fc485e32047442$var$networks.map((network)=>/*#__PURE__*/ (0, $4MPRY$jsxs)("div", {
                        className: "flex cursor-pointer items-center",
                        onClick: ()=>{
                            dispatch({
                                payload: network,
                                type: "SET_NETWORK"
                            });
                            dispatch({
                                payload: 2,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                className: "mr-2 h-3 w-3 rounded-full bg-neutral-700"
                            }),
                            /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                                className: "text-sm dark:text-white",
                                children: network
                            })
                        ]
                    }, network))
            })
        ]
    });
};
var $e9fc485e32047442$export$2e2bcd8739ae039 = $e9fc485e32047442$var$NetworkSelection;




const $d752ec9124ef7f1d$var$PaymentMethod = ()=>{
    return /*#__PURE__*/ (0, $4MPRY$jsxs)((0, $4MPRY$Fragment), {
        children: [
            /*#__PURE__*/ (0, $4MPRY$jsx)("h3", {
                className: "text-lg font-semibold dark:text-white",
                children: "Payment Method"
            }),
            /*#__PURE__*/ (0, $4MPRY$jsx)("h5", {
                className: "text-xs text-neutral-600",
                children: "Select the payment method you want to use."
            })
        ]
    });
};
var $d752ec9124ef7f1d$export$2e2bcd8739ae039 = $d752ec9124ef7f1d$var$PaymentMethod;


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
            className: "map3-sdk-modal",
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
                step === 0 ? null : /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                    className: "absolute left-1 top-2 !mt-0 p-1.5 pt-0",
                    children: /*#__PURE__*/ (0, $4MPRY$jsx)("button", {
                        onClick: ()=>dispatch({
                                payload: step - 1,
                                type: "SET_STEP"
                            }),
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                            className: "fa transition-color fa-long-arrow-left duration-75 dark:text-neutral-600 dark:hover:text-neutral-400"
                        })
                    })
                }),
                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                    className: "absolute right-1 top-2 !mt-0 p-1.5 pt-0",
                    children: /*#__PURE__*/ (0, $4MPRY$jsx)("button", {
                        onClick: handleClose,
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)("i", {
                            className: "fa transition-color fa-close duration-75 dark:text-neutral-600 dark:hover:text-neutral-400"
                        })
                    })
                }),
                /*#__PURE__*/ (0, $4MPRY$jsx)((0, $44e8e929fd5cdf17$export$2e2bcd8739ae039), {
                    progress: step / ((0, $68c68372be4a9678$export$fb587a27d5a722e7).__LENGTH - 1)
                }),
                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                    className: "!mt-0 w-full p-2",
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
                            }, "AssetSelection"),
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
                            }, "NetworkSelection"),
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
                            }, "PaymentMethod")
                        ]
                    })
                }),
                /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                    className: "!mt-0 w-full bg-neutral-100 p-2 dark:bg-neutral-800",
                    children: /*#__PURE__*/ (0, $4MPRY$jsx)("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, $4MPRY$jsx)((0, $4MPRY$Button), {
                            children: isLastStep ? "Close" : "Next"
                        })
                    })
                })
            ]
        })
    });
};
class $090815f5086f7f29$export$c06370d2ab5297a3 {
    constructor(config){
        this.element = config.element;
        this.onClose = ()=>{
            this.root.unmount();
        };
        const host = document.getElementById(this.element);
        if (!host) throw new Error(`Element ${this.element} not found`);
        this.root = (0, $4MPRY$createRoot)(host);
    }
    open() {
        this.root.render(/*#__PURE__*/ (0, $4MPRY$jsx)((0, $68c68372be4a9678$export$390f32400eaf98c9), {
            children: /*#__PURE__*/ (0, $4MPRY$jsx)($090815f5086f7f29$var$Map3Sdk, {
                onClose: this.onClose
            })
        }));
    }
    close() {
        this.onClose();
    }
}
const $090815f5086f7f29$export$421c3119381668 = ({ element: element  })=>{
    return new $090815f5086f7f29$export$c06370d2ab5297a3({
        element: element
    });
};
var $090815f5086f7f29$export$2e2bcd8739ae039 = $090815f5086f7f29$var$Map3Sdk;


export {$090815f5086f7f29$export$c06370d2ab5297a3 as Map3, $090815f5086f7f29$export$421c3119381668 as initMap3Sdk, $090815f5086f7f29$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
