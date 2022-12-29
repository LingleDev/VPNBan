<img src="./img/VPNBan.svg" width=256>

# VPNBan
A small Express middleware used to filter suspected VPN IP addresses (and more)

This module uses the [GetIPIntel](https://getipintel.net) VPN detection API to detect if someone is trying to connect to your Express server using a VPN.

## Installation

`npm install vpnban`

## Usage
```js
const express = require('express')
const app = express()
const VPNBan = require('vpnban')

let ban = new VPNBan({
  callback: (req,res,next) => {} // See below for details
})

app.use(ban) // make sure to put this line before any other middlewares in your express app

app.get(`/`, (req,res) => {
  res.send(`Not a VPN!`)
})

// ...
```

## Other Features
The module can also filter any IP addresses that you want.
```js
const express = require('express')
const app = express()
const VPNBan = require('vpnban')

let ban = new VPNBan({
  vpn: false, // VPN blocking is enabled by default, but you can disable it if you just want to block certain IPs.
  blocked_ips: ["1.2.3.4"], // any IP addresses you want to be blocked
  callback: (req,res,next) => { // A function with parameters of Express Request & Response objects and a next() function, respectively. Use this to display a custom 'blocked' page
    res.send("You've been blocked")
  }
})

app.use(ban)

app.get('/', (req,res) => {
  res.send(`Not blocked!`)
})

// ...
```

## Why?
I wrote this module for people who don't want VPN users evading their IP bans. It is a major issue on many platforms.  
I also use it in my own Express apps, so functionality is guaranteed.