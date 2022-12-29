import { Request, Response, NextFunction } from "express"

export = VPNBan;
declare class VPNBan {
    /**
   * Initializes VPNBan
   * @param {Object} options VPNBan options
   * @param {Boolean} options.vpn A boolean that, if false, will disable VPN blocking; defaults to true
   * @param {Array} options.blocked_ips An array of IP addresses that you want to block; defaults to empty
   * @param {Function} options.callback A callback function that is called if an IP is flagged and blocked.
   * @returns
   */
    constructor(options: {
        vpn: boolean;
        blocked_ips: string[];
        callback: Function;
    });
    vpn: true;
    blocked_ips: any[];
    callback: Function;
    block(req: Request, res: Response, next: NextFunction): Promise<any>;
}
