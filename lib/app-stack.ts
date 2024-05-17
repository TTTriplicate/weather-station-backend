import * as cdk from "aws-cdk-lib";
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as apg from 'aws-cdk-lib/aws-apigatewayv2'
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from "constructs";

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gateway = new apg.HttpApi(this, 'intakeApi', {
      description: 'Intake API for weather data'
    })

    const intakeLambda = new lambda.Function(this, 'intakeLambda', {
      runtime: lambda.Runtime.FROM_IMAGE,
      code: lambda.Code.fromDockerBuild(``),
      handler: 'hello'
    })
    const storage = new dynamo.TableV2(this, "WeatherTrack", {
      partitionKey: { name: "PK", type: dynamo.AttributeType.NUMBER },
      sortKey: {
        name: "epochTime",
        type: dynamo.AttributeType.NUMBER,
      },
    });

    const receiver = new sqs.Queue(this, "receivingQueue", {
      queueName: "receiver",
    });
  }
}
