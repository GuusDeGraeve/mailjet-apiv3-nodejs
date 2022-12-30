import { Common } from './Common';

export namespace Message {
  export enum MessageState {
    UserUnknown = 1,
    MailboxInactive = 2,
    QuotaExceeded = 3,
    InvalidDomain = 4,
    NoMailHost = 5,
    RelayOrAccessDenied = 6,
    SenderBlocked = 7,
    ContentBlocked = 8,
    PolicyIssue = 9,
    SystemIssue = 10,
    ProtocolIssue = 11,
    ConnectionIssue = 12,
    GreyListed = 13,
    PreBlocked = 14,
    DuplicateInCampaign = 15,
    SpamPreBlocked = 16,
    BadOrEmptyTemplate = 17,
    ErrorInTemplateLanguage = 18,
    TypoFix = 19,
    BlackListed = 20,
    SpamReporter = 21
  }

  export enum FromType {
    Transactional = 1,
    Marketing = 2,
    Unknown = 3,
  }

  export enum MessageStatus {
    Processed = 0,
    Queued = 1,
    Sent = 2,
    Opened = 3,
    Clicked = 4,
    Bounce = 5,
    Spam = 6,
    Unsub = 7,
    Blocked = 8,
    SoftBounce = 9,
    HardBounce = 10,
    Deferred = 11,
  }

  export enum CurrentMessageStatus {
    Unknown = 'unknown',
    Queued = 'queued',
    Sent = 'sent',
    Opened = 'opened',
    Clicked = 'clicked',
    Bounce = 'bounce',
    Spam = 'spam',
    Unsub = 'unsub',
    Blocked = 'blocked',
    HardBounced = 'hardbounced',
    SoftBounced = 'softbounced',
    Deferred = 'deferred',
  }

  export enum EventType {
    Sent = 'sent',
    Opened = 'opened',
    Clicked = 'clicked',
    Bounced = 'bounced',
    Blocked = 'blocked',
    Unsub = 'unsub',
    Spam = 'spam'
  }

  export interface MessageTracked {
    IsClickTracked: boolean;
    IsHTMLPartIncluded: boolean;
    IsOpenTracked: boolean;
    IsTextPartIncluded: boolean;
    IsUnsubTracked: boolean;
  }

  export interface Message extends MessageTracked {
    ID: number;
    ArrivedAt: string;
    AttachmentCount: number;
    AttemptCount: number;
    CampaignID: number;
    ContactAlt: string;
    ContactID: number;
    Delay: number;
    DestinationID: number;
    FilterTime: number;
    MessageSize: number;
    SenderID: number;
    SpamassassinScore: number;
    SpamassRules: string;
    StateID: MessageState;
    StatePermanent: boolean;
    Status: CurrentMessageStatus;
    Subject: string;
    UUID: string;
  }

  export interface MessageHistory {
    Comment: string;
    EventAt: number;
    EventType: EventType;
    State: string;
    Useragent: string;
    UseragentID: number;
  }

  export interface MessageInformation<Rules = Common.UnknownRec> {
    ID: number;
    CampaignID: number;
    ClickTrackedCount: number;
    ContactID: number;
    CreatedAt: string;
    MessageSize: number;
    OpenTrackedCount: number;
    QueuedCount: number;
    SendEndAt: string;
    SentCount: number;
    SpamAssassinRules: Rules;
    SpamAssassinScore: number;
  }

  // REQUEST PART
  export type GetMessageQueryParams = Partial<Common.TimestampPeriod> &
    Partial<Common.Pagination> &
  {
    Campaign?: number;
    Contact?: number;
    CustomID?: string;
    Destination?: number;
    FromType?: FromType;
    MessageState?: MessageState;
    MessageStatus?: MessageStatus;
    PlanSubscription?: number;
    SenderID?: number;
    ShowContactAlt?: boolean;
    ShowCustomID?: boolean;
    ShowSubject?: boolean;
  }

  export type GetMessageInformationQueryParams = Partial<Common.TimestampPeriod> &
    Partial<Common.Pagination> &
  {
    CampaignID?: number;
    ContactsList?: number;
    CustomCampaign?: string;
    From?: string;
    FromDomain?: string;
    FromID?: number;
    FromType?: FromType;
    IsDeleted?: boolean;
    IsNewsletterTool?: boolean;
    IsStarred?: boolean;
    MessageStatus?: MessageStatus;
    Period?: Common.Period;
  }

  // RESPONSE PART
  export type GetMessagesResponse = Common.Response<Message[]>
  export type GetMessageHistoryResponse = Common.Response<MessageHistory[]>
  export type GetMessageInformationResponse<Rules = Common.UnknownRec> =
      Common.Response<Array<MessageInformation<Rules>>>
}
