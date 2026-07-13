import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const GridResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const templateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mengambil data yang dikirim dari halaman Edit
  const { title, images } = location.state || {};

  if (!location.state) {
    navigate('/');
    return null;
  }

  const handleDownload = async () => {
    if (!templateRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = `prolog-grid-${title ? title.replace(/\s+/g, '-').toLowerCase() : 'moment'}.jpg`;
      link.click();
    } catch (error) {
      console.error('Oops, gagal membuat gambar:', error);
      alert("Gagal memproses gambar.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!templateRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(templateRef.current, { scale: 3, useCORS: true });
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'prolog-story.jpg', { type: 'image/jpeg' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My Pro.log',
            text: 'Check out my productivity progress!',
            files: [file]
          });
        } else {
          alert("Browser tidak mendukung fitur Share langsung. Silakan gunakan tombol Download.");
        }
        setIsGenerating(false);
      }, 'image/jpeg', 0.9);
    } catch (error) {
      console.error('Error sharing:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800 items-center pb-10">
      
      {/* Top Navigation */}
      <header className="w-full max-w-2xl flex justify-center gap-6 pt-8 pb-6 text-sm font-medium">
        <span className="text-gray-400 cursor-pointer hover:text-indigo-400" onClick={() => navigate('/')}>start</span>
        <span className="text-gray-400 cursor-pointer hover:text-indigo-400" onClick={() => navigate(-1)}>edit</span>
        <span className="text-indigo-500 cursor-default">share</span>
      </header>

      <main className="w-full max-w-md px-6 flex flex-col items-center">
        
        {/* PREVIEW AREA (Rasio 9:16 untuk IG Story) */}
        <div className="w-[300px] sm:w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl relative mb-10 ring-4 ring-indigo-200 bg-white">
          
          {/* Elemen asli yang difoto */}
          <div ref={templateRef} className="w-full h-full bg-[#f8fafc] flex flex-col p-6 relative">
            
            {/* Header / Title Area */}
            <div className="flex flex-col items-center justify-center pt-8 pb-4 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                 <span className="w-8 h-[1px] bg-indigo-300"></span>
                 <span className="text-[10px] font-bold italic text-indigo-400 tracking-wider">PRO.LOG</span>
                 <span className="w-8 h-[1px] bg-indigo-300"></span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center break-words leading-tight">
                {title || "My Progress"}
              </h2>
            </div>

            {/* Spacer Fleksibel */}
            <div className="flex-1"></div>

            {/* 2x2 Grid Area */}
            <div className="w-full grid grid-cols-2 gap-3 shrink-0">
              {images.map((img, index) => (
                <div key={index} className="w-full aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  {img ? (
                    <img src={img} alt={`Grid ${index}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                      No Photo
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Spacer Fleksibel */}
            <div className="flex-1"></div>

            {/* Footer / Watermark */}
            <div className="shrink-0 pb-2 text-center">
              <span className="text-[9px] font-medium tracking-widest text-gray-400 drop-shadow-sm">
                [<span className="italic font-bold">Pro</span>.log]
              </span>
            </div>

          </div>
        </div>

        {/* Branding & Actions */}
        <h1 className="text-3xl font-medium tracking-tight mb-2">
          [<span className="italic font-bold">Pro</span>.log]
        </h1>
        <p className="text-gray-500 text-sm text-center italic mb-8">
          This is your progress — turned into<br/>something you can share with the world.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={handleShare}
            disabled={isGenerating}
            className="w-full bg-indigo-400 hover:bg-indigo-500 transition-colors text-white py-3.5 rounded-full font-semibold shadow-sm disabled:opacity-50"
          >
            {isGenerating ? 'Processing...' : 'Share to Instagram'}
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full bg-white hover:bg-gray-50 transition-colors text-indigo-400 border border-indigo-200 py-3.5 rounded-full font-semibold shadow-sm disabled:opacity-50"
          >
            Download
          </button>
        </div>
        
        <p className="text-center text-gray-400 text-xs mt-8">&copy; 2026 All Right Reserved</p>
      </main>
    </div>
  );
};

export default GridResult;