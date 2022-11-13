import 'source-map-support/register';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
export const handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    // TODO: Remove a TODO item by id
    return undefined;
});
handler
    .use(httpErrorHandler())
    .use(cors({
    credentials: true
}));
//# sourceMappingURL=deleteTodo.js.map