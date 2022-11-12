import 'source-map-support/register';
import { updateToDo } from "../../businessLogic/ToDo";
export const handler = async (event) => {
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const todoId = event.pathParameters.todoId;
    const updatedTodo = JSON.parse(event.body);
    const toDoItem = await updateToDo(updatedTodo, todoId, jwtToken);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "item": toDoItem
        }),
    };
};
//# sourceMappingURL=updateTodo.js.map