import React from 'react';
import { Card, CardContent } from '../components/UI';
import { Building2, GraduationCap, Award, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

const partners = [
  {
    category: "Central Bodies",
    items: [
      { name: "University Grants Commission (UGC)", icon: Building2 },
      { name: "All India Council for Technical Education (AICTE)", icon: GraduationCap },
      { name: "Central Board of Secondary Education (CBSE)", icon: Award },
      { name: "National Skill Development Corporation (NSDC)", icon: Globe },
    ]
  },
  {
    category: "Top Universities",
    items: [
      { name: "University of Delhi", icon: Building2 },
      { name: "Indian Institute of Technology, Bombay", icon: GraduationCap },
      { name: "Jawaharlal Nehru University", icon: Building2 },
      { name: "Banaras Hindu University", icon: GraduationCap },
      { name: "Anna University", icon: Building2 },
      { name: "University of Mumbai", icon: Building2 },
    ]
  },
  {
    category: "State Boards",
    items: [
      { name: "Maharashtra State Board", icon: Award },
      { name: "Uttar Pradesh Madhyamik Shiksha Parishad", icon: Award },
      { name: "Tamil Nadu State Board", icon: Award },
      { name: "West Bengal Council of Higher Secondary Education", icon: Award },
    ]
  }
];

export const Partners = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0B1B3A] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <Badge className="bg-[#FF7A00] text-white hover:bg-[#FF7A00]/90 border-none mb-4">
            Trusted Network
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            India's Digital Education Ecosystem
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            CredChain connects over 1,500 universities, boards, and assessment bodies to provide a unified verification platform.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Partner Institutions", value: "1,500+", icon: Building2 },
            { label: "Verified Records", value: "250M+", icon: ShieldCheck },
            { label: "Active Students", value: "85M+", icon: GraduationCap },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0B1B3A]">
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B1B3A]">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {partners.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-[#0B1B3A]">{section.category}</h2>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-[#0B1B3A] transition-colors">
                    {item.name}
                  </span>
                  <CheckCircle2 size={16} className="text-[#1A9B50] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-slate-100 border-t border-slate-200 py-16 px-4 text-center">
         <h2 className="text-2xl font-bold text-[#0B1B3A] mb-4">Become a Partner Institution</h2>
         <p className="text-slate-600 mb-8 max-w-xl mx-auto">
           Join the National Academic Depository network to issue tamper-proof digital certificates.
         </p>
         <button className="bg-[#0B1B3A] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0B1B3A]/90 transition-colors">
           Register Institution
         </button>
      </div>
    </div>
  );
};

// Helper component for Badge since it might not be exported from UI
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);
