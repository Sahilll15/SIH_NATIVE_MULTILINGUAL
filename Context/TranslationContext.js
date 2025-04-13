import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// English is the default language
const defaultTranslations = {
  en: {
    // Auth
    'Login': 'Login',
    'Signup': 'Signup',
    'Email': 'Email',
    'Password': 'Password',
    'Name': 'Name',
    'Username': 'Username',
    'Phone': 'Phone',
    'Submit': 'Submit',
    'Cancel': 'Cancel',
    'Welcome Back': 'Welcome Back',
    
    // Common
    'Error': 'Error',
    'Success': 'Success',
    'Loading': 'Loading',
    'Yes': 'Yes',
    'No': 'No',
    'OK': 'OK',
    'Retry': 'Retry',
    'Save': 'Save',
    'Delete': 'Delete',
    'Edit': 'Edit',
    'Update': 'Update',
    'Search': 'Search',
    'Add': 'Add',
    'Remove': 'Remove',
    'Back': 'Back',
    'Next': 'Next',
    'Previous': 'Previous',
    'Done': 'Done',
    'Continue': 'Continue',
    'Logout': 'Logout',
    'Profile': 'Profile',
    'Settings': 'Settings',
    'Home': 'Home',
    'Notifications': 'Notifications',
    'Messages': 'Messages',
    
    // Chat
    'No conversations yet': 'No conversations yet',
    'Start a conversation with a lawyer to get legal help': 'Start a conversation with a lawyer to get legal help',
    'You have no active conversations with prisoners': 'You have no active conversations with prisoners',
    'Find a Lawyer': 'Find a Lawyer',
    'Loading conversations...': 'Loading conversations...',
    'No messages yet': 'No messages yet',
    'Type a message...': 'Type a message...',
    'Unknown User': 'Unknown User',
    'Lawyer': 'Lawyer',
    'Prisoner': 'Prisoner',
    'pending': 'Pending',
    'accepted': 'Accepted',
    'rejected': 'Rejected',
    'Pending': 'Pending',
    'Accepted': 'Accepted',
    'Rejected': 'Rejected',
    'Case request pending. Waiting for lawyer to respond.': 'Case request pending. Waiting for lawyer to respond.',
    'This lawyer has accepted your case': 'This lawyer has accepted your case',
    'This lawyer has declined your case': 'This lawyer has declined your case',
    'This prisoner is requesting your legal assistance': 'This prisoner is requesting your legal assistance',
    'You are representing this prisoner': 'You are representing this prisoner',
    'You declined to represent this prisoner': 'You declined to represent this prisoner',
    'Loading conversation...': 'Loading conversation...',
    'Start the conversation with this lawyer': 'Start the conversation with this lawyer',
    'No messages yet. Start the conversation': 'No messages yet. Start the conversation',
    'Decline': 'Decline',
    'Accept': 'Accept',
    'Contact': 'Contact',
    'Send Request': 'Send Request',
    'View Conversation': 'View Conversation',
    
    // Lawyer finder
    'Finding lawyers...': 'Finding lawyers...',
    'No lawyers found': 'No lawyers found',
    'Try adjusting your filters or search criteria': 'Try adjusting your filters or search criteria',
    'Active filters': 'Active filters',
    'All': 'All',
    'Filter Lawyers': 'Filter Lawyers',
    'Specialization': 'Specialization',
    'Language': 'Language',
    'Experience': 'Experience',
    'Languages': 'Languages',
    'years': 'years',
    'Criminal': 'Criminal',
    'Civil': 'Civil',
    'Family': 'Family',
    'Constitutional': 'Constitutional',
    'Corporate': 'Corporate',
    'Property': 'Property',
    'Intellectual Property': 'Intellectual Property',
    'General': 'General',
    'English': 'English',
    'Hindi': 'Hindi',
    'Marathi': 'Marathi',
    'Gujarati': 'Gujarati',
    'Bengali': 'Bengali',
    'Tamil': 'Tamil',
    'Telugu': 'Telugu',
    'Search for lawyers...': 'Search for lawyers...',
    'Apply Filters': 'Apply Filters',
    'Reset': 'Reset',
    'Explain why you need legal assistance': 'Explain why you need legal assistance',
    'Describe your legal issue...': 'Describe your legal issue...',
    'Your request has been sent to the lawyer.': 'Your request has been sent to the lawyer.',
    'Failed to send request to lawyer': 'Failed to send request to lawyer',
    'Please provide a message for the lawyer': 'Please provide a message for the lawyer',
    'An unexpected error occurred': 'An unexpected error occurred',
    'Failed to fetch lawyers': 'Failed to fetch lawyers',
    'Failed to fetch conversations': 'Failed to fetch conversations',
    'Failed to send message': 'Failed to send message',
    'Failed to fetch conversation': 'Failed to fetch conversation',
    'Failed to accept case': 'Failed to accept case',
    'Failed to reject case': 'Failed to reject case',
  },

  hi: {
    // Auth
    'Login': 'लॉगिन',
    'Signup': 'साइन अप',
    'Email': 'ईमेल',
    'Password': 'पासवर्ड',
    'Name': 'नाम',
    'Username': 'उपयोगकर्ता नाम',
    'Phone': 'फोन',
    'Submit': 'जमा करें',
    'Cancel': 'रद्द करें',
    'Welcome Back': 'वापसी पर स्वागत है',
    
    // Common
    'Error': 'त्रुटि',
    'Success': 'सफलता',
    'Loading': 'लोड हो रहा है',
    'Yes': 'हां',
    'No': 'नहीं',
    'OK': 'ठीक है',
    'Retry': 'पुनः प्रयास करें',
    'Save': 'सहेजें',
    'Delete': 'हटाएं',
    'Edit': 'संपादित करें',
    'Update': 'अपडेट',
    'Search': 'खोज',
    'Add': 'जोड़ें',
    'Remove': 'हटाएं',
    'Back': 'वापस',
    'Next': 'अगला',
    'Previous': 'पिछला',
    'Done': 'पूर्ण',
    'Continue': 'जारी रखें',
    'Logout': 'लॉगआउट',
    'Profile': 'प्रोफाइल',
    'Settings': 'सेटिंग्स',
    'Home': 'होम',
    'Notifications': 'सूचनाएं',
    'Messages': 'संदेश',
    
    // Chat
    'No conversations yet': 'अभी तक कोई वार्तालाप नहीं',
    'Start a conversation with a lawyer to get legal help': 'कानूनी सहायता प्राप्त करने के लिए वकील के साथ बातचीत शुरू करें',
    'You have no active conversations with prisoners': 'आपके पास कैदियों के साथ कोई सक्रिय वार्तालाप नहीं है',
    'Find a Lawyer': 'एक वकील खोजें',
    'Loading conversations...': 'वार्तालाप लोड हो रहा है...',
    'No messages yet': 'अभी तक कोई संदेश नहीं',
    'Type a message...': 'संदेश लिखें...',
    'Unknown User': 'अज्ञात उपयोगकर्ता',
    'Lawyer': 'वकील',
    'Prisoner': 'कैदी',
    'pending': 'लंबित',
    'accepted': 'स्वीकृत',
    'rejected': 'अस्वीकृत',
    'Pending': 'लंबित',
    'Accepted': 'स्वीकृत',
    'Rejected': 'अस्वीकृत',
    'Case request pending. Waiting for lawyer to respond.': 'केस अनुरोध लंबित है। वकील के जवाब का इंतजार है।',
    'This lawyer has accepted your case': 'इस वकील ने आपका केस स्वीकार कर लिया है',
    'This lawyer has declined your case': 'इस वकील ने आपका केस अस्वीकार कर दिया है',
    'This prisoner is requesting your legal assistance': 'यह कैदी आपकी कानूनी सहायता का अनुरोध कर रहा है',
    'You are representing this prisoner': 'आप इस कैदी का प्रतिनिधित्व कर रहे हैं',
    'You declined to represent this prisoner': 'आपने इस कैदी का प्रतिनिधित्व करने से इनकार कर दिया',
    'Loading conversation...': 'वार्तालाप लोड हो रहा है...',
    'Start the conversation with this lawyer': 'इस वकील के साथ बातचीत शुरू करें',
    'No messages yet. Start the conversation': 'अभी तक कोई संदेश नहीं। बातचीत शुरू करें',
    'Decline': 'अस्वीकार',
    'Accept': 'स्वीकार',
    'Contact': 'संपर्क',
    'Send Request': 'अनुरोध भेजें',
    'View Conversation': 'वार्तालाप देखें',
    
    // Lawyer finder
    'Finding lawyers...': 'वकील खोज रहे हैं...',
    'No lawyers found': 'कोई वकील नहीं मिला',
    'Try adjusting your filters or search criteria': 'अपने फिल्टर या खोज मानदंड को समायोजित करने का प्रयास करें',
    'Active filters': 'सक्रिय फिल्टर',
    'All': 'सभी',
    'Filter Lawyers': 'वकीलों को फिल्टर करें',
    'Specialization': 'विशेषज्ञता',
    'Language': 'भाषा',
    'Experience': 'अनुभव',
    'Languages': 'भाषाएँ',
    'years': 'साल',
    'Criminal': 'आपराधिक',
    'Civil': 'नागरिक',
    'Family': 'परिवार',
    'Constitutional': 'संवैधानिक',
    'Corporate': 'कॉर्पोरेट',
    'Property': 'संपत्ति',
    'Intellectual Property': 'बौद्धिक संपदा',
    'General': 'सामान्य',
    'English': 'अंग्रेजी',
    'Hindi': 'हिंदी',
    'Marathi': 'मराठी',
    'Gujarati': 'गुजराती',
    'Bengali': 'बंगाली',
    'Tamil': 'तमिल',
    'Telugu': 'तेलुगु',
    'Search for lawyers...': 'वकीलों की खोज करें...',
    'Apply Filters': 'फिल्टर लागू करें',
    'Reset': 'रीसेट',
    'Explain why you need legal assistance': 'बताएं कि आपको कानूनी सहायता क्यों चाहिए',
    'Describe your legal issue...': 'अपनी कानूनी समस्या का वर्णन करें...',
    'Your request has been sent to the lawyer.': 'आपका अनुरोध वकील को भेज दिया गया है।',
    'Failed to send request to lawyer': 'वकील को अनुरोध भेजने में विफल',
    'Please provide a message for the lawyer': 'कृपया वकील के लिए एक संदेश प्रदान करें',
    'An unexpected error occurred': 'एक अनपेक्षित त्रुटि हुई',
    'Failed to fetch lawyers': 'वकीलों को प्राप्त करने में विफल',
    'Failed to fetch conversations': 'वार्तालाप प्राप्त करने में विफल',
    'Failed to send message': 'संदेश भेजने में विफल',
    'Failed to fetch conversation': 'वार्तालाप प्राप्त करने में विफल',
    'Failed to accept case': 'केस स्वीकार करने में विफल',
    'Failed to reject case': 'केस अस्वीकार करने में विफल',
  },

  mr: {
    // Auth
    'Login': 'लॉगिन',
    'Signup': 'साइन अप',
    'Email': 'ईमेल',
    'Password': 'पासवर्ड',
    'Name': 'नाव',
    'Username': 'वापरकर्तानाव',
    'Phone': 'फोन',
    'Submit': 'सबमिट करा',
    'Cancel': 'रद्द करा',
    'Welcome Back': 'पुन्हा स्वागत आहे',
    
    // Common
    'Error': 'त्रुटी',
    'Success': 'यशस्वी',
    'Loading': 'लोड होत आहे',
    'Yes': 'होय',
    'No': 'नाही',
    'OK': 'ठीक आहे',
    'Retry': 'पुन्हा प्रयत्न करा',
    'Save': 'जतन करा',
    'Delete': 'हटवा',
    'Edit': 'संपादित करा',
    'Update': 'अपडेट',
    'Search': 'शोध',
    'Add': 'जोडा',
    'Remove': 'काढून टाका',
    'Back': 'मागे',
    'Next': 'पुढे',
    'Previous': 'मागील',
    'Done': 'पूर्ण',
    'Continue': 'पुढे जा',
    'Logout': 'लॉगआउट',
    'Profile': 'प्रोफाइल',
    'Settings': 'सेटिंग्ज',
    'Home': 'होम',
    'Notifications': 'सूचना',
    'Messages': 'संदेश',
    
    // Chat
    'No conversations yet': 'अद्याप कोणतेही संभाषण नाही',
    'Start a conversation with a lawyer to get legal help': 'कायदेशीर मदत मिळविण्यासाठी वकिलाशी संभाषण सुरू करा',
    'You have no active conversations with prisoners': 'तुमच्याकडे कैद्यांसोबत कोणतेही सक्रिय संभाषण नाही',
    'Find a Lawyer': 'वकील शोधा',
    'Loading conversations...': 'संभाषणे लोड होत आहेत...',
    'No messages yet': 'अद्याप कोणतेही संदेश नाही',
    'Type a message...': 'संदेश टाइप करा...',
    'Unknown User': 'अज्ञात वापरकर्ता',
    'Lawyer': 'वकील',
    'Prisoner': 'कैदी',
    'pending': 'प्रलंबित',
    'accepted': 'स्वीकारले',
    'rejected': 'नाकारले',
    'Pending': 'प्रलंबित',
    'Accepted': 'स्वीकारले',
    'Rejected': 'नाकारले',
    'Case request pending. Waiting for lawyer to respond.': 'केस विनंती प्रलंबित आहे. वकिलाच्या प्रतिसादाची वाट पाहत आहे.',
    'This lawyer has accepted your case': 'या वकिलाने तुमचा केस स्वीकारला आहे',
    'This lawyer has declined your case': 'या वकिलाने तुमचा केस नाकारला आहे',
    'This prisoner is requesting your legal assistance': 'हा कैदी तुमची कायदेशीर मदत मागत आहे',
    'You are representing this prisoner': 'तुम्ही या कैद्याचे प्रतिनिधित्व करत आहात',
    'You declined to represent this prisoner': 'तुम्ही या कैद्याचे प्रतिनिधित्व करण्यास नकार दिला',
    'Loading conversation...': 'संभाषण लोड होत आहे...',
    'Start the conversation with this lawyer': 'या वकिलाशी संभाषण सुरू करा',
    'No messages yet. Start the conversation': 'अद्याप कोणतेही संदेश नाही. संभाषण सुरू करा',
    'Decline': 'नकार',
    'Accept': 'स्वीकार',
    'Contact': 'संपर्क',
    'Send Request': 'विनंती पाठवा',
    'View Conversation': 'संभाषण पहा',
    
    // Lawyer finder
    'Finding lawyers...': 'वकील शोधत आहे...',
    'No lawyers found': 'कोणतेही वकील आढळले नाही',
    'Try adjusting your filters or search criteria': 'आपले फिल्टर किंवा शोध निकष समायोजित करण्याचा प्रयत्न करा',
    'Active filters': 'सक्रिय फिल्टर',
    'All': 'सर्व',
    'Filter Lawyers': 'वकील फिल्टर करा',
    'Specialization': 'विशेषीकरण',
    'Language': 'भाषा',
    'Experience': 'अनुभव',
    'Languages': 'भाषा',
    'years': 'वर्षे',
    'Criminal': 'फौजदारी',
    'Civil': 'नागरी',
    'Family': 'कुटुंब',
    'Constitutional': 'घटनात्मक',
    'Corporate': 'कॉर्पोरेट',
    'Property': 'मालमत्ता',
    'Intellectual Property': 'बौद्धिक संपदा',
    'General': 'सामान्य',
    'English': 'इंग्रजी',
    'Hindi': 'हिंदी',
    'Marathi': 'मराठी',
    'Gujarati': 'गुजराती',
    'Bengali': 'बंगाली',
    'Tamil': 'तमिळ',
    'Telugu': 'तेलुगू',
    'Search for lawyers...': 'वकिलांसाठी शोध...',
    'Apply Filters': 'फिल्टर लागू करा',
    'Reset': 'रीसेट',
    'Explain why you need legal assistance': 'तुम्हाला कायदेशीर मदत का हवी आहे ते स्पष्ट करा',
    'Describe your legal issue...': 'आपली कायदेशीर समस्या वर्णन करा...',
    'Your request has been sent to the lawyer.': 'तुमची विनंती वकिलाकडे पाठवली गेली आहे.',
    'Failed to send request to lawyer': 'वकिलाला विनंती पाठवण्यात अयशस्वी',
    'Please provide a message for the lawyer': 'कृपया वकिलासाठी संदेश द्या',
    'An unexpected error occurred': 'अनपेक्षित त्रुटी आली',
    'Failed to fetch lawyers': 'वकील आणण्यात अयशस्वी',
    'Failed to fetch conversations': 'संभाषणे आणण्यात अयशस्वी',
    'Failed to send message': 'संदेश पाठवण्यात अयशस्वी',
    'Failed to fetch conversation': 'संभाषण आणण्यात अयशस्वी',
    'Failed to accept case': 'केस स्वीकारण्यात अयशस्वी',
    'Failed to reject case': 'केस नाकारण्यात अयशस्वी',
  }
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    // Load language preference from storage
    const loadLanguagePreference = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('userLanguage');
        if (storedLanguage) {
          setCurrentLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, []);

  const changeLanguage = async (languageCode) => {
    setCurrentLanguage(languageCode);
    try {
      await AsyncStorage.setItem('userLanguage', languageCode);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const translate = (key) => {
    const currentTranslations = translations[currentLanguage] || translations.en;
    return currentTranslations[key] || key;
  };

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        translate,
        supportedLanguages: Object.keys(translations)
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
