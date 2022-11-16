import * as AWS from "aws-sdk";
export class ToDoAccess {
    constructor(docClient = new AWS.DynamoDB.DocumentClient(), s3Client = new AWS.S3({ signatureVersion: 'v4' }), todoTable = process.env.TODOS_TABLE, s3BucketName = process.env.S3_BUCKET_NAME) {
        this.docClient = docClient;
        this.s3Client = s3Client;
        this.todoTable = todoTable;
        this.s3BucketName = s3BucketName;
    }
    async getAllToDo(userId) {
        console.log("Getting all todo");
        const params = {
            TableName: this.todoTable,
            KeyConditionExpression: "#userId = :userId",
            ExpressionAttributeNames: {
                "#userId": "userId"
            },
            ExpressionAttributeValues: {
                ":userId": userId
            }
        };
        const result = await this.docClient.query(params).promise();
        console.log(result);
        const items = result.Items;
        return items;
    }
    async createToDo(todoItem) {
        console.log("Creating new todo");
        const params = {
            TableName: this.todoTable,
            Item: todoItem,
        };
        const result = await this.docClient.put(params).promise();
        console.log(result);
        return todoItem;
    }
    async updateToDo(todoUpdate, todoId, userId) {
        console.log("Updating todo");
        const params = {
            TableName: this.todoTable,
            Key: {
                "userId": userId,
                "todoId": todoId
            },
            UpdateExpression: "set #a = :a, #b = :b, #c = :c",
            ExpressionAttributeNames: {
                "#a": "name",
                "#b": "dueDate",
                "#c": "done"
            },
            ExpressionAttributeValues: {
                ":a": todoUpdate['name'],
                ":b": todoUpdate['dueDate'],
                ":c": todoUpdate['done']
            },
            ReturnValues: "ALL_NEW"
        };
        const result = await this.docClient.update(params).promise();
        console.log(result);
        const attributes = result.Attributes;
        return attributes;
    }
    async deleteToDo(todoId, userId) {
        console.log("Deleting todo");
        const params = {
            TableName: this.todoTable,
            Key: {
                "userId": userId,
                "todoId": todoId
            },
        };
        const result = await this.docClient.delete(params).promise();
        console.log(result);
        return "";
    }
    async generateUploadUrl(todoId) {
        console.log("Generating URL");
        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.s3BucketName,
            Key: todoId,
            Expires: 1000,
        });
        console.log(url);
        return url;
    }
}
//# sourceMappingURL=ToDoAccess.js.map