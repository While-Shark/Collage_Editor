import React from 'react';
import { useStore } from '../store';
import { Download, Share2 } from 'lucide-react';
import { exportToCanvas } from '../CanvasUtils';

export const Editor: React.FC = () => {
  const { style, setStyle, template, images } = useStore();

  const handleExport = async (type: 'album' | 'wechat') => {
    try {
      const dataUrl = await exportToCanvas(template, images, style);
      const link = document.createElement('a');
      link.download = `editorial-canvas-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      if (type === 'wechat') {
        alert('Image generated! In a real app, this would trigger WeChat sharing SDK.');
      }
    } catch (err) {
      console.error('Export failed', err);
    }
  };

  return (
    <div className="space-y-8">
      <section className="space-y-6 bg-surface-container-low/50 p-6 rounded-3xl backdrop-blur-sm border border-white/20">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-headline font-semibold text-sm tracking-tight text-on-surface">边框宽度</label>
            <span className="text-primary text-xs font-bold font-mono bg-primary/10 px-2 py-1 rounded-full">{style.borderWidth}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={style.borderWidth}
            onChange={(e) => setStyle({ borderWidth: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-secondary-container rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-headline font-semibold text-sm tracking-tight text-on-surface">圆角大小</label>
            <span className="text-primary text-xs font-bold font-mono bg-primary/10 px-2 py-1 rounded-full">{style.cornerRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            value={style.cornerRadius}
            onChange={(e) => setStyle({ cornerRadius: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-secondary-container rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-headline font-semibold text-sm tracking-tight text-on-surface">内边距</label>
            <span className="text-primary text-xs font-bold font-mono bg-primary/10 px-2 py-1 rounded-full">{style.spacing}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="32"
            value={style.spacing}
            onChange={(e) => setStyle({ spacing: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-secondary-container rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleExport('album')}
          className="flex items-center justify-center gap-2 py-4 px-6 bg-surface-container-highest text-on-surface font-headline font-bold rounded-full hover:bg-surface-container-high transition-colors active:scale-95"
        >
          <Download size={20} />
          保存到相册
        </button>
        <button
          onClick={() => handleExport('wechat')}
          className="flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-primary to-primary-dim text-white font-headline font-bold rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity active:scale-95"
        >
          <Share2 size={20} />
          微信分享
        </button>
      </div>
    </div>
  );
};
