import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUserComplimentsReceivedController } from './controllers/ListUserComplimentsReceivedController';
import { ListUserComplimentsSentController } from './controllers/ListUserComplimentsSentController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserComplimentsSentController = new ListUserComplimentsSentController();
const listUserComplimentsReceivedController = new ListUserComplimentsReceivedController();
const listTagsController = new ListTagsController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/sent", ensureAuthenticated, listUserComplimentsSentController.handle);
router.get("/users/compliments/received", ensureAuthenticated, listUserComplimentsReceivedController.handle);

router.get("/tags", ensureAuthenticated, listTagsController.handle);

export { router };