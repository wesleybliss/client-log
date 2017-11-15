'use strict'

const path = require('path')
const spawn = require('child_process').spawn

const shellOpen = arg => {
    
    const cmd =
        process.platform === 'win32' ? 'cmd' :
        process.platform === 'darwin' ? 'open' :
        'xdg-open'
    
    const args = []
    
    if (process.platform === 'win32')
        args.push('/c')
    
    args.push(arg)
    
    spawn(cmd, args)
    
}


module.exports.shellOpen = shellOpen
