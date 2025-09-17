// Mock data for the application

// Alert data
export interface SystemAlert {
  id: string;
  beneficiaryName: string;
  location: string;
  message: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Beneficiary' | 'Village';
  timestamp: string;
}

export const systemAlerts: SystemAlert[] = [
  {
    id: "1",
    beneficiaryName: "Rajesh Kumar",
    location: "Shivpur",
    message: "",
    priority: "High",
    category: "Beneficiary",
    timestamp: new Date().toISOString()
  },
  {
    id: "2",
    beneficiaryName: "Beneficiary",
    location: "Shivpur",
    message: "submitted incomplete",
    priority: "Medium",
    category: "Beneficiary",
    timestamp: new Date().toISOString()
  },
  {
    id: "3",
    beneficiaryName: "Beneficiary",
    location: "",
    message: "submitted incomplete documentation for scheme ABC.",
    priority: "Low",
    category: "Village",
    timestamp: new Date().toISOString()
  }
];

export const getSystemAlerts = () => {
  return systemAlerts;
};

// Beneficiary data
export const beneficiaries = [
  {
    id: "1",
    name: "Rajesh Kumar",
    aadhaar: "XXXX-XXXX-1234",
    location: "Jamunagarh Village",
    policies: "Forest Rights Act, PM Kisan Samman Nidhi",
    landArea: 2.5,
    familySize: 4
  },
  {
    id: "2",
    name: "Sunita Devi",
    aadhaar: "XXXX-XXXX-5678",
    location: "Baripada Town",
    policies: "Forest Rights Act, Tribal Development Scheme",
    landArea: 1.8,
    familySize: 3
  },
  {
    id: "3",
    name: "Manoj Patel",
    aadhaar: "XXXX-XXXX-9012",
    location: "Jamunagarh Village",
    policies: "PM Kisan Samman Nidhi",
    landArea: 3.2,
    familySize: 5
  },
  {
    id: "4",
    name: "Priya Singh",
    aadhaar: "XXXX-XXXX-3456",
    location: "Udala Town",
    policies: "Forest Rights Act, PM Kisan Samman Nidhi, Tribal Development Scheme",
    landArea: 2.0,
    familySize: 6
  },
  {
    id: "5",
    name: "Vikram Mahato",
    aadhaar: "XXXX-XXXX-7890",
    location: "Jamunagarh Village",
    policies: "Forest Rights Act, Tribal Development Scheme",
    landArea: 1.5,
    familySize: 4
  },
  {
    id: "6",
    name: "Kavita Nayak",
    aadhaar: "XXXX-XXXX-1122",
    location: "Rairangpur Village",
    policies: "PM Kisan Samman Nidhi, Forest Rights Act",
    landArea: 2.3,
    familySize: 5
  },
  {
    id: "7",
    name: "Ramesh Das",
    aadhaar: "XXXX-XXXX-3344",
    location: "Baripada Town",
    policies: "Forest Rights Act",
    landArea: 1.2,
    familySize: 3
  },
  {
    id: "8",
    name: "Anita Kumari",
    aadhaar: "XXXX-XXXX-5566",
    location: "Udala Town",
    policies: "Tribal Development Scheme, PM Kisan Samman Nidhi",
    landArea: 3.5,
    familySize: 7
  },
  {
    id: "9",
    name: "Deepak Soren",
    aadhaar: "XXXX-XXXX-7788",
    location: "Mayurbhanj Village",
    policies: "Forest Rights Act, PM Kisan Samman Nidhi",
    landArea: 2.9,
    familySize: 6
  },
  {
    id: "10",
    name: "Lata Pradhan",
    aadhaar: "XXXX-XXXX-9900",
    location: "Baripada Town",
    policies: "Tribal Development Scheme",
    landArea: 1.6,
    familySize: 2
  },
  {
    id: "11",
    name: "Sanjay Rawat",
    aadhaar: "XXXX-XXXX-2233",
    location: "Jamunagarh Village",
    policies: "Forest Rights Act, PM Kisan Samman Nidhi",
    landArea: 2.7,
    familySize: 5
  },
  {
    id: "12",
    name: "Meera Mohanty",
    aadhaar: "XXXX-XXXX-4455",
    location: "Udala Town",
    policies: "Forest Rights Act, Tribal Development Scheme",
    landArea: 2.1,
    familySize: 4
  },
  {
    id: "13",
    name: "Arun Singh",
    aadhaar: "XXXX-XXXX-6677",
    location: "Mayurbhanj Village",
    policies: "PM Kisan Samman Nidhi",
    landArea: 3.0,
    familySize: 6
  },
  {
    id: "14",
    name: "Savita Rani",
    aadhaar: "XXXX-XXXX-8899",
    location: "Rairangpur Village",
    policies: "Forest Rights Act, PM Kisan Samman Nidhi",
    landArea: 2.4,
    familySize: 3
  },
  {
    id: "15",
    name: "Ajay Mishra",
    aadhaar: "XXXX-XXXX-1357",
    location: "Jamunagarh Village",
    policies: "Forest Rights Act, Tribal Development Scheme",
    landArea: 1.9,
    familySize: 5
  },
  {
    id: "16",
    name: "Neha Sharma",
    aadhaar: "XXXX-XXXX-2468",
    location: "Udala Town",
    policies: "PM Kisan Samman Nidhi, Tribal Development Scheme",
    landArea: 3.4,
    familySize: 4
  },
  {
    id: "17",
    name: "Ashok Tudu",
    aadhaar: "XXXX-XXXX-3579",
    location: "Mayurbhanj Village",
    policies: "Forest Rights Act",
    landArea: 2.2,
    familySize: 6
  },
  {
    id: "18",
    name: "Pooja Verma",
    aadhaar: "XXXX-XXXX-4680",
    location: "Baripada Town",
    policies: "Tribal Development Scheme, PM Kisan Samman Nidhi",
    landArea: 1.7,
    familySize: 3
  },
  {
    id: "19",
    name: "Rohit Gupta",
    aadhaar: "XXXX-XXXX-5791",
    location: "Jamunagarh Village",
    policies: "Forest Rights Act, PM Kisan Samman Nidhi",
    landArea: 2.8,
    familySize: 5
  },
  {
    id: "20",
    name: "Shalini Das",
    aadhaar: "XXXX-XXXX-6802",
    location: "Rairangpur Village",
    policies: "Forest Rights Act, Tribal Development Scheme",
    landArea: 1.4,
    familySize: 2
  }
];


// Admin accounts
export const admins = [
  {
    id: "admin1",
    name: "Admin User",
    role: "admin",
    district: "Mayurbhanj District"
  }
];

// Get statistics for admin dashboard
export const getAdminStats = () => {
  return {
    totalBeneficiaries: beneficiaries.length,
    activePolicies: 10,
    totalLandArea: "11.0 acres",
    avgFamilySize: "4.4"
  };
};

// Get beneficiary by ID
export const getBeneficiaryById = (id: string) => {
  return beneficiaries.find(b => b.id === id);
};

// Get all policies
export const policies = [
  "Forest Rights Act",
  "PM Kisan Samman Nidhi",
  "Tribal Development Scheme",
  "Sustainable Harvesting Program",
  "Forest Produce Marketing"
];

// Login credentials for demo (in a real app, this would be handled securely on the server)
export const validCredentials = {
  user: {
    username: "user",
    password: "password"
  },
  admin: {
    username: "admin",
    password: "admin"
  }
};

// Function to calculate statistics from beneficiary data
export const getBeneficiaryStats = () => {
  // Calculate total beneficiaries
  const totalBeneficiaries = beneficiaries.length;
  
  // Calculate total land area
  const totalLandArea = beneficiaries.reduce((sum, beneficiary) => sum + beneficiary.landArea, 0);
  
  // Calculate average family size
  const totalFamilyMembers = beneficiaries.reduce((sum, beneficiary) => sum + beneficiary.familySize, 0);
  const avgFamilySize = (totalFamilyMembers / totalBeneficiaries).toFixed(1);
  
  // Count unique policies
  const allPolicies = new Set();
  beneficiaries.forEach(beneficiary => {
    const policies = beneficiary.policies.split(", ");
    policies.forEach(policy => allPolicies.add(policy));
  });
  const activePolicies = allPolicies.size;
  
  return {
    totalBeneficiaries,
    activePolicies,
    totalLandArea: totalLandArea.toFixed(1),
    avgFamilySize
  };
};

// Function to get user data for the user dashboard
export const getUserData = () => {
  // Using the first beneficiary as the sample user
  const user = beneficiaries[0];
  
  return {
    name: user.name,
    aadhaar: user.aadhaar,
    location: user.location,
    familySize: user.familySize,
    landArea: user.landArea,
    landType: "Forest Land (FRA)",
    landStatus: "Verified",
    registrationDate: "15 June 2020",
    activeSchemes: [
      {
        name: "Forest Rights Act",
        status: "Active",
        startDate: "15 June 2020"
      },
      {
        name: "PM Kisan Samman Nidhi",
        status: "Active",
        startDate: "10 August 2021"
      }
    ],
    familyMembers: [
      {
        name: "Anita Kumar",
        relation: "Spouse",
        age: 38,
        aadhaar: "XXXX-XXXX-2345"
      },
      {
        name: "Ravi Kumar",
        relation: "Son",
        age: 15,
        aadhaar: "XXXX-XXXX-3456"
      },
      {
        name: "Meena Kumar",
        relation: "Daughter",
        age: 12,
        aadhaar: "XXXX-XXXX-4567"
      }
    ],
    documents: [
      {
        name: "Aadhaar Card",
        uploadDate: "15 June 2020",
        status: "Verified"
      },
      {
        name: "Land Ownership Proof",
        uploadDate: "15 June 2020",
        status: "Verified"
      },
      {
        name: "Bank Account Details",
        uploadDate: "10 August 2021",
        status: "Verified"
      },
      {
        name: "Income Certificate",
        uploadDate: "05 January 2023",
        status: "Pending"
      }
    ],
    benefitsHistory: [
      {
        scheme: "PM Kisan Samman Nidhi",
        date: "15 February 2023",
        description: "Quarterly Payment",
        value: 2000
      },
      {
        scheme: "PM Kisan Samman Nidhi",
        date: "15 November 2022",
        description: "Quarterly Payment",
        value: 2000
      },
      {
        scheme: "Forest Rights Act",
        date: "10 October 2022",
        description: "NTFP Collection Rights",
        value: 5000
      },
      {
        scheme: "Forest Rights Act",
        date: "15 July 2022",
        description: "Land Development Assistance",
        value: 10000
      }
    ]
  };
};