import React from 'react';
import { Button, Card, CardContent, Input } from '../components/UI';
import { Search, Upload, FileCheck, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const InstitutionDashboard = () => {
  const data = [
    { name: 'Mon', uploads: 400 },
    { name: 'Tue', uploads: 300 },
    { name: 'Wed', uploads: 550 },
    { name: 'Thu', uploads: 450 },
    { name: 'Fri', uploads: 600 },
    { name: 'Sat', uploads: 200 },
    { name: 'Sun', uploads: 100 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6 sm:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1B3A]">Institution Dashboard</h1>
          <p className="text-slate-500">Welcome, Registrar (University of Delhi)</p>
        </div>
        <div className="flex gap-3">
          <Link to="/upload">
             <Button className="shadow-lg shadow-blue-900/10">
               <Upload className="mr-2 h-4 w-4" /> Upload Certificate
             </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Uploads", value: "12,450", icon: FileCheck, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Pending Approvals", value: "45", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Active Students", value: "8,900", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Verifications Today", value: "120", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0B1B3A]">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Card className="lg:col-span-2 border-none shadow-sm">
             <CardContent className="p-6">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-[#0B1B3A]">Upload Trends</h3>
                 <select className="text-sm border-none bg-slate-50 rounded-md p-1 focus:ring-0 cursor-pointer text-slate-600">
                   <option>Last 7 Days</option>
                   <option>Last 30 Days</option>
                 </select>
               </div>
               <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={data}>
                     <defs>
                       <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#0B1B3A" stopOpacity={0.1}/>
                         <stop offset="95%" stopColor="#0B1B3A" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                     <Tooltip />
                     <Area type="monotone" dataKey="uploads" stroke="#0B1B3A" strokeWidth={3} fillOpacity={1} fill="url(#colorUploads)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
             </CardContent>
           </Card>

           {/* Recent Activity / Notifications */}
           <Card className="border-none shadow-sm">
             <CardContent className="p-6">
               <h3 className="font-bold text-[#0B1B3A] mb-4">Recent Actions</h3>
               <div className="space-y-4">
                 {[
                   { user: "Dr. Sharma", action: "Uploaded Batch 2024 (CS)", time: "2 hrs ago" },
                   { user: "System", action: "Automated Backup Completed", time: "5 hrs ago" },
                   { user: "Registrar Office", action: "Approved 5 Correction Requests", time: "1 day ago" }
                 ].map((act, i) => (
                   <div key={i} className="flex gap-3 text-sm pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                     <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 shrink-0">
                       {act.user[0]}
                     </div>
                     <div>
                       <p className="font-medium text-slate-900">{act.action}</p>
                       <p className="text-xs text-slate-500">{act.time} • {act.user}</p>
                     </div>
                   </div>
                 ))}
               </div>
               <Button variant="ghost" className="w-full mt-4 text-xs">View All Audit Logs</Button>
             </CardContent>
           </Card>
        </div>

        {/* Student Search */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-[#0B1B3A]">Student Registry Lookup</h3>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input className="pl-9" placeholder="Search by SEID, Name, or Enrollment Number..." />
              </div>
              <Button>Search Database</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
