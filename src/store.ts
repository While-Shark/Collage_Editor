import { create } from 'zustand';

export type TemplateType = '3-image' | '4-image';

export interface LayoutStyle {
  borderWidth: number;
  cornerRadius: number;
  spacing: number;
}

export interface ImageData {
  id: string;
  url: string;
}

interface AppState {
  template: TemplateType;
  style: LayoutStyle;
  images: (string | null)[];
  view: 'editor' | 'gallery' | 'preview';
  setTemplate: (template: TemplateType) => void;
  setStyle: (style: Partial<LayoutStyle>) => void;
  setImage: (index: number, url: string | null) => void;
  setView: (view: 'editor' | 'gallery' | 'preview') => void;
  resetImages: () => void;
}

export const useStore = create<AppState>((set) => ({
  template: '3-image',
  style: {
    borderWidth: 12,
    cornerRadius: 24,
    spacing: 16,
  },
  images: [null, null, null, null], // Max 4 images
  view: 'editor',
  setTemplate: (template) => set({ template, images: template === '3-image' ? [null, null, null] : [null, null, null, null] }),
  setStyle: (style) => set((state) => ({ style: { ...state.style, ...style } })),
  setImage: (index, url) => set((state) => {
    const newImages = [...state.images];
    newImages[index] = url;
    return { images: newImages };
  }),
  setView: (view) => set({ view }),
  resetImages: () => set((state) => ({ images: state.template === '3-image' ? [null, null, null] : [null, null, null, null] })),
}));
