import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';
const XAWS = AWSXRay.captureAWS(AWS);
const logger = createLogger('TodosAccess');
// TODO: Implement the dataLayer logic
//# sourceMappingURL=todosAcess.js.map