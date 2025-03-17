export const categories = [
  {
    id: 'all',
    icon: 'list',
    English: 'All Rights',
    Hindi: 'सभी अधिकार',
    color: '#4A90E2'
  },
  {
    id: 'fundamental',
    icon: 'star',
    English: 'Fundamental Rights',
    Hindi: 'मौलिक अधिकार',
    color: '#FF6B6B'
  },
  {
    id: 'legal',
    icon: 'gavel',
    English: 'Legal Rights',
    Hindi: 'कानूनी अधिकार',
    color: '#4ECDC4'
  },
  {
    id: 'prison',
    icon: 'building',
    English: 'Prison Rights',
    Hindi: 'जेल अधिकार',
    color: '#96CEB4'
  },
  {
    id: 'constitutional',
    icon: 'book',
    English: 'Constitutional Rights',
    Hindi: 'संवैधानिक अधिकार',
    color: '#F7B731'
  },
  {
    id: 'human',
    icon: 'user-shield',
    English: 'Human Rights',
    Hindi: 'मानवाधिकार',
    color: '#FC5C65'
  }
];

export const rights = [
  // Constitutional Rights
  {
    id: 1,
    category: 'constitutional',
    icon: 'balance-scale-right',
    English: 'Right to Speedy Trial',
    Hindi: 'त्वरित सुनवाई का अधिकार',
    description: {
      English: 'Fundamental right under Article 21 ensuring just, fair and reasonable trial process without undue delay',
      Hindi: 'अनुच्छेद 21 के तहत मौलिक अधिकार जो न्यायसंगत, निष्पक्ष और उचित परीक्षण प्रक्रिया सुनिश्चित करता है'
    }
  },
  {
    id: 2,
    category: 'constitutional',
    icon: 'user-shield',
    English: 'Right to Human Dignity',
    Hindi: 'मानवीय गरिमा का अधिकार',
    description: {
      English: 'Protected under Article 21, guaranteeing right to live with dignity and against torture or inhuman treatment',
      Hindi: 'अनुच्छेद 21 के तहत संरक्षित, गरिमा के साथ जीने का अधिकार और यातना या अमानवीय व्यवहार के खिलाफ गारंटी'
    }
  },

  // Legal Rights
  {
    id: 3,
    category: 'legal',
    icon: 'hands-helping',
    English: 'Right to Legal Aid',
    Hindi: 'कानूनी सहायता का अधिकार',
    description: {
      English: 'Right to free legal services for those unable to afford legal representation, protected under Articles 21 and 39A',
      Hindi: 'जो कानूनी प्रतिनिधित्व का खर्च नहीं उठा सकते उनके लिए मुफ्त कानूनी सेवाओं का अधिकार, अनुच्छेद 21 और 39A के तहत संरक्षित'
    }
  },
  {
    id: 4,
    category: 'legal',
    icon: 'user-friends',
    English: 'Right to Meet Family and Friends',
    Hindi: 'परिवार और दोस्तों से मिलने का अधिकार',
    description: {
      English: 'Right to meet family members and friends, subject to security protocols, recognized under Article 21',
      Hindi: 'सुरक्षा प्रोटोकॉल के अधीन, परिवार के सदस्यों और दोस्तों से मिलने का अधिकार, अनुच्छेद 21 के तहत मान्यता प्राप्त'
    }
  },

  // Human Rights
  {
    id: 5,
    category: 'human',
    icon: 'hand-holding-heart',
    English: 'Protection Against Inhuman Treatment',
    Hindi: 'अमानवीय व्यवहार से सुरक्षा',
    description: {
      English: 'Protection against torture, assault, or any inhuman treatment by state functionaries',
      Hindi: 'राज्य के कर्मचारियों द्वारा यातना, हमला या किसी भी अमानवीय व्यवहार से सुरक्षा'
    }
  },
  {
    id: 6,
    category: 'human',
    icon: 'unlock',
    English: 'No Arbitrary Handcuffing',
    Hindi: 'मनमाना हथकड़ी नहीं',
    description: {
      English: 'Protection against arbitrary handcuffing without justifying circumstances',
      Hindi: 'उचित परिस्थितियों के बिना मनमाने ढंग से हथकड़ी लगाने से सुरक्षा'
    }
  },

  // Prison Rights
  {
    id: 7,
    category: 'prison',
    icon: 'bed',
    English: 'Right to Basic Amenities',
    Hindi: 'बुनियादी सुविधाओं का अधिकार',
    description: {
      English: 'Right to proper food, water, shelter, clothing, and medical facilities in prison',
      Hindi: 'जेल में उचित भोजन, पानी, आश्रय, कपड़े और चिकित्सा सुविधाओं का अधिकार'
    }
  },
  {
    id: 8,
    category: 'prison',
    icon: 'hospital',
    English: 'Right to Medical Care',
    Hindi: 'चिकित्सा देखभाल का अधिकार',
    description: {
      English: 'Access to proper medical treatment and regular health check-ups',
      Hindi: 'उचित चिकित्सा उपचार और नियमित स्वास्थ्य जांच की सुविधा'
    }
  },

  // Legal Protections
  {
    id: 9,
    category: 'legal',
    icon: 'gavel',
    English: 'Protection Against Self-Incrimination',
    Hindi: 'आत्म-अपराध से सुरक्षा',
    description: {
      English: 'Right against forced self-incrimination under Article 20(3), including protection against forced narco/polygraph tests',
      Hindi: 'अनुच्छेद 20(3) के तहत जबरन आत्म-अपराध से सुरक्षा, जबरन नार्को/पॉलीग्राफ टेस्ट से सुरक्षा सहित'
    }
  },
  {
    id: 10,
    category: 'legal',
    icon: 'phone',
    English: 'Right to Communication',
    Hindi: 'संचार का अधिकार',
    description: {
      English: 'Right to communicate with family and legal counsel from the time of arrest',
      Hindi: 'गिरफ्तारी के समय से परिवार और कानूनी सलाहकार से संवाद करने का अधिकार'
    }
  },

  // Fundamental Rights
  {
    id: 11,
    category: 'fundamental',
    icon: 'equals',
    English: 'Right to Equality Before Law',
    Hindi: 'कानून के समक्ष समानता का अधिकार',
    description: {
      English: 'Equal protection under law regardless of status as undertrial prisoner',
      Hindi: 'विचाराधीन कैदी की स्थिति के बावजूद कानून के तहत समान सुरक्षा'
    }
  },
  {
    id: 12,
    category: 'fundamental',
    icon: 'book-reader',
    English: 'Right to Education',
    Hindi: 'शिक्षा का अधिकार',
    description: {
      English: 'Access to educational facilities and programs within the prison',
      Hindi: 'जेल के भीतर शैक्षिक सुविधाओं और कार्यक्रमों तक पहुंच'
    }
  },

  // Prison Welfare
  {
    id: 13,
    category: 'prison',
    icon: 'dumbbell',
    English: 'Right to Physical Exercise',
    Hindi: 'शारीरिक व्यायाम का अधिकार',
    description: {
      English: 'Access to physical exercise and recreational activities',
      Hindi: 'शारीरिक व्यायाम और मनोरंजक गतिविधियों तक पहुंच'
    }
  },
  {
    id: 14,
    category: 'prison',
    icon: 'book',
    English: 'Access to Reading Materials',
    Hindi: 'पठन सामग्री तक पहुंच',
    description: {
      English: 'Right to access books, newspapers, and other reading materials',
      Hindi: 'किताबें, समाचार पत्र और अन्य पठन सामग्री तक पहुंच का अधिकार'
    }
  },

  // Additional Legal Rights
  {
    id: 15,
    category: 'legal',
    icon: 'clipboard-list',
    English: 'Right to Fair Investigation',
    Hindi: 'निष्पक्ष जांच का अधिकार',
    description: {
      English: 'Right to a fair and impartial investigation of the case',
      Hindi: 'मामले की निष्पक्ष और पक्षपातरहित जांच का अधिकार'
    }
  }
];
