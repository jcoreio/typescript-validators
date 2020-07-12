import { describe, it } from 'mocha'
import * as t from './'
import { expect } from 'chai'

const ServiceScalingParametersType = t.object(
  {},
  {
    DesiredCount: t.nullable(t.number()),
    MaximumPercent: t.nullable(t.number()),
  }
)

const DeployConfigType = t.object(
  {
    DeploymentName: t.string(),
    /**
     * The domain name of the Route 53 hosted zone, for example: foo.com
     */
    HostedZoneDomainName: t.string(),
    /**
     * The id of the VPC to deploy into
     */
    VpcId: t.string(),
    /**
     * The AWS region to deploy into
     */
    region: t.string(),
    /**
     * The subnet ids for the Vpc.  Defaults to all available for VpcId
     */

    Redis: t.union(
      t.object(
        {
          Type: t.stringLiteral('External'),
          Host: t.string(),
        },
        {
          Port: t.nullOr(t.number()),
          DB: t.nullOr(t.number()),
          SecurityGroupId: t.nullOr(t.string()),
        }
      ),
      t.object({
        Type: t.stringLiteral('ElastiCache'),
        AvailabilityZone: t.string(),
      })
    ),
    DB: t.union(
      t.object(
        {
          Type: t.stringLiteral('External'),
          Host: t.string(),
          User: t.string(),
          Name: t.string(),
          Password: t.string(),
        },
        {
          Port: t.nullOr(t.number()),
          RootDBName: t.nullOr(t.string()),
          SecurityGroupId: t.nullOr(t.string()),
        }
      ),
      t.object({
        Type: t.stringLiteral('RDS'),
        MasterUserPassword: t.string(),
        AvailabilityZone: t.string(),
      })
    ),
    Historian: t.object(
      {
        DB: t.object(
          {
            Host: t.string(),
            User: t.string(),
            Password: t.string(),
            Name: t.string(),
          },
          {
            Port: t.nullOr(t.number()),
            SecurityGroupId: t.nullOr(t.string()),
          }
        ),
      },
      {
        Redis: t.nullOr(
          t.object(
            {
              Host: t.string(),
            },
            {
              Port: t.nullOr(t.number()),
              SecurityGroupId: t.nullOr(t.string()),
            }
          )
        ),
      }
    ),
    Services: t.object(
      {
        MQTT: t.object(
          {
            RateLimit: t.number(),
          },
          {
            DesiredCount: t.nullOr(t.number()),
            MaximumPercent: t.nullOr(t.number()),
          }
        ),
      },
      {
        Webapp: t.nullOr(ServiceScalingParametersType),
        RedirectHttps: t.nullOr(ServiceScalingParametersType),
        NotificationSender: t.nullOr(ServiceScalingParametersType),
        ActivityHistorian: t.nullOr(ServiceScalingParametersType),
        ZeroMinimumHealthyPercent: t.nullOr(t.boolean()),
      }
    ),
    ReCaptcha: t.object({
      LoginMinScore: t.number(),
      SignupMinScore: t.number(),
      SiteKey: t.string(),
      SecretKey: t.string(),
    }),
    Stripe: t.object({
      PublishableKey: t.string(),
      SecretKey: t.string(),
    }),
    LiveChat: t.object({
      License: t.string(),
    }),
    NotificationsApi: t.object({
      Url: t.string(),
      Token: t.string(),
    }),
    ClarityDockerImageTag: t.string(),
    JWT: t.object({
      SecretKey: t.string(),
    }),
  },
  {
    AppName: t.nullOr(t.string()),
    /**
     * The base domain name of the app, for example: clarity.foo.com
     */
    BaseDomainName: t.nullOr(t.string()),
    SubnetIds: t.nullOr(t.array(t.string())),
    /**
     * Name of an existing EC2 KeyPair to enable SSH access to the ECS instances
     */
    EC2KeyName: t.nullOr(t.string()),
    VPN: t.nullOr(
      t.object(
        {},
        {
          CidrIp: t.nullOr(t.string()),
          SecurityGroupId: t.nullOr(t.string()),
        }
      )
    ),
    /**
     * Settings for the user upload/download S3 buckets that Clarity uses.
     * Not applicable to CloudFormationTemplateBucket or CertificateProvider.S3BucketName.
     */
    S3: t.nullOr(
      t.object(
        {},
        {
          /**
           * The origin URLs that the S3 buckets will allow.
           * For prod, just the public URL of the app.  For staging,
           * you probably want a wildcard pattern like https://clarity-staging-*.foo.com
           */
          AllowedOrigin: t.nullOr(t.string()),
        }
      )
    ),
    ECSCluster: t.nullOr(
      t.object(
        {},
        {
          ClusterId: t.nullOr(t.string()),
          MinSize: t.nullOr(t.number()),
          MaxSize: t.nullOr(t.number()),
          DesiredCapacity: t.nullOr(t.number()),
          InstanceType: t.nullOr(t.string()),
        }
      )
    ),
    CertificateProvider: t.nullOr(
      t.object(
        {},
        {
          StackName: t.nullOr(t.string()),
          S3BucketName: t.nullOr(t.string()),
          CFNCustomProviderZipFileName: t.nullOr(t.string()),
          LambdaFunctionName: t.nullOr(t.string()),
        }
      )
    ),
    CloudFormationTemplateBucket: t.union(t.string(), t.nullLiteral()),
    JCoreIOLink: t.nullOr(t.string()),
    Superadmin: t.nullOr(
      t.object(
        {},
        {
          Email: t.nullOr(t.string()),
          Password: t.nullOr(t.string()),
        }
      )
    ),
  }
)

type DeployConfig = t.ExtractType<typeof DeployConfigType>

describe(`smoke test`, function() {
  it(`works`, function() {
    const config: DeployConfig = {
      CloudFormationTemplateBucket: 'templates.clarity.foo.com',
      DeploymentName: 'clarity-new',
      HostedZoneDomainName: 'foo.com',
      VpcId: 'vpc-222222222',
      region: 'us-west-2',
      SubnetIds: ['subnet-222222222'],
      VPN: {
        CidrIp: '172.0.0.0/32',
      },
      Redis: {
        Type: 'ElastiCache',
        AvailabilityZone: 'us-west-2a',
      },
      DB: {
        Type: 'RDS',
        AvailabilityZone: 'us-west-2a',
        MasterUserPassword: 'blah',
      },
      Historian: {
        DB: {
          Host: 'historian-staging-db-01.foo.com',
          Password: '22222222222222222222222',
          User: 'postgres',
          Name: 'historian',
          SecurityGroupId: 'sg-22222222222',
        },
      },
      ECSCluster: {
        DesiredCapacity: 2,
      },
      Services: {
        MQTT: {
          RateLimit: 10000,
        },
      },
      ReCaptcha: {
        LoginMinScore: 0.15,
        SignupMinScore: 0.15,
        SiteKey: '22222222222222',
        SecretKey: '22222222222222',
      },
      Stripe: {
        PublishableKey: '22222222222222',
        SecretKey: '22222222222222',
      },
      LiveChat: {
        License: '222222222',
      },
      NotificationsApi: {
        Url: 'https://notifications-api.foo.com',
        Token: '22222222222222',
      },
      ClarityDockerImageTag: 'master',
      JCoreIOLink: 'http://foo.com',
      JWT: {
        SecretKey: '222222222222222',
      },
      Superadmin: {
        Email: 'dev@foo.com',
      },
    }

    DeployConfigType.assert(config)
    const { Redis, ...rest } = config

    expect(() => DeployConfigType.assert(rest as any)).to.throw(
      t.RuntimeTypeError
    )
  })
})
