"use client";
import { formatCOP } from "../lib/data";

export default function AlmuerzoCard({ almuerzo, onSeleccionar, seleccionado }) {
  return (
    <div
      onClick={() => onSeleccionar(almuerzo)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
        seleccionado
          ? "border-[#FF6B2B] shadow-xl shadow-orange-200 scale-[1.02]"
          : "border-transparent shadow-md hover:shadow-lg hover:scale-[1.01]"
      } bg-white`}
    >
      {/* Gradient top stripe */}
      <div className={`h-2 w-full bg-gradient-to-r ${almuerzo.color}`} />

      {/* Badge */}
      {almuerzo.badge && (
        <div className="absolute top-4 right-3 z-10">
          <span className="text-xs font-body font-semibold bg-white/90 backdrop-blur-sm text-[#6B3F1A] px-2 py-1 rounded-full shadow-sm">
            {almuerzo.badge}
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Emoji illustration */}
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${almuerzo.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-md`}
          >
            {almuerzo.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[#6B3F1A] text-lg leading-tight">
              {almuerzo.nombre}
            </h3>
            <p className="text-sm text-gray-500 font-body mt-0.5 leading-snug">
              {almuerzo.descripcion}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-600 font-body">
            <span className="flex items-center gap-1">
              ⏱️ <span className="font-medium">{almuerzo.tiempo} min</span>
            </span>
            <span className="flex items-center gap-1">
              👤 <span className="font-medium">1 persona</span>
            </span>
          </div>
          <span className="font-display font-bold text-[#FF6B2B] text-xl">
            {formatCOP(almuerzo.precio)}
          </span>
        </div>

        {/* CTA */}
        <button
          className={`mt-3 w-full py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${
            seleccionado
              ? "bg-[#FF6B2B] text-white shadow-md"
              : "bg-orange-50 text-[#FF6B2B] hover:bg-orange-100"
          }`}
        >
          {seleccionado ? "✓ Seleccionado — Continuar" : "Pedir este almuerzo"}
        </button>
      </div>
    </div>
  );
}
