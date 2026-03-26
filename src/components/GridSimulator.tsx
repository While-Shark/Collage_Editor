import React from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { LayoutEngine } from './LayoutEngine';

export const GridSimulator: React.FC = () => {
  const { setView } = useStore();

  const mockImages = [
    "https://picsum.photos/seed/arch/400/400",
    "https://picsum.photos/seed/nature/400/400",
    "https://picsum.photos/seed/purple/400/400",
    "https://picsum.photos/seed/minimal/400/400",
    "https://picsum.photos/seed/lake/400/400",
    "https://picsum.photos/seed/camera/400/400",
    "https://picsum.photos/seed/cottage/400/400",
    "https://picsum.photos/seed/waterfall/400/400",
  ];

  return (
    <div className="space-y-8">
      <div className="surface-container-low rounded-3xl p-6 shadow-sm border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdoX0G-E2cIgZ7bUo1I0l3woyxNA-UdyET_vxNxKGueHGaTpNojkny34hyTZ_PZ8OCcFDp0wH86iYDQjY0R9Xia_NUgOR2YgbJ_ZrKIPUpfp9POEnqei1kiJOkLlyOZ2XHhLD2e4hB-fgOSSU5M3SLv-45lH0Qg1krp2JZRO1jkBb3jejGuczBWC6Rca2F_6Pg4ETbsLuYW24nr98k-TxCR1V2lVOG8Xif16nOC-ZlaQvDjQGSVJ3HUSKO88IWq3AwZNKbZseiugQ" 
              alt="Elena Veda"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="font-headline font-bold text-on-surface">Elena Veda</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">朋友圈 • 刚刚</p>
          </div>
        </div>
        
        <p className="font-body text-sm text-on-surface mb-6 leading-relaxed">
          今天城市的影与光。早晨散步时缝合的记忆。 ✨
        </p>

        <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden bg-surface-container">
          {/* Row 1 */}
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square bg-white p-0.5">
             <div className="w-full h-full scale-[0.95]">
                <LayoutEngine />
             </div>
          </div>
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[1]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          
          {/* Row 2 */}
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[2]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[3]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[4]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>

          {/* Row 3 */}
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[5]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[6]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square bg-surface-container-highest">
            <img src={mockImages[7]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-outline-variant/10">
          <div className="flex gap-4">
            <Heart size={20} className="text-on-surface-variant" />
            <MessageCircle size={20} className="text-on-surface-variant" />
          </div>
          <Bookmark size={20} className="text-on-surface-variant" />
        </div>
      </div>

      <button
        onClick={() => setView('editor')}
        className="w-full py-5 bg-gradient-to-r from-primary to-primary-dim text-white rounded-full font-headline font-bold text-base shadow-lg shadow-primary/20 active:scale-95 transition-transform"
      >
        返回编辑器
      </button>
    </div>
  );
};
