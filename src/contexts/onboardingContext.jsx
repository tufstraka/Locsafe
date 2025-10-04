import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import PropTypes from 'prop-types';

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

  // Save onboarding progress to localStorage
  useEffect(() => {
    if (currentUser) {
      const savedData = localStorage.getItem(`onboarding_${currentUser.uid}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setOnboardingData(parsed.data || onboardingData);
        setCurrentStep(parsed.currentStep || 1);
        setCompletedSteps(parsed.completedSteps || []);
      }
    }
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

  const updateOnboardingData = (section, data) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
    saveProgress();
  };

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
    
    // Here you would typically send the onboarding data to your backend
    try {
      // await api.completeOnboarding(onboardingData);
      
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