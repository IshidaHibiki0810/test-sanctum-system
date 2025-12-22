'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlineCloudUpload, HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // プレビュー表示用
      onImageSelect(file); // 親コンポーネントにファイルを渡す
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-black uppercase tracking-[0.2em] text-[#B5ADA5] mb-3 ml-1 flex items-center gap-2">
        <HiOutlinePhotograph size={16} />
        カバー画像
      </label>

      {!preview ? (
        <div 
          {...getRootProps()} 
          className={`
            border-2 border-dashed rounded-[2rem] p-10 transition-all cursor-pointer
            flex flex-col items-center justify-center gap-4
            ${isDragActive ? 'border-[#C5A59E] bg-[#F3E5E3]/30' : 'border-[#F2EDE9] bg-[#FDFBF9] hover:border-[#C5A59E]/50'}
          `}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#C5A59E] shadow-sm">
            <HiOutlineCloudUpload size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-[#8E7D73]">画像をドラッグ＆ドロップ</p>
            <p className="text-[10px] text-[#B5ADA5] mt-1">またはクリックしてファイルを選択</p>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-[#F2EDE9] group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button 
            onClick={removeImage}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <HiOutlineX size={20} />
          </button>
        </div>
      )}
    </div>
  );
}