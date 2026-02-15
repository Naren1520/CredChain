import React from 'react';
import { Button } from '../components/UI';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const handleReset = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
      toast.success('System Reset Complete');
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0B1B3A]">Government Admin Portal</h1>
        <Button variant="destructive" onClick={handleReset} size="sm">
          <Trash2 className="mr-2 h-4 w-4" /> Reset System Data
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
        <p className="text-slate-600">
          This is a restricted area for government officials to oversee the CredChain ecosystem.
          Use the "Reset System Data" button to clear all local storage for testing purposes.
        </p>
      </div>
    </div>
  );
};

export const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0B1B3A] mb-4">404</h1>
        <p className="text-xl text-slate-500 mb-8">Page not found.</p>
        <Button onClick={() => window.location.href = '/'}>Return Home</Button>
      </div>
    </div>
  );
};
