
import React from 'react';
import { FeatureKey, UserRole, MenuItem, Feature } from './types';

// Icons (Heroicons SVGs) - Ensure they accept className via SVGProps
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

export const TicketIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75c0 1.033-.423 1.978-1.112 2.667l-2.73 2.73a.75.75 0 000 1.06l2.122 2.121a.75.75 0 001.06 0l2.73-2.73c.689-.689 1.112-1.634 1.112-2.667V6.75h-3.375z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.75h-3.375C6.96 6.75 3 10.71 3 16.875v.001c0 .093.006.185.017.275.003.024.006.048.009.072.078.625.345 1.222.753 1.748l.09.111C5.02 20.36 6.22 21 7.5 21h9c1.28 0 2.479-.64 3.38-1.895l.09-.111c.408-.526.675-1.123.753-1.748.003-.024.007-.048.009-.072A19.507 19.507 0 0021 16.876V6.75" />
  </svg>
);

export const CogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.25 0H12M9 2.25v1.5m6-1.5v1.5m0 15v1.5m-6-1.5v1.5m-6.75-6H4.5m15 0H19.5" />
  </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.188V12.062h-1.188L14.25 11l1.562-.938H17v-2.125L18.25 12zm0 0L19.5 9.812V12.062h1.188L22.25 11l-1.562-.938H19.5v-2.125L18.25 12z" />
  </svg>
);

export const ChatBubbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75A.375.375 0 019 9.375h6.75c.207 0 .375.168.375.375V15a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V10.5a.75.75 0 01.75-.75H9V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.25a3 3 0 013-3h12a3 3 0 013 3v6.75a3 3 0 01-3 3H6a3 3 0 01-3-3V11.25z" />
  </svg>
);

export const CollectionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6A1.125 1.125 0 012.25 10.875V7.125z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 7.125C12.75 6.504 13.254 6 13.875 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125V7.125z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15C2.25 14.379 2.754 13.875 3.375 13.875h6c.621 0 1.125.504 1.125 1.125V18.75c0 .621-.504 1.125-1.125 1.125h-6A1.125 1.125 0 012.25 18.75V15z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15c0-.621.504-1.125 1.125-1.125h6c.621 0 1.125.504 1.125 1.125V18.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125V15z" />
  </svg>
);


export const APP_ROUTES = {
  LOGIN: '/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_CLIENT_MANAGEMENT: '/admin/clients',
  ADMIN_SUPPORT_TICKETS: '/admin/support',
  CLIENT_DASHBOARD: '/client',
  CLIENT_PAYMENT: '/client/payment',
  CLIENT_ACCOUNT: '/client/account',
  FEATURE_FACEBOOK_EXTRACTION: '/client/feature/facebook-extraction',
  FEATURE_WHATSAPP_CAMPAIGN: '/client/feature/whatsapp-campaign',
  FEATURE_INSTA_TELEGRAM: '/client/feature/insta-telegram',
  FEATURE_FACEBOOK_DATA_POINTS: '/client/feature/facebook-data-points',
  FEATURE_SMS_CAMPAIGN: '/client/feature/sms-campaign',
  FEATURE_ONLINE_EXTRACTION: '/client/feature/online-extraction',
  FEATURE_AI_GATEWAY: '/client/feature/ai-gateway',
};

export const FEATURES: Feature[] = [
  { key: FeatureKey.FACEBOOK_EXTRACTION, name: 'Facebook Data Extraction + Bot', description: 'Extract data from Facebook and automate tasks.', icon: <ChatBubbleIcon className="w-8 h-8 text-primary" />, path: APP_ROUTES.FEATURE_FACEBOOK_EXTRACTION },
  { key: FeatureKey.WHATSAPP_CAMPAIGN, name: 'WhatsApp Campaign + Bot', description: 'Run WhatsApp marketing campaigns.', icon: <ChatBubbleIcon className="w-8 h-8 text-green-500" />, path: APP_ROUTES.FEATURE_WHATSAPP_CAMPAIGN },
  { key: FeatureKey.INSTA_TELEGRAM_TOOLS, name: 'Instagram & Telegram Tools', description: 'Marketing tools for Instagram and Telegram.', icon: <ChatBubbleIcon className="w-8 h-8 text-purple-500" />, path: APP_ROUTES.FEATURE_INSTA_TELEGRAM },
  { key: FeatureKey.FACEBOOK_DATA_POINTS, name: 'Facebook Data (Point-Based)', description: 'Access Facebook data using points.', icon: <CollectionIcon className="w-8 h-8 text-yellow-500" />, path: APP_ROUTES.FEATURE_FACEBOOK_DATA_POINTS },
  { key: FeatureKey.SMS_CAMPAIGN, name: 'SMS Campaign Tool', description: 'Manage SMS campaigns with your API.', icon: <ChatBubbleIcon className="w-8 h-8 text-red-500" />, path: APP_ROUTES.FEATURE_SMS_CAMPAIGN },
  { key: FeatureKey.ONLINE_EXTRACTION, name: 'Online Data Extraction', description: 'Extract data from Google Maps, OLX, etc.', icon: <CollectionIcon className="w-8 h-8 text-indigo-500" />, path: APP_ROUTES.FEATURE_ONLINE_EXTRACTION },
  { key: FeatureKey.AI_GATEWAY, name: 'AI Gateway', description: 'Access AI models via API.', icon: <SparklesIcon className="w-8 h-8 text-pink-500" />, path: APP_ROUTES.FEATURE_AI_GATEWAY },
];

export const MENU_ITEMS: MenuItem[] = [
  // Admin
  { label: 'Admin Dashboard', path: APP_ROUTES.ADMIN_DASHBOARD, icon: <HomeIcon className="w-5 h-5" />, allowedRoles: [UserRole.ADMIN] },
  { label: 'Client Management', path: APP_ROUTES.ADMIN_CLIENT_MANAGEMENT, icon: <UsersIcon className="w-5 h-5" />, allowedRoles: [UserRole.ADMIN] },
  { label: 'Support Tickets', path: APP_ROUTES.ADMIN_SUPPORT_TICKETS, icon: <TicketIcon className="w-5 h-5" />, allowedRoles: [UserRole.ADMIN] },
  // Client
  { label: 'Client Dashboard', path: APP_ROUTES.CLIENT_DASHBOARD, icon: <HomeIcon className="w-5 h-5" />, allowedRoles: [UserRole.CLIENT] },
  ...FEATURES.map(f => ({
    label: f.name,
    path: f.path,
    icon: React.cloneElement(f.icon, { className: "w-5 h-5" }), // f.icon is React.ReactElement, cloning is fine
    allowedRoles: [UserRole.CLIENT],
    isFeature: true,
    featureKey: f.key,
  })),
  // AI Gateway is already part of FEATURES, so it's included above.
  // The line below would duplicate it if FeatureKey.AI_GATEWAY is in FEATURES.
  // { label: 'AI Gateway', path: APP_ROUTES.FEATURE_AI_GATEWAY, icon: <SparklesIcon className="w-5 h-5" />, allowedRoles: [UserRole.CLIENT], isFeature: true, featureKey: FeatureKey.AI_GATEWAY }, 
  { label: 'My Account', path: APP_ROUTES.CLIENT_ACCOUNT, icon: <UsersIcon className="w-5 h-5" />, allowedRoles: [UserRole.CLIENT] },
  { label: 'Payment Methods', path: APP_ROUTES.CLIENT_PAYMENT, icon: <CogIcon className="w-5 h-5" />, allowedRoles: [UserRole.CLIENT] },
];


export const translations = {
  en: {
    adminPanel: 'Admin Panel',
    clientPanel: 'Client Panel',
    login: 'Login',
    logout: 'Logout',
    featureUnavailable: 'This feature is not available for your account.',
    points: 'Points',
    subscriptionEnds: 'Subscription Ends',
    // Admin specific
    manageClients: 'Manage Clients',
    clientName: 'Client Name',
    clientEmail: 'Email',
    actions: 'Actions',
    allowFeature: 'Allow Feature',
    denyFeature: 'Deny Feature',
    setSubscription: 'Set Subscription',
    addPoints: 'Add Points',
    supportTickets: 'Support Tickets',
    ticketSubject: 'Subject',
    ticketStatus: 'Status',
    markAsOpen: 'Mark as Open',
    markAsProcessing: 'Mark as Processing',
    markAsClosed: 'Mark as Closed',
    // Client specific
    dashboard: 'Dashboard',
    accountInfo: 'Account Information', // Added
    howToUse: 'How to Use Guide',
    submitSupportTicket: 'Submit Support Ticket',
    facebookStatus: 'Facebook Account Status',
    valid: 'Valid',
    invalid: 'Invalid',
    unknown: 'Unknown',
    remainingPoints: 'Remaining Points',
    renewSubscription: 'Renew Subscription',
    paymentMethods: 'Payment Methods',
    egyptianWallet: 'Egyptian Wallet',
    visa: 'Visa',
    usdtBinance: 'USDT (Binance)',
    aiGateway: 'AI Gateway',
    enterPrompt: 'Enter your prompt for the AI:',
    getResponse: 'Get Response',
    aiResponse: 'AI Response:',
    ...Object.fromEntries(FEATURES.map(f => [f.key, f.name])),
  },
  ar: {
    adminPanel: 'لوحة التحكم للمسؤول',
    clientPanel: 'لوحة تحكم العميل',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    featureUnavailable: 'هذه الميزة غير متاحة لحسابك.',
    points: 'نقاط',
    subscriptionEnds: 'انتهاء الاشتراك',
    // Admin specific
    manageClients: 'إدارة العملاء',
    clientName: 'اسم العميل',
    clientEmail: 'البريد الإلكتروني',
    actions: 'الإجراءات',
    allowFeature: 'السماح بالميزة',
    denyFeature: 'رفض الميزة',
    setSubscription: 'تحديد الاشتراك',
    addPoints: 'إضافة نقاط',
    supportTickets: 'تذاكر الدعم',
    ticketSubject: 'الموضوع',
    ticketStatus: 'الحالة',
    markAsOpen: 'وضع كـ مفتوحة',
    markAsProcessing: 'وضع كـ قيد المعالجة',
    markAsClosed: 'وضع كـ مغلقة',
    // Client specific
    dashboard: 'لوحة التحكم',
    accountInfo: 'معلومات الحساب', // Added
    howToUse: 'دليل الاستخدام',
    submitSupportTicket: 'إرسال تذكرة دعم',
    facebookStatus: 'حالة حساب فيسبوك',
    valid: 'صالح',
    invalid: 'غير صالح',
    unknown: 'غير معروف',
    remainingPoints: 'النقاط المتبقية',
    renewSubscription: 'تجديد الاشتراك',
    paymentMethods: 'طرق الدفع',
    egyptianWallet: 'محفظة مصرية',
    visa: 'فيزا',
    usdtBinance: 'USDT (بينانس)',
    aiGateway: 'بوابة الذكاء الاصطناعي',
    enterPrompt: 'أدخل طلبك للذكاء الاصطناعي:',
    getResponse: 'احصل على رد',
    aiResponse: 'رد الذكاء الاصطناعي:',
    ...Object.fromEntries(FEATURES.map(f => [f.key, f.name])), 
  }
};
