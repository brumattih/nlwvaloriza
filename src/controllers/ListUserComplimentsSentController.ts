import { Request, Response } from "express";
import { ListUserComplimentsSent } from "../services/ListUserComplimentsSentService";

class ListUserComplimentsSentController {
    async handle(request: Request, response: Response) {

        const { user_id } = request;

        const listUserComplimentsSent = new ListUserComplimentsSent();

        const compliments = await listUserComplimentsSent.execute(user_id);

        return response.json(compliments)
    }
}

export { ListUserComplimentsSentController };