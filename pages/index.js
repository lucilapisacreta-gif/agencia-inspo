import React from 'react';
import { Search, Plus } from 'lucide-react';
import '../styles/globals.css';

const MOCK_DATA = [
  { id: 1, title: 'Minimal Brand Identity', category: 'Branding', color: 'bg-[#f0edff]' },
  { id: 2, title: 'Editorial Fashion Campaign', category: 'Fashion', color: 'bg-[#fce7f3]' },
  { id: 3, title: 'Social Media Visual System', category: 'Social Media', color: 'bg-[#fef3c7]' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <div className="w-8 h-8 bg-black rounded-lg"></div>
          Inspiration
        </div>
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Buscar..." className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-full shadow-sm focus:outline-none" />
        </div>
        <button className="bg-black text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:opacity-80 transition-all">
          <Plus className="w-5 h-5" /> Nueva
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_DATA.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className={`aspect-[4/5] ${item.color} rounded-[32px] mb-4 flex items-center justify-center relative overflow-hidden shadow-sm transition-transform group-hover:scale-[1.02]`}>
               <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.category}</p>
            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
