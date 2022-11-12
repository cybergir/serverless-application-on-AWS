import 'source-map-support/register';
import { getAllToDo } from "../../businessLogic/ToDo";
export const handler = async (event) => {
    // TODO: Get all TODO items for a current user
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const toDos = await getAllToDo(jwtToken);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            "items": toDos,
        }),
    };
};
//# sourceMappingURL=getTodos.js.map