import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
// TODO: Get all TODO items for a current user
export const handler = middy(async (event) => {
    // Write your code here
    const todos = '...';
    return undefined;
    handler.use(cors({
        credentials: true
    }));
});
//# sourceMappingURL=getTodos.js.map