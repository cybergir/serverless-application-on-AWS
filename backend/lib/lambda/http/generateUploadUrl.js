import 'source-map-support/register';
import { generateUploadUrl } from "../../businessLogic/ToDo";
export const handler = async (event) => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Processing Event ", event);
    const todoId = event.pathParameters.todoId;
    const URL = await generateUploadUrl(todoId);
    return {
        statusCode: 202,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            uploadUrl: URL,
        })
    };
};
//# sourceMappingURL=generateUploadUrl.js.map