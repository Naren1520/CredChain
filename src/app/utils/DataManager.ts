import { toast } from 'sonner';

// Type Definitions
export interface Certificate {
  id: string; // The unique Certificate ID
  seid: string; // Student Education ID
  studentName: string;
  courseName: string;
  institution: string;
  issueDate: string;
  status: 'Verified' | 'Pending' | 'Revoked';
  type: string;
  year: string;
  grade?: string;
  dob?: string; // For verification masking
}

export interface StudentProfile {
  seid: string;
  name: string;
  dob: string;
  email?: string;
  phone?: string;
  aadhaar?: string; // Masked
  certificates: Certificate[];
  totalCertificates: number;
}

const SEED_DATA: Certificate[] = [
  {
    id: "CERT-2023-DEL-88219",
    seid: "9827 1234 5678",
    studentName: "Aditya Kumar",
    courseName: "Bachelor of Science (Computer Science)",
    institution: "University of Delhi",
    issueDate: "15 June 2023",
    status: "Verified",
    type: "Degree",
    year: "2023",
    grade: "A+",
    dob: "12-05-2002"
  },
  {
    id: "CERT-2020-CBSE-12345",
    seid: "9827 1234 5678",
    studentName: "Aditya Kumar",
    courseName: "Higher Secondary (Class XII)",
    institution: "Kendriya Vidyalaya, RK Puram",
    issueDate: "20 May 2020",
    status: "Verified",
    type: "Marksheet",
    year: "2020",
    grade: "92%",
    dob: "12-05-2002"
  }
];

const STORAGE_KEY = 'CredChain_certificates';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DataManager = {
  // Initialize storage if empty
  init: () => {
    if (typeof window === 'undefined') return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    }
  },

  getAll: (): Certificate[] => {
    if (typeof window === 'undefined') return SEED_DATA;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : SEED_DATA;
  },

  getById: async (id: string): Promise<Certificate | null> => {
    await delay(800); // Simulate API call
    const all = DataManager.getAll();
    return all.find(c => c.id.toLowerCase() === id.toLowerCase()) || null;
  },

  getByStudent: async (seid: string): Promise<Certificate[]> => {
    await delay(500);
    const all = DataManager.getAll();
    return all.filter(c => c.seid.replace(/\s/g, '') === seid.replace(/\s/g, ''));
  },

  // Get complete student profile by SEID
  getStudentProfile: async (seid: string): Promise<StudentProfile | null> => {
    await delay(800); // Simulate API call
    const certificates = await DataManager.getByStudent(seid);
    
    if (certificates.length === 0) return null;
    
    // Get student info from first certificate
    const firstCert = certificates[0];
    
    return {
      seid: firstCert.seid,
      name: firstCert.studentName,
      dob: firstCert.dob || 'Not Available',
      email: `${firstCert.studentName.toLowerCase().replace(/\s/g, '.')}@example.com`,
      phone: '+91 ******* ' + seid.slice(-3),
      aadhaar: '**** **** ' + seid.slice(-4),
      certificates: certificates.sort((a, b) => parseInt(b.year) - parseInt(a.year)), // Sort by year descending
      totalCertificates: certificates.length
    };
  },

  addCertificate: async (cert: Omit<Certificate, 'status' | 'issueDate'>): Promise<Certificate> => {
    await delay(1500);
    const newCert: Certificate = {
      ...cert,
      status: 'Verified', // Auto-verify for demo
      issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    
    const all = DataManager.getAll();
    all.unshift(newCert);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    toast.success(`Certificate Issued: ${newCert.id}`);
    return newCert;
  }
};

// Initialize immediately
DataManager.init();