// src/global.d.ts
export {}; // modul kosong supaya ini di-augment global
declare global {
  interface Window {
    Pace?: {
      restart: () => void;
      start?: () => void;
      stop?: () => void;
    };
  }
}
