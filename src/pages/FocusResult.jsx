import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const FocusResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const templateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mengambil data yang dikirim dari halaman Edit
  const { title, description, notes, bgImage, hlImage } = location.state || {};

  // Jika tidak ada data (user langsung tembak URL), kembalikan ke home
  if (!location.state) {
    navigate('/');
    return null;
  }

  // Fungsi untuk mengunduh gambar
  const handleDownload = async () => {
    if (!templateRef.current) return;
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(templateRef.current, {
        scale: 3, // Skala tinggi agar resolusinya tajam (HD)
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const image = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.href = image;
      link.download = `prolog-${title ? title.replace(/\s+/g, '-').toLowerCase() : 'moment'}.jpg`;
      link.click();
    } catch (error) {
      console.error('Oops, gagal membuat gambar:', error);
      alert("Gagal memproses gambar.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Fungsi untuk share via Web Share API
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
          // Fallback jika browser/HP tidak mendukung share langsung
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
        
        {/* PREVIEW AREA: Ini area yang akan di-capture oleh html2canvas */}
        {/* Kita atur ukurannya proporsional 9:16 */}
        <div className="w-[300px] sm:w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl relative mb-10 ring-4 ring-indigo-200">
          
          {/* Ini adalah elemen asli yang akan difoto */}
          <div 
            ref={templateRef} 
            className="w-full h-full bg-gray-200 relative overflow-hidden"
            style={{
              backgroundImage: bgImage ? `url(${bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay gelap di layer paling bawah (z-0) */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>

            {/* Container Utama menggunakan Flexbox (z-10) */}
            <div className="relative z-10 flex flex-col w-full h-full p-6">
              
              {/* Spacer Atas: Mendorong Card Utama ke tengah */}
              <div className="flex-1"></div>

              {/* White Card Utama */}
              {/* shrink-0 memastikan card ini tidak gepeng jika ruangnya sempit */}
              <div className="w-[85%] mx-auto bg-white rounded-xl p-4 shadow-xl flex flex-col gap-2 shrink-0">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-800 mb-1">
                  <span>&lt; [<span className="italic">Pro</span>.log]</span>
                  <span className="text-indigo-400 text-lg leading-none">&#128193;</span>
                </div>
                
                <div>
                  {title && <h2 className="text-xl font-bold leading-tight break-words">{title}</h2>}
                  {description && <p className="text-[10px] text-gray-500 mt-1 leading-snug break-words">{description}</p>}
                </div>

                {hlImage && (
                  <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mt-1">
                    <img src={hlImage} alt="Highlight" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Spacer Tengah: Mendorong Notes ke bawah, tapi menjaga jarak aman dari Card Utama */}
              <div className="flex-1 min-h-[1.5rem]"></div>

              {/* Wrapper untuk Notes & Watermark */}
              <div className="w-[85%] mx-auto flex flex-col gap-4 shrink-0 mb-2">
                
                {/* Notes/Checklist */}
                {notes && (
                  <div className="bg-white rounded-xl p-3.5 shadow-lg">
                    <p className="text-[10px] text-gray-600 whitespace-pre-wrap leading-relaxed break-words">
                      {notes}
                    </p>
                  </div>
                )}

                {/* Watermark Pro.log - Mengikuti flow, tidak lagi floating absolute */}
                <div className="text-center text-white/70 text-[9px] font-medium tracking-widest drop-shadow-md">
                  [<span className="italic font-bold">Pro</span>.log]
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Branding Title */}
        <h1 className="text-3xl font-medium tracking-tight mb-2">
          [<span className="italic font-bold">Pro</span>.log]
        </h1>
        <p className="text-gray-500 text-sm text-center italic mb-8">
          This is your progress — turned into<br/>something you can share with the world.
        </p>

        {/* Action Buttons */}
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

export default FocusResult;