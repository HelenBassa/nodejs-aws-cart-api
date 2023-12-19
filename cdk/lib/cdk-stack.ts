import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import path = require('path');
import 'dotenv/config';
export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const environment = {
      DB_HOST: process.env.DB_HOST!,
      DB_PORT: process.env.DB_PORT!,
      DB_DATABASE_NAME: process.env.DB_DATABASE_NAME!,
      DB_USERNAME: process.env.DB_USERNAME!,
      DB_PASSWORD: process.env.DB_PASSWORD!,
    };

    const cartApiHandler = new NodejsFunction(this, 'cartApiHandlerLambda', {
      environment,
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.resolve(__dirname, '..', '..', 'dist', 'main.js'),
      functionName: 'cartApiHandler',
      timeout: cdk.Duration.seconds(30),
      memorySize: 1024,
    });

    const api = new apiGw.LambdaRestApi(this, 'cart-api', {
      restApiName: 'Cart Api service',
      handler: cartApiHandler,
    });
  }
}
