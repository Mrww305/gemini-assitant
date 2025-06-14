
import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../App';
import { DashboardShell } from '../components/DashboardShell';
import { Button, Input, Select, Card, Modal, Table, Alert } from '../components/common/CommonComponents'; // Table is now imported
import { Client, FeatureKey, SupportTicket, SupportTicketStatus } from '../types';
import { FEATURES, translations } from '../constants';

// Mock Data
const initialClients: Client[] = [
  { id: '1', name: 'Client Alpha', email: 'alpha@example.com', subscriptionEndDate: '2024-12-31', points: 1000, allowedFeatures: [FeatureKey.FACEBOOK_EXTRACTION, FeatureKey.AI_GATEWAY], facebookTokenStatus: 'valid' },
  { id: '2', name: 'Client Beta', email: 'beta@example.com', subscriptionEndDate: '2025-06-30', points: 500, allowedFeatures: [FeatureKey.WHATSAPP_CAMPAIGN], facebookTokenStatus: 'invalid' },
];

const initialTickets: SupportTicket[] = [
  { id: 't1', clientId: '1', clientName: 'Client Alpha', subject: 'Login Issue', message: 'Cannot login to my account.', status: SupportTicketStatus.OPEN, createdAt: '2023-10-01' },
  { id: 't2', clientId: '2', clientName: 'Client Beta', subject: 'Feature Request', message: 'Need access to SMS campaign tool.', status: SupportTicketStatus.PROCESSING, createdAt: '2023-10-05' },
];

type AdminSection = 'dashboard' | 'clients' | 'tickets';

export const AdminPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext not found");
  const { language } = context;
  const t = translations[language];

  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'features' | 'subscription' | 'points' | null>(null);
  
  const [newSubscriptionDate, setNewSubscriptionDate] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState(0);

  const pageTitle = useMemo(() => {
    if (activeSection === 'clients') return t.manageClients;
    if (activeSection === 'tickets') return t.supportTickets;
    return t.adminPanel; 
  }, [activeSection, t]);

  const handleOpenModal = (client: Client, type: 'features' | 'subscription' | 'points') => {
    setSelectedClient(client);
    setModalType(type);
    if (type === 'subscription') setNewSubscriptionDate(client.subscriptionEndDate);
    if (type === 'points') setPointsToAdd(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
    setModalType(null);
  };

  const toggleFeature = (clientId: string, featureKey: FeatureKey) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? {
              ...client,
              allowedFeatures: client.allowedFeatures.includes(featureKey)
                ? client.allowedFeatures.filter(f => f !== featureKey)
                : [...client.allowedFeatures, featureKey],
            }
          : client
      )
    );
  };

  const handleUpdateSubscription = () => {
    if (selectedClient && newSubscriptionDate) {
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === selectedClient.id
            ? { ...client, subscriptionEndDate: newSubscriptionDate }
            : client
        )
      );
      handleCloseModal();
    }
  };

  const handleUpdatePoints = () => {
    if (selectedClient && pointsToAdd !== 0) {
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === selectedClient.id
            ? { ...client, points: client.points + pointsToAdd }
            : client
        )
      );
      handleCloseModal();
    }
  };
  
  const updateTicketStatus = (ticketId: string, status: SupportTicketStatus) => {
    setTickets(prevTickets => prevTickets.map(ticket => ticket.id === ticketId ? {...ticket, status} : ticket));
  };

  const renderClientManagement = () => (
    <Card title={t.manageClients}>
        <Table
          headers={[t.clientName, t.clientEmail, t.subscriptionEnds, t.points, t.actions]}
          rows={clients.map(client => [
            client.name,
            client.email,
            client.subscriptionEndDate,
            client.points,
            <div className="flex space-x-1 whitespace-nowrap">
              <Button size="sm" onClick={() => handleOpenModal(client, 'features')}>{`${t.allowFeature}/${t.denyFeature}`}</Button>
              <Button size="sm" variant="secondary" onClick={() => handleOpenModal(client, 'subscription')}>{t.setSubscription}</Button>
              <Button size="sm" variant="secondary" onClick={() => handleOpenModal(client, 'points')}>{t.addPoints}</Button>
            </div>
          ])}
        />
    </Card>
  );

  const renderSupportTickets = () => (
     <Card title={t.supportTickets}>
         <Table
            headers={[t.clientName, t.ticketSubject, t.ticketStatus, t.actions]}
            rows={tickets.map(ticket => [
                ticket.clientName,
                ticket.subject,
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ticket.status === SupportTicketStatus.OPEN ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200' :
                    ticket.status === SupportTicketStatus.PROCESSING ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                }`}>
                    {ticket.status}
                </span>,
                <div className="flex space-x-1 whitespace-nowrap">
                    <Button size="sm" onClick={() => updateTicketStatus(ticket.id, SupportTicketStatus.OPEN)} disabled={ticket.status === SupportTicketStatus.OPEN}>{t.markAsOpen}</Button>
                    <Button size="sm" onClick={() => updateTicketStatus(ticket.id, SupportTicketStatus.PROCESSING)} disabled={ticket.status === SupportTicketStatus.PROCESSING}>{t.markAsProcessing}</Button>
                    <Button size="sm" onClick={() => updateTicketStatus(ticket.id, SupportTicketStatus.CLOSED)} disabled={ticket.status === SupportTicketStatus.CLOSED}>{t.markAsClosed}</Button>
                </div>
            ])}
        />
     </Card>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Quick Stats">
            <p className="dark:text-gray-300">Total Clients: {clients.length}</p>
            <p className="dark:text-gray-300">Open Tickets: {tickets.filter(t => t.status === SupportTicketStatus.OPEN).length}</p>
        </Card>
        <Card title="Recent Activity">
            <p className="dark:text-gray-300">Placeholder for recent admin actions or system events.</p>
        </Card>
    </div>
  );

  const renderModalContent = () => {
    if (!selectedClient) return null;

    if (modalType === 'features') {
      return (
        <div>
          <h4 className="text-lg font-medium mb-4 dark:text-white">Manage Features for {selectedClient.name}</h4>
          <div className="space-y-2">
            {FEATURES.map(feature => (
              <div key={feature.key} className="flex items-center justify-between p-2 border dark:border-gray-600 rounded-md">
                <span className="dark:text-gray-300">{t[feature.key as string] || feature.name}</span>
                <Button
                  size="sm"
                  onClick={() => toggleFeature(selectedClient.id, feature.key)}
                  variant={selectedClient.allowedFeatures.includes(feature.key) ? 'danger' : 'primary'}
                >
                  {selectedClient.allowedFeatures.includes(feature.key) ? t.denyFeature : t.allowFeature}
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (modalType === 'subscription') {
      return (
        <div>
          <h4 className="text-lg font-medium mb-4 dark:text-white">Set Subscription for {selectedClient.name}</h4>
          <Input
            label="New Subscription End Date"
            type="date"
            value={newSubscriptionDate}
            onChange={(e) => setNewSubscriptionDate(e.target.value)}
          />
        </div>
      );
    }

    if (modalType === 'points') {
      return (
        <div>
          <h4 className="text-lg font-medium mb-4 dark:text-white">Add/Remove Points for {selectedClient.name}</h4>
          <p className="dark:text-gray-300">Current Points: {selectedClient.points}</p>
          <Input
            label="Points to Add/Remove (use negative for removal)"
            type="number"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(parseInt(e.target.value, 10))}
          />
        </div>
      );
    }
    return null;
  };

  const renderModalFooter = () => {
    if (modalType === 'features') return <Button onClick={handleCloseModal}>Done</Button>;
    if (modalType === 'subscription') return <Button onClick={handleUpdateSubscription}>Update Subscription</Button>;
    if (modalType === 'points') return <Button onClick={handleUpdatePoints}>Update Points</Button>;
    return null;
  };
  
  const AdminNavButtons = () => (
    <div className="mb-6 flex space-x-2 flex-wrap">
        <Button onClick={() => setActiveSection('dashboard')} variant={activeSection === 'dashboard' ? 'primary' : 'ghost'} className="mb-2 sm:mb-0">Dashboard</Button>
        <Button onClick={() => setActiveSection('clients')} variant={activeSection === 'clients' ? 'primary' : 'ghost'} className="mb-2 sm:mb-0">{t.manageClients}</Button>
        <Button onClick={() => setActiveSection('tickets')} variant={activeSection === 'tickets' ? 'primary' : 'ghost'} className="mb-2 sm:mb-0">{t.supportTickets}</Button>
    </div>
  );

  return (
    <DashboardShell pageTitle={pageTitle}>
      <AdminNavButtons />
      {activeSection === 'dashboard' && renderDashboard()}
      {activeSection === 'clients' && renderClientManagement()}
      {activeSection === 'tickets' && renderSupportTickets()}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalType ? `Manage ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}` : "Manage Client"}
        footer={renderModalFooter()}
      >
        {renderModalContent()}
      </Modal>
    </DashboardShell>
  );
};
