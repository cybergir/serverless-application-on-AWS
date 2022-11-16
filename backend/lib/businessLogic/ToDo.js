import { parseUserId } from "../auth/utils";
import { ToDoAccess } from "../dataLayer/ToDoAccess";
const uuidv4 = require('uuid/v4');
const toDoAccess = new ToDoAccess();
export async function getAllToDo(jwtToken) {
    const userId = parseUserId(jwtToken);
    return toDoAccess.getAllToDo(userId);
}
export function createToDo(createTodoRequest, jwtToken) {
    const userId = parseUserId(jwtToken);
    const todoId = uuidv4();
    const s3BucketName = process.env.S3_BUCKET_NAME;
    return toDoAccess.createToDo(Object.assign({ userId: userId, todoId: todoId, attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`, createdAt: new Date().getTime().toString(), done: false }, createTodoRequest));
}
export function updateToDo(updateTodoRequest, todoId, jwtToken) {
    const userId = parseUserId(jwtToken);
    return toDoAccess.updateToDo(updateTodoRequest, todoId, userId);
}
export function deleteToDo(todoId, jwtToken) {
    const userId = parseUserId(jwtToken);
    return toDoAccess.deleteToDo(todoId, userId);
}
export function generateUploadUrl(todoId) {
    return toDoAccess.generateUploadUrl(todoId);
}
//# sourceMappingURL=ToDo.js.map