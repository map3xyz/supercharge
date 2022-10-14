# Map3 Client Deposit SDK

## Install

```
npm install @map3xyz/client-deposit-sdk
```

or

```
yarn add @map3xyz/client-deposit-sdk
```

```
// index.html

<body>
    ...
    <div id="map3" />
</body>
```

```
// index.js

import { initMap3Sdk } from '@map3xyz/client-deposit-sdk'
import '@map3xyz/client-deposit-sdk/dist/index.css'

const map3 = initMap3Sdk({ element: 'map3' })
map3.open()
```

### Dark Mode
You can enable dark mode by adding the class name "dark" to the body element.

```
<body class="dark">
...
</body>
```

