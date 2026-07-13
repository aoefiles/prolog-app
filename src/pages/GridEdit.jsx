import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagePlus } from 'lucide-react';

const GridEdit = () => {
  const navigate = useNavigate();
  
  // State untuk teks
  const [title, setTitle] = useState('');

  // State array untuk menyimpan 4 URL gambar
  const [images, setImages] = useState([null, null, null, null]);

  // Fungsi untuk menangani upload gambar pada index tertentu
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
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
        {/* Header */}
        <h1 className="text-3xl font-medium tracking-tight mb-6">
          [<span className="italic font-bold">Customize</span>] Your Log!
        </h1>

        {/* Title Input */}
        <div className="mb-8">
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

        {/* 4 Photos Grid Upload Section */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex flex-col">
              <label className="w-full aspect-[4/5] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group shadow-sm relative overflow-hidden">
                {images[index] ? (
                  <img src={images[index]} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <ImagePlus size={24} className="mb-2 group-hover:text-indigo-400" />
                    <span className="text-[9px] text-center px-4 leading-tight">Upload a 4:5 portrait photo</span>
                  </>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </label>
              {/* Optional Name placeholder as per design */}
              <div className="mt-2 border-b border-gray-300 pb-1">
                <p className="text-[10px] font-semibold text-gray-600">Photo {index + 1}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <button 
          onClick={() => {
            const uploadedCount = images.filter(img => img !== null).length;
            if (uploadedCount === 0 && !title) {
              alert("Isi judul atau minimal 1 foto untuk lanjut!");
              return;
            }
            navigate('/result/grid', { state: { title, images } });
          }}
          className="mt-4 w-full bg-indigo-400 hover:bg-indigo-500 transition-colors text-white py-3.5 rounded-full font-semibold shadow-sm"
        >
          Generate
        </button>
        
        <p className="text-center text-gray-400 text-xs mt-8">&copy; 2026 All Right Reserved</p>
      </main>
    </div>
  );
};

export default GridEdit;