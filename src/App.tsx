import { useStore } from './store';
import { Editor } from './components/Editor';
import { TemplateGallery } from './components/TemplateGallery';
import { GridSimulator } from './components/GridSimulator';
import { LayoutEngine } from './components/LayoutEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, Layout, Grid2X2, Settings2, Share2 } from 'lucide-react';

export default function App() {
  const { view, setView, template } = useStore();

  const renderView = () => {
    switch (view) {
      case 'gallery':
        return <TemplateGallery />;
      case 'preview':
        return <GridSimulator />;
      case 'editor':
      default:
        return (
          <div className="space-y-8">
            <LayoutEngine />
            <Editor />
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (view) {
      case 'gallery': return template === '3-image' ? '三图布局' : '四图布局';
      case 'preview': return '九宫格预览';
      case 'editor': return '拼图编辑器';
      default: return '拼图编辑器';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full px-5 py-4 flex justify-between items-center bg-background/60 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="p-2 text-primary bg-primary/10 rounded-xl">
            <Grid3X3 size={20} />
          </div>
          <h1 className="font-headline font-extrabold tracking-tighter text-on-surface text-lg">
            {getTitle()}
          </h1>
        </div>
        <button className="p-2 text-primary hover:opacity-80 transition-opacity active:scale-95">
          <Share2 size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-5 max-w-2xl mx-auto">
        {view !== 'preview' && (
          <section className="mb-10">
            <span className="text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">
              {view === 'gallery' ? '精选模板' : '实时编辑'}
            </span>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface leading-tight">
              {view === 'gallery' ? '构建你的视觉叙事。' : '缝合你的记忆。'}
            </h2>
            <p className="text-on-surface-variant mt-3 font-body text-sm leading-relaxed">
              {view === 'gallery' 
                ? '选择一个精心设计的结构来展示你的视觉故事。为挑剔的眼光提供完美对齐。'
                : '调整边框、圆角和间距，打造你完美的拼图作品。'}
            </p>
          </section>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center px-6 max-w-md mx-auto bg-white/70 backdrop-blur-2xl rounded-full shadow-[0_32px_48px_rgba(57,38,76,0.06)] h-20 border border-white/20">
        <button
          onClick={() => setView('gallery')}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${
            view === 'gallery' ? 'bg-primary text-white shadow-lg shadow-primary/30 -translate-y-2' : 'text-on-surface/50'
          }`}
        >
          <Layout size={20} />
          <span className="font-label text-[8px] uppercase tracking-widest font-bold mt-1">布局</span>
        </button>

        <button
          onClick={() => setView('preview')}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${
            view === 'preview' ? 'bg-primary text-white shadow-lg shadow-primary/30 -translate-y-2' : 'text-on-surface/50'
          }`}
        >
          <Grid3X3 size={20} />
          <span className="font-label text-[8px] uppercase tracking-widest font-bold mt-1">预览</span>
        </button>

        <button
          onClick={() => setView('editor')}
          className={`flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 ${
            view === 'editor' ? 'bg-primary text-white shadow-lg shadow-primary/30 -translate-y-2' : 'text-on-surface/50'
          }`}
        >
          <Settings2 size={20} />
          <span className="font-label text-[8px] uppercase tracking-widest font-bold mt-1">编辑</span>
        </button>
      </nav>
    </div>
  );
}
