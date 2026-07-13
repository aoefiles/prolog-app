import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50/50 to-indigo-100 flex flex-col font-sans text-gray-800 relative">
      
      {/* Top Navigation */}
      <header className="w-full flex justify-center gap-6 pt-8 text-sm font-medium">
        <span className="text-indigo-500 cursor-pointer">start</span>
        <span className="text-gray-400 cursor-not-allowed">edit</span>
        <span className="text-gray-400 cursor-not-allowed">share</span>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center -mt-10">
        
        {/* Logo/Title */}
        <h1 className="text-6xl font-medium tracking-tight mb-4">
          [<span className="italic font-bold">Pro</span>.log]
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-500 text-center italic mb-8 leading-relaxed">
          Capture your productivity.<br />
          Turn progress into proof.
        </p>
        
        {/* Call to Action Button */}
        <button 
          onClick={() => navigate('/templates')}
          className="bg-indigo-400 hover:bg-indigo-500 transition-colors text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 shadow-sm"
        >
          Create Now <Camera size={20} />
        </button>

      </main>

      {/* Ticker/Banner Section */}
      <div className="bg-white/60 backdrop-blur-sm py-3 w-full border-y border-white/50 absolute bottom-24 flex justify-center overflow-hidden">
        <p className="text-xs text-gray-500 italic whitespace-nowrap">
          Productivity captured &rarr; Progress tracked &rarr; Proof generated &rarr; Pro.log logged
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center text-gray-500 text-sm">
        <p>&copy; 2026 All Right Reserved</p>
      </footer>

    </div>
  );
};

export default Home;