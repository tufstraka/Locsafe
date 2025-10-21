import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './authContext';
import PropTypes from 'prop-types';
import { onboardingService } from '../services/api';

const OnboardingContext = createContext();

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [onboardingData, setOnboardingData] = useState({
    profile: {
      fullName: '',
      phoneNumber: '',
      position: '',
      department: '',
      profilePhoto: null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',
      notifications: {
        email: true,
        sms: false,
        push: true,
        shipmentAlerts: true,
        systemUpdates: true,
        marketing: false
      }
    },
    organization: {
      name: '',
      type: '', // logistics, manufacturer, retailer, distributor
      size: '', // small, medium, large, enterprise
      industry: '',
      website: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      },
      logo: null,
      primaryContact: {
        name: '',
        email: '',
        phone: ''
      },
      businessRegistration: '',
      taxId: ''
    },
    integrations: {
      erp: {
        enabled: false,
        type: '', // SAP, Oracle, Microsoft Dynamics, etc.
        apiKey: '',
        endpoint: ''
      },
      wms: {
        enabled: false,
        type: '', // Warehouse Management System
        credentials: {}
      },
      fleet: {
        enabled: false,
        provider: '', // Fleet management provider
        apiKey: ''
      },
      payments: {
        enabled: false,
        provider: '', // Paystack, Stripe, etc.
        publicKey: '',
        secretKey: ''
      },
      notifications: {
        slack: {
          enabled: false,
          webhookUrl: ''
        },
        teams: {
          enabled: false,
          webhookUrl: ''
        },
        webhook: {
          enabled: false,
          url: '',
          secret: ''
        }
      }
    },
    preferences: {
      dashboardLayout: 'default',
      defaultView: 'overview',
      currency: 'KES',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      measurementUnit: 'metric',
      mapProvider: 'google',
      theme: 'light',
      complianceRegion: 'Kenya',
      dataRetention: '3years'
    },
    teamSetup: {
      inviteTeamMembers: false,
      members: []
    }
  });

  // Load onboarding data from API and localStorage
  useEffect(() => {
    const loadOnboardingData = async () => {
      if (currentUser) {
        try {
          // Try to load from API first
          const apiData = await onboardingService.getOnboardingData();
          
          if (apiData && apiData.user) {
            // Update from API data
            const updatedData = {
              profile: {
                fullName: apiData.user.fullName || '',
                phoneNumber: apiData.user.phoneNumber || '',
                position: apiData.user.position || '',
                department: apiData.user.department || '',
                profilePhoto: null,
                timezone: apiData.user.preferences?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                language: apiData.user.preferences?.language || 'en',
                notifications: {
                  email: apiData.user.preferences?.notificationsEmail ?? true,
                  sms: apiData.user.preferences?.notificationsSms ?? false,
                  push: apiData.user.preferences?.notificationsPush ?? true,
                  shipmentAlerts: apiData.user.preferences?.notificationsShipmentAlerts ?? true,
                  systemUpdates: apiData.user.preferences?.notificationsSystemUpdates ?? true,
                  marketing: apiData.user.preferences?.notificationsMarketing ?? false
                }
              },
              organization: apiData.organization || onboardingData.organization,
              integrations: apiData.integrations || onboardingData.integrations,
              preferences: {
                dashboardLayout: apiData.user.preferences?.dashboardLayout || 'default',
                defaultView: apiData.user.preferences?.defaultView || 'overview',
                currency: apiData.organization?.settings?.defaultCurrency || 'KES',
                dateFormat: apiData.user.preferences?.dateFormat || 'DD/MM/YYYY',
                timeFormat: apiData.user.preferences?.timeFormat || '24h',
                measurementUnit: apiData.user.preferences?.measurementUnit || 'metric',
                mapProvider: apiData.user.preferences?.mapProvider || 'google',
                theme: apiData.user.preferences?.theme || 'light',
                complianceRegion: apiData.user.preferences?.complianceRegion || 'Kenya',
                dataRetention: apiData.user.preferences?.dataRetention || '3years'
              },
              teamSetup: onboardingData.teamSetup
            };
            
            setOnboardingData(updatedData);
            
            // Check if user has completed onboarding
            if (apiData.user.isOnboarded) {
              localStorage.setItem(`onboarding_completed_${currentUser.uid}`, 'true');
            }
          }
        } catch (error) {
          console.error('Failed to load onboarding data from API:', error);
          // Fallback to localStorage
          const savedData = localStorage.getItem(`onboarding_${currentUser.uid}`);
          if (savedData) {
            const parsed = JSON.parse(savedData);
            setOnboardingData(parsed.data || onboardingData);
            setCurrentStep(parsed.currentStep || 1);
            setCompletedSteps(parsed.completedSteps || []);
          }
        }
      }
    };
    
    loadOnboardingData();
  }, [currentUser]);

  const saveProgress = () => {
    if (currentUser) {
      localStorage.setItem(`onboarding_${currentUser.uid}`, JSON.stringify({
        data: onboardingData,
        currentStep,
        completedSteps,
        lastUpdated: new Date().toISOString()
      }));
    }
  };

  const updateOnboardingData = useCallback(async (section, data) => {
    // Update local state immediately
    setOnboardingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
    
    // Save to localStorage
    saveProgress();
    
    // Save to API
    try {
      switch (section) {
        case 'profile':
          await onboardingService.updateProfile({
            fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
            phoneNumber: data.phoneNumber,
            position: data.position,
            department: data.department,
            timezone: data.timezone,
            language: data.language,
            notifications: data.notifications
          });
          break;
          
        case 'organization':
          await onboardingService.updateOrganization({
            name: data.name,
            type: data.type,
            size: data.size,
            industry: data.industry,
            website: data.website,
            logo: data.logo,
            address: data.address,
            primaryContact: data.primaryContact,
            businessRegistration: data.businessRegistration,
            taxId: data.taxId
          });
          break;
          
        case 'integrations':
          await onboardingService.updateIntegrations({
            integrations: data
          });
          break;
          
        case 'preferences':
          await onboardingService.updatePreferences(data);
          break;
      }
    } catch (error) {
      console.error(`Failed to save ${section} to API:`, error);
      // Continue with local save even if API fails
    }
  }, []);

  const markStepComplete = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
      saveProgress();
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    saveProgress();
  };

  const nextStep = () => {
    if (currentStep < 5) {
      markStepComplete(currentStep);
      setCurrentStep(prev => prev + 1);
      saveProgress();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      saveProgress();
    }
  };

  const resetOnboarding = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setOnboardingData({
      profile: {
        fullName: '',
        phoneNumber: '',
        position: '',
        department: '',
        profilePhoto: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: 'en',
        notifications: {
          email: true,
          sms: false,
          push: true,
          shipmentAlerts: true,
          systemUpdates: true,
          marketing: false
        }
      },
      organization: {
        name: '',
        type: '',
        size: '',
        industry: '',
        website: '',
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          postalCode: ''
        },
        logo: null,
        primaryContact: {
          name: '',
          email: '',
          phone: ''
        },
        businessRegistration: '',
        taxId: ''
      },
      integrations: {
        erp: {
          enabled: false,
          type: '',
          apiKey: '',
          endpoint: ''
        },
        wms: {
          enabled: false,
          type: '',
          credentials: {}
        },
        fleet: {
          enabled: false,
          provider: '',
          apiKey: ''
        },
        payments: {
          enabled: false,
          provider: '',
          publicKey: '',
          secretKey: ''
        },
        notifications: {
          slack: {
            enabled: false,
            webhookUrl: ''
          },
          teams: {
            enabled: false,
            webhookUrl: ''
          },
          webhook: {
            enabled: false,
            url: '',
            secret: ''
          }
        }
      },
      preferences: {
        dashboardLayout: 'default',
        defaultView: 'overview',
        currency: 'KES',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24h',
        measurementUnit: 'metric',
        mapProvider: 'google',
        theme: 'light',
        complianceRegion: 'Kenya',
        dataRetention: '3years'
      },
      teamSetup: {
        inviteTeamMembers: false,
        members: []
      }
    });
    if (currentUser) {
      localStorage.removeItem(`onboarding_${currentUser.uid}`);
    }
  };

  const completeOnboarding = async () => {
    markStepComplete(currentStep);
    saveProgress();
    
    try {
      // Complete onboarding via API
      await onboardingService.completeOnboarding();
      
      // Clear onboarding data from localStorage after successful submission
      if (currentUser) {
        localStorage.setItem(`onboarding_completed_${currentUser.uid}`, 'true');
        localStorage.removeItem(`onboarding_${currentUser.uid}`);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      return false;
    }
  };

  const isOnboardingComplete = () => {
    if (currentUser) {
      return localStorage.getItem(`onboarding_completed_${currentUser.uid}`) === 'true';
    }
    return false;
  };

  const value = {
    currentStep,
    completedSteps,
    onboardingData,
    updateOnboardingData,
    markStepComplete,
    goToStep,
    nextStep,
    previousStep,
    resetOnboarding,
    completeOnboarding,
    isOnboardingComplete,
    saveProgress
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

OnboardingProvider.propTypes = {
  children: PropTypes.node.isRequired
};