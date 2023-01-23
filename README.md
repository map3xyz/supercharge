# 💸 Supercharge

The Map3 Supercharge SDK connects crypto apps to Wallets, Exchanges & Bridges,
enabling cross-chain deposits and increasing volumes.

## Getting Started

```html
// index.html
<html lang="en">
    <head>
        ...
        <script src="https://cdn.jsdelivr.net/gh/map3xyz/supercharge@1/dist/global/index.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/map3xyz/supercharge@1/dist/index.css"></link>
    </head>

    <body>
        <button onClick="openSdk()">Open SDK</button>
    </body>
    <script>
    function openSdk() {
        const supercharge = initMap3Supercharge({
          theme: 'dark',
          anonKey: '<ANON_KEY>',
          generateDepositAddress: async (coin, network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {address: '0x0000000000000000000000000000000000000000'};
          }
        })
        supercharge.open()
    }
  </script>
</html>
```

### Examples
[![Edit map3-supercharge-cdn-demo-l9t2x5](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/map3-supercharge-cdn-demo-l9t2x5)

### Generating Anon Keys

Visit https://console.map3.xyz/ to generate your `ANON_KEY`.
