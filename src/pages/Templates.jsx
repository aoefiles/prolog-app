import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Grid } from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();

  return (
    // Tambahkan pb-10 di sini agar tidak mepet bawah
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50/50 to-indigo-100 flex flex-col font-sans text-gray-800 pb-10">
      
      {/* Top Navigation */}
      <header className="w-full flex justify-center gap-6 pt-8 text-sm font-medium">
        <span 
          className="text-gray-400 cursor-pointer hover:text-indigo-400 transition-colors" 
          onClick={() => navigate('/')}
        >
          start
        </span>
        <span className="text-indigo-500 cursor-default">edit</span>
        <span className="text-gray-400 cursor-not-allowed">share</span>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-12 px-6 pb-12">
        <h1 className="text-3xl font-medium tracking-tight mb-2">
          [<span className="italic font-bold">Choose</span>] Your Layout!
        </h1>
        <p className="text-gray-500 text-sm mb-10">Select a template to log your progress.</p>

        {/* Template Cards Container */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
          
          {/* Template 1: Focus Layout */}
          <div 
            onClick={() => navigate('/edit/focus')}
            className="flex-1 bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-indigo-300 flex flex-col items-center group"
          >
            <div className="w-full aspect-[3/4] bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-100 flex flex-col items-center justify-center text-indigo-300 group-hover:bg-indigo-50 transition-colors mb-4 gap-3">
                <Layout size={40} />
                <span className="text-xs font-medium">2 Photos Layout</span>
            </div>
            <h3 className="font-semibold text-gray-700">Focus Mode</h3>
            <p className="text-xs text-gray-500 mt-1">1 Portrait + 1 Square Photo</p>
          </div>

          {/* Template 2: Grid Layout */}
          <div 
            onClick={() => navigate('/edit/grid')}
            className="flex-1 bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-indigo-300 flex flex-col items-center group"
          >
            <div className="w-full aspect-[3/4] bg-indigo-50/50 rounded-2xl border-2 border-dashed border-indigo-100 flex flex-col items-center justify-center text-indigo-300 group-hover:bg-indigo-50 transition-colors mb-4 gap-3">
                <Grid size={40} />
                <span className="text-xs font-medium">4 Photos Layout</span>
            </div>
            <h3 className="font-semibold text-gray-700">Grid Mode</h3>
            <p className="text-xs text-gray-500 mt-1">4 Portrait Photos</p>
          </div>

        </div>
      </main>

      {/* Footer ditambahkan di sini, otomatis terdorong ke bawah berkat flex-grow pada main */}
      <footer className="w-full text-center text-gray-400 text-xs mt-auto">
        <p>&copy; 2026 All Right Reserved</p>
      </footer>

    </div>
  );
};

export default Templates;