import { create } from 'zustand';

export type QuoteStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface BookingResult {
  reference: string;
  callback: { iso: string; label: string };
  booking: {
    modelName: string;
    repairName: string;
    priceMin: number;
    priceMax: number;
    flow: 'walkin' | 'mailin';
  };
}

export interface QuoteState {
  step: QuoteStep;
  category?: string;
  brandSlug?: string;
  modelSlug?: string;
  repairSlug?: string;
  customer: {
    name?: string;
    phone?: string;
    email?: string;
    notes?: string;
    flow?: 'walkin' | 'mailin';
  };
  submitted: boolean;
  bookingResult?: BookingResult;
  setCategory: (c: string) => void;
  setBrand: (b: string) => void;
  setModel: (m: string) => void;
  setRepair: (r: string) => void;
  setStep: (s: QuoteStep) => void;
  reset: () => void;
  setCustomer: (data: Partial<QuoteState['customer']>) => void;
  markSubmitted: (result: BookingResult) => void;
}

export const useQuoteStore = create<QuoteState>(set => ({
  step: 1,
  customer: {},
  submitted: false,
  setCategory: (c) => set({ category: c, brandSlug: undefined, modelSlug: undefined, repairSlug: undefined, step: 2 }),
  setBrand: (b) => set({ brandSlug: b, modelSlug: undefined, repairSlug: undefined, step: 3 }),
  setModel: (m) => set({ modelSlug: m, repairSlug: undefined, step: 4 }),
  setRepair: (r) => set({ repairSlug: r, step: 5 }),
  setStep: (s) => set({ step: s }),
  setCustomer: (data) => set(state => ({ customer: { ...state.customer, ...data } })),
  markSubmitted: (result) => set({ submitted: true, step: 6, bookingResult: result }),
  reset: () => set({ step: 1, category: undefined, brandSlug: undefined, modelSlug: undefined, repairSlug: undefined, customer: {}, submitted: false, bookingResult: undefined })
}));
