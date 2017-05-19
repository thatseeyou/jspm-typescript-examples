This project was based on [jspm-typescript-seed](https://github.com/thatseeyou/jspm-typescript-seed/tree/master).

You can go to [demo sites with github pages](https://thatseeyou.github.io/jspm-typescript-examples/index.html).

# install and run

```
$ git clone https://github.com/thatseeyou/jspm-typescript-examples.git
$ cd jspm-typescript-examples
$ npm install
$ jspm install
$ npm run serve
```

# bundle / unbundle
Current uploaded *.html use bundle file(build.js). So if your edit source codes, you must bundle modules again.

```    
$ npm run bundle
```

If bundle file(build.js) does not exist, systemjs loads modules dynamically. You should unbundle if you edit codes frequently. Don't care 404 NOT FOUND for build.js.

```
$ npm run unbundle
```

Using unbundled modules requires URL start with /. Github pages which start with /jspm-typescript-examples is not the case.

# Examples

* [Native Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/promise.html)]
    ```
    $ vi docs/tsconfig.json
    ...
        "lib": [
            "es2015",
            "dom"
        ],
    ...
    ```

* [rxjs](https://github.com/ReactiveX/rxjs) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/reactive.html)]
    ```
    $ jspm install rxjs
    $ vi docs/tsconfig.json
    ...
        "baseUrl": "..",
        "paths": {
            "rxjs" : ["jspm_packages/npm/rxjs@5.2.0"],
            "rxjs/*" : ["jspm_packages/npm/rxjs@5.2.0/*"],
            "*": [
                "node_modules/@types/*",
                "types/*"   // custom declarations
            ]
        }
    ...
    ```

* [immutable](https://github.com/facebook/immutable-js) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/immutable.html)]
    ```
    $ jspm install immutable
    $ vi docs/tsconfig.json
    ...
        "baseUrl": "..",
        "paths": {
            ...
            "immutable" : ["jspm_packages/npm/immutable@3.8.1/dist"],
            ...
        }
    ...
    ```

* [d3/d3-selection](https://github.com/d3/d3-selection) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/d3-selection.html)]

    ```
    $ jspm install npm:d3-selection
    $ npm install --save @types/d3-selection
    ```

* [gionkunz/chartist-js](https://github.com/gionkunz/chartist-js) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/chartist.html)]

    ```
    $ jspm install chartist
    $ npm install --save @types/chartist
    ```

* [wagerfield/parallax](https://github.com/wagerfield/parallax)
[[Demo](https://thatseeyou.github.io/jspm-typescript-examples/parallax.html)]

    ```
    $ jspm install parallax=github:wagerfield/parallax
    $ jspm install parallax=github:wagerfield/parallax -o '{ main: "deploy/jquery.parallax.js" }'
    ```

* [pixelcog/parallax.js](https://github.com/pixelcog/parallax.js) & jquery [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/jquery-parallax.js.html)]

    jquery-parallax.js does not support jquery 3.X.

    ```
    $ jspm install jquery@^2.2.4
    $ jspm install npm:jquery-parallax.js
    ```

* [stevenwanderski/bxslider-4](https://github.com/stevenwanderski/bxslider-4) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/bxslider.html)]

    ```
    $ jspm install npm:bxslider -o '{ main: "dist/jquery.bxslider.js" }'
    $ npm install -S @types/dw-bxslider-4
    ```

* [chinchang/screenlog.js](https://github.com/chinchang/screenlog.js) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/screenlog.html)]

    ```
    $ jspm install npm:screenlog
    $ vi types/log/index.d.ts
    ```

* [adamschwartz/log](https://github.com/adamschwartz/log) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/log.html)]

    ```
    $ jspm install log=github:adamschwartz/log 
    $ vi types/log/index.d.ts
    ```

* [codemirror/CodeMirror](https://github.com/codemirror/CodeMirror) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/codemirror.html)]

    ```
    $ jspm install npm:codemirror
    $ npm install --save @types/codemirror
    ```

* [MikeMcl/decimal.js](https://github.com/MikeMcl/decimal.js) [[Demo](https://thatseeyou.github.io/jspm-typescript-examples/decimal.js.html)]

    ```
    $ jspm install decimal.js
    $ npm install @types/decimal.js
    $ cp -a node_modules/@types/decimal.js types/
    $ npm uninstall @types/decimal.js
    $ vi tsconfig.json
    ...
        "baseUrl": "..",
        "paths": {
            "decimal.js" : ["types/decimal.js/index.d.ts"],
        }
    ...
    $ vi types/decimal.js/index.d.ts
    ...
    (add/change declarations)
    ...
    ```

