# fs-search-worker
JS worker implementation of file system search
The module provides an async/await interface to a [glob](https://www.npmjs.com/package/glob) search perform in a worker.
One worker process is spawn per function call.

## Usage
```js
import  {SearchFn} from 'fs-search-worker';
let results = await SearchFn('/path/to/root', 'filePattern1, ..., 'filePatternN');
```

`results` is a list preserving the order of supplied patterns, where each entry contains the match of the corresponding pattern.

## Small testing script

```sh
node build/test-search.js index.js /path/to/fs-search-worker /path/to/fs-search-worker/build
Looking for index.js in /path/to/fs-search-worker /Users/guillaumelaunay/work/DVL/Js/fs-search-worker/build
test completed [
  [
    '/path/to/fs-search-worker/build/index.js',
    '/path/to/fs-search-worker/node_modules/balanced-match/index.js',
    '/path/to/fs-search-worker/node_modules/brace-expansion/index.js',
    '/path/to/fs-search-worker/node_modules/concat-map/index.js',
    '/path/to/fs-search-worker/node_modules/fs.realpath/index.js',
    '/path/to/fs-search-worker/node_modules/path-is-absolute/index.js'
  ],
  [
    '/path/to/fs-search-worker/build/index.js'
  ]
]
```
