"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import AlmuerzoCard from "../components/AlmuerzoCard";
import { ALMUERZOS_HOY } from "../lib/data";

export default function Home() {
  const router = useRouter();
  const [seleccionado, setSeleccionado] = useState(null);

  function elegirPorMi() {
    const opcionDelDia = ALMUERZOS_HOY.find((a) => a.esOpcionDelDia);
    setSeleccionado(opcionDelDia);
    setTimeout(() => {
      router.push(`/checkout?id=${opcionDelDia.id}`);
    }, 600);
  }

  function seleccionar(almuerzo) {
    setSeleccionado(almuerzo);
    setTimeout(() => {
      router.push(`/checkout?id=${almuerzo.id}`);
    }, 500);
  }

  const hoy = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header />

      <main className="max-w-md mx-auto px-4 pb-12">
        {/* Hero section */}
        <div className="pt-6 pb-5 text-center">
          <p className="text-sm font-body text-orange-500 font-semibold uppercase tracking-widest mb-1">
            {hoy}
          </p>
          <h1 className="font-display text-3xl font-bold text-[#6B3F1A] leading-tight">
            ¿Qué almuerzas
            <br />
            <span className="text-[#FF6B2B]">hoy?</span>
          </h1>
          <p className="text-gray-500 font-body text-sm mt-2 leading-relaxed">
            3 opciones. Ingredientes exactos. Listo en 30 min.
            <br />
            Sin pensar, sin mercado, sin estrés.
          </p>
        </div>

        {/* "Elegir por mí" CTA — el botón principal */}
        <button
          onClick={elegirPorMi}
          className="w-full py-4 rounded-2xl bg-[#FF6B2B] text-white font-body font-bold text-base shadow-lg shadow-orange-300 hover:bg-orange-600 active:scale-95 transition-all duration-200 mb-6 animate-pulse-soft"
        >
          ✨ Elegir por mí
          <span className="block text-xs font-normal opacity-80 mt-0.5">
            Te recomendamos la mejor opción del día
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-orange-100" />
          <span className="text-xs text-gray-400 font-body">o elige tú mismo</span>
          <div className="flex-1 h-px bg-orange-100" />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {ALMUERZOS_HOY.map((almuerzo, i) => (
            <div
              key={almuerzo.id}
              style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
              className="animate-fade-up"
            >
              <AlmuerzoCard
                almuerzo={almuerzo}
                onSeleccionar={seleccionar}
                seleccionado={seleccionado?.id === almuerzo.id}
              />
            </div>
          ))}
        </div>

        {/* Trust footer */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "📦", text: "Ingredientes exactos" },
            { icon: "⏱️", text: "Listo en 30 min" },
            { icon: "🚚", text: "A tu puerta" },
          ].map((item) => (
            <div key={item.text} className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs text-gray-500 font-body leading-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
