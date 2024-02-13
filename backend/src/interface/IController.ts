import { Request, Response, response } from 'express';

export type Controller = (req: Request, res: Response) => Promise<Response>;

export default interface IController {
  getAll: Controller;
  getById: Controller;
  insert: Controller;
  delete: Controller;
}
