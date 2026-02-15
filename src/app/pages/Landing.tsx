import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent } from '../components/UI';
import { motion } from 'motion/react';
import { ShieldCheck, FileCheck, School, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-24 lg:pb-40">
        <div className="absolute top-0 right-0 -z-10 opacity-10">
           <svg viewBox="0 0 100 100" className="h-[800px] w-[800px] fill-[#FF7A00]">
             <circle cx="50" cy="50" r="40" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                Official Government Portal
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B1B3A] leading-[1.1]">
                One Verified <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF4500]">Education Identity</span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                From Nursery to PhD. Store, access, and share your academic records securely. Tamper-proof, instant, and accepted nationwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login/student">
                  <Button size="lg" className="w-full sm:w-auto px-8 shadow-xl shadow-blue-900/10">
                    Student Login
                  </Button>
                </Link>
                <Link to="/login/institution">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                    Institution Login
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-[#1A9B50]" size={18} />
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="text-[#1A9B50]" size={18} />
                  <span>AES-256 Encryption</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1727875075949-8b36efd25260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncmFkdWF0ZSUyMHN0dWRlbnQlMjBoYXBweXxlbnwxfHx8fDE3NzExMTA1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Happy Graduate" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating Card Element */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                       <CheckCircle2 size={24} />
                     </div>
                     <div>
                       <p className="text-sm font-semibold text-slate-900">Certificate Verified</p>
                       <p className="text-xs text-slate-500">University of Delhi • Issued Today</p>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0B1B3A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             {[
               { value: "45 Cr+", label: "Verified Records" },
               { value: "12,000+", label: "Educational Institutions" },
               { value: "0.01s", label: "Instant Verification Time" }
             ].map((stat, i) => (
               <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                 <div className="text-4xl font-bold text-[#FF7A00] mb-2">{stat.value}</div>
                 <div className="text-sm text-slate-300 uppercase tracking-wider">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#0B1B3A] mb-4">How CredChain Works</h2>
            <p className="text-slate-600">A seamless, secure ecosystem connecting students, institutions, and employers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 -z-10 transform translate-y-4"></div>

             {[
               { icon: School, title: "Institutions Upload", desc: "Schools & Universities upload academic records digitally signed with their unique ID." },
               { icon: Lock, title: "Secure Storage", desc: "Records are encrypted and stored in the National Education Repository linked to your ID." },
               { icon: FileCheck, title: "Instant Verification", desc: "Students share access, and verifiers can instantly validate authenticity via QR or ID." }
             ].map((step, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                 <div className="h-16 w-16 rounded-full bg-[#f0f9ff] text-[#0B1B3A] flex items-center justify-center mb-6 border-4 border-white shadow-sm z-10">
                   <step.icon size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-[#0B1B3A] mb-3">{step.title}</h3>
                 <p className="text-slate-600 leading-relaxed text-sm">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-gradient-to-r from-[#0B1B3A] to-[#1e2d4d] text-white border-none p-8 sm:p-12 overflow-hidden relative">
             <div className="relative z-10">
               <h2 className="text-3xl font-bold mb-6">Validate a Document Now</h2>
               <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                 Don't rely on paper. Use the CredChain Verification Portal to check the authenticity of any issued certificate instantly.
               </p>
               <Link to="/verify">
                 <Button variant="secondary" size="lg" className="px-8 font-bold">
                   Go to Verification Portal <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
               </Link>
             </div>
             
             {/* Decorative circles */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </Card>
        </div>
      </section>
    </div>
  );
};
