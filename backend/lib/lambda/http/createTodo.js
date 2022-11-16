import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
export const handler = middy(async (event) => {
    const newTodo = JSON.parse(event.body);
    // TODO: Implement creating a new TODO item
    return undefined;
});
handler.use(cors({
    credentials: true
}));
//# sourceMappingURL=createTodo.js.map