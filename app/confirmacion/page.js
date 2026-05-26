"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatCOP } from "../../lib/data";

export default function ConfirmacionPage() {
  const router = useRouter();
  const [orden, setOrden] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("orden");
    if (data) {
      setOrden(JSON.parse(data));
      setTimeout(() => setVisible(true), 100);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!orden) return null;

  const { nombre, almuerzo, direccion, pago, orden: numOrden, total } = orden;

  const PASOS_RECETA = almuerzo.receta || [];

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-[#FFF8F0]/90 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display font-bold text-[#6B3F1A] text-xl">🥘 MercaRecetas</span>
          <span className="text-xs font-body text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium">
            📍 Cúcuta
          </span>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 pb-12 pt-6">
        {/* Success hero */}
        <div
          className={`text-center mb-7 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-md">
            ✅
          </div>
          <h1 className="font-display font-bold text-[#6B3F1A] text-2xl">
            ¡Pedido confirmado,<br />{nombre.split(" ")[0]}!
          </h1>
          <p className="text-gray-500 font-body text-sm mt-2">
            Te avisamos por WhatsApp cuando tu kit salga a camino 🚀
          </p>
          <p className="text-xs text-gray-400 font-body mt-1">
            Orden: <span className="font-semibold text-[#6B3F1A]">{numOrden}</span>
          </p>
        </div>

        {/* Kit summary card */}
        <div
          className={`bg-white rounded-2xl overflow-hidden shadow-md mb-5 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className={`bg-gradient-to-r ${almuerzo.color} p-4 flex items-center gap-3`}>
            <span className="text-4xl">{almuerzo.emoji}</span>
            <div>
              <p className="text-white/70 text-xs font-body uppercase tracking-wide">Tu kit de almuerzo</p>
              <h2 className="text-white font-display font-bold text-lg leading-tight">
                {almuerzo.nombre}
              </h2>
            </div>
          </div>

          <div className="p-4">
            <h4 className="font-body font-semibold text-[#6B3F1A] text-sm mb-3">
              📦 Ingredientes incluidos:
            </h4>
            <ul className="space-y-1.5 mb-4">
              {almuerzo.ingredientes.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body text-gray-600">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {ing}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-3 flex justify-between text-sm font-body">
              <span className="text-gray-500">Total pagado</span>
              <span className="font-bold text-[#FF6B2B]">{formatCOP(total)}</span>
            </div>
            <div className="flex justify-between text-sm font-body mt-1">
              <span className="text-gray-500">Entrega en</span>
              <span className="text-gray-700 font-medium text-right max-w-[200px]">{direccion}</span>
            </div>
          </div>
        </div>

        {/* Recipe card */}
        <div
          className={`bg-white rounded-2xl p-5 shadow-md mb-5 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h4 className="font-display font-bold text-[#6B3F1A] text-lg mb-4">
            📋 Receta paso a paso
          </h4>
          <div className="space-y-3">
            {PASOS_RECETA.map((paso, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-[#FF6B2B] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm font-body text-gray-600 leading-relaxed">{paso}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-green-50 rounded-xl px-3 py-2 flex items-center gap-2">
            <span>⏱️</span>
            <p className="text-xs font-body text-green-700 font-medium">
              Tiempo total estimado: {almuerzo.tiempo} minutos
            </p>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div
          className={`transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href={`https://wa.me/573001234567`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] text-white font-body font-bold text-base shadow-lg shadow-green-200 hover:bg-green-600 transition-all active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Seguir pedido por WhatsApp
          </a>

          <button
            onClick={() => router.push("/")}
            className="w-full mt-3 py-3 rounded-2xl border-2 border-orange-200 text-[#FF6B2B] font-body font-semibold text-sm hover:bg-orange-50 transition-all"
          >
            Pedir otro almuerzo mañana →
          </button>
        </div>
      </main>
    </div>
  );
}
