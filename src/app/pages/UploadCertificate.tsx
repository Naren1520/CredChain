import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Label, Select, Badge } from '../components/UI';
import { Search, Upload, FileText, CheckCircle2, ArrowLeft, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { DataManager } from '../utils/DataManager';
import { api, getAuthHeader, fetchWithAuth } from '../api';
import QRCode from "react-qr-code";

export const UploadCertificate = () => {
  const [step, setStep] = useState(1);
  const [studentFound, setStudentFound] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const navigate = useNavigate();

  // Form Data State
  const [formData, setFormData] = useState({
    course: "Bachelor of Science (Computer Science)",
    specialization: "Computer Science",
    year: "2023-2024",
    cgpa: "",
    type: "Degree Certificate"
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchWithAuth(api(`/institution/students?q=${encodeURIComponent(searchQuery)}`));
      setLoading(false);
      if (!res.ok) return alert('Search failed');
      const body = await res.json();
      setStudents(body.students || []);
      setStudentFound(true);
    } catch (err) {
      setLoading(false);
      alert('Search error');
    }
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  
  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    handleNext();
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Try to upload to backend
    const inputFile = (document.querySelector('input[type=file]') as HTMLInputElement);
    const file = inputFile?.files?.[0];
    if (!file) { alert('Please select a PDF file'); setLoading(false); return; }

    const fd = new FormData();
    const metadata = {
      course: formData.course,
      specialization: formData.specialization,
      year: formData.year,
      cgpa: formData.cgpa,
      type: formData.type
    };
    fd.append('file', file);
    if (!selectedStudent) { alert('Please select a student'); setLoading(false); return; }
    fd.append('studentId', selectedStudent.seid || selectedStudent.id);
    fd.append('type', formData.type);
    fd.append('meta', JSON.stringify(metadata));
    try {
      const res = await fetchWithAuth(api('/institution/certificates/upload'), {
        method: 'POST',
        body: fd
      });
      setLoading(false);
      if (!res.ok) return alert('Upload failed');
      const body = await res.json();
      setSuccessData(body.cert);
      setStep(6);
    } catch (err) {
      setLoading(false);
      alert('Upload error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/dashboard/institution" className="text-slate-500 hover:text-[#0B1B3A] flex items-center gap-2 mb-4 text-sm font-medium">
             <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-[#0B1B3A]">Issue New Certificate</h1>
          <p className="text-slate-500 mt-1">Digitally sign and upload academic records to the National Repository.</p>
        </div>

        {/* Stepper - Hide on Success */}
        {step < 6 && (
          <div className="mb-8 flex justify-between items-center px-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-[#0B1B3A] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {s}
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 hidden sm:block">
                  {['Search', 'Type', 'Details', 'Upload', 'Sign'][s-1]}
                </span>
              </div>
            ))}
          </div>
        )}

        <Card className="shadow-lg border-t-4 border-t-[#0B1B3A]">
          <CardContent className="p-8">
            {/* Step 1: Search */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#0B1B3A]">Step 1: Student Lookup</h2>
                <form onSubmit={handleSearch} className="flex gap-4">
                  <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter Student Education ID (SEID) or Aadhaar" className="flex-1" />
                  <Button type="submit" isLoading={loading}>Search</Button>
                </form>

                {studentFound && (
                  <div className="space-y-3">
                    {students.length === 0 && (
                      <div className="text-sm text-slate-500">No students found for that query.</div>
                    )}
                    {students.map((s) => (
                      <div key={s.id} className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <UserCheck />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[#0B1B3A]">{s.name}</h3>
                          <p className="text-sm text-slate-600">DOB: {s.dob || 'N/A'} • SEID: {s.seid || s.id}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => { setSelectedStudent(s); setStep(2); }} className="border-emerald-200 text-emerald-800 hover:bg-emerald-100">
                          Confirm & Proceed
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Type */}
            {step === 2 && (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold text-[#0B1B3A]">Step 2: Certificate Type</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {['Degree Certificate', 'Provisional Certificate', 'Marksheet / Grade Card', 'Migration Certificate', 'Transfer Certificate', 'Bonafide Certificate'].map((type) => (
                     <div 
                       key={type} 
                       className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center gap-3 group ${formData.type === type ? 'border-[#0B1B3A] bg-blue-50/50' : 'border-slate-200 hover:border-[#0B1B3A] hover:bg-blue-50/50'}`}
                       onClick={() => handleTypeSelect(type)}
                     >
                       <div className={`h-4 w-4 rounded-full border ${formData.type === type ? 'border-[#0B1B3A] bg-[#0B1B3A]' : 'border-slate-300 group-hover:border-[#0B1B3A]'}`}></div>
                       <span className="font-medium text-slate-700 group-hover:text-[#0B1B3A]">{type}</span>
                     </div>
                   ))}
                 </div>
                 <div className="flex justify-between pt-4">
                   <Button variant="ghost" onClick={handleBack}>Back</Button>
                 </div>
              </div>
            )}

            {/* Step 3: Metadata */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#0B1B3A]">Step 3: Academic Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Course Name</Label>
                    <Input value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Input value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <Select value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})}>
                      <option>2023-2024</option>
                      <option>2022-2023</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Semester / Year</Label>
                    <Select>
                      <option>Final Year</option>
                      <option>Semester 6</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>CGPA / Percentage</Label>
                    <Input placeholder="e.g. 9.2" value={formData.cgpa} onChange={(e) => setFormData({...formData, cgpa: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <Input placeholder="e.g. A+" />
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                   <Button variant="ghost" onClick={handleBack}>Back</Button>
                   <Button onClick={handleNext}>Next Step</Button>
                 </div>
              </div>
            )}

            {/* Step 4: Upload */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#0B1B3A]">Step 4: Document Upload</h2>
                
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                   <div className="bg-blue-50 p-4 rounded-full mb-4">
                     <Upload className="h-8 w-8 text-blue-600" />
                   </div>
                   <p className="text-lg font-medium text-slate-700">Click to upload or drag and drop</p>
                   <p className="text-sm text-slate-500 mt-2">PDF only. Max size 5MB.</p>
                </div>

                <div className="flex justify-between pt-4">
                   <Button variant="ghost" onClick={handleBack}>Back</Button>
                   <Button onClick={handleNext}>Preview Details</Button>
                 </div>
              </div>
            )}

            {/* Step 5: Sign & Submit */}
            {step === 5 && (
              <div className="space-y-8">
                 <div className="text-center">
                   <h2 className="text-2xl font-bold text-[#0B1B3A]">Review & Sign</h2>
                   <p className="text-slate-500">Please review the details before digitally signing.</p>
                 </div>

                 <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-200 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-slate-500 text-xs uppercase tracking-wider">Student</span>
                        <span className="font-semibold text-slate-900">{selectedStudent?.name || '—'}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-xs uppercase tracking-wider">SEID</span>
                        <span className="font-semibold text-slate-900">{selectedStudent?.seid || selectedStudent?.id || '—'}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-xs uppercase tracking-wider">Certificate</span>
                        <span className="font-semibold text-slate-900">{formData.type}</span>
                      </div>
                      <div>
                         <span className="block text-slate-500 text-xs uppercase tracking-wider">Year</span>
                         <span className="font-semibold text-slate-900">{formData.year}</span>
                      </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <ShieldCheck className="text-amber-600 h-6 w-6 shrink-0" />
                    <p className="text-xs text-amber-800">
                      By clicking "Digitally Sign", you are affixing the institution's digital signature to this record. This action is immutable and recorded in the audit log.
                    </p>
                 </div>

                 <div className="flex justify-between pt-4">
                   <Button variant="ghost" onClick={handleBack} disabled={loading}>Back</Button>
                   <Button onClick={handleSubmit} size="lg" className="bg-[#1A9B50] hover:bg-[#1A9B50]/90" isLoading={loading}>
                     <FileText className="mr-2 h-4 w-4" /> Digitally Sign & Submit
                   </Button>
                 </div>
              </div>
            )}

            {/* Step 6: Success */}
            {step === 6 && successData && (
              <div className="flex flex-col items-center text-center space-y-6 animate-in zoom-in-50 duration-500">
                 <div className="h-20 w-20 rounded-full bg-[#1A9B50] flex items-center justify-center text-white shadow-lg mb-2">
                    <CheckCircle2 size={40} />
                 </div>
                 <h2 className="text-3xl font-bold text-[#0B1B3A]">Certificate Issued Successfully!</h2>
                 <p className="text-slate-600 max-w-lg">
                   The record has been securely stored in the CredChain National Repository.
                 </p>
                 
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center space-y-4">
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 150, width: "100%" }}>
                       <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={successData.certificateId || successData.id}
                        viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div className="text-sm font-mono bg-slate-100 px-3 py-1 rounded text-slate-700">
                      ID: {successData.certificateId || successData.id}
                    </div>
                    <p className="text-xs text-slate-500">
                      Scan this QR code to verify instantly.
                    </p>
                 </div>

                 <div className="flex gap-4 pt-4">
                   <Button variant="outline" onClick={() => navigate('/dashboard/institution')}>
                     Back to Dashboard
                   </Button>
                   <Button onClick={() => window.print()}>
                     Download Receipt
                   </Button>
                 </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
