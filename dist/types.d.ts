export interface Map3InitConfig {
    anonKey: string;
    fiat?: string;
    generateDepositAddress: (asset?: string, network?: string, memoEnabled?: boolean) => Promise<{
        address: string;
        memo?: string;
    }>;
    slug?: string;
    theme?: 'dark' | 'light';
}
export class Map3 {
    constructor(config: Map3InitConfig);
    open(): void;
    close(): void;
}
export const initMap3Sdk: (args: Map3InitConfig) => Map3;

//# sourceMappingURL=types.d.ts.map
