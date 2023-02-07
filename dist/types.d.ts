export interface Map3InitConfig {
    anonKey: string;
    options?: {
        callbacks?: {
            handleAuthorizeTransaction?: (fromAddress: string, network: string, amount: string) => Promise<Boolean>;
            handleFeeCalculation?: (asset: string, networkCode: string, amount: string) => Promise<{
                fixedFee?: number;
                message?: string;
                variableFee?: number;
            }>;
            onAddressRequested?: (asset?: string, network?: string) => Promise<{
                address: string;
                memo?: string;
            }> | {
                address: string;
                memo?: string;
            };
            onClose?: () => void;
            onFailure?: (error: string, networkCode: string, address?: string) => void;
            onOrderCreated?: (orderId: string, type: string) => void;
            onSuccess?: (txHash: string, networkCode: string, address?: string) => void;
        };
        selection?: {
            address?: string;
            amount?: string;
            assetId?: string;
            fiat?: string;
            networkCode?: string;
            paymentMethod?: 'binance-pay';
        };
        style?: {
            appName?: string;
            colors?: {
                accent?: string;
                primary?: string;
            };
            embed?: {
                height?: string;
                id?: string;
                width?: string;
            };
            locale?: 'en' | 'es';
            theme?: 'dark' | 'light';
        };
    };
    userId: string;
}
export class Map3 {
    constructor(config: Map3InitConfig);
    open(): void;
    close(): void;
}
export const initMap3Supercharge: (args: Map3InitConfig) => Map3;

//# sourceMappingURL=types.d.ts.map
