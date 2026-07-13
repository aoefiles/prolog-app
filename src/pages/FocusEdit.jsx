import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus } from 'lucide-react';

const FocusEdit = () => {
  const navigate = useNavigate();
  
  // State untuk teks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  // State untuk menyimpan URL gambar preview
  const [bgImage, setBgImage] = useState(null);
  const [hlImage, setHlImage] = useState(null);

  // Fungsi untuk menangani saat user memilih foto
  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50/50 to-indigo-100 flex flex-col font-sans text-gray-800 items-center pb-10">
      
      {/* Top Navigation */}
      <header className="w-full max-w-2xl flex justify-center gap-6 pt-8 pb-6 text-sm font-medium">
        <span className="text-gray-400 cursor-pointer hover:text-indigo-400" onClick={() => navigate('/')}>start</span>
        <span className="text-indigo-500 cursor-default">edit</span>
        <span className="text-gray-400 cursor-not-allowed">share</span>
      </header>

      <main className="w-full max-w-md px-6 flex flex-col">
        {/* Title */}
        <h1 className="text-3xl font-medium tracking-tight mb-8">
          [<span className="italic font-bold">Capture</span>] Your Progress!
        </h1>

        {/* Photo Upload Section */}
        <div className="flex gap-4 mb-8">
          
          {/* Background Upload (16:9 Portrait) */}
          <div className="flex-1 flex flex-col items-center">
            <label className="w-full aspect-[9/16] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group mb-2 shadow-sm relative overflow-hidden">
              {/* Jika bgImage ada, tampilkan gambarnya. Jika tidak, tampilkan ikon upload */}
              {bgImage ? (
                <img src={bgImage} alt="Background Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImagePlus size={24} className="mb-2 group-hover:text-indigo-400" />
                  <span className="text-[10px] text-center px-4 leading-tight">Upload a 16:9 portrait photo</span>
                </>
              )}
              {/* Input file disembunyikan tapi akan aktif saat label diklik */}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, setBgImage)}
              />
            </label>
            <span className="text-xs font-semibold text-indigo-400">Background</span>
          </div>

          {/* Highlight Upload (1:1 Square) */}
          <div className="flex-1 flex flex-col items-center justify-center pt-8">
            <label className="w-full aspect-square bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group mb-2 shadow-sm relative overflow-hidden">
              {hlImage ? (
                <img src={hlImage} alt="Highlight Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImagePlus size={24} className="mb-2 group-hover:text-indigo-400" />
                  <span className="text-[10px] text-center px-4 leading-tight">Upload a 1:1 square photo</span>
                </>
              )}
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, setHlImage)}
              />
            </label>
            <span className="text-xs font-semibold text-indigo-400">Highlight</span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-5 w-full">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
            <input 
              type="text" 
              maxLength={20}
              placeholder="What are you working on?" 
              className="w-full p-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="text-right text-[10px] text-gray-400 mt-1">{title.length}/20</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
            <textarea 
              maxLength={50}
              rows="2"
              placeholder="Describe your current productivity moment in a few words ..." 
              className="w-full p-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-right text-[10px] text-gray-400 mt-1">{description.length}/50</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Additional Notes</label>
            <textarea 
              maxLength={100}
              rows="4"
              placeholder="Break down your productivity progress ....." 
              className="w-full p-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="text-right text-[10px] text-gray-400 mt-1">{notes.length}/100</div>
          </div>
        </div>

        {/* Generate Button - Nanti akan kita ubah logicnya untuk mengirim data ke halaman result */}
        {/* Generate Button */}
        <button 
          onClick={() => {
            // Validasi sederhana: pastikan minimal ada 1 foto atau judul sebelum lanjut
            if (!bgImage && !hlImage && !title) {
              alert("Isi minimal judul atau upload 1 foto dulu ya!");
              return;
            }
            // Bawa semua state (data) ke halaman result menggunakan navigate
            navigate('/result/focus', { 
              state: { title, description, notes, bgImage, hlImage } 
            });
          }}
          className="mt-8 w-full bg-indigo-400 hover:bg-indigo-500 transition-colors text-white py-3.5 rounded-full font-semibold shadow-sm"
        >
          Generate
        </button>
        
        <p className="text-center text-gray-400 text-xs mt-8">&copy; 2026 All Right Reserved</p>
      </main>
    </div>
  );
};

export default FocusEdit;