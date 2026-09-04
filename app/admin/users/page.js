'use client';
import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/admin/page';
import axios from 'axios';
import { format } from 'date-fns';
import { FiUsers, FiShield } from 'react-icons/fi';
import Image from 'next/image';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/users').then(res => setUsers(res.data.users)).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout active="/admin/users">
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white">👥 ব্যবহারকারী</h2>
        {loading ? (
          <div className="flex justify-center py-12"><div className="spinner" /></div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left text-slate-500 text-xs px-5 py-3">ব্যবহারকারী</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">ইমেইল</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">অর্ডার</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">রোল</th>
                    <th className="text-left text-slate-500 text-xs px-5 py-3">যোগদান</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {u.image ? (
                            <Image src={u.image} alt={u.name} width={32} height={32} className="rounded-full" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">{u.name?.[0]}</div>
                          )}
                          <span className="text-white text-sm">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-sm">{u.email}</td>
                      <td className="px-5 py-3 text-white text-sm">{u.totalOrders || 0}</td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1 text-xs ${u.role === 'admin' ? 'text-yellow-400' : 'text-slate-400'}`}>
                          {u.role === 'admin' ? <><FiShield /> Admin</> : <><FiUsers /> User</>}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">
                        {format(new Date(u.createdAt), 'dd/MM/yy')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
