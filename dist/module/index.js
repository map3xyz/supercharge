import {jsx as $g5tXh$jsx, jsxs as $g5tXh$jsxs, Fragment as $g5tXh$Fragment} from "react/jsx-runtime";
import {ApolloClient as $g5tXh$ApolloClient, InMemoryCache as $g5tXh$InMemoryCache, ApolloProvider as $g5tXh$ApolloProvider, gql as $g5tXh$gql, useQuery as $g5tXh$useQuery, useLazyQuery as $g5tXh$useLazyQuery} from "@apollo/client";
import {offsetLimitPagination as $g5tXh$offsetLimitPagination} from "@apollo/client/utilities";
import {createRoot as $g5tXh$createRoot} from "react-dom/client";
import {Modal as $g5tXh$Modal, Input as $g5tXh$Input, CoinLogo as $g5tXh$CoinLogo, Badge as $g5tXh$Badge, CryptoAddress as $g5tXh$CryptoAddress, Button as $g5tXh$Button, ReadOnlyText as $g5tXh$ReadOnlyText} from "@map3xyz/components";
import {useReducer as $g5tXh$useReducer, createContext as $g5tXh$createContext, useContext as $g5tXh$useContext, useState as $g5tXh$useState, useCallback as $g5tXh$useCallback, useRef as $g5tXh$useRef, useEffect as $g5tXh$useEffect} from "react";
import {AnimatePresence as $g5tXh$AnimatePresence, motion as $g5tXh$motion} from "framer-motion";
import {InView as $g5tXh$InView} from "react-intersection-observer";
import {ethers as $g5tXh$ethers} from "ethers";
import {QRCodeSVG as $g5tXh$QRCodeSVG} from "qrcode.react";














const $bdbf379108fa6dba$var$InnerWrapper = ({ children: children , className: className ,  })=>{
    return /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
        className: `w-full px-4 py-3 ${className || ""}`,
        children: children
    });
};
var $bdbf379108fa6dba$export$2e2bcd8739ae039 = $bdbf379108fa6dba$var$InnerWrapper;


const $5f70ae3cf4fa56a2$var$ErrorWrapper = ({ description: description , header: header , retry: retry ,  })=>{
    return /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "flex items-center gap-1 text-lg font-bold",
                children: [
                    /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                        className: "fa fa-circle-xmark text-red-600"
                    }),
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("h3", {
                        className: " dark:text-white",
                        children: header
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "mt-1 text-xs text-neutral-500",
                children: [
                    description,
                    " Please",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("a", {
                        className: "cursor-pointer text-blue-600 underline",
                        onClick: retry,
                        children: "click here"
                    }),
                    " ",
                    "to retry. If the error persists, please contact support."
                ]
            })
        ]
    });
};
var $5f70ae3cf4fa56a2$export$2e2bcd8739ae039 = $5f70ae3cf4fa56a2$var$ErrorWrapper;




const $b2b2deb69a511bef$var$LoadingWrapper = ({ message: message  })=>{
    return /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
        className: "flex h-64 w-full items-center justify-center text-sm",
        children: /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
            className: "flex flex-col items-center justify-center gap-2 font-semibold text-neutral-500",
            children: [
                /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                    className: "animate-spin ",
                    children: /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                        className: "fa fa-gear"
                    })
                }),
                /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                    children: message || "Loading..."
                })
            ]
        })
    });
};
var $b2b2deb69a511bef$export$2e2bcd8739ae039 = $b2b2deb69a511bef$var$LoadingWrapper;




const $772a74d0db3291da$var$defaultOptions = {};
const $772a74d0db3291da$export$df6092085ddedfe9 = (0, $g5tXh$gql)`
    query GetAssetsForOrg($limit: Int, $offset: Int) {
  assetsForOrganization(limit: $limit, offset: $offset) {
    id
    name
    networkCode
    networks {
      name
      networkCode
    }
    logo {
      png
      svg
    }
    symbol
  }
}
    `;
function $772a74d0db3291da$export$a37f4959db8e73ec(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useQuery($772a74d0db3291da$export$df6092085ddedfe9, options);
}
function $772a74d0db3291da$export$a93693127bf761f9(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useLazyQuery($772a74d0db3291da$export$df6092085ddedfe9, options);
}
const $772a74d0db3291da$export$52b242cb86690a9e = (0, $g5tXh$gql)`
    query GetNetworks {
  networks {
    name
    logo {
      png
      svg
    }
    symbol
  }
}
    `;
function $772a74d0db3291da$export$bc283edcabd99e20(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useQuery($772a74d0db3291da$export$52b242cb86690a9e, options);
}
function $772a74d0db3291da$export$67f813ea1df47787(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useLazyQuery($772a74d0db3291da$export$52b242cb86690a9e, options);
}
const $772a74d0db3291da$export$48c4fb575991a4d5 = (0, $g5tXh$gql)`
    query GetNetworksForAsset($assetId: String) {
  networksForAssetByOrg(assetId: $assetId) {
    name
    networkCode
    logo {
      png
      svg
    }
    identifiers {
      chainId
    }
    symbol
  }
}
    `;
function $772a74d0db3291da$export$4c6676fad490424(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useQuery($772a74d0db3291da$export$48c4fb575991a4d5, options);
}
function $772a74d0db3291da$export$94696387b621bf08(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useLazyQuery($772a74d0db3291da$export$48c4fb575991a4d5, options);
}
const $772a74d0db3291da$export$ddd700e599a7f647 = (0, $g5tXh$gql)`
    query GetPaymentMethods($chainId: Int) {
  methodsForNetwork(chainId: $chainId) {
    name
    icon
    logo
    value
    enabled
  }
}
    `;
function $772a74d0db3291da$export$9dcd3655219d0936(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useQuery($772a74d0db3291da$export$ddd700e599a7f647, options);
}
function $772a74d0db3291da$export$f594b80de5a5a199(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useLazyQuery($772a74d0db3291da$export$ddd700e599a7f647, options);
}
const $772a74d0db3291da$export$296263c4ea03d9b1 = (0, $g5tXh$gql)`
    query SearchAssets($query: String) {
  searchAssetsForOrganization(query: $query) {
    name
    logo {
      png
      svg
    }
    symbol
  }
}
    `;
function $772a74d0db3291da$export$f1c68938e0cf3c98(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useQuery($772a74d0db3291da$export$296263c4ea03d9b1, options);
}
function $772a74d0db3291da$export$7baf74c492ae3189(baseOptions) {
    const options = {
        ...$772a74d0db3291da$var$defaultOptions,
        ...baseOptions
    };
    return $g5tXh$useLazyQuery($772a74d0db3291da$export$296263c4ea03d9b1, options);
}




let $68c68372be4a9678$export$fb587a27d5a722e7;
(function(Steps) {
    Steps[Steps["AssetSelection"] = 0] = "AssetSelection";
    Steps[Steps["NetworkSelection"] = 1] = "NetworkSelection";
    Steps[Steps["PaymentMethod"] = 2] = "PaymentMethod";
    Steps[Steps["EnterAmount"] = 3] = "EnterAmount";
    Steps[Steps["Summary"] = 4] = "Summary";
    Steps[Steps["__LENGTH"] = 5] = "__LENGTH";
})($68c68372be4a9678$export$fb587a27d5a722e7 || ($68c68372be4a9678$export$fb587a27d5a722e7 = {}));
const $68c68372be4a9678$var$initialState = {
    account: {
        data: undefined,
        status: "idle"
    },
    asset: undefined,
    depositAddress: {
        data: undefined,
        status: "idle"
    },
    method: undefined,
    network: undefined,
    slug: undefined,
    step: $68c68372be4a9678$export$fb587a27d5a722e7.AssetSelection,
    steps: [
        "AssetSelection",
        "NetworkSelection",
        "PaymentMethod",
        "EnterAmount",
        "Summary", 
    ],
    theme: undefined
};
const $68c68372be4a9678$export$390f32400eaf98c9 = ({ asset: asset , children: children , generateDepositAddress: generateDepositAddress , network: network , slug: slug , theme: theme  })=>{
    let step = 0;
    if (asset) step = $68c68372be4a9678$export$fb587a27d5a722e7.NetworkSelection;
    if (asset && network) step = $68c68372be4a9678$export$fb587a27d5a722e7.PaymentMethod;
    const [state, dispatch] = (0, $g5tXh$useReducer)((state, action)=>{
        switch(action.type){
            case "SET_ASSET":
                return {
                    ...state,
                    asset: action.payload
                };
            case "SET_NETWORK":
                return {
                    ...state,
                    network: action.payload
                };
            case "SET_STEP":
                return {
                    ...state,
                    step: state.steps.indexOf($68c68372be4a9678$export$fb587a27d5a722e7[action.payload])
                };
            case "SET_STEPS":
                return {
                    ...state,
                    steps: action.payload
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
            case "SET_ACCOUNT_SUCCESS":
                return {
                    ...state,
                    account: {
                        data: action.payload,
                        status: "success"
                    }
                };
            case "SET_ACCOUNT_ERROR":
                return {
                    ...state,
                    account: {
                        data: action.payload,
                        status: "error"
                    }
                };
            case "SET_ACCOUNT_LOADING":
                return {
                    ...state,
                    account: {
                        data: undefined,
                        status: "loading"
                    }
                };
            case "SET_ACCOUNT_IDLE":
                return {
                    ...state,
                    account: {
                        data: undefined,
                        status: "idle"
                    }
                };
            default:
                return state;
        }
    }, {
        ...$68c68372be4a9678$var$initialState,
        asset: asset,
        network: network,
        slug: slug,
        step: step,
        theme: theme
    });
    return /*#__PURE__*/ (0, $g5tXh$jsx)($68c68372be4a9678$export$841858b892ce1f4c.Provider, {
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
const $68c68372be4a9678$export$841858b892ce1f4c = /*#__PURE__*/ (0, $g5tXh$createContext)([
    $68c68372be4a9678$var$initialState,
    ()=>null,
    {
        generateDepositAddress: ()=>new Promise((resolve)=>resolve(""))
    }, 
]);







const $6b7119262a76a333$var$SvgLogo = (props)=>/*#__PURE__*/ (0, $g5tXh$jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 359 300",
        xmlSpace: "preserve",
        role: "img",
        ...props,
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsxs)("linearGradient", {
                id: "Logo__a",
                gradientUnits: "userSpaceOnUse",
                x1: -2656.257,
                y1: -1606.56,
                x2: -2469.722,
                y2: -1606.56,
                gradientTransform: "rotate(141.518 -1439.188 -228.03)",
                children: [
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0,
                        style: {
                            stopColor: "#fff33b"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.059,
                        style: {
                            stopColor: "#ffe029"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.13,
                        style: {
                            stopColor: "#ffd218"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.203,
                        style: {
                            stopColor: "#fec90f"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.281,
                        style: {
                            stopColor: "#fdc70c"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.668,
                        style: {
                            stopColor: "#f3903f"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.888,
                        style: {
                            stopColor: "#ed683c"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 1,
                        style: {
                            stopColor: "#e7733f"
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsx)("path", {
                fill: "url(#Logo__a)",
                d: "M322.752 281.792c.01 15.751-19.741 22.819-29.727 10.638L148.494 113.064l119.721-95.181c21.96-17.459 54.372-1.832 54.39 26.222l.147 237.687z"
            }),
            /*#__PURE__*/ (0, $g5tXh$jsxs)("linearGradient", {
                id: "Logo__b",
                gradientUnits: "userSpaceOnUse",
                x1: -428.414,
                y1: 928.076,
                x2: -241.879,
                y2: 928.076,
                gradientTransform: "rotate(-38.482 -1254.137 -28.705)",
                children: [
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0,
                        style: {
                            stopColor: "#fff33b"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.059,
                        style: {
                            stopColor: "#ffe029"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.13,
                        style: {
                            stopColor: "#ffd218"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.203,
                        style: {
                            stopColor: "#fec90f"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.281,
                        style: {
                            stopColor: "#fdc70c"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.668,
                        style: {
                            stopColor: "#f3903f"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 0.888,
                        style: {
                            stopColor: "#ed683c"
                        }
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("stop", {
                        offset: 1,
                        style: {
                            stopColor: "#eb583c"
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsx)("path", {
                fill: "url(#Logo__b)",
                d: "M36.248 18.208C36.238 2.457 55.989-4.611 65.975 7.57l144.531 179.366-119.721 95.181c-21.96 17.459-54.372 1.832-54.39-26.222l-.147-237.687z"
            })
        ]
    });
var $6b7119262a76a333$export$2e2bcd8739ae039 = $6b7119262a76a333$var$SvgLogo;





const $44e8e929fd5cdf17$var$ProgressBar = ({ progress: progress  })=>{
    return /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
        className: "relative h-1 w-full rounded-lg bg-neutral-100 dark:bg-neutral-800",
        children: /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
            className: "absolute left-0 h-full rounded-lg bg-blue-600 transition-all duration-150",
            style: {
                width: progress * 100 + "%"
            }
        })
    });
};
var $44e8e929fd5cdf17$export$2e2bcd8739ae039 = $44e8e929fd5cdf17$var$ProgressBar;












const $db92928978b16895$export$61fc7d43ac8f84b0 = (func, duration)=>{
    let timeout;
    // @ts-ignore
    return function(...args) {
        const effect = ()=>{
            timeout = null;
            // @ts-ignore
            return func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(effect, duration);
    };
};


const $d8f5e4867dc7bbaa$var$AssetSelection = ()=>{
    const [state, dispatch] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const [formValue, setFormValue] = (0, $g5tXh$useState)();
    const { data: data , error: error , fetchMore: fetchMore , loading: loading , refetch: refetch  } = (0, $772a74d0db3291da$export$a37f4959db8e73ec)({
        variables: {
            limit: 10,
            offset: 0
        }
    });
    const [search, { data: searchData , loading: searching  }] = (0, $772a74d0db3291da$export$7baf74c492ae3189)();
    const debouncedSearch = (0, $g5tXh$useCallback)((0, $db92928978b16895$export$61fc7d43ac8f84b0)(search, 100), []);
    if (loading) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b2b2deb69a511bef$export$2e2bcd8739ae039), {});
    if (error) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $5f70ae3cf4fa56a2$export$2e2bcd8739ae039), {
        description: "We couldn't get a list of assets to select.",
        header: "Error Fetching Assets",
        retry: ()=>refetch()
    });
    const assets = searchData?.searchAssetsForOrganization?.length ? searchData.searchAssetsForOrganization : data?.assetsForOrganization;
    return /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $g5tXh$Fragment), {
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                className: "sticky top-0 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900",
                children: /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                    className: "!pt-0",
                    children: [
                        /*#__PURE__*/ (0, $g5tXh$jsx)("h3", {
                            className: "text-lg font-semibold dark:text-white",
                            "data-testid": "select-asset",
                            children: "Select Asset"
                        }),
                        /*#__PURE__*/ (0, $g5tXh$jsxs)("h5", {
                            className: "text-xs text-neutral-400",
                            children: [
                                "Select the ",
                                /*#__PURE__*/ (0, $g5tXh$jsx)("b", {
                                    children: "Asset"
                                }),
                                " you want to deposit."
                            ]
                        }),
                        /*#__PURE__*/ (0, $g5tXh$jsx)("form", {
                            className: "mt-2",
                            onChange: (e)=>setFormValue(new FormData(e.currentTarget)),
                            children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Input), {
                                icon: /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                    className: "fa fa-search"
                                }),
                                name: "asset-search",
                                onChange: (e)=>debouncedSearch({
                                        variables: {
                                            query: e.target.value
                                        }
                                    }),
                                placeholder: "Search for an asset...",
                                rounded: true
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "flex flex-col dark:text-white",
                children: [
                    searching ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b2b2deb69a511bef$export$2e2bcd8739ae039), {}) : formValue?.get("asset-search") && !searchData?.searchAssetsForOrganization?.length ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $5f70ae3cf4fa56a2$export$2e2bcd8739ae039), {
                        description: "We couldn't find any assets that matched your search.",
                        header: "No Assets Found",
                        retry: ()=>search({
                                variables: {
                                    query: formValue.get("asset-search")
                                }
                            })
                    }) : assets?.map((asset)=>{
                        if (!asset) return null;
                        return /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                            className: "flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800",
                            onClick: ()=>{
                                dispatch({
                                    payload: asset,
                                    type: "SET_ASSET"
                                });
                                dispatch({
                                    payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                    type: "SET_STEP"
                                });
                            },
                            role: "button",
                            children: [
                                /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                            className: "flex w-4 justify-center",
                                            children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$CoinLogo), {
                                                height: "h-4",
                                                name: asset.name || "",
                                                png: asset.logo?.png || undefined,
                                                svg: asset.logo?.svg || undefined,
                                                width: "w-4"
                                            })
                                        }),
                                        /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                            children: asset?.name
                                        })
                                    ]
                                }),
                                asset.symbol === state.asset?.symbol ? /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                    className: "fa fa-check-circle text-green-400"
                                }) : /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                    className: "fa fa-chevron-right text-xxs"
                                })
                            ]
                        }, asset?.name);
                    }),
                    assets?.length ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$InView), {
                        onChange: async (inView)=>{
                            const currentLength = assets?.length || 0;
                            if (inView) await fetchMore({
                                variables: {
                                    limit: currentLength * 2,
                                    offset: currentLength
                                }
                            });
                        }
                    }) : null
                ]
            })
        ]
    });
};
var $d8f5e4867dc7bbaa$export$2e2bcd8739ae039 = $d8f5e4867dc7bbaa$var$AssetSelection;









const $239f4b0af4eb842b$var$MethodIcon = ({ method: method  })=>{
    return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Fragment), {
        children: method.icon ? /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
            className: method.icon + " h-4 w-4"
        }) : method.logo ? /*#__PURE__*/ (0, $g5tXh$jsx)("img", {
            className: "h-4 w-4",
            src: method.logo
        }) : null
    });
};
var $239f4b0af4eb842b$export$2e2bcd8739ae039 = $239f4b0af4eb842b$var$MethodIcon;








const $37902b78d3962e66$var$Web3 = ({ amount: amount , disabled: disabled , setFormError: setFormError  })=>{
    const [state, dispatch] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    if (!state.method || !state.method.value) return null;
    const connect = async ()=>{
        const providers = window.ethereum?.providers;
        const selectedProvider = providers?.find((x)=>x[state.method.value]);
        if ((!window.ethereum || !window.ethereum[state.method.value]) && !selectedProvider) {
            dispatch({
                payload: "No provider found.",
                type: "SET_ACCOUNT_ERROR"
            });
            setFormError(`Please download the ${state.method.name} extension.`);
            return;
        }
        const eth = new (0, $g5tXh$ethers).providers.Web3Provider(selectedProvider || window.ethereum);
        if (eth.provider) {
            // @ts-ignore
            eth.provider.on("accountsChanged", async (accounts)=>{
                if (accounts && accounts[0]) dispatch({
                    payload: accounts[0],
                    type: "SET_ACCOUNT_SUCCESS"
                });
                else dispatch({
                    type: "SET_ACCOUNT_IDLE"
                });
            });
            dispatch({
                type: "SET_ACCOUNT_LOADING"
            });
            const accounts = await eth.send("eth_accounts", []);
            if (accounts && accounts[0]) dispatch({
                payload: accounts[0],
                type: "SET_ACCOUNT_SUCCESS"
            });
            else try {
                const requestedAccounts = await eth.send("eth_requestAccounts", []);
                if (requestedAccounts && requestedAccounts[0]) dispatch({
                    payload: requestedAccounts[0],
                    type: "SET_ACCOUNT_SUCCESS"
                });
            } catch (e) {
                if (e.message === "User rejected the request." || e.message === "User denied account authorization") {
                    dispatch({
                        payload: e.message,
                        type: "SET_ACCOUNT_ERROR"
                    });
                    setFormError(e.message);
                } else console.log(e);
            }
        }
    };
    (0, $g5tXh$useEffect)(()=>{
        connect();
        const handleMessage = (event)=>{
            if (event.data && event.data.type === "web3_connect") connect();
        };
        window.addEventListener("message", handleMessage);
        return ()=>{
            window.removeEventListener("message", handleMessage);
        };
    }, []);
    let cta = "Confirm Payment";
    switch(state.account.status){
        case "loading":
            cta = "Connecting...";
            break;
        case "error":
        case "idle":
            cta = "Connect Wallet";
            break;
    }
    return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Button), {
        block: true,
        disabled: disabled || state.account.status === "error" && state.account.data === "No provider found." || state.account.status === "success" && Number(amount) === 0 || state.account.status === "loading",
        htmlType: "submit",
        loading: state.account.status === "loading" || state.depositAddress.status === "loading",
        size: "medium",
        type: "default",
        children: /*#__PURE__*/ (0, $g5tXh$jsxs)("span", {
            className: "flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, $g5tXh$jsx)((0, $239f4b0af4eb842b$export$2e2bcd8739ae039), {
                    method: state.method
                }),
                cta
            ]
        })
    });
};
var $37902b78d3962e66$export$2e2bcd8739ae039 = $37902b78d3962e66$var$Web3;



const $389c6829553d16e1$var$BASE_FONT_SIZE = 48;
const $389c6829553d16e1$var$rates = {
    "BTC/USD": 20000
};
const $389c6829553d16e1$var$EnterAmount = ()=>{
    const dummyInputRef = (0, $g5tXh$useRef)(null);
    const dummySymbolRef = (0, $g5tXh$useRef)(null);
    const inputRef = (0, $g5tXh$useRef)(null);
    const formRef = (0, $g5tXh$useRef)(null);
    const quoteRef = (0, $g5tXh$useRef)(null);
    const [state, dispatch, { generateDepositAddress: generateDepositAddress  }] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const [formValue, setFormValue] = (0, $g5tXh$useState)({
        base: "0",
        inputSelected: "fiat",
        quote: "0"
    });
    const [amount, setAmount] = (0, $g5tXh$useState)(0);
    const [formError, setFormError] = (0, $g5tXh$useState)("");
    (0, $g5tXh$useEffect)(()=>{
        if (!dummyInputRef.current || !dummySymbolRef.current) return;
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
        formValue,
        state.depositAddress.data
    ]);
    (0, $g5tXh$useEffect)(()=>{
        const rate = $389c6829553d16e1$var$rates["BTC/USD"];
        const base = parseFloat(formValue.base || "0");
        const quote = formValue.inputSelected === "crypto" ? base * rate : base / rate;
        setFormValue((formValue)=>({
                ...formValue,
                quote: formValue.inputSelected === "crypto" ? quote.toFixed(2) : quote.toFixed(8)
            }));
        setAmount(formValue.inputSelected === "crypto" ? base : quote);
    }, [
        formValue.base
    ]);
    (0, $g5tXh$useEffect)(()=>{
        if (state.account.status === "success") setFormError(undefined);
    }, [
        state.account.status
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
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            setFormError(undefined);
            if (state.account.status === "idle" || state.account.status === "error") {
                window.postMessage({
                    type: "web3_connect"
                }, "*");
                return;
            }
            let currentChainId;
            let provider = window.ethereum;
            try {
                currentChainId = await window.ethereum.request({
                    method: "eth_chainId"
                });
            } catch (e1) {
                provider = window.ethereum.providers.find((provider)=>provider[state.method?.value] === true).request;
                currentChainId = await provider({
                    method: "eth_chainId"
                });
            }
            if (state.network?.identifiers?.chainId && Number(currentChainId) !== state.network?.identifiers?.chainId) try {
                await provider({
                    method: "wallet_switchEthereumChain",
                    params: [
                        {
                            chainId: (0, $g5tXh$ethers).utils.hexlify(state.network?.identifiers?.chainId)
                        }, 
                    ]
                });
            } catch (e2) {
                console.log(e2);
                setFormError(`Please switch to ${state.network?.name} network in ${state.method?.name}`);
                return;
            }
            let address = "";
            try {
                dispatch({
                    type: "GENERATE_DEPOSIT_ADDRESS_LOADING"
                });
                address = await generateDepositAddress(state.asset?.symbol, state.network?.symbol);
                dispatch({
                    payload: address,
                    type: "GENERATE_DEPOSIT_ADDRESS_SUCCESS"
                });
            } catch (e3) {
                dispatch({
                    type: "GENERATE_DEPOSIT_ADDRESS_ERROR"
                });
                throw new Error("Error generating a deposit address.");
            }
            const transactionParameters = {
                from: state.account.data,
                to: address,
                value: (0, $g5tXh$ethers).utils.parseEther(amount.toString()).toHexString()
            };
            try {
                const currentProvider = window.ethereum.providers.find((x)=>x[state.method.value || "isMetaMask"]);
                await currentProvider.send("eth_sendTransaction", [
                    transactionParameters, 
                ]);
            } catch (e4) {
                setFormError(e4.message);
            }
        } catch (e5) {
            if (e5.message) setFormError(e5.message);
            console.error(e5);
        }
    };
    if (!state.asset || !state.network || !state.method) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    return /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
        className: "flex h-full flex-col",
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                className: "!pt-0",
                children: /*#__PURE__*/ (0, $g5tXh$jsx)("h3", {
                    className: "text-lg font-semibold dark:text-white",
                    "data-testid": "enter-amount",
                    children: "Enter Amount"
                })
            }),
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-8 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                children: [
                    "Deposit",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                            color: "blue",
                            size: "large",
                            children: state.asset.symbol || ""
                        })
                    }),
                    " ",
                    "on",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                            color: "blue",
                            size: "large",
                            children: state.network.symbol || ""
                        })
                    }),
                    " ",
                    "via",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                        onClick: ()=>{
                            if (state.account.status === "success") dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod,
                                type: "SET_STEP"
                            });
                            else window.postMessage({
                                type: "web3_connect"
                            }, "*");
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                            color: state.account.status === "loading" || state.account.status === "idle" ? "yellow" : state.account.status === "error" ? "red" : "green",
                            dot: true,
                            size: "large",
                            children: /*#__PURE__*/ (0, $g5tXh$jsxs)("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, $g5tXh$jsx)((0, $239f4b0af4eb842b$export$2e2bcd8739ae039), {
                                        method: state.method
                                    }),
                                    " ",
                                    state.method.name,
                                    " ",
                                    state.account.status === "success" && state.account.data ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$CryptoAddress), {
                                        hint: false,
                                        children: state.account.data
                                    }) : ""
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                className: "h-full",
                children: /*#__PURE__*/ (0, $g5tXh$jsxs)("form", {
                    className: "flex h-full flex-col items-center justify-between text-5xl font-semibold dark:text-white",
                    "data-testid": "enter-amount-form",
                    onChange: (event)=>{
                        const target = event.target;
                        setFormValue((formValue)=>({
                                ...formValue,
                                [target.name]: target.value
                            }));
                    },
                    onSubmit: handleSubmit,
                    ref: formRef,
                    children: [
                        /*#__PURE__*/ (0, $g5tXh$jsx)("div", {}),
                        /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                    className: "relative box-border flex max-w-full items-center justify-center",
                                    children: [
                                        formValue.inputSelected === "fiat" ? /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                            className: "text-inherit",
                                            children: "$"
                                        }) : null,
                                        /*#__PURE__*/ (0, $g5tXh$jsx)("input", {
                                            autoFocus: true,
                                            className: "flex h-14 max-w-full bg-transparent text-center text-inherit outline-0 ring-0",
                                            "data-testid": "input",
                                            name: "base",
                                            placeholder: "0",
                                            ref: inputRef,
                                            step: formValue.inputSelected === "fiat" ? "0.01" : "0.00000001",
                                            style: {
                                                minWidth: `${$389c6829553d16e1$var$BASE_FONT_SIZE}px`
                                            },
                                            type: "number"
                                        }),
                                        /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                            className: "invisible absolute -left-96 -top-96 pl-6 !text-5xl",
                                            ref: dummyInputRef
                                        }),
                                        /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                            className: "invisible absolute -left-96 -top-96 pl-6 !text-5xl",
                                            ref: dummySymbolRef,
                                            children: formValue.inputSelected === "crypto" ? state.network.symbol : "$"
                                        }),
                                        formValue.inputSelected === "crypto" ? /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                            className: "text-inherit",
                                            children: state.network.symbol
                                        }) : null
                                    ]
                                }),
                                /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                    className: "mt-8 flex items-center justify-center text-neutral-400",
                                    children: [
                                        /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                            className: "text-xs",
                                            children: [
                                                formValue.inputSelected === "crypto" ? /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                                    children: "$\xa0"
                                                }) : null,
                                                /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                                    "data-testid": "quote",
                                                    ref: quoteRef,
                                                    children: formValue.quote
                                                }),
                                                formValue.inputSelected === "fiat" ? /*#__PURE__*/ (0, $g5tXh$jsxs)("span", {
                                                    children: [
                                                        "\xa0",
                                                        state.network.symbol
                                                    ]
                                                }) : null
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                            className: "ml-4 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                                className: "flex cursor-pointer flex-col text-xxs transition-colors duration-100 hover:text-blue-600 hover:dark:text-blue-600",
                                                "data-testid": "toggle-base",
                                                onClick: toggleBase,
                                                role: "button",
                                                children: [
                                                    /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                                        className: "fa fa-chevron-up"
                                                    }),
                                                    /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                                        className: "fa fa-chevron-down"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                            className: "relative w-full",
                            children: [
                                formError ? /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                    className: "absolute -top-2 flex w-full -translate-y-full",
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                                        color: "red",
                                        dot: true,
                                        children: formError
                                    })
                                }) : null,
                                /*#__PURE__*/ (0, $g5tXh$jsx)((0, $37902b78d3962e66$export$2e2bcd8739ae039), {
                                    amount: amount,
                                    disabled: state.depositAddress.status === "loading",
                                    setFormError: setFormError
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










const $e9fc485e32047442$var$NetworkSelection = ()=>{
    const [state, dispatch] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    console.log(state.asset?.id);
    const { data: data , error: error , loading: loading , refetch: refetch  } = (0, $772a74d0db3291da$export$4c6676fad490424)({
        variables: {
            assetId: state.asset?.id
        }
    });
    if (loading) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b2b2deb69a511bef$export$2e2bcd8739ae039), {
        message: "Fetching Networks..."
    });
    if (error) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $5f70ae3cf4fa56a2$export$2e2bcd8739ae039), {
        description: "We couldn't get a list of networks to select.",
        header: "Error Fetching Networks",
        retry: refetch
    });
    if (!state.asset) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    return /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $g5tXh$Fragment), {
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "sticky top-0 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900",
                children: [
                    /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                        className: "!pt-0",
                        children: [
                            /*#__PURE__*/ (0, $g5tXh$jsx)("h3", {
                                className: "text-lg font-semibold dark:text-white",
                                "data-testid": "network-select",
                                children: "Select Network"
                            }),
                            /*#__PURE__*/ (0, $g5tXh$jsxs)("h5", {
                                className: "text-xs text-neutral-400",
                                children: [
                                    "Select the Network to deposit ",
                                    /*#__PURE__*/ (0, $g5tXh$jsx)("b", {
                                        children: state.asset.name
                                    }),
                                    " on."
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                        className: "w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                        children: [
                            "Deposit",
                            " ",
                            /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                className: "text-blue-600 underline",
                                onClick: ()=>{
                                    dispatch({
                                        payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                        type: "SET_STEP"
                                    });
                                },
                                role: "button",
                                children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                                    color: "blue",
                                    size: "large",
                                    children: state.asset.name || ""
                                })
                            }),
                            " ",
                            "on"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                className: "flex flex-col dark:text-white",
                children: data?.networksForAssetByOrg?.map((network)=>network ? /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                        className: "flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800",
                        onClick: ()=>{
                            dispatch({
                                payload: network,
                                type: "SET_NETWORK"
                            });
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                        className: "flex w-4 justify-center",
                                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$CoinLogo), {
                                            height: "h-4",
                                            name: network.name || "",
                                            png: network.logo?.png || undefined,
                                            svg: network.logo?.svg || undefined,
                                            width: "w-4"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                        children: network.name
                                    })
                                ]
                            }),
                            state.network?.name === network.name ? /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                className: "fa fa-check-circle text-green-400"
                            }) : /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                className: "fa fa-chevron-right text-xxs"
                            })
                        ]
                    }, network.name) : null)
            })
        ]
    });
};
var $e9fc485e32047442$export$2e2bcd8739ae039 = $e9fc485e32047442$var$NetworkSelection;











const $d752ec9124ef7f1d$var$PaymentMethod = ()=>{
    const [state, dispatch] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const { data: data , error: error , loading: loading , refetch: refetch  } = (0, $772a74d0db3291da$export$9dcd3655219d0936)({
        variables: {
            chainId: state.network?.identifiers?.chainId
        }
    });
    if (loading) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b2b2deb69a511bef$export$2e2bcd8739ae039), {
        message: "Fetching Payment Methods..."
    });
    if (error) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $5f70ae3cf4fa56a2$export$2e2bcd8739ae039), {
        description: "We couldn't get a list of payment methods to select.",
        header: "Error Fetching Payment Methods",
        retry: refetch
    });
    if (!state.asset || !state.network) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    return /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $g5tXh$Fragment), {
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "sticky top-0 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900",
                children: [
                    /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                        className: "!pt-0",
                        children: [
                            /*#__PURE__*/ (0, $g5tXh$jsx)("h3", {
                                className: "text-lg font-semibold dark:text-white",
                                "data-testid": "payment-method",
                                children: "Payment Method"
                            }),
                            /*#__PURE__*/ (0, $g5tXh$jsx)("h5", {
                                className: "text-xs text-neutral-400",
                                children: "How do you want to deposit?"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                        className: "w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                        children: [
                            "Deposit",
                            " ",
                            /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                className: "text-blue-600 underline",
                                onClick: ()=>{
                                    dispatch({
                                        payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                        type: "SET_STEP"
                                    });
                                },
                                role: "button",
                                children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                                    color: "blue",
                                    size: "large",
                                    children: state.asset?.symbol || ""
                                })
                            }),
                            " ",
                            "on",
                            " ",
                            /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                className: "text-blue-600 underline",
                                onClick: ()=>{
                                    dispatch({
                                        payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                        type: "SET_STEP"
                                    });
                                },
                                role: "button",
                                children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                                    color: "blue",
                                    size: "large",
                                    children: state.network?.symbol || ""
                                })
                            }),
                            " ",
                            "via"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                className: "flex flex-col dark:text-white",
                children: data?.methodsForNetwork?.map((method)=>method ? /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                        className: `flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm leading-8 hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800 ${method.enabled ? "" : "!cursor-not-allowed opacity-50 hover:bg-white dark:hover:bg-neutral-900"}`,
                        onClick: ()=>{
                            if (!method.enabled) return;
                            dispatch({
                                payload: method,
                                type: "SET_PAYMENT_METHOD"
                            });
                            if (method.value === "qr") {
                                dispatch({
                                    payload: [
                                        "AssetSelection",
                                        "NetworkSelection",
                                        "PaymentMethod",
                                        "Summary", 
                                    ],
                                    type: "SET_STEPS"
                                });
                                dispatch({
                                    payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).Summary,
                                    type: "SET_STEP"
                                });
                            } else {
                                dispatch({
                                    payload: [
                                        "AssetSelection",
                                        "NetworkSelection",
                                        "PaymentMethod",
                                        "EnterAmount",
                                        "Summary", 
                                    ],
                                    type: "SET_STEPS"
                                });
                                dispatch({
                                    payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).EnterAmount,
                                    type: "SET_STEP"
                                });
                            }
                        },
                        role: "button",
                        children: [
                            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, $g5tXh$jsx)((0, $239f4b0af4eb842b$export$2e2bcd8739ae039), {
                                        method: method
                                    }),
                                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                        children: method.name
                                    })
                                ]
                            }),
                            state.method?.value === method.value ? /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                className: "fa fa-check-circle text-green-400"
                            }) : /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                className: "fa fa-chevron-right text-xxs"
                            })
                        ]
                    }, method.value) : null)
            })
        ]
    });
};
var $d752ec9124ef7f1d$export$2e2bcd8739ae039 = $d752ec9124ef7f1d$var$PaymentMethod;









const $194171c89e26756c$var$QRCode = ()=>{
    const [state, dispatch, { generateDepositAddress: generateDepositAddress  }] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    if (!state.asset || !state.network || !state.method) {
        dispatch({
            payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
            type: "SET_STEP"
        });
        return null;
    }
    (0, $g5tXh$useEffect)(()=>{
        const run = async ()=>{
            try {
                dispatch({
                    type: "GENERATE_DEPOSIT_ADDRESS_LOADING"
                });
                const address = await generateDepositAddress(state.asset?.symbol, state.network?.symbol);
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
        return ()=>dispatch({
                type: "GENERATE_DEPOSIT_ADDRESS_IDLE"
            });
    }, []);
    return /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                className: "!pt-0",
                children: /*#__PURE__*/ (0, $g5tXh$jsx)("h3", {
                    className: "text-lg font-semibold dark:text-white",
                    "data-testid": "qrcode-method",
                    children: "Scan QR Code"
                })
            }),
            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                className: "w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-8 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
                children: [
                    "Deposit",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                            color: "blue",
                            size: "large",
                            children: state.asset?.name || ""
                        })
                    }),
                    " ",
                    "on",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                            color: "blue",
                            size: "large",
                            children: state.network?.symbol || ""
                        })
                    }),
                    " ",
                    "via",
                    " ",
                    /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                        className: "text-blue-600 underline",
                        onClick: ()=>{
                            dispatch({
                                payload: (0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod,
                                type: "SET_STEP"
                            });
                        },
                        role: "button",
                        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Badge), {
                            color: "blue",
                            size: "large",
                            children: /*#__PURE__*/ (0, $g5tXh$jsxs)("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, $g5tXh$jsx)((0, $239f4b0af4eb842b$export$2e2bcd8739ae039), {
                                        method: state.method
                                    }),
                                    " ",
                                    state.method.name
                                ]
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                children: [
                    state.depositAddress.status === "loading" && /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                        className: "flex h-64 items-center justify-center text-sm",
                        children: /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                            className: "flex flex-col items-center gap-2 font-semibold",
                            children: [
                                /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                    className: "animate-spin dark:text-white",
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                        className: "fa fa-gear"
                                    })
                                }),
                                /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                    className: "dark:text-white",
                                    children: "Generating Address..."
                                })
                            ]
                        })
                    }),
                    state.depositAddress.status === "error" && /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                        className: "flex h-64 items-center justify-center text-sm",
                        children: /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                            className: "flex flex-col items-center gap-2 font-semibold",
                            children: [
                                /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                    className: "animate-spin font-semibold text-red-600",
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                        className: "fa fa-circle-xmark"
                                    })
                                }),
                                /*#__PURE__*/ (0, $g5tXh$jsx)("span", {
                                    className: "text-red-600",
                                    children: "Error generating deposit address."
                                })
                            ]
                        })
                    }),
                    state.depositAddress.status === "success" && state.depositAddress.data && /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                        className: "flex w-full flex-col items-center justify-center gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                className: "text-xs text-neutral-400",
                                children: [
                                    "Only send ",
                                    state.asset.name,
                                    " on the ",
                                    state.network?.symbol,
                                    " ",
                                    "Network to this address."
                                ]
                            }),
                            /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                className: "flex w-full justify-center",
                                children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$QRCodeSVG), {
                                    bgColor: state.theme === "dark" ? "#262626" : "#FFFFFF",
                                    className: "rounded-lg",
                                    fgColor: state.theme === "dark" ? "#FFFFFF" : "#000000",
                                    imageSettings: {
                                        excavate: false,
                                        height: 40,
                                        src: state.asset.logo?.svg || state.asset.logo?.png || "",
                                        width: 40
                                    },
                                    includeMargin: true,
                                    size: 150,
                                    style: {
                                        border: state.theme === "dark" ? "1px solid #404040" : "1px solid #e5e5e5"
                                    },
                                    value: state.depositAddress.data
                                })
                            }),
                            /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                                className: "w-full",
                                children: [
                                    /*#__PURE__*/ (0, $g5tXh$jsx)("label", {
                                        className: "text-xs dark:text-white",
                                        children: "Deposit Address"
                                    }),
                                    /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$ReadOnlyText), {
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


const $9a95d74070ec74d1$var$Map3SdkSteps = ({ onClose: onClose  })=>{
    const [state, dispatch] = (0, $g5tXh$useContext)((0, $68c68372be4a9678$export$841858b892ce1f4c));
    const { step: step , steps: steps  } = state;
    return /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
        className: "flex w-full flex-col justify-between",
        style: {
            height: "500px"
        },
        children: [
            /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $g5tXh$Fragment), {
                children: [
                    /*#__PURE__*/ (0, $g5tXh$jsx)((0, $bdbf379108fa6dba$export$2e2bcd8739ae039), {
                        children: /*#__PURE__*/ (0, $g5tXh$jsxs)("div", {
                            className: "flex w-full items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, $g5tXh$jsx)("button", {
                                    "aria-label": "Back",
                                    className: step === 0 ? "invisible" : "visible",
                                    onClick: ()=>dispatch({
                                            payload: step - 1,
                                            type: "SET_STEP"
                                        }),
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                        className: "fa transition-color fa-long-arrow-left duration-75 dark:text-neutral-600 dark:hover:text-neutral-400"
                                    })
                                }),
                                /*#__PURE__*/ (0, $g5tXh$jsx)((0, $44e8e929fd5cdf17$export$2e2bcd8739ae039), {
                                    progress: step / (steps.length - 1)
                                }),
                                /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)("button", {
                                        onClick: onClose,
                                        children: /*#__PURE__*/ (0, $g5tXh$jsx)("i", {
                                            className: "fa transition-color fa-close duration-75 dark:text-neutral-600 dark:hover:text-neutral-400"
                                        })
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                        className: "!mt-0 h-full w-full overflow-scroll",
                        children: /*#__PURE__*/ (0, $g5tXh$jsxs)((0, $g5tXh$AnimatePresence), {
                            mode: "wait",
                            children: [
                                steps[step] === (0, $68c68372be4a9678$export$fb587a27d5a722e7)[(0, $68c68372be4a9678$export$fb587a27d5a722e7).AssetSelection] && /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$motion).div, {
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    initial: {
                                        opacity: 0
                                    },
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $d8f5e4867dc7bbaa$export$2e2bcd8739ae039), {})
                                }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                                steps[step] === (0, $68c68372be4a9678$export$fb587a27d5a722e7)[(0, $68c68372be4a9678$export$fb587a27d5a722e7).NetworkSelection] && /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$motion).div, {
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    initial: {
                                        opacity: 0
                                    },
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $e9fc485e32047442$export$2e2bcd8739ae039), {})
                                }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                                steps[step] === (0, $68c68372be4a9678$export$fb587a27d5a722e7)[(0, $68c68372be4a9678$export$fb587a27d5a722e7).PaymentMethod] && /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$motion).div, {
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    initial: {
                                        opacity: 0
                                    },
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $d752ec9124ef7f1d$export$2e2bcd8739ae039), {})
                                }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                                steps[step] === (0, $68c68372be4a9678$export$fb587a27d5a722e7)[(0, $68c68372be4a9678$export$fb587a27d5a722e7).EnterAmount] && /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$motion).div, {
                                    animate: {
                                        opacity: 1
                                    },
                                    className: "h-full",
                                    exit: {
                                        opacity: 0
                                    },
                                    initial: {
                                        opacity: 0
                                    },
                                    children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $389c6829553d16e1$export$2e2bcd8739ae039), {})
                                }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step]),
                                steps[step] === (0, $68c68372be4a9678$export$fb587a27d5a722e7)[(0, $68c68372be4a9678$export$fb587a27d5a722e7).Summary] && /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$motion).div, {
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0
                                    },
                                    initial: {
                                        opacity: 0
                                    },
                                    children: state.method?.value === "qr" ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $194171c89e26756c$export$2e2bcd8739ae039), {}) : null
                                }, (0, $68c68372be4a9678$export$fb587a27d5a722e7)[step])
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                className: "!mt-0 w-full border-t border-neutral-200 bg-neutral-100 py-2 text-center dark:border-neutral-700 dark:bg-neutral-800",
                children: /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                    className: "flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $g5tXh$jsxs)("a", {
                        "aria-label": "Map3.xyz",
                        className: "flex gap-1 text-xxs text-neutral-400",
                        href: "https://map3.xyz",
                        target: "_blank",
                        children: [
                            "Powered by ",
                            /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
                                className: "h-3",
                                children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $6b7119262a76a333$export$2e2bcd8739ae039), {
                                    className: "h-3"
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
};
var $9a95d74070ec74d1$export$2e2bcd8739ae039 = $9a95d74070ec74d1$var$Map3SdkSteps;


const $ddec68c329991042$var$AppWithAsset = ({ config: config , onClose: onClose  })=>{
    const [_, assetString] = config?.slug?.split(":") ?? [];
    // TODO: use asset search
    const { data: data , error: error , loading: loading , refetch: refetch  } = (0, $772a74d0db3291da$export$a37f4959db8e73ec)({
        variables: {
            limit: 10,
            offset: 0
        }
    });
    if (loading) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b2b2deb69a511bef$export$2e2bcd8739ae039), {});
    const asset = data?.assetsForOrganization?.find((asset)=>asset?.name === assetString);
    if (error || !asset) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $5f70ae3cf4fa56a2$export$2e2bcd8739ae039), {
        description: "We had trouble finding that asset.",
        header: "Failed to initialize the SDK",
        retry: refetch
    });
    return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $68c68372be4a9678$export$390f32400eaf98c9), {
        ...config,
        asset: asset,
        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $9a95d74070ec74d1$export$2e2bcd8739ae039), {
            onClose: onClose
        })
    });
};
var $ddec68c329991042$export$2e2bcd8739ae039 = $ddec68c329991042$var$AppWithAsset;









const $b8b35d1d31929ab9$var$AppWithAssetAndNetwork = ({ config: config , onClose: onClose  })=>{
    const [networkString, assetString] = config?.slug?.split(":") ?? [];
    // TODO: use network search
    const { data: data , error: error , loading: loading , refetch: refetch  } = (0, $772a74d0db3291da$export$bc283edcabd99e20)();
    // TODO: use asset search
    const { data: assetData , error: assetError , loading: assetLoading , refetch: assetRefetch ,  } = (0, $772a74d0db3291da$export$a37f4959db8e73ec)({
        variables: {
            limit: 10,
            offset: 0
        }
    });
    if (loading || assetLoading) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b2b2deb69a511bef$export$2e2bcd8739ae039), {});
    const network = data?.networks?.find((network)=>network?.name === networkString);
    const asset = assetData?.assetsForOrganization?.find((asset)=>asset?.name === assetString);
    if (error || assetError || !network || !asset) return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $5f70ae3cf4fa56a2$export$2e2bcd8739ae039), {
        description: "We had trouble loading the asset or network selected.",
        header: "Failed to initialize the SDK",
        retry: ()=>{
            refetch();
            assetRefetch();
        }
    });
    return /*#__PURE__*/ (0, $g5tXh$jsx)((0, $68c68372be4a9678$export$390f32400eaf98c9), {
        ...config,
        asset: asset,
        network: network,
        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $9a95d74070ec74d1$export$2e2bcd8739ae039), {
            onClose: onClose
        })
    });
};
var $b8b35d1d31929ab9$export$2e2bcd8739ae039 = $b8b35d1d31929ab9$var$AppWithAssetAndNetwork;




const $17889e507a6ca289$var$TRANSITION = 300;
const $17889e507a6ca289$var$App = ({ config: config , onClose: onClose  })=>{
    const [network, asset] = config.slug?.split(":") ?? [];
    return /*#__PURE__*/ (0, $g5tXh$jsx)("div", {
        "data-testid": "map3-modal",
        children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$Modal), {
            className: "map3 w-80",
            footerBackground: true,
            onCancel: onClose,
            size: "small",
            transition: $17889e507a6ca289$var$TRANSITION,
            visible: true,
            children: asset && network ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $b8b35d1d31929ab9$export$2e2bcd8739ae039), {
                config: config,
                onClose: onClose
            }) : asset ? /*#__PURE__*/ (0, $g5tXh$jsx)((0, $ddec68c329991042$export$2e2bcd8739ae039), {
                config: config,
                onClose: onClose
            }) : /*#__PURE__*/ (0, $g5tXh$jsx)((0, $68c68372be4a9678$export$390f32400eaf98c9), {
                ...config,
                children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $9a95d74070ec74d1$export$2e2bcd8739ae039), {
                    onClose: onClose
                })
            })
        })
    });
};
var $17889e507a6ca289$export$2e2bcd8739ae039 = $17889e507a6ca289$var$App;


class $090815f5086f7f29$export$c06370d2ab5297a3 {
    constructor(config){
        if (!config.generateDepositAddress) throw new Error("generateDepositAddress is required");
        if (!config.anonKey) throw new Error("anonKey is required");
        if (!config.theme) config.theme = "light";
        if (!config.fiat) config.fiat = "USD";
        this.config = config;
        this.onClose = ()=>{
            this.root.unmount();
            document.body.classList.remove("dark");
        };
        const element = document.createElement("div");
        element.id = "map3";
        document.body.appendChild(element);
        if (config.theme === "dark") document.body.classList.add("dark");
        this.root = (0, $g5tXh$createRoot)(element);
    }
    open() {
        const client = new (0, $g5tXh$ApolloClient)({
            cache: new (0, $g5tXh$InMemoryCache)({
                typePolicies: {
                    Query: {
                        fields: {
                            assets: (0, $g5tXh$offsetLimitPagination)()
                        }
                    }
                }
            }),
            headers: {
                Authorization: "Bearer " + this.config.anonKey
            },
            uri: "http://localhost:3001/api/graphql"
        });
        this.root.render(/*#__PURE__*/ (0, $g5tXh$jsx)((0, $g5tXh$ApolloProvider), {
            client: client,
            children: /*#__PURE__*/ (0, $g5tXh$jsx)((0, $17889e507a6ca289$export$2e2bcd8739ae039), {
                config: this.config,
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
if (twindow) window.initMap3Sdk = $090815f5086f7f29$export$421c3119381668;


export {$090815f5086f7f29$export$c06370d2ab5297a3 as Map3, $090815f5086f7f29$export$421c3119381668 as initMap3Sdk};
//# sourceMappingURL=index.js.map
