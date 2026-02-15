import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Label, Select } from '../components/UI';
import { Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api, getAuthHeader } from '../api';


export const InstitutionLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = (form.querySelector('#inst-id') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;

    fetch(api('/auth/institution/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(async (r) => {
      setIsLoading(false);
      if (!r.ok) return alert('Login failed');
      const data = await r.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      navigate('/dashboard/institution');
    }).catch((e) => { setIsLoading(false); alert('Login error'); });
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-[#0B1B3A]">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-blue-50 p-3 rounded-full w-fit mb-2">
            <Building2 className="h-6 w-6 text-[#0B1B3A]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0B1B3A]">Institution Login</CardTitle>
          <p className="text-sm text-slate-500">For Universities, Boards & Training Centers</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inst-id">Institution ID</Label>
              <Input id="inst-id" placeholder="e.g. UNIV-2024-DEL-001" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select id="role">
                <option value="admin">Administrator</option>
                <option value="registrar">Registrar</option>
                <option value="dept_officer">Department Officer</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password / OTP</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="flex items-center justify-between text-sm">
               <label className="flex items-center gap-2 text-slate-600">
                 <input type="checkbox" className="rounded border-slate-300" />
                 Remember ID
               </label>
               <a href="#" className="text-[#0B1B3A] font-medium hover:underline">Forgot credentials?</a>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Secure Login <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
