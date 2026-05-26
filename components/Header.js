"use client";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥘</span>
          <span className="font-display font-bold text-[#6B3F1A] text-xl tracking-tight">
            MercaRecetas
          </span>
        </div>
        <span className="text-xs font-body text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium">
          📍 Cúcuta
        </span>
      </div>
    </header>
  );
}
