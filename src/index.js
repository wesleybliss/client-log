
const clientLog = options => {
    
    const defaultOpts = {
        dest: '',
        contentType: 'application/x-www-form-urlencoded; charset="UTF-8"',
        headers: {},
        preserveOnError: true
    }
    
    const opts = Object.assign(defaultOpts, options)
    
    if (typeof opts.dest !== 'string')
        throw new Error('Option "dest" must be a string')
    
    if (typeof opts.contentType !== 'string')
        throw new Error('Option "contentType" must be a string')
    
    if (!(opts.headers instanceof Object) ||
        (opts.headers instanceof Array)) {
        throw new Error('Option "headers" must be an object')
    }
    
    const mapHeaders = http => {
        const keys = Object.keys(opts.headers)
        if (keys.length > 0)
            keys.forEach(k => {
                http.setRequestHeader(k, opts.headers[k])
            })
    }
    
    const send = (message, file, line, col, error) => {
        
        if (error && (typeof error === 'object'))
            error = JSON.stringify(error)
        
        const http = new XMLHttpRequest()
        const data = { message, file, line, col, error }
        
        const query = Object.keys(data)
            .map(k => `${k}=` + encodeURIComponent(data[k]))
            .join('&')
        
        if (!opts.dest.length) {
            console.error('Error', message, file, line, col, error)
        }
        else {
            http.open('POST', opts.dest, true)
            http.setRequestHeader('Content-Type', opts.contentType)
            mapHeaders(http)
            http.send(query)
        }
        
    }
    
    if (!opts.preserveOnError) {
        window.onerror = send
    }
    else {
        const oldHandler = window.onerror
        window.onerror = (message, file, line, col, error) => {
            send(message, file, line, col, error)
            if (typeof oldHandler === 'function')
                oldHandler(message, file, line, col, error)
        }
    }
    
    return {
        send
    }
    
}


if (typeof module === 'object' && module.exports) {
    module.exports = clientLog
}
else if (typeof define === 'function' && define.amd) {
    define('client-log', [], function(clientLog) {
        return clientLog
    })
}
else {
    window.clientLog = clientLog
}
