This project was based on [jspm-typescript-seed](https://github.com/thatseeyou/jspm-typescript-seed/tree/master).

You can go to [demo sites with github pages](https://thatseeyou.github.io/jspm-typescript-samples/index.html).

# install and run

```
$ git clone https://github.com/thatseeyou/jspm-typescript-samples.git
$ cd jspm-typescript-samples
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

Using unbundled modules requires URL start with /. Github pages which start with /jspm-typescript-samples is not the case.

# Samples
* [d3/d3-selection](https://github.com/d3/d3-selection) [[Demo](https://thatseeyou.github.io/jspm-typescript-samples/d3-selection.html)]

    ```
    $ jspm install npm:d3-selection
    $ npm install @types/d3-selection
    ```

* [wagerfield/parallax](https://github.com/wagerfield/parallax)
[[Demo](https://thatseeyou.github.io/jspm-typescript-samples/parallax.html)]

    ```
    $ jspm install parallax=github:wagerfield/parallax
    ```

* [pixelcog/parallax.js](https://github.com/pixelcog/parallax.js) & jquery
[[Demo](https://thatseeyou.github.io/jspm-typescript-samples/jquery-parallax.js.html)]

    jquery-parallax.js does not support jquery 3.X.

    ```
    $ jspm install jquery@^2.2.4
    $ jspm install npm:jquery-parallax.js
    ```
