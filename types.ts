
export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  NONE = 'none'
}

export enum FeatureKey {
  FACEBOOK_EXTRACTION = 'facebook_extraction',
  WHATSAPP_CAMPAIGN = 'whatsapp_campaign',
  INSTA_TELEGRAM_TOOLS = 'insta_telegram_tools',
  FACEBOOK_DATA_POINTS = 'facebook_data_points',
  SMS_CAMPAIGN = 'sms_campaign',
  ONLINE_EXTRACTION = 'online_extraction',
  AI_GATEWAY = 'ai_gateway'
}

export interface Feature {
  key: FeatureKey;
  name: string;
  description: string;
  icon: React.ReactElement; // Changed from React.ReactNode
  path: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  subscriptionEndDate: string;
  points: number;
  allowedFeatures: FeatureKey[];
  facebookTokenStatus: 'valid' | 'invalid' | 'unknown';
}

export enum SupportTicketStatus {
  OPEN = 'open',
  PROCESSING = 'processing',
  CLOSED = 'closed'
}

export interface SupportTicket {
  id: string;
  clientId: string;
  clientName: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
}

export interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  theme: 'light' | 'dark'; 
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactElement; // Changed from React.ReactNode
  allowedRoles: UserRole[];
  isFeature?: boolean;
  featureKey?: FeatureKey;
}

// For Facebook Data Points feature
export interface FacebookRecord {
  id: string;
  name: string;
  country?: string;
  city?: string;
  education?: string;
  job?: string;
  // Phone number is revealed after purchase
  phoneNumber?: string; 
}

// Used to correctly type translation keys
export type LocaleKey = keyof typeof import('./constants').translations.en;
