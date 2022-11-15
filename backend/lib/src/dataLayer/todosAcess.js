import * as AWS from 'aws-sdk';
import { createLogger } from '../utils/logger';
var AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('TodosAccess');
// TODO: Implement the dataLayer logic
export class TodosAccess {
    constructor(docClient = new XAWS.DynamoDB.DocumentClient(), todosTable = process.env.TODOS_TABLE, todosIndex = process.env.INEDX_NAME) {
        this.docClient = docClient;
        this.todosTable = todosTable;
        this.todosIndex = todosIndex;
    }
    async getAllTodos(userId) {
        logger.info('Get all todos function called');
        const result = await this.docClient
            .query({
            TableName: this.todosTable,
            IndexName: this.todosIndex,
            KeyConditionExpression: 'userId = userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        })
            .promise();
        const items = result.Items;
        return items;
    }
    async createTodoItem(todoItem) {
        logger.info('Create todo item function called');
        const result = await this.docClient
            .put({
            TableName: this.todosTable,
            Item: todoItem
        })
            .promise();
        logger.info('Todo item created', result);
        return todoItem;
    }
    async updateTodoItem(todoId, userId, todoUpdate) {
        logger.info('Update todo item function called');
        await this.docClient
            .update({
            TableName: this.todosTable,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set #name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues: {
                ':name': todoUpdate.name,
                ':dueDate': todoUpdate.dueDate,
                ':done': todoUpdate.done
            },
            ExpressionAttributeNames: {
                '#name': 'name'
            }
        })
            .promise();
        return todoUpdate;
    }
    async deleteTodoItem(todoId, userId) {
        logger.info('Delete todo item function called');
        await this.docClient
            .delete({
            TableName: this.todosTable,
            Key: {
                todoId,
                userId
            }
        })
            .promise();
    }
    async updateTodoAttachmentUrl(todoId, userId, attachmentUrl) {
        logger.info('Update todo attachment url function called');
        await this.docClient
            .update({
            TableName: this.todosTable,
            Key: {
                todoId,
                userId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            }
        })
            .promise();
    }
}
//# sourceMappingURL=todosAcess.js.map