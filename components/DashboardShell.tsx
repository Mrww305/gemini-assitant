
import React, { useState, useContext, ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { UserRole, MenuItem, FeatureKey } from '../types';
import { APP_ROUTES, translations, SparklesIcon, FEATURES, MENU_ITEMS } from '../constants'; // Added MENU_ITEMS
import { Button } from './common/CommonComponents';

interface DashboardShellProps {
  children: ReactNode;
  pageTitle: string;
  allowedFeaturesForClient?: FeatureKey[]; // Only for client role
}

const LanguageSwitcher: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext not found');
  const { language, setLanguage } = context;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button onClick={toggleLanguage} variant="ghost" size="sm" className="text-sm dark:text-neutral-light">
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export const DashboardShell: React.FC<DashboardShellProps> = ({ children, pageTitle, allowedFeaturesForClient }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Error: AppContext not available.</div>;
  }
  const { userRole, setUserRole, language, theme, setTheme } = context;
  const t = translations[language];

  const handleLogout = () => {
    setUserRole(UserRole.NONE);
    navigate(APP_ROUTES.LOGIN);
  };

  const currentMenuItems = MENU_ITEMS.filter(item => item.allowedRoles.includes(userRole))
    .filter(item => {
      if (userRole === UserRole.CLIENT && item.isFeature && item.featureKey) {
        return allowedFeaturesForClient?.includes(item.featureKey);
      }
      return true;
    });

  const getFeatureName = (key: FeatureKey) => {
    const feature = FEATURES.find(f => f.key === key);
    // Use localized name if available, otherwise fallback or key
    // Cast key to string for indexing t, as FeatureKey values are strings.
    return feature ? (t[key as string] || feature.name) : key;
  };
  
  const NavItem: React.FC<{ item: MenuItem }> = ({ item }) => (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-lg hover:bg-primary-light hover:text-white transition-colors duration-150 space-x-3 ${
            isActive ? 'bg-primary-DEFAULT text-white' : 'text-gray-700 dark:text-gray-300 dark:hover:text-white'
          }`
        }
        onClick={() => setSidebarOpen(false)} 
      >
        {item.icon && React.cloneElement(item.icon, { className: "w-6 h-6" })}
        <span>{item.isFeature && item.featureKey ? getFeatureName(item.featureKey) : item.label}</span>
      </NavLink>
    </li>
  );
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`flex h-screen bg-neutral-light dark:bg-neutral-dark ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 z-30 flex flex-col flex-shrink-0 w-64 px-4 py-6 space-y-6 bg-white dark:bg-neutral-dark border-gray-200 dark:border-gray-700 transform ${language === 'ar' ? 'right-0 border-l dark:border-l-gray-700' : 'left-0 border-r dark:border-r-gray-700'} ${ sidebarOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="flex items-center justify-between px-2">
           <NavLink to={userRole === UserRole.ADMIN ? APP_ROUTES.ADMIN_DASHBOARD : APP_ROUTES.CLIENT_DASHBOARD} className="flex items-center space-x-2">
            <SparklesIcon className="w-8 h-8 text-primary-DEFAULT" />
            <span className="text-2xl font-bold text-primary-DEFAULT">Platform</span>
          </NavLink>
          <button className="md:hidden p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT" onClick={() => setSidebarOpen(false)}>
             <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          <ul className="space-y-1">
            {currentMenuItems.map(item => <NavItem key={item.path} item={item} />)}
          </ul>
        </nav>
        <div className="mt-auto">
          <Button onClick={handleLogout} variant="danger" className="w-full">
            {t.logout}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-neutral-dark border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <button
              className="text-gray-500 dark:text-gray-400 focus:outline-none focus:text-gray-700 dark:focus:text-gray-200 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-neutral-dark dark:text-neutral-light ml-2 md:ml-0">{pageTitle}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={toggleTheme} variant="ghost" size="sm" className="text-sm dark:text-neutral-light">
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </Button>
            <LanguageSwitcher />
            <span className="text-neutral-default dark:text-neutral-light hidden sm:block">
              {userRole === UserRole.ADMIN ? t.adminPanel : t.clientPanel}
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-light dark:bg-gray-800 p-4 sm:p-6">
          {children}
        </main>
      </div>
       {sidebarOpen && <div className="fixed inset-0 z-20 bg-black opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};
