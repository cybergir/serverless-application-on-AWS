import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos';
export const handler = middy(async (event) => {
    const newTodo = JSON.parse(event.body);
    // TODO: Implement creating a new TODO item
    const userId = getUserId(event);
    const newItem = await createTodo(newTodo, userId);
    return {
        statusCode: 201,
        body: JSON.stringify({
            item: newItem
        })
    };
}
// return undefined
);
handler.use(cors({
    credentials: true
}));
//# sourceMappingURL=createTodo.js.map