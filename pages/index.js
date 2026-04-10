import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, X, ExternalLink, Tag, ChevronDown, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
const CATEGORY_COLORS = {
  Branding: { bg: "#f0edff", text: "#6c63ff" },
  Fashion: { bg: "#fce7f3", text: "#db2777" },
  "Social Media": { bg: "#fef3c7", text: "#d97706" },
  Trends: { bg: "#d1fae5", text: "#059669" },
  Hooks: { bg: "#ede9fe", text: "#7c3aed" },
  Copy: { bg: "#fee2e2", text: "#dc2626" },
  Motion: { bg: "#e0f2fe", text: "#0284c7" },
  Default: { bg: "#f1f5f9", text: "#64748b" },
};

export default function InspirationDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', image: '', category: 'Branding', description: '' });

  // 1. Cargar datos de Supabase al entrar
  useEffect(() => {
    fetchInspirations();
  }, []);

  async function fetchInspirations() {
    setLoading(true);
    const { data, error } = await supabase
      .from('inspirations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error cargando datos:", error);
    else setItems(data || []);
    setLoading(false);
  }

  // 2. Guardar nueva inspiración
  const handleSave = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('inspirations')
      .insert([newItem])
      .select();

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      setItems([data[0], ...items]);
      setAddOpen(false);
      setNewItem({ title: '', image: '', category: 'Branding', description: '' });
    }
  };

  // 3. Borrar una tarjeta
  const handleDelete = async (id) => {
    if (confirm("¿Estás segura de eliminar esta inspiración?")) {
      const { error } = await supabase
        .from('inspirations')
        .delete()
        .eq('id', id);
      
      if (!error) setItems(items.filter(item => item.id !== id));
    }
  };

  const filtered = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md
