export interface Map3InitConfig {
    address?: string;
    anonKey: string;
    assetId?: string;
    authorizeTransaction?: (fromAddress: string, network: string, amount: string) => Promise<Boolean>;
    fiat?: string;
    generateDepositAddress: (asset?: string, network?: string, memoEnabled?: boolean) => Promise<{
        address: string;
        memo?: string;
    }>;
    networkCode?: string;
    rainbowRoad?: boolean;
    theme?: 'dark' | 'light';
}
export class Map3 {
    constructor(config: Map3InitConfig);
    open(): void;
    close(): void;
}
export const initMap3Sdk: (args: Map3InitConfig) => Map3;

//# sourceMappingURL=types.d.ts.map
