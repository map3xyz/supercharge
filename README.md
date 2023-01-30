<h1 align='center'>💸 Supercharge</h1>

<div align='center'>The Map3 Supercharge SDK connects<br/>crypto apps to Wallets, Exchanges & Bridges,
enabling<br/>cross-chain deposits and increasing volumes.</div>
<br/>
<div align="center">
<a href="https://map3.xyz/supercharge">Website</a> 
<span> · </span>
<a href="https://github.com/map3xyz/supercharge">GitHub</a> 
<span> · </span>
<a href="https://cal.com/amadeo-map3/discovery">Contact</a>
</div>
<br/>

## Getting Started

```html
// index.html
<html lang="en">
    <head>
        ...
        <script src="https://api.map3.xyz/console/relay/gh/supercharge/master/dist/global/index.js"></script>
        <link
          href="https://api.map3.xyz/console/relay/gh/supercharge/master/dist/index.css"
          rel="stylesheet"
        ></link>
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
