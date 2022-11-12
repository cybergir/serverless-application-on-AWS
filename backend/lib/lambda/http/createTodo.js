import 'source-map-support/register';
import { createToDo } from "../../businessLogic/ToDo";
export const handler = async (event) => {
    // TODO: Implement creating a new TODO item
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const newTodo = JSON.parse(event.body);
    const toDoItem = await createToDo(newTodo, jwtToken);
    return {
        statusCode: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": toDoItem
        }),
    };
};
//# sourceMappingURL=createTodo.js.map