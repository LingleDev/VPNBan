import { Request, Response, NextFunction } from "express"

declare module "vpnban" {
  public class VPNBan {
    constructor(options: VPNBanOptions): block;
  }
  
  /**
   * The middleware function
   * @param {Request} req An Express Request object
   * @param {Response} res An Express Response object
   * @param {NextFunction} next An Express NextFunction
   */
  public function block(req: Request, res: Response, next: NextFunction): void;

  public interface VPNBanOptions {
    public vpn: boolean;
    public blocked_ips: Array<String>;
    
    callback(req: Request, res: Response, next: NextFunction): void;
  }
}