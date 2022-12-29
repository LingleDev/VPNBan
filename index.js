const fetch = require(`node-fetch`)
var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

class VPNBan {
  /**
 * Initializes VPNBan
 * @param {Object} options
 * @param {Boolean} options.vpn A boolean that, if false, will disable VPN blocking; defaults to true
 * @param {Array} options.blocked_ips An array of IP addresses that you want to block; defaults to empty
 * @param {Function} options.callback A callback function that is called if an IP is flagged and blocked.
 * @returns 
 */
  constructor(options={}) {
    this.vpn = options.vpn
    this.blocked_ips = options.blocked_ips || []
    this.callback = options.callback
    this.email = options.email

    if (!this.email) throw new Error(`You must provide an email address to use.`)

    if (typeof this.vpn == "undefined") this.vpn = true;

    if (typeof this.callback == "undefined") {
      this.callback = (req,res,next) => {
        return res.status(403).send(`<h1>You have been blocked from ${req.hostname} using VPNBan</h1>`)
      }
    }

    return this.block.bind(this);
  }

  async block(req, res, next) {    
    let ip = req.socket.remoteAddress.replace("::ffff:", "")

    if (req.app.get("trust proxy") == 1) {
      ip = req.headers["x-forwarded-for"];
    }

    // console.log(this)

    if (this.vpn) {
      let r = await fetch(`http://check.getipintel.net/check.php?ip=${ip}&contact=${this.email}&flags=b&format=json`)
      let json = await r.json();

      console.log(json)

      if (json.result >= .91) return this.callback(req,res,next);
    }

    if (this.blocked_ips.includes(ip)) {
      return this.callback(req,res,next)
    }

    next()

  }
}


module.exports = VPNBan