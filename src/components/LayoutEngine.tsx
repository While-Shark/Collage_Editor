import React, { useRef } from 'react';
import { useStore } from '../store';
import { ImagePlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LayoutEngine: React.FC = () => {
  const { template, style, images, setImage } = useStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeIndex !== null) {
      const url = URL.createObjectURL(file);
      setImage(activeIndex, url);
    }
  };

  const triggerUpload = (index: number) => {
    setActiveIndex(index);
    fileInputRef.current?.click();
  };

  const removeImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setImage(index, null);
  };

  const renderSlot = (index: number, className: string) => {
    const imageUrl = images[index];
    return (
      <div
        className={`relative overflow-hidden cursor-pointer group bg-surface-container-highest ${className}`}
        style={{ borderRadius: `${style.cornerRadius}px` }}
        onClick={() => triggerUpload(index)}
      >
        <AnimatePresence mode="wait">
          {imageUrl ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <img
                src={imageUrl}
                alt={`Slot ${index}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={(e) => removeImage(e, index)}
                className="absolute top-2 right-2 p-1 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center text-primary/40 gap-2"
            >
              <ImagePlus size={32} />
              <span className="text-[10px] font-bold uppercase tracking-widest">上传</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="w-full aspect-square bg-white shadow-xl rounded-2xl overflow-hidden relative">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <div 
        className="w-full h-full flex"
        style={{ padding: `${style.spacing}px` }}
      >
        {template === '3-image' ? (
          <div className="flex w-full h-full" style={{ gap: `${style.borderWidth}px` }}>
            <div className="flex-[2] h-full">
              {renderSlot(0, "w-full h-full")}
            </div>
            <div className="flex-[1] flex flex-col h-full" style={{ gap: `${style.borderWidth}px` }}>
              {renderSlot(1, "flex-1")}
              {renderSlot(2, "flex-1")}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full" style={{ gap: `${style.borderWidth}px` }}>
            {renderSlot(0, "w-full h-full")}
            {renderSlot(1, "w-full h-full")}
            {renderSlot(2, "w-full h-full")}
            {renderSlot(3, "w-full h-full")}
          </div>
        )}
      </div>
    </div>
  );
};
