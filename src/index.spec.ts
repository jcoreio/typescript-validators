import { describe, it } from 'mocha'
import * as t from './'
import { expect } from 'chai'

const ServiceScalingParametersType = t.object<{
  DesiredCount?: unknown
  MaximumPercent?: unknown
}>()({
  DesiredCount: t.optional(t.number()),
  MaximumPercent: t.optional(t.number()),
})

const DeployConfigType = t.object<{
  DeploymentName: any
  HostedZoneDomainName: any
  VpcId: any
  region: any
  Redis: any
  DB: any
  Historian: any
  Services: any
  ReCaptcha: any
  Stripe: any
  LiveChat: any
  NotificationsApi: any
  ClarityDockerImageTag: any
  JWT: any
  AppName?: any
  BaseDomainName?: any
  SubnetIds?: any
  EC2KeyName?: any
  VPN?: any
  S3?: any
  ECSCluster?: any
  CertificateProvider?: any
  CloudFormationTemplateBucket?: any
  JCoreIOLink?: any
  Superadmin?: any
}>()({
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
    t.object<{
      Type: any
      Host: any
      Port?: any
      DB?: any
      SecurityGroupId?: any
    }>()({
      Type: t.string('External'),
      Host: t.string(),
      Port: t.optionalNullOr(t.number()),
      DB: t.optionalNullOr(t.number()),
      SecurityGroupId: t.optionalNullOr(t.string()),
    }),
    t.simpleObject({
      Type: t.string('ElastiCache'),
      AvailabilityZone: t.string(),
    })
  ),
  DB: t.union(
    t.object<{
      Type: any
      Host: any
      User: any
      Name: any
      Password: any
      Port?: any
      RootDBName?: any
      SecurityGroupId?: any
    }>()({
      Type: t.string('External'),
      Host: t.string(),
      User: t.string(),
      Name: t.string(),
      Password: t.string(),
      Port: t.optionalNullOr(t.number()),
      RootDBName: t.optionalNullOr(t.string()),
      SecurityGroupId: t.optionalNullOr(t.string()),
    }),
    t.simpleObject({
      Type: t.string('RDS'),
      MasterUserPassword: t.string(),
      AvailabilityZone: t.string(),
    })
  ),
  Historian: t.object<{
    DB: any
    Redis?: any
  }>()({
    DB: t.object<{
      Host: any
      User: any
      Password: any
      Name: any
      Port?: any
      SecurityGroupId?: any
    }>()({
      Host: t.string(),
      User: t.string(),
      Password: t.string(),
      Name: t.string(),
      Port: t.optionalNullOr(t.number()),
      SecurityGroupId: t.optionalNullOr(t.string()),
    }),
    Redis: t.optionalNullOr(
      t.object<{
        Host: any
        Port?: any
        SecurityGroupId?: any
      }>()({
        Host: t.string(),
        Port: t.optionalNullOr(t.number()),
        SecurityGroupId: t.optionalNullOr(t.string()),
      })
    ),
  }),
  Services: t.object<{
    MQTT: any
    Webapp?: any
    RedirectHttps?: any
    NotificationSender?: any
    ActivityHistorian?: any
    ZeroMinimumHealthyPercent?: any
  }>()({
    MQTT: t.object<{
      RateLimit: any
      DesiredCount?: any
      MaximumPercent?: any
    }>()({
      RateLimit: t.number(),
      DesiredCount: t.optionalNullOr(t.number()),
      MaximumPercent: t.optionalNullOr(t.number()),
    }),
    Webapp: t.optionalNullOr(ServiceScalingParametersType),
    RedirectHttps: t.optionalNullOr(ServiceScalingParametersType),
    NotificationSender: t.optionalNullOr(ServiceScalingParametersType),
    ActivityHistorian: t.optionalNullOr(ServiceScalingParametersType),
    ZeroMinimumHealthyPercent: t.optionalNullOr(t.boolean()),
  }),
  ReCaptcha: t.simpleObject({
    LoginMinScore: t.number(),
    SignupMinScore: t.number(),
    SiteKey: t.string(),
    SecretKey: t.string(),
  }),
  Stripe: t.simpleObject({
    PublishableKey: t.string(),
    SecretKey: t.string(),
  }),
  LiveChat: t.simpleObject({
    License: t.string(),
  }),
  NotificationsApi: t.simpleObject({
    Url: t.string(),
    Token: t.string(),
  }),
  ClarityDockerImageTag: t.string(),
  JWT: t.simpleObject({
    SecretKey: t.string(),
  }),
  AppName: t.optionalNullOr(t.string()),
  /**
   * The base domain name of the app, for example: clarity.foo.com
   */
  BaseDomainName: t.optionalNullOr(t.string()),
  SubnetIds: t.optionalNullOr(t.array(t.string())),
  /**
   * Name of an existing EC2 KeyPair to enable SSH access to the ECS instances
   */
  EC2KeyName: t.optionalNullOr(t.string()),
  VPN: t.optionalNullOr(
    t.object<{
      CidrIp?: any
      SecurityGroupId?: any
    }>()({
      CidrIp: t.optionalNullOr(t.string()),
      SecurityGroupId: t.optionalNullOr(t.string()),
    })
  ),
  /**
   * Settings for the user upload/download S3 buckets that Clarity uses.
   * Not applicable to CloudFormationTemplateBucket or CertificateProvider.S3BucketName.
   */
  S3: t.optionalNullOr(
    t.object<{ AllowedOrigin?: any }>()({
      /**
       * The origin URLs that the S3 buckets will allow.
       * For prod, just the public URL of the app.  For staging,
       * you probably want a wildcard pattern like https://clarity-staging-*.foo.com
       */
      AllowedOrigin: t.optionalNullOr(t.string()),
    })
  ),
  ECSCluster: t.optionalNullOr(
    t.object<{
      ClusterId?: any
      MinSize?: any
      MaxSize?: any
      DesiredCapacity?: any
      InstanceType?: any
    }>()({
      ClusterId: t.optionalNullOr(t.string()),
      MinSize: t.optionalNullOr(t.number()),
      MaxSize: t.optionalNullOr(t.number()),
      DesiredCapacity: t.optionalNullOr(t.number()),
      InstanceType: t.optionalNullOr(t.string()),
    })
  ),
  CertificateProvider: t.optionalNullOr(
    t.object<{
      StackName?: any
      S3BucketName?: any
      CFNCustomProviderZipFileName?: any
      LambdaFunctionName?: any
    }>()({
      StackName: t.optionalNullOr(t.string()),
      S3BucketName: t.optionalNullOr(t.string()),
      CFNCustomProviderZipFileName: t.optionalNullOr(t.string()),
      LambdaFunctionName: t.optionalNullOr(t.string()),
    })
  ),
  CloudFormationTemplateBucket: t.optionalNullOr(t.union(t.string(), t.null())),
  JCoreIOLink: t.optionalNullOr(t.string()),
  Superadmin: t.optionalNullOr(
    t.object<{
      Email?: any
      Password?: any
    }>()({
      Email: t.optionalNullOr(t.string()),
      Password: t.optionalNullOr(t.string()),
    })
  ),
})

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
        RedirectHttps: {
          DesiredCount: 3,
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
    const {
      Redis, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...rest
    } = config

    expect(() => DeployConfigType.assert(rest as any)).to.throw(
      t.RuntimeTypeError
    )
  })
})
