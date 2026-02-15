import React, { useEffect, useState } from 'react';
import { Button, Card, Badge, CardContent } from '../components/UI';
import { Download, Share2, CheckCircle2, Clock, Eye, FileText, School, GraduationCap, BookOpen, User, QrCode, X } from 'lucide-react';
import { DataManager, Certificate } from '../utils/DataManager';
import QRCode from "react-qr-code";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/UI'; // Assuming we might need a Dialog, but I'll build a simple modal overlay to avoid complex imports if not present.

export const StudentDashboard = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const profile = {
    name: "Aditya Kumar",
    dob: "12-05-2002",
    seid: "9827 1234 5678", // Student Education ID
    avatar: "https://images.unsplash.com/photo-1727875075949-8b36efd25260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncmFkdWF0ZSUyMHN0dWRlbnQlMjBoYXBweXxlbnwxfHx8fDE3NzExMTA1MjV8MA&ixlib=rb-4.1.0&q=80&w=200",
  };

  useEffect(() => {
    DataManager.getByStudent(profile.seid).then(data => {
      setCertificates(data);
    });
  }, []);

  const getIcon = (type: string) => {
    if (type.includes('Degree')) return GraduationCap;
    if (type.includes('School') || type.includes('Secondary')) return School;
    return BookOpen;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative">
      {/* Profile Header */}
      <div className="bg-[#0B1B3A] text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="h-24 w-24 rounded-full border-4 border-white/20 overflow-hidden shrink-0">
            <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <div className="flex flex-col md:flex-row gap-4 text-slate-300 text-sm items-center md:items-start">
              <span className="bg-white/10 px-3 py-1 rounded-full">SEID: {profile.seid}</span>
              <span>DOB: {profile.dob}</span>
            </div>
          </div>
          <div className="flex gap-3">
             <Button variant="secondary" size="sm" className="font-semibold">
               <Share2 size={16} className="mr-2" /> Share Profile
             </Button>
          </div>
        </div>
      </div>

      {/* Main Content (overlapping header) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Timeline Column */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-[#0B1B3A]">Education Journey</h2>
                  <Button variant="ghost" size="sm">Filter by Level</Button>
                </div>
                
                <div className="relative space-y-8 pl-4 before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-slate-200 before:content-['']">
                  {certificates.length === 0 ? (
                    <div className="pl-8 text-slate-500 py-4">No records found.</div>
                  ) : (
                    certificates.map((item) => {
                      const Icon = getIcon(item.type);
                      return (
                        <div key={item.id} className="relative flex gap-6">
                           {/* Icon Bubble */}
                           <div className={`absolute -left-4 mt-1.5 h-8 w-8 rounded-full border-4 border-white flex items-center justify-center ${item.status === 'Verified' ? 'bg-[#1A9B50] text-white' : 'bg-amber-500 text-white'}`}>
                              {item.status === 'Verified' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                           </div>

                           {/* Card */}
                           <div className="flex-1 min-w-0">
                             <div className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow group">
                               <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                                  <div className="min-w-0">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">{item.type}</span>
                                    <h3 className="text-lg font-bold text-[#0B1B3A] break-words">{item.courseName}</h3>
                                  </div>
                                  <Badge variant={item.status === 'Verified' ? 'success' : 'warning'} className="shrink-0">
                                    {item.status}
                                  </Badge>
                               </div>
                               
                               <p className="text-slate-700 font-medium">{item.institution}</p>
                               <p className="text-sm text-slate-500 mb-4">{item.year} {item.grade ? `• Grade: ${item.grade}` : ''}</p>
                               
                               {item.status === 'Verified' && (
                                 <div className="pt-4 border-t border-slate-100 flex gap-3 flex-wrap">
                                   <Button variant="outline" size="sm" className="h-8" onClick={() => setSelectedCert(item)}>
                                     <QrCode size={14} className="mr-2" /> View QR
                                   </Button>
                                   <Button variant="outline" size="sm" className="h-8">
                                     <Download size={14} className="mr-2" /> Download PDF
                                   </Button>
                                 </div>
                               )}
                             </div>
                           </div>
                        </div>
                      );
                    })
                  )}
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             {/* Quick Actions */}
             <Card>
               <CardContent className="p-6 space-y-4">
                 <h3 className="font-bold text-[#0B1B3A]">Quick Actions</h3>
                 <Button className="w-full justify-start" variant="outline">
                   <Share2 size={16} className="mr-2" /> Generate Verification Link
                 </Button>
                 <Button className="w-full justify-start" variant="outline">
                   <FileText size={16} className="mr-2" /> Request Correction
                 </Button>
                 <Button className="w-full justify-start" variant="outline">
                   <User size={16} className="mr-2" /> Manage Privacy
                 </Button>
               </CardContent>
             </Card>

             {/* Consent History */}
             <Card>
               <CardContent className="p-6">
                 <h3 className="font-bold text-[#0B1B3A] mb-4">Recent Access</h3>
                 <div className="space-y-4">
                   {[
                     { entity: "TCS Hiring", date: "Yesterday", action: "Viewed Degree" },
                     { entity: "HDFC Bank", date: "2 days ago", action: "Verified ID" }
                   ].map((log, i) => (
                     <div key={i} className="flex gap-3 text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                       <div className="h-2 w-2 mt-1.5 rounded-full bg-slate-300"></div>
                       <div>
                         <p className="font-medium text-slate-900">{log.entity}</p>
                         <p className="text-slate-500 text-xs">{log.action} • {log.date}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>

      {/* QR Modal Overlay */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            
            <div className="text-center space-y-4">
              <h3 className="font-bold text-lg text-[#0B1B3A]">Certificate QR</h3>
              <div className="bg-white p-2 rounded-lg inline-block border border-slate-100">
                 <QRCode value={selectedCert.id} size={200} />
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                 <p className="font-mono font-bold text-slate-700">{selectedCert.id}</p>
                 <p className="text-xs text-slate-500 mt-1">Scan to verify authenticity</p>
              </div>
              <Button className="w-full" onClick={() => setSelectedCert(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
