import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Label } from '../components/UI';
import { ShieldAlert, ArrowRight, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const StudentLogin = () => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard/student');
    }, 1000);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#0B1B3A]">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-blue-50 p-3 rounded-full w-fit mb-2">
            <Smartphone className="h-6 w-6 text-[#0B1B3A]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0B1B3A]">Student Login</CardTitle>
          <p className="text-sm text-slate-500">Access your academic repository securely</p>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Mobile Number or Aadhaar / VID</Label>
                <Input 
                  id="identifier" 
                  placeholder="Enter 10-digit mobile number" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="text-lg tracking-wide"
                />
              </div>
              
              <div className="rounded-md bg-amber-50 p-3 flex gap-3 items-start border border-amber-100">
                <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Privacy Note:</strong> Your Aadhaar number is used only for identity verification and is not shared with any third party. CredChain complies with UIDAI regulations.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="otp">Enter OTP</Label>
                   <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-600 hover:underline">Change Number</button>
                </div>
                <Input 
                  id="otp" 
                  placeholder="• • • • • •" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-2xl tracking-[0.5em] font-bold"
                  maxLength={6}
                />
                <p className="text-xs text-slate-500 text-center">OTP sent to +91 XXXXX X{identifier.slice(-3)}</p>
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Verify & Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="text-center">
                 <button type="button" className="text-sm text-slate-500 hover:text-[#0B1B3A]">Resend OTP in 30s</button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
