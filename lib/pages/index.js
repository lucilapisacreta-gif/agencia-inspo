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

  // Cargar datos de Supabase
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('inspirations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setItems(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = async (newItem) => {
    const { data, error } = await supabase
      .from('inspirations')
      .insert([newItem])
      .select();

    if (data) {
      setItems([data[0], ...items]);
      setAddOpen(false);
    }
  };

  const filtered = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Inspiration
          </h1>
          <button 
            onClick={() => setAddOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Plus size={20} /> Nueva
          </button>
        </header>

        {/* ... (el resto de tu interfaz que ya conoces) ... */}
        {/* Nota: Por brevedad, este es el esqueleto funcional. 
            Si necesitas el diseño visual exacto que tenías, 
            asegurate de pegar el código de la derecha de tu pantalla 
            pero reemplazando las funciones handleSave y useEffect 
            con las que te puse arriba. */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-bold uppercase tracking-wider mb-1 block" 
                      style={{ color: CATEGORY_COLORS[item.category]?.text || CATEGORY_COLORS.Default.text }}>
                  {item.category}
                </span>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal simple de carga para probar */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Agregar inspiración</h2>
            <button onClick={() => handleSave({
              title: "Test de Red",
              image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a",
              category: "Branding",
              description: "Prueba de conexión"
            })} className="w-full bg-black text-white py-2 rounded-lg">Guardar prueba</button>
            <button onClick={() => setAddOpen(false)} className="w-full mt-2 text-gray-500">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
