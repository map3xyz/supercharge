# Map3 Payments SDK

![Jest coverage](./badges/coverage-jest%20coverage.svg)

## Getting Started

```html
// index.html
<html lang="en">
    <head>
        ...
        <script src="https://cdn.jsdelivr.net/gh/map3xyz/payments-sdk/dist/global/index.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/map3xyz/payments-sdk/dist/index.css"></link>
    </head>

    <body>
        <button onClick="openSdk()">Open SDK</button>
    </body>
    <script>
    function openSdk() {
        const map3 = initMap3Sdk({
          theme: 'dark',
          anonKey: '<ANON_KEY>',
          generateDepositAddress: async (coin, network, memoEnabled) => {
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
[Install Via CDN](https://codesandbox.io/s/map3-sdk-cdn-demo-l9t2x5)

### Generating Anon Keys

Visit https://console.map3.xyz/ to generate your ANON_KEY.
