import { Request, Response } from "express";
import { ListUserComplimentsReceived } from "../services/ListUserComplimentsReceivedService";

class ListUserComplimentsReceivedController {
    async handle(request: Request, response: Response) {

        const { user_id } = request;

        const listUserComplimentsReceived = new ListUserComplimentsReceived();

        const compliments = await listUserComplimentsReceived.execute(user_id);

        return response.json(compliments)
    }
}

export { ListUserComplimentsReceivedController };