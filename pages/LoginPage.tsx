
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { UserRole } from '../types';
import { APP_ROUTES, translations, SparklesIcon } from '../constants';
import { Button, Input, Card } from '../components/common/CommonComponents';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) throw new Error("AppContext not found");
  const { setUserRole, language } = context;
  const t = translations[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Mock authentication
    if (email === 'admin@example.com' && password === 'adminpass') {
      setUserRole(UserRole.ADMIN);
      navigate(APP_ROUTES.ADMIN_DASHBOARD);
    } else if (email === 'client@example.com' && password === 'clientpass') {
      setUserRole(UserRole.CLIENT);
      navigate(APP_ROUTES.CLIENT_DASHBOARD);
    } else {
      setError('Invalid email or password. Use admin@example.com/adminpass or client@example.com/clientpass for demo.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-secondary-DEFAULT p-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <SparklesIcon className="w-16 h-16 text-primary-DEFAULT mb-2" />
          <h2 className="text-3xl font-bold text-center text-neutral-dark dark:text-neutral-light">
            {t.login} to Platform
          </h2>
        </div>
        
        {error && <p className="mb-4 text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-3 rounded-md">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., admin@example.com"
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="e.g., adminpass"
            required
          />
          <Button type="submit" className="w-full" size="lg">
            {t.login}
          </Button>
        </form>
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Or login with</p>
            <div className="flex justify-center space-x-4 mt-2">
                <Button variant="ghost" className="border border-gray-300 dark:border-gray-600 dark:text-neutral-light">Facebook</Button>
                <Button variant="ghost" className="border border-gray-300 dark:border-gray-600 dark:text-neutral-light">Google</Button>
            </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            For demo: admin@example.com (pass: adminpass) or client@example.com (pass: clientpass)
          </p>
        </div>
        {/* Captcha placeholder */}
        <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded text-center text-sm text-gray-500 dark:text-gray-400">
          [CAPTCHA Placeholder]
        </div>
      </Card>
    </div>
  );
};
