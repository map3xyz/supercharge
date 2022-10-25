import React from "react";
interface Map3InitConfig {
    coin?: string;
    generateDepositAddress: (coin: string, network: string) => Promise<string>;
    network?: string;
    theme?: 'dark' | 'light';
}
declare const Map3Sdk: React.FC<Props>;
type Props = {
    onClose: () => void;
};
export class Map3 {
    constructor(config: Map3InitConfig);
    open(): void;
    close(): void;
}
export const initMap3Sdk: (args: Map3InitConfig) => Map3;
export default Map3Sdk;

//# sourceMappingURL=types.d.ts.map
