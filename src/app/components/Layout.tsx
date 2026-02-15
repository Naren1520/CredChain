import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Note: react-router v7 uses 'react-router'
import { Button } from './UI';
import { ShieldCheck, Menu, X, Globe, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { Toaster } from 'sonner';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isPublicPage = ['/', '/verify'].includes(location.pathname);
  const isAuthPage = ['/login/student', '/login/institution'].includes(location.pathname);

  // Simple check to hide nav on dashboard for a more "app" feel, or keep it?
  // Usually dashboards have their own sidebar/layout.
  // Let's keep a universal header but change content based on route.
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.includes('upload');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Toaster position="top-right" richColors />
      {/* Top Govt Banner */}
      <div className="bg-[#f1f5f9] border-b border-slate-200 text-[10px] sm:text-xs py-1 px-4 sm:px-6 lg:px-8 flex justify-between items-center text-slate-600">
        <div className="flex items-center gap-2">
           <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="h-4 sm:h-5" />
           <span>Government of India</span>
        </div>
        <div className="flex gap-4">
           <span>Ministry of Education</span>
           <span className="hidden sm:inline">Skip to Main Content</span>
           <span className="flex items-center gap-1"><Globe size={10} /> English</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-[#0B1B3A] p-2 rounded-lg group-hover:bg-[#FF7A00] transition-colors">
                <ShieldCheck className="text-white h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#0B1B3A] leading-none">CredChain</span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">National Education Depository</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {!isDashboard && (
                <>
                  <Link to="/" className="text-sm font-medium text-slate-600 hover:text-[#0B1B3A]">Home</Link>
                  <Link to="/verify" className="text-sm font-medium text-slate-600 hover:text-[#0B1B3A]">Verify Records</Link>
                  <Link to="/guide" className="text-sm font-medium text-slate-600 hover:text-[#0B1B3A]">Guide</Link>
                  <Link to="/partners" className="text-sm font-medium text-slate-600 hover:text-[#0B1B3A]">Partners</Link>
                  <Link to="/support" className="text-sm font-medium text-slate-600 hover:text-[#0B1B3A]">Support</Link>
                </>
              )}
              
              {isDashboard ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">Welcome, User</span>
                   <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>Logout</Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-4">
                  <Link to="/login/student">
                    <Button variant="ghost" size="sm">Student Login</Button>
                  </Link>
                  <Link to="/login/institution">
                    <Button variant="primary" size="sm">Institution Login</Button>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 shadow-lg absolute w-full left-0 top-16 z-40">
            <Link to="/" className="block text-sm font-medium text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/verify" className="block text-sm font-medium text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Verify Records</Link>
            <Link to="/guide" className="block text-sm font-medium text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Guide</Link>
            <Link to="/partners" className="block text-sm font-medium text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Partners</Link>
            <Link to="/support" className="block text-sm font-medium text-slate-600 py-2" onClick={() => setIsMenuOpen(false)}>Support</Link>
            <Link to="/login/student" className="block w-full" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start">Student Login</Button>
            </Link>
             <Link to="/login/institution" className="block w-full" onClick={() => setIsMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-start">Institution Login</Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1B3A] text-slate-300 py-12 text-sm border-t-4 border-[#FF7A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-white h-6 w-6" />
              <span className="text-lg font-bold text-white">CredChain</span>
            </div>
            <p className="opacity-80 leading-relaxed">
              India's Digital Education Ecosystem. Secure, verified, and accessible records for every student.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/partners" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Statistics</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Get Certified</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/guide" className="hover:text-white transition-colors">User Manual</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-2">
               <li className="flex items-center gap-2"><Lock size={14}/> Secure Line</li>
              <li>support@CredChain.gov.in</li>
              <li>+91 11-23010101</li>
            </ul>
            <div className="mt-6 flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#FF7A00] transition-colors cursor-pointer">X</div>
               <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#FF7A00] transition-colors cursor-pointer">In</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center opacity-60 text-xs">
          © 2025 CredChain, Ministry of Education, Government of India. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
