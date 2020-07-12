import { describe, it } from 'mocha'
import * as t from './'

type ServiceScalingParameters = {
  DesiredCount?: number | null | undefined
  MaximumPercent?: number | null | undefined
}

const ServiceScalingParametersType = t.object<ServiceScalingParameters>({
  DesiredCount: t.nullable(t.number()),
  MaximumPercent: t.nullable(t.number()),
})

export type DeployConfig = {
  CloudFormationTemplateBucket?: string | null | undefined
  DeploymentName: string
  AppName?: string | null | undefined
  /**
   * The base domain name of the app, for example: clarity.foo.com
   */
  BaseDomainName?: string | null | undefined
  /**
   * The domain name of the Route 53 hosted zone, for example: foo.com
   */
  HostedZoneDomainName: string
  /**
   * The id of the VPC to deploy into
   */
  VpcId: string
  /**
   * The AWS region to deploy into
   */
  region: string
  /**
   * The subnet ids for the Vpc.  Defaults to all available for VpcId
   */
  SubnetIds?: string[] | null | undefined
  /**
   * Name of an existing EC2 KeyPair to enable SSH access to the ECS instances
   */
  EC2KeyName?: string | null | undefined
  VPN?:
    | {
        CidrIp?: string | null | undefined
        SecurityGroupId?: string | null | undefined
      }
    | null
    | undefined
  /**
   * Settings for the user upload/download S3 buckets that Clarity uses.
   * Not applicable to CloudFormationTemplateBucket or CertificateProvider.S3BucketName.
   */
  S3?: {
    /**
     * The origin URLs that the S3 buckets will allow.
     * For prod, just the public URL of the app.  For staging,
     * you probably want a wildcard pattern like https://clarity-staging-*.foo.com
     */
    AllowedOrigin?: string | null | undefined
  }
  Redis:
    | {
        Type: 'External'
        Host: string
        Port?: number | null | undefined
        DB?: number | null | undefined
        SecurityGroupId?: string | null | undefined
      }
    | {
        Type: 'ElastiCache'
        AvailabilityZone: string
      }
  DB:
    | {
        Type: 'External'
        Host: string
        Port?: number | null | undefined
        User: string
        Name: string
        Password: string
        RootDBName?: string | null | undefined
        SecurityGroupId?: string | null | undefined
      }
    | {
        Type: 'RDS'
        MasterUserPassword: string
        AvailabilityZone: string
      }
  Historian: {
    DB: {
      Host: string
      Port?: number | null | undefined
      User: string
      Password: string
      Name: string
      SecurityGroupId?: string | null | undefined
    }
    Redis?:
      | {
          Host: string
          Port?: number | null | undefined
          SecurityGroupId?: string | null | undefined
        }
      | null
      | undefined
  }
  ECSCluster?:
    | {
        ClusterId?: string | null | undefined
        MinSize?: number | null | undefined
        MaxSize?: number | null | undefined
        DesiredCapacity?: number | null | undefined
        InstanceType?: string | null | undefined
      }
    | null
    | undefined
  CertificateProvider?:
    | {
        StackName?: string | null | undefined
        S3BucketName?: string | null | undefined
        CFNCustomProviderZipFileName?: string | null | undefined
        LambdaFunctionName?: string | null | undefined
      }
    | undefined
  Services: {
    Webapp?: ServiceScalingParameters | null | undefined
    RedirectHttps?: ServiceScalingParameters | null | undefined
    MQTT: {
      DesiredCount?: number | null | undefined
      MaximumPercent?: number | null | undefined
      RateLimit: number
    }
    NotificationSender?: ServiceScalingParameters | null | undefined
    ActivityHistorian?: ServiceScalingParameters | null | undefined
    ZeroMinimumHealthyPercent?: boolean | null | undefined
  }
  ReCaptcha: {
    LoginMinScore: number
    SignupMinScore: number
    SiteKey: string
    SecretKey: string
  }
  Stripe: {
    PublishableKey: string
    SecretKey: string
  }
  LiveChat: {
    License: string
  }
  NotificationsApi: {
    Url: string
    Token: string
  }
  ClarityDockerImageTag: string
  JCoreIOLink?: string | null | undefined
  JWT: {
    SecretKey: string
  }
  Superadmin?:
    | {
        Email?: string | null | undefined
        Password?: string | null | undefined
      }
    | null
    | undefined
}

const DeployConfigType = t.object<DeployConfig>({
  CloudFormationTemplateBucket: t.nullable(t.string()),
  DeploymentName: t.string(),
  AppName: t.nullable(t.string()),
  /**
   * The base domain name of the app, for example: clarity.foo.com
   */
  BaseDomainName: t.nullable(t.string()),
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
  SubnetIds: t.nullable(t.array(t.string())),
  /**
   * Name of an existing EC2 KeyPair to enable SSH access to the ECS instances
   */
  EC2KeyName: t.nullable(t.string()),
  VPN: t.nullable(
    t.object<DeployConfig['VPN']>({
      CidrIp: t.nullable(t.string()),
      SecurityGroupId: t.nullable(t.string()),
    })
  ),
  /**
   * Settings for the user upload/download S3 buckets that Clarity uses.
   * Not applicable to CloudFormationTemplateBucket or CertificateProvider.S3BucketName.
   */
  S3: t.nullable(
    t.object<DeployConfig['S3']>({
      /**
       * The origin URLs that the S3 buckets will allow.
       * For prod, just the public URL of the app.  For staging,
       * you probably want a wildcard pattern like https://clarity-staging-*.foo.com
       */
      AllowedOrigin: t.nullable(t.string()),
    })
  ),
  Redis: t.union(
    t.object({
      Type: t.stringLiteral('External'),
      Host: t.string(),
      Port: t.nullable(t.number()),
      DB: t.nullable(t.number()),
      SecurityGroupId: t.nullable(t.string()),
    }),
    t.object({
      Type: t.stringLiteral('ElastiCache'),
      AvailabilityZone: t.string(),
    })
  ),
  DB: t.union(
    t.object({
      Type: t.stringLiteral('External'),
      Host: t.string(),
      Port: t.nullable(t.number()),
      User: t.string(),
      Name: t.string(),
      Password: t.string(),
      RootDBName: t.nullable(t.string()),
      SecurityGroupId: t.nullable(t.string()),
    }),
    t.object({
      Type: t.stringLiteral('RDS'),
      MasterUserPassword: t.string(),
      AvailabilityZone: t.string(),
    })
  ),
  Historian: t.object({
    DB: t.object({
      Host: t.string(),
      Port: t.nullable(t.number()),
      User: t.string(),
      Password: t.string(),
      Name: t.string(),
      SecurityGroupId: t.nullable(t.string()),
    }),
    Redis: t.nullable(
      t.object({
        Host: t.string(),
        Port: t.nullable(t.number()),
        SecurityGroupId: t.nullable(t.string()),
      })
    ),
  }),
  ECSCluster: t.nullable(
    t.object({
      ClusterId: t.nullable(t.string()),
      MinSize: t.nullable(t.number()),
      MaxSize: t.nullable(t.number()),
      DesiredCapacity: t.nullable(t.number()),
      InstanceType: t.nullable(t.string()),
    })
  ),
  CertificateProvider: t.nullable(
    t.object({
      StackName: t.nullable(t.string()),
      S3BucketName: t.nullable(t.string()),
      CFNCustomProviderZipFileName: t.nullable(t.string()),
      LambdaFunctionName: t.nullable(t.string()),
    })
  ),
  Services: t.object({
    Webapp: t.nullable(ServiceScalingParametersType),
    RedirectHttps: t.nullable(ServiceScalingParametersType),
    MQTT: t.object({
      DesiredCount: t.nullable(t.number()),
      MaximumPercent: t.nullable(t.number()),
      RateLimit: t.number(),
    }),
    NotificationSender: t.nullable(ServiceScalingParametersType),
    ActivityHistorian: t.nullable(ServiceScalingParametersType),
    ZeroMinimumHealthyPercent: t.nullable(t.boolean()),
  }),
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
  JCoreIOLink: t.nullable(t.string()),
  JWT: t.object({
    SecretKey: t.string(),
  }),
  Superadmin: t.nullable(
    t.object({
      Email: t.nullable(t.string()),
      Password: t.nullable(t.string()),
    })
  ),
})

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
        License: '10730772',
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
  })
})
