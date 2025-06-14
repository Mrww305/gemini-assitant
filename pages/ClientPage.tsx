
import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../App';
import { DashboardShell } from '../components/DashboardShell';
import { Button, Input, Textarea, Card, Alert, Select, Spinner } from '../components/common/CommonComponents';
import { Client, FeatureKey, SupportTicketStatus, FacebookRecord, Feature } from '../types';
import { FEATURES, translations, APP_ROUTES } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';

const mockClient: Client = {
  id: 'c1',
  name: 'Demo Client',
  email: 'client@example.com',
  subscriptionEndDate: '2024-12-31',
  points: 1500,
  allowedFeatures: [
    FeatureKey.FACEBOOK_EXTRACTION,
    FeatureKey.AI_GATEWAY,
    FeatureKey.FACEBOOK_DATA_POINTS,
    FeatureKey.ONLINE_EXTRACTION,
    FeatureKey.SMS_CAMPAIGN,
  ],
  facebookTokenStatus: 'valid',
};

const mockFacebookData: FacebookRecord[] = [
    { id: 'fb1', name: 'John Doe', country: 'Egypt', city: 'Cairo', education: 'Cairo University', job: 'Engineer' },
    { id: 'fb2', name: 'Jane Smith', country: 'Egypt', city: 'Alexandria', education: 'Alexandria University', job: 'Doctor' },
    { id: 'fb3', name: 'Ahmed Ali', country: 'USA', city: 'New York', job: 'Developer' },
];


export const ClientPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) throw new Error("AppContext not found");
  const { language, setIsLoading, isLoading } = context;
  const t = translations[language];

  const [clientData, setClientData] = useState<Client>(mockClient); 
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmissionStatus, setSupportSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [fbSearchTerm, setFbSearchTerm] = useState('');
  const [fbFilterCountry, setFbFilterCountry] = useState('');
  const [fbFilterCity, setFbFilterCity] = useState('');
  const [fbSearchResults, setFbSearchResults] = useState<FacebookRecord[]>([]);
  const [fbRecordsToBuy, setFbRecordsToBuy] = useState<string[]>([]);


  const currentPath = location.pathname;
  const activeFeature = useMemo(() => FEATURES.find(f => f.path === currentPath), [currentPath]);
  
  const pageTitle = activeFeature 
    ? (t[activeFeature.key as string] || activeFeature.name) 
    : (currentPath === APP_ROUTES.CLIENT_ACCOUNT ? t.accountInfo : 
      (currentPath === APP_ROUTES.CLIENT_PAYMENT ? t.paymentMethods : t.dashboard));


  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      console.log('Support Ticket Submitted:', { subject: supportSubject, message: supportMessage });
      setSupportSubmissionStatus('success');
      setSupportSubject('');
      setSupportMessage('');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleRenewSubscription = () => {
    navigate(APP_ROUTES.CLIENT_PAYMENT);
    alert("Redirecting to Renew Subscription / Payment Page (Placeholder)");
  };

  const handleFbSearch = (by: 'id' | 'filter') => {
    setIsLoading(true);
    setFbSearchResults([]); 
    setTimeout(() => {
        let results: FacebookRecord[];
        if (by === 'id') {
            results = mockFacebookData.filter(record => record.id === fbSearchTerm || record.name.toLowerCase().includes(fbSearchTerm.toLowerCase()));
        } else { 
            results = mockFacebookData.filter(record => 
                (!fbFilterCountry || record.country?.toLowerCase().includes(fbFilterCountry.toLowerCase())) &&
                (!fbFilterCity || record.city?.toLowerCase().includes(fbFilterCity.toLowerCase()))
            );
        }
        setFbSearchResults(results.map(r => ({...r, phoneNumber: undefined }))); 
        setIsLoading(false);
    }, 1500);
  };

  const handleBuyFbRecords = () => {
    const cost = fbRecordsToBuy.length * 1; 
    if (clientData.points < cost) {
        alert("Not enough points to buy selected records.");
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
        setClientData(prev => ({...prev, points: prev.points - cost}));
        setFbSearchResults(prevResults => prevResults.map(r => 
            fbRecordsToBuy.includes(r.id) ? {...r, phoneNumber: `+201xxxxxxxxx (${r.id})`} : r 
        ));
        setFbRecordsToBuy([]);
        setIsLoading(false);
        alert(`${cost} points deducted. Records purchased (phone numbers revealed).`);
    }, 1000);
  };

  const toggleFbRecordSelection = (id: string) => {
    setFbRecordsToBuy(prev => 
        prev.includes(id) ? prev.filter(recordId => recordId !== id) : [...prev, id]
    );
  };

  const renderDashboardContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card title={t.accountInfo}>
        <p className="dark:text-gray-300">{t.remainingPoints}: <span className="font-semibold">{clientData.points}</span></p>
        <p className="dark:text-gray-300">{t.subscriptionEnds}: <span className="font-semibold">{clientData.subscriptionEndDate}</span></p>
        <p className="dark:text-gray-300">{t.facebookStatus}:
          <span className={`ml-2 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
            clientData.facebookTokenStatus === 'valid' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' : 
            clientData.facebookTokenStatus === 'invalid' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'}`}>
            {t[clientData.facebookTokenStatus]}
          </span>
        </p>
        <Button onClick={handleRenewSubscription} className="mt-4 w-full">{t.renewSubscription}</Button>
      </Card>

      <Card title={t.submitSupportTicket}>
        {supportSubmissionStatus === 'success' && <Alert type="success" message="Ticket submitted successfully!" onClose={() => setSupportSubmissionStatus('idle')} />}
        {supportSubmissionStatus === 'error' && <Alert type="error" message="Failed to submit ticket." onClose={() => setSupportSubmissionStatus('idle')} />}
        <form onSubmit={handleSupportSubmit} className="space-y-4">
          <Input label="Subject" value={supportSubject} onChange={e => setSupportSubject(e.target.value)} required />
          <Textarea label="Message" value={supportMessage} onChange={e => setSupportMessage(e.target.value)} required />
          <Button type="submit" isLoading={isLoading} className="w-full">Submit Ticket</Button>
        </form>
      </Card>
      
      <Card title={t.howToUse}>
        <p className="dark:text-gray-300">Welcome to the platform! Here you can find various tools to help with your marketing efforts.</p>
        <a href="#" className="text-primary-DEFAULT hover:underline mt-2 inline-block">View Full Tutorial (Link/Video Placeholder)</a>
      </Card>
    </div>
  );

  const renderFeatureContent = (feature: Feature) => {
    if (feature.key === FeatureKey.FACEBOOK_DATA_POINTS) {
        return (
            <Card title={t[FeatureKey.FACEBOOK_DATA_POINTS as string] || "Facebook Data (Point-Based)"}>
                <p className="mb-4 dark:text-gray-300">Search our extensive Facebook database. Results initially hide phone numbers. Select records and purchase with points to reveal full details. (100 records = 100 points)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-semibold mb-2 dark:text-white">Search by ID or Name</h3>
                        <Input placeholder="Enter Facebook ID or Name" value={fbSearchTerm} onChange={e => setFbSearchTerm(e.target.value)} />
                        <Button onClick={() => handleFbSearch('id')} className="mt-2" isLoading={isLoading}>Search by ID/Name</Button>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 dark:text-white">Search by Filters</h3>
                        <div className="space-y-2">
                            <Input placeholder="Country (e.g., Egypt)" value={fbFilterCountry} onChange={e => setFbFilterCountry(e.target.value)} />
                            <Input placeholder="City (e.g., Cairo)" value={fbFilterCity} onChange={e => setFbFilterCity(e.target.value)} />
                            <Button onClick={() => handleFbSearch('filter')} className="mt-2" isLoading={isLoading}>Search by Filters</Button>
                        </div>
                    </div>
                </div>

                {isLoading && <div className="flex justify-center my-4"><Spinner /></div>}

                {fbSearchResults.length > 0 && (
                    <div>
                        <h4 className="font-semibold mb-2 dark:text-white">Search Results ({fbSearchResults.length} found):</h4>
                        <div className="max-h-96 overflow-y-auto border dark:border-gray-700 rounded-md p-2 space-y-2 bg-gray-50 dark:bg-gray-800">
                        {fbSearchResults.map(record => (
                            <div key={record.id} className="p-3 border dark:border-gray-600 rounded-md bg-white dark:bg-neutral-dark">
                                <div className="flex items-center justify-between">
                                    <p className="dark:text-white"><strong>{record.name}</strong> (ID: {record.id})</p>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-primary-DEFAULT rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:ring-primary-DEFAULT" checked={fbRecordsToBuy.includes(record.id)} onChange={() => toggleFbRecordSelection(record.id)} />
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {record.country && `Country: ${record.country} `}
                                    {record.city && `City: ${record.city} `}
                                    {record.job && `Job: ${record.job}`}
                                </p>
                                {record.phoneNumber && <p className="text-sm text-green-600 dark:text-green-400 font-semibold">Phone: {record.phoneNumber}</p>}
                                {!record.phoneNumber && <p className="text-sm text-red-500 dark:text-red-400">Phone number hidden. Select to purchase.</p>}
                            </div>
                        ))}
                        </div>
                         {fbRecordsToBuy.length > 0 && (
                            <Button onClick={handleBuyFbRecords} isLoading={isLoading} className="mt-4">
                                Buy {fbRecordsToBuy.length} Selected Record(s) for {fbRecordsToBuy.length * 1} Points
                            </Button>
                        )}
                    </div>
                )}
                {fbSearchResults.length === 0 && !isLoading && <p className="dark:text-gray-300">No records found for your search criteria.</p>}
            </Card>
        );
    }
    
    return (
        <Card title={t[feature.key as string] || feature.name}>
            <p className="text-lg text-gray-600 dark:text-gray-300">{feature.description}</p>
            <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                <p className="text-xl font-semibold dark:text-white">Feature Under Development</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    The detailed interface for "{t[feature.key as string] || feature.name}" will be available soon.
                </p>
                <ul className="list-disc list-inside text-left text-gray-500 dark:text-gray-400 mt-2 mx-auto max-w-md">
                    {feature.key === FeatureKey.FACEBOOK_EXTRACTION && <li>Search groups, posts, people, pages. Extract members, comments, etc.</li>}
                    {feature.key === FeatureKey.WHATSAPP_CAMPAIGN && <li>Upload number lists, create campaigns, randomize messages.</li>}
                </ul>
            </div>
        </Card>
    );
  };
  
  const renderPaymentPage = () => (
    <Card title={t.paymentMethods}>
        <p className="mb-6 dark:text-gray-300">Choose your preferred payment method to renew your subscription or add points.</p>
        <div className="space-y-4">
            <Button className="w-full justify-start p-4 text-left dark:text-neutral-light dark:hover:bg-gray-700" variant="ghost">
                <span className="text-lg">{t.egyptianWallet}</span> (e.g., Vodafone Cash, Orange Money)
            </Button>
            <Button className="w-full justify-start p-4 text-left dark:text-neutral-light dark:hover:bg-gray-700" variant="ghost">
                <span className="text-lg">{t.visa}</span> (Credit/Debit Card)
            </Button>
            <Button className="w-full justify-start p-4 text-left dark:text-neutral-light dark:hover:bg-gray-700" variant="ghost">
                <span className="text-lg">{t.usdtBinance}</span> (Cryptocurrency)
            </Button>
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">Note: Actual payment integration is a backend process. This is a UI placeholder.</p>
    </Card>
  );

  const renderAccountPage = () => (
     <Card title={t.accountInfo}>
        <p className="dark:text-gray-300"><strong>Name:</strong> {clientData.name}</p>
        <p className="dark:text-gray-300"><strong>Email:</strong> {clientData.email}</p>
        <p className="dark:text-gray-300"><strong>{t.remainingPoints}:</strong> {clientData.points}</p>
        <p className="dark:text-gray-300"><strong>{t.subscriptionEnds}:</strong> {clientData.subscriptionEndDate}</p>
        <Button onClick={handleRenewSubscription} className="mt-4">{t.renewSubscription}</Button>
        <hr className="my-6 border-gray-200 dark:border-gray-700"/>
        <h4 className="text-md font-semibold mb-2 dark:text-white">Allowed Features:</h4>
        <ul className="list-disc list-inside dark:text-gray-300">
            {clientData.allowedFeatures.map(key => {
                const feature = FEATURES.find(f => f.key === key);
                return <li key={key}>{feature ? (t[key as string] || feature.name) : key}</li>;
            })}
        </ul>
     </Card>
  );

  let contentToRender;
  if (currentPath === APP_ROUTES.CLIENT_DASHBOARD) {
    contentToRender = renderDashboardContent();
  } else if (activeFeature) {
    if (!clientData.allowedFeatures.includes(activeFeature.key)) {
        contentToRender = <Alert type="warning" message={t.featureUnavailable} />;
    } else {
        contentToRender = renderFeatureContent(activeFeature);
    }
  } else if (currentPath === APP_ROUTES.CLIENT_PAYMENT) {
    contentToRender = renderPaymentPage();
  } else if (currentPath === APP_ROUTES.CLIENT_ACCOUNT) {
    contentToRender = renderAccountPage();
  }
   else {
    contentToRender = renderDashboardContent(); 
  }

  return (
    <DashboardShell pageTitle={pageTitle} allowedFeaturesForClient={clientData.allowedFeatures}>
      {contentToRender}
    </DashboardShell>
  );
};
