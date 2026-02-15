import React, { useState } from 'react';
import { Card, CardContent, Button, Input, Label } from '../components/UI';
import { Search, Mail, Phone, ChevronDown, MessageSquare, HelpCircle, FileText } from 'lucide-react';

const faqs = [
  {
    category: "Students",
    questions: [
      {
        q: "How do I access my academic records?",
        a: "You can access your records by logging in with your Student Education ID (SEID) or Aadhaar number. Once authenticated, your dashboard will display all issued certificates."
      },
      {
        q: "Is CredChain mandatory?",
        a: "While not mandatory, it is highly recommended as it provides secure, tamper-proof access to your documents anytime, anywhere."
      },
      {
        q: "My certificate is missing, what should I do?",
        a: "If a certificate is missing, please use the 'Request Correction' feature in your dashboard to notify your institution. They will review and upload the missing document."
      }
    ]
  },
  {
    category: "Institutions",
    questions: [
      {
        q: "How do we register our institution?",
        a: "Institutions can register by submitting an application through the 'Partners' portal. Approval is granted by the Ministry of Education."
      },
      {
        q: "What file formats are supported for upload?",
        a: "Currently, we support secure PDF uploads with digital signatures. The system automatically extracts metadata for verification."
      }
    ]
  },
  {
    category: "Verification",
    questions: [
      {
        q: "Is the QR code verification legally valid?",
        a: "Yes, certificates verified through CredChain are legally valid under the IT Act 2000 and are accepted by employers and higher education institutions."
      },
      {
        q: "Can I verify a document without logging in?",
        a: "Yes, the public verification portal allows anyone to verify a document using the Certificate ID or by scanning the QR code."
      }
    ]
  }
];

export const Support = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0B1B3A] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Badge className="bg-blue-500/20 text-blue-200 border-none mb-4">
            Help Center
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold">
            How can we help you today?
          </h1>
          <div className="relative max-w-xl mx-auto mt-8">
            <Search className="absolute left-4 top-3.5 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search for answers (e.g. 'How to verify degree')" 
              className="w-full pl-12 pr-4 py-3 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <FileText size={24} />
              </div>
              <h3 className="font-bold text-[#0B1B3A]">User Manuals</h3>
              <p className="text-sm text-slate-500">Step-by-step guides for students and institutions.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 mx-auto flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-bold text-[#0B1B3A]">Live Chat</h3>
              <p className="text-sm text-slate-500">Chat with our support team (9 AM - 6 PM IST).</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                <HelpCircle size={24} />
              </div>
              <h3 className="font-bold text-[#0B1B3A]">FAQs</h3>
              <p className="text-sm text-slate-500">Browse frequently asked questions.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-[#0B1B3A]">Frequently Asked Questions</h2>
          
          {faqs.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-sm border-b border-slate-200 pb-2">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.questions.map((item, i) => {
                  const id = `${idx}-${i}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={i} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <button 
                        onClick={() => toggleAccordion(id)}
                        className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        {item.q}
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-2">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="sticky top-24 shadow-lg border-t-4 border-t-[#0B1B3A]">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B1B3A]">Still need help?</h3>
                <p className="text-slate-500 text-sm mt-1">Send us a message and we'll get back to you within 24 hours.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <textarea 
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe your issue..."
                  ></textarea>
                </div>
                <Button className="w-full bg-[#0B1B3A] hover:bg-[#0B1B3A]/90">
                  Send Message
                </Button>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} className="text-[#FF7A00]" />
                  <span>support@CredChain.gov.in</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={16} className="text-[#FF7A00]" />
                  <span>+91 11-23010101 (Toll Free)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper component for Badge
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);
