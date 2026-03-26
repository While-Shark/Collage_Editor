import React from 'react';
import { useStore, TemplateType } from '../store';
import { motion } from 'framer-motion';
import { Layout, Grid2X2 } from 'lucide-react';

const templates: { id: TemplateType; name: string; icon: React.ReactNode; description: string }[] = [
  {
    id: '3-image',
    name: '三图流动',
    icon: <Layout size={24} />,
    description: '最适合时尚故事和社论',
  },
  {
    id: '4-image',
    name: '平衡方块',
    icon: <Grid2X2 size={24} />,
    description: '视觉叙事的完美对称',
  },
];

export const TemplateGallery: React.FC = () => {
  const { template: currentTemplate, setTemplate, setView } = useStore();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {templates.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setTemplate(t.id);
              setView('editor');
            }}
            className={`cursor-pointer p-6 rounded-3xl border-2 transition-all ${
              currentTemplate === t.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-transparent bg-surface-container-low hover:bg-surface-container-high'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${currentTemplate === t.id ? 'bg-primary text-white' : 'bg-surface-container-highest text-primary'}`}>
                {t.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-headline font-bold text-lg text-on-surface">{t.name}</h3>
                <p className="text-sm text-on-surface-variant mt-1">{t.description}</p>
              </div>
              {currentTemplate === t.id && (
                <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                  当前使用
                </div>
              )}
            </div>
            
            <div className="mt-6 aspect-square w-full max-w-[200px] mx-auto bg-surface-container-highest rounded-xl overflow-hidden p-2 opacity-60">
               {t.id === '3-image' ? (
                 <div className="flex gap-1 h-full">
                    <div className="flex-[2] bg-primary/20 rounded-sm" />
                    <div className="flex-[1] flex flex-col gap-1">
                       <div className="flex-1 bg-primary/20 rounded-sm" />
                       <div className="flex-1 bg-primary/20 rounded-sm" />
                    </div>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                    <div className="bg-primary/20 rounded-sm" />
                    <div className="bg-primary/20 rounded-sm" />
                    <div className="bg-primary/20 rounded-sm" />
                    <div className="bg-primary/20 rounded-sm" />
                 </div>
               )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
