export interface Map3InitConfig {
    address?: string;
    anonKey: string;
    assetId?: string;
    authorizeTransaction?: (fromAddress: string, network: string, amount: string) => Promise<Boolean>;
    colors?: {
        progressBar?: string;
        scrollBar?: string;
    };
    fiat?: string;
    generateDepositAddress: (asset?: string, network?: string) => Promise<{
        address: string;
        memo?: string;
    }>;
    networkCode?: string;
    onClose?: () => void;
    onFailure?: (error: string, networkCode: string, address?: string) => void;
    onSuccess?: (txHash: string, networkCode: string, address?: string) => void;
    rainbowRoad?: boolean;
    theme?: 'dark' | 'light';
    userId: string;
}
export class Map3 {
    constructor(config: Map3InitConfig);
    open(): void;
    close(): void;
}
export const initMap3Sdk: (args: Map3InitConfig) => Map3;

//# sourceMappingURL=types.d.ts.map
