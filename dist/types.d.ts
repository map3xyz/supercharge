export interface Map3InitConfig {
    address?: string;
    amount?: string;
    anonKey: string;
    appName?: string;
    assetId?: string;
    authorizeTransaction?: (fromAddress: string, network: string, amount: string) => Promise<Boolean>;
    colors?: {
        accent?: string;
        primary?: string;
    };
    embed?: {
        height?: string;
        id?: string;
        width?: string;
    };
    fiat?: string;
    generateDepositAddress?: (asset?: string, network?: string) => Promise<{
        address: string;
        memo?: string;
    }> | {
        address: string;
        memo?: string;
    };
    locale?: string;
    networkCode?: string;
    onClose?: () => void;
    onFailure?: (error: string, networkCode: string, address?: string) => void;
    onOrderCreated?: (orderId: string, type: string) => void;
    onSuccess?: (txHash: string, networkCode: string, address?: string) => void;
    paymentMethod?: 'binance-pay' | 'show-address';
    rainbowRoad?: boolean;
    theme?: 'dark' | 'light';
    userId: string;
}
export class Map3 {
    constructor(config: Map3InitConfig);
    open(): void;
    close(): void;
}
export const initMap3Supercharge: (args: Map3InitConfig) => Map3;

//# sourceMappingURL=types.d.ts.map
