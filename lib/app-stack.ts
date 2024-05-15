import * as cdk from "aws-cdk-lib";
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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
