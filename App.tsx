
import React, { useState, createContext, useMemo, ReactNode, useCallback, useEffect, useContext } from 'react'; // Added useContext
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { UserRole, AppContextType } from './types'; // Removed FeatureKey as it's not directly used here
import { APP_ROUTES } from './constants';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { ClientPage } from './pages/ClientPage';
import { AIGatewayPage } from './pages/AIGatewayPage'; 

export const AppContext = createContext<AppContextType | null>(null);

const ProtectedRoute: React.FC<{ allowedRoles: UserRole[] }> = ({ allowedRoles }) => {
  const context = useContext(AppContext); // useContext was missing from imports
  if (!context) return <Navigate to={APP_ROUTES.LOGIN} replace />; 

  const { userRole } = context;

  if (userRole === UserRole.NONE || !allowedRoles.includes(userRole)) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const storedRole = localStorage.getItem('userRole');
    return storedRole ? (storedRole as UserRole) : UserRole.NONE;
  });
  const [language, setLanguage] = useState<'en' | 'ar'>(() => {
     const storedLang = localStorage.getItem('language');
     return (storedLang === 'en' || storedLang === 'ar') ? storedLang : 'en';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
    // Fallback to system preference if no theme stored
    // return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return 'light'; // Default to light if system preference not used or not available
  });

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);


  const appContextValue = useMemo<AppContextType>(() => ({
    userRole,
    setUserRole,
    language,
    setLanguage,
    isLoading,
    setIsLoading,
    theme,
    setTheme,
  }), [userRole, language, isLoading, theme]);

  return (
    <AppContext.Provider value={appContextValue}>
      <HashRouter>
        <Routes>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route path={APP_ROUTES.ADMIN_DASHBOARD} element={<AdminPage />} />
            <Route path={APP_ROUTES.ADMIN_CLIENT_MANAGEMENT} element={<AdminPage />} /> 
            <Route path={APP_ROUTES.ADMIN_SUPPORT_TICKETS} element={<AdminPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[UserRole.CLIENT]} />}>
            <Route path={APP_ROUTES.CLIENT_DASHBOARD} element={<ClientPage />} />
            <Route path={APP_ROUTES.CLIENT_ACCOUNT} element={<ClientPage />} />
            <Route path={APP_ROUTES.CLIENT_PAYMENT} element={<ClientPage />} />
            
            <Route path={APP_ROUTES.FEATURE_FACEBOOK_EXTRACTION} element={<ClientPage />} />
            <Route path={APP_ROUTES.FEATURE_WHATSAPP_CAMPAIGN} element={<ClientPage />} />
            <Route path={APP_ROUTES.FEATURE_INSTA_TELEGRAM} element={<ClientPage />} />
            <Route path={APP_ROUTES.FEATURE_FACEBOOK_DATA_POINTS} element={<ClientPage />} />
            <Route path={APP_ROUTES.FEATURE_SMS_CAMPAIGN} element={<ClientPage />} />
            <Route path={APP_ROUTES.FEATURE_ONLINE_EXTRACTION} element={<ClientPage />} />
            <Route path={APP_ROUTES.FEATURE_AI_GATEWAY} element={<AIGatewayPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to={userRole === UserRole.NONE ? APP_ROUTES.LOGIN : (userRole === UserRole.ADMIN ? APP_ROUTES.ADMIN_DASHBOARD : APP_ROUTES.CLIENT_DASHBOARD)} replace />} />
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
