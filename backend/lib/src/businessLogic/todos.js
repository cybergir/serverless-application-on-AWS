import { TodosAccess } from '../dataLayer/todosAcess';
import { AttachmentUtils } from '../helpers/attachmentUtils';
//import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger';
import * as uuid from 'uuid';
//import * as createError from 'http-errors'
// TODO: Implement businessLogic
const logger = createLogger('TodoAccess');
const attachmentUtils = new AttachmentUtils();
const todosAccess = new TodosAccess();
// Write get todos function
export async function getTodosForUser(userId) {
    logger.info('Get todos for user function called');
    return todosAccess.getAllTodos(userId);
}
// write create todo function
export async function createTodo(newTodo, userId) {
    logger.info('Create todo function called');
    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();
    const s3AttachmentUrl = attachmentUtils.getAttachmentUrl(todoId);
    const newItem = Object.assign({ userId,
        todoId,
        createdAt, done: false, attachmentUrl: s3AttachmentUrl }, newTodo);
    return await todosAccess.createTodoItem(newItem);
}
//# sourceMappingURL=todos.js.map