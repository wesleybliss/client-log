# Client Log

## Installation

```shell
None needed. Just clone & reference the main src/index.js file.
```

## Testing

```shell
$ npm i
$ npm test
```

## Usage

See [example](example/).

```html
<!-- myfile.html -->
<script src="path/to/client-log/index.js"></script>
```

```javascript
// myfile.js
if (!window.clientLog)
    throw new Error('Failed to init clientLog')

var log = clientLog({
    endpoints: {
        logs: 'http://localhost:8080/logs',
        errors: 'http://localhost:8080/errors'
    }
})

// window.error will now automatically be captured,
// but to trigger an event manually
log.sendLog('message', 'file.html', 1, 2, { foo: 'bar' })
```
