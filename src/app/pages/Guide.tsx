import React, { useState } from 'react';
import { Card, CardContent, Button } from '../components/UI';
import { 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  UserCircle, 
  FileCheck, 
  Download, 
  QrCode, 
  Upload, 
  Search, 
  LogIn, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Role = 'student' | 'institution' | 'verifier';

const guides = {
  student: {
    title: "Student Guide",
    description: "Access your lifelong academic achievements in one secure vault.",
    steps: [
      {
        title: "Secure Login",
        icon: LogIn,
        desc: "Log in using your Student Education ID (SEID) or Aadhaar number linked to your mobile. An OTP will be sent for verification."
      },
      {
        title: "View Dashboard",
        icon: UserCircle,
        desc: "Your dashboard displays a timeline of your education journey. Each card represents a qualification (10th, 12th, Degree, etc.)."
      },
      {
        title: "Access Certificates",
        icon: FileCheck,
        desc: "Click on any qualification to view the detailed certificate. You can see your grades, completion date, and issuing authority."
      },
      {
        title: "Download & Share",
        icon: Download,
        desc: "Download the digitally signed PDF or share a secure link/QR code with employers or other institutions for instant verification."
      }
    ],
    color: "bg-blue-500",
    lightColor: "bg-blue-50"
  },
  institution: {
    title: "Institution Guide",
    description: "Issue tamper-proof digital certificates to your students instantly.",
    steps: [
      {
        title: "Institution Login",
        icon: Building2,
        desc: "Access the portal using your government-issued Institution ID and secure password. Multi-factor authentication is enabled for security."
      },
      {
        title: "Upload Records",
        icon: Upload,
        desc: "Use the 'Upload Certificate' wizard. Enter student details, select the course, and upload the certificate PDF. The system automatically signs it."
      },
      {
        title: "Bulk Operations",
        icon: FileCheck,
        desc: "For large batches, use the CSV upload feature to issue hundreds of certificates at once. The system validates data before processing."
      },
      {
        title: "Manage & Revoke",
        icon: ShieldCheck,
        desc: "View all issued certificates in your dashboard. You can correct errors or revoke certificates if necessary, maintaining a full audit trail."
      }
    ],
    color: "bg-orange-500",
    lightColor: "bg-orange-50"
  },
  verifier: {
    title: "Public Verifier Guide",
    description: "Instantly verify the authenticity of any academic document.",
    steps: [
      {
        title: "Scan QR Code",
        icon: QrCode,
        desc: "Use any standard QR code scanner or the CredChain mobile app to scan the QR code printed on the certificate."
      },
      {
        title: "Verify by ID",
        icon: Search,
        desc: "Alternatively, visit the 'Verify Records' page and enter the unique Certificate ID found on the document."
      },
      {
        title: "Instant Validation",
        icon: ShieldCheck,
        desc: "The system checks the digital signature against the National Repository. You'll see a 'Verified' badge if the document is authentic."
      },
      {
        title: "View Metadata",
        icon: FileCheck,
        desc: "Access public metadata such as Student Name, Course, Year of Passing, and Issuing Institution to cross-check details."
      }
    ],
    color: "bg-green-600",
    lightColor: "bg-green-50"
  }
};

export const Guide = () => {
  const [role, setRole] = useState<Role>('student');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-[#0B1B3A] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-[#FF7A00]"></span>
            Platform Walkthrough
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold">
            Master CredChain in Minutes
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Select your role to see a tailored guide on how to get the most out of the platform.
          </p>
          
          {/* Role Selector Dropdown */}
          <div className="max-w-xs mx-auto mt-8 relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full appearance-none bg-white text-[#0B1B3A] font-bold py-3 px-6 rounded-full shadow-lg text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#FF7A00]/50 text-lg transition-all"
            >
              <option value="student">I am a Student</option>
              <option value="institution">I am an Institution</option>
              <option value="verifier">I am a Verifier</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#0B1B3A]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Content Header */}
          <div className={`p-8 ${guides[role].lightColor} border-b border-slate-100 text-center sm:text-left`}>
            <h2 className="text-2xl font-bold text-[#0B1B3A] mb-2">{guides[role].title}</h2>
            <p className="text-slate-600">{guides[role].description}</p>
          </div>

          {/* Steps Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-16 right-16 h-0.5 bg-slate-100 -z-10"></div>

            {guides[role].steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className={`w-8 h-8 rounded-full ${guides[role].color} text-white flex items-center justify-center font-bold text-sm absolute -top-4 -left-2 z-10 shadow-md`}>
                  {index + 1}
                </div>
                
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-100 hover:border-slate-200 group-hover:-translate-y-1">
                  <CardContent className="p-6 pt-8 text-center space-y-4">
                    <div className={`h-14 w-14 rounded-2xl ${guides[role].lightColor} mx-auto flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform`}>
                      <step.icon size={28} className={role === 'student' ? 'text-blue-600' : role === 'institution' ? 'text-orange-600' : 'text-green-600'} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0B1B3A]">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA Footer */}
          <div className="bg-slate-50 p-8 border-t border-slate-100 text-center">
            <p className="text-slate-600 mb-6">Ready to get started?</p>
            {role === 'student' && (
              <Link to="/login/student">
                <Button size="lg" className="bg-[#0B1B3A] hover:bg-[#0B1B3A]/90 px-8">
                  Go to Student Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {role === 'institution' && (
              <Link to="/login/institution">
                <Button size="lg" className="bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white px-8">
                  Institution Login <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
            {role === 'verifier' && (
              <Link to="/verify">
                <Button size="lg" className="bg-[#1A9B50] hover:bg-[#1A9B50]/90 text-white px-8">
                  Verify Documents Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-bold text-[#0B1B3A] text-center mb-8">Pro Tips for {role === 'student' ? 'Students' : role === 'institution' ? 'Institutions' : 'Verifiers'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {role === 'student' && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Keep Profile Updated</h4>
                <p className="text-sm text-slate-600">Ensure your Aadhaar and mobile number are always up to date to receive OTPs for login.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-blue-500 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Share Securely</h4>
                <p className="text-sm text-slate-600">Use the temporary share link feature when sending documents to recruiters instead of emailing PDFs.</p>
              </div>
            </>
          )}
          {role === 'institution' && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-orange-500 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Bulk Upload Format</h4>
                <p className="text-sm text-slate-600">Always use the latest CSV template available in the dashboard to avoid validation errors during bulk upload.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-orange-500 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Digital Signatures</h4>
                <p className="text-sm text-slate-600">Ensure your institution's DSC (Digital Signature Certificate) is active and linked to the uploading account.</p>
              </div>
            </>
          )}
          {role === 'verifier' && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Check the URL</h4>
                <p className="text-sm text-slate-600">Always verify that the link starts with <strong>https://CredChain.gov.in</strong> before trusting the page.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-green-500 border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Offline Verification</h4>
                <p className="text-sm text-slate-600">You can download the XML signature from the verified page to perform offline cryptographic validation.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
