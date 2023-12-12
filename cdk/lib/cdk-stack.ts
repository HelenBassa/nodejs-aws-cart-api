import { Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import path = require('path');

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cartApiHandler = new NodejsFunction(this, 'cartApiHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.resolve(__dirname, '..', '..', 'dist', 'main.js'),
      functionName: 'cartApiHandler',
    });

    const api = new apiGw.LambdaRestApi(this, 'cart-api', {
      restApiName: 'Cart Api service',
      handler: cartApiHandler,
    });
  }
}
