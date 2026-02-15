export interface Certificate {
  id: string;
  studentName: string;
  seid: string;
  course: string;
  specialization: string;
  institution: string;
  year: string;
  cgpa: string;
  issueDate: string;
  status: 'Verified' | 'Pending';
  type: string;
}

const STORAGE_KEY = 'CredChain_certificates';

export const saveCertificate = (cert: Certificate) => {
  const existing = getCertificates();
  const updated = [cert, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getCertificates = (): Certificate[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const getCertificateById = (id: string): Certificate | undefined => {
  const certs = getCertificates();
  return certs.find(c => c.id === id);
};

// Seed some initial data if empty
export const seedData = () => {
  if (getCertificates().length === 0) {
    const initialData: Certificate[] = [
      {
        id: "CERT-2023-DEL-88219",
        studentName: "Aditya Kumar",
        seid: "9827 1234 5678",
        course: "Bachelor of Science",
        specialization: "Computer Science",
        institution: "University of Delhi",
        year: "2023",
        cgpa: "9.2",
        issueDate: "15 June 2023",
        status: "Verified",
        type: "Degree Certificate"
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};
