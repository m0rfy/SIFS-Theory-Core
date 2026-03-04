/**
 * SIFS Theory (Spacetime) — единый источник констант и формул для расчётов и визуализаторов.
 *
 * Источники: docs/ (theory, calculations, predictions, data), документация Процессор
 * (SIFS_Core_Presentation, SIFS_Theory_Documentation_v1, SIFS_Processor_Spec_v1).
 *
 * Контекст: этот репозиторий — SIFS Theory (Spacetime), k размерный (≈ 0.1 M_Pl).
 * Для SIFS System (приложения, дашборды) используется k = 1/π² безразмерный — см. related-projects.md.
 */

// ─── Фундаментальные константы (CODATA-ориентированные) ─────────────────────

export const G = 6.674e-11;           // м³/(кг·с²)
export const c = 2.998e8;             // м/с
export const hbar = 1.055e-34;        // Дж·с

/** Планковская масса, кг */
export const M_Pl_kg = Math.sqrt((hbar * c) / G);
/** Планковская масса, ГэВ (1 GeV/c² ≈ 1.78×10⁻²⁷ kg) */
export const M_Pl_GeV = 1.22e19;
/** Планковская длина, м */
export const l_Pl = Math.sqrt((G * hbar) / (c * c * c));

/** Варпинг-параметр в единицах M_Pl (безразмерный множитель). k ≈ 0.1 M_Pl. */
export const k_over_M_Pl = 0.1;

/** Для приложений/сравнения: безразмерный k из SIFS System (1/π²). */
export const K_SYSTEM = 1 / (Math.PI * Math.PI);

// ─── Золотое сечение и уровни (связь с Процессор / SIFS System) ─────────────

export const PHI = (1 + Math.sqrt(5)) / 2;
/** Индексы уровней (10 уровней), по документации Процессор. */
export const FIB: number[] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

// ─── Формулы теории (Spacetime) ───────────────────────────────────────────

/** Варпинг-фактор W(S) = exp(−2k|S|). k в планковских единицах. */
export function W(S: number, k = k_over_M_Pl): number {
  return Math.exp(-2 * k * Math.abs(S));
}

/** Наблюдаемая масса из bulk: m_obs = M_bulk × exp(−2k|S|). */
export function massObserved(M_bulk: number, S: number, k = k_over_M_Pl): number {
  return M_bulk * W(S, k);
}

/** Масштабная координата |S| из отношения масс: |S| = ln(M_Pl/m) / (2k). */
export function S_from_mass_ratio(M_high: number, m_low: number, k = k_over_M_Pl): number {
  return Math.log(M_high / m_low) / (2 * k);
}

/** Эффективная гравитационная константа: G_eff = G_Pl × exp(−2k|S|). */
export function G_eff(S: number, k = k_over_M_Pl): number {
  return W(S, k);
}

/** Эффективная космологическая постоянная: Λ_eff ∝ exp(−2k|S_global|). */
export function Lambda_eff_factor(S_global: number, k = k_over_M_Pl): number {
  return W(S_global, k);
}

// ─── Данные наблюдений (для верификации визуализаторов) ───────────────────

/** DESI 2025: w(z) = w0 + wa×z/(1+z). */
export const DESI = {
  w0: -0.827,
  wa: -0.75,
};

export function w_z(z: number, w0 = DESI.w0, wa = DESI.wa): number {
  return w0 + (wa * z) / (1 + z);
}

/** Масса протона, ГэВ. */
export const m_proton_GeV = 0.938;
/** |S| для протона (из расчёта docs/calculations/proton-mass). */
export const S_proton = 11.2;

/** Масштабы для иерархии масс (log10(E/GeV), |S|). */
export const MASS_HIERARCHY = [
  { name: 'Планк', logGeV: 19, S: 0, realValue: '1.22 × 10¹⁹ GeV' },
  { name: 'GUT', logGeV: 16, S: 2, realValue: '10¹⁶ GeV' },
  { name: 'Weak', logGeV: 2.4, S: 8.5, realValue: '246 GeV' },
  { name: 'Proton', logGeV: 0.938, S: 11.2, realValue: '938 MeV' },
  { name: 'Electron', logGeV: -3.29, S: 18.7, realValue: '511 keV' },
] as const;

/** Константы связи по взаимодействиям (|S|, log10(α), формула). */
export const COUPLING_SCALES = [
  { name: 'Gravity', S: 20, logAlpha: -38, formula: 'G_eff = G_Pl × exp(−2k|S|)', color: '#8b5cf6' },
  { name: 'Weak', S: 9, logAlpha: -6, formula: 'G_F ∝ exp(−4k|S|_weak)', color: '#3b82f6' },
  { name: 'EM', S: 5.1, logAlpha: Math.log10(1 / 137), formula: 'α ≈ 1/137, |S| ≈ ln(137π)', color: '#06b6d4' },
  { name: 'Strong', S: 2.8, logAlpha: 0, formula: 'α_s ≈ π/|S|ln(μ/Λ)', color: '#10b981' },
] as const;
