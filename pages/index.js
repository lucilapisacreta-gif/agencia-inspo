import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, X, ExternalLink, Tag, ChevronDown, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Agencia Inspo</h1>
        </header>
        <main>
          <p>Dashboard cargado correctamente.</p>
        </main>
      </div>
    </div>
  );
}
