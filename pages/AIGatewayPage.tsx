
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { DashboardShell } from '../components/DashboardShell';
import { Button, Textarea, Card, Spinner, Alert } from '../components/common/CommonComponents';
import { generateTextFromGemini } from '../services/geminiService';
import { translations } from '../constants'; 
import { Client, FeatureKey } from '../types'; // Import FeatureKey from types

// Mock client data for allowedFeatures check
const mockClientAIGateway: Client = {
  id: 'c1',
  name: 'Demo Client',
  email: 'client@example.com',
  subscriptionEndDate: '2024-12-31',
  points: 1500,
  allowedFeatures: [FeatureKey.AI_GATEWAY], 
  facebookTokenStatus: 'valid',
};

export const AIGatewayPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext not found");
  const { language, setIsLoading, isLoading } = context;
  const t = translations[language];

  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  
  const [clientData] = useState<Client>(mockClientAIGateway);


  const handleSubmitPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError('');
    setAiResponse('');

    try {
      // Simulate point deduction if applicable
      // if (clientData.points < 10) { // Example: 10 points per query
      //   setError("Not enough points to use AI Gateway.");
      //   setIsLoading(false);
      //   return;
      // }
      // setClientData(prev => ({...prev, points: prev.points - 10}));

      const responseText = await generateTextFromGemini(prompt);
      setAiResponse(responseText);
    } catch (apiError: any) {
      setError(apiError.message || "Failed to get response from AI.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!clientData.allowedFeatures.includes(FeatureKey.AI_GATEWAY)) {
    return (
      <DashboardShell pageTitle={t.aiGateway} allowedFeaturesForClient={clientData.allowedFeatures}>
        <Alert type="warning" message={t.featureUnavailable} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell pageTitle={t.aiGateway} allowedFeaturesForClient={clientData.allowedFeatures}>
      <Card title={t.aiGateway}>
        <form onSubmit={handleSubmitPrompt} className="space-y-4">
          <Textarea
            label={t.enterPrompt}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Write a short story about a brave robot..."
            rows={5}
            required
            disabled={isLoading}
          />
          <Button type="submit" isLoading={isLoading} disabled={isLoading} className="w-full sm:w-auto">
            {t.getResponse}
          </Button>
        </form>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {isLoading && (
          <div className="mt-6 flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-2 text-neutral-default dark:text-neutral-light">AI is thinking...</p>
          </div>
        )}

        {aiResponse && !isLoading && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{t.aiResponse}</h3>
            <div className="bg-neutral-light dark:bg-gray-800 p-4 rounded-md whitespace-pre-wrap overflow-x-auto text-gray-700 dark:text-gray-300">
              {aiResponse}
            </div>
          </div>
        )}
      </Card>
      <Card title="Usage Notes" className="mt-6">
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>This AI Gateway uses the 'gemini-2.5-flash-preview-04-17' model.</li>
            <li>Ensure your prompts are clear and specific for best results.</li>
            <li>API usage may be subject to limits or point consumption (not implemented in this demo).</li>
            <li>The API key for Gemini is configured on the server-side (via environment variables).</li>
        </ul>
      </Card>
    </DashboardShell>
  );
};
