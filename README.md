# Map3 Payments SDK

The Map3 Payments SDK connects crypto apps to Wallets, Exchanges & Bridges,
enabling cross-chain deposits and increasing volumes.

## Getting Started

```html
// index.html
<html lang="en">
    <head>
        ...
        <script src="https://cdn.jsdelivr.net/gh/map3xyz/payments-sdk@1/dist/global/index.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/map3xyz/payments-sdk@1/dist/index.css"></link>
    </head>

    <body>
        <button onClick="openSdk()">Open SDK</button>
    </body>
    <script>
    function openSdk() {
        const map3 = initMap3Sdk({
          theme: 'dark',
          anonKey: '<ANON_KEY>',
          generateDepositAddress: async (coin, network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {address: '0x0000000000000000000000000000000000000000'};
          }
        })
        map3.open()
    }
  </script>
</html>
```

### Examples
[![Edit map3-sdk-cdn-demo-l9t2x5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/map3-sdk-cdn-demo-l9t2x5)

### Generating Anon Keys

Visit https://console.map3.xyz/ to generate your `ANON_KEY`.
