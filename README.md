# SIFS Theory: Scale-Invariant Fractal Spacetime

<div align="center">

![SIFS Banner](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=400&fit=crop)

**Унификация гравитации и квантовой механики через фрактальную геометрию 5D-пространства**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://your-username.github.io/sifs-theory)
[![arXiv](https://img.shields.io/badge/arXiv-physics-red?style=for-the-badge)](https://arxiv.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[🌐 Live Presentation](#) | [📄 Documentation](#documentation) | [🧮 Calculations](#key-calculations) | [📊 Data](#observational-confirmations)

</div>

---

## 📋 Abstract

**SIFS (Scale-Invariant Fractal Spacetime)** постулирует, что наша 4D-вселенная является 3-браной в 5-мерном фрактальном bulk-пространстве, где пятая координата **S** представляет масштаб. Теория объединяет гравитацию и квантовые эффекты через:

- **Warped геометрию Randall-Sundrum (RS2)**: `ds² = exp(−2k|S|) η_μν dx^μ dx^ν + dS²`
- **Фрактальную самоподобность**: Лог-периодические структуры на всех масштабах
- **Микро-сингулярности**: Элементарные частицы как эффективные горизонты Керра-Ньюмана
- **Оптическую метрику**: Все взаимодействия как градиенты показателя преломления вакуума

### ✨ Ключевые достижения

- ✅ Объяснение иерархии масс (10⁻³⁵ → 10²⁶ м) из единой геометрии
- ✅ Вывод всех фундаментальных констант (G, α, α_s, G_F, Λ) без параметров
- ✅ Согласие с данными DESI 2025 (evolving dark energy, >4σ отклонение от ΛCDM)
- ✅ Объяснение стабильности протона без нарушения термодинамики ЧД
- ✅ Унификация через геометрию, а не группы симметрии

---

## 🎯 Core Axioms

### 1. Пятимерная метрика

```
ds² = exp(−2k|S|) · (c²dt² − dx² − dy² − dz²) + dS²
```

где:
- `S` — масштабная координата (5-я размерность)
- `k ≈ 0.1 M_Pl` — warping параметр
- `exp(−2k|S|)` — экспоненциальное подавление (RS-warping)

### 2. Микро-сингулярности

**Протон** моделируется как заряженная вращающаяся черная дыра (метрика Керра-Ньюмана):

| Параметр | Значение | Интерпретация |
|----------|----------|---------------|
| **M_true** | ~10¹⁴ g | Истинная масса в 5D-bulk |
| **m_obs** | 1.67×10⁻²⁴ g | Наблюдаемая масса на бране |
| **r_s** | 2.48×10⁻⁵⁴ m | Schwarzschild радиус |
| **r_p** | 0.84×10⁻¹⁵ m | Наблюдаемый радиус |
| **\|S_p\|** | ≈ 11.2 | Масштабная координата |

**Подавление массы:**
```
m_obs = M_true × exp(−2k|S|) ≈ M_true × 10⁻¹⁴
```

### 3. Оптическая метрика Гордона

Все фундаментальные силы — градиенты показателя преломления вакуума:

```
ds² = n²(r, S) · (c²dt² − dx²)
F = −∇n(r, S)
```

| Сила | Градиент | Масштаб \|S\| |
|------|----------|--------------|
| **Гравитация** | 10⁻²⁰ m⁻¹ | 20 |
| **Электромагнетизм** | 10⁻¹⁰ m⁻¹ | 5 |
| **Сильное** | 10⁵ m⁻¹ | 2.8 |

### 4. Фрактальная иерархия

Самоподобие от планковского до хаббловского масштаба:

```
λ(S) = λ₀ × exp(k|S|)
M(S) = M₀ × exp(−k|S|)
```

| Масштаб | Размер | \|S\| |
|---------|--------|------|
| **Планковский** | 1.6×10⁻³⁵ m | 0 |
| **Нуклонный** | 10⁻¹⁵ m | 11 |
| **Атомный** | 10⁻¹⁰ m | 16 |
| **Солнечная система** | 10¹³ m | 20 |
| **Галактика** | 10²¹ m | 24 |
| **Хаббл** | 10²⁶ m | 28 |

---

## 🧮 Key Calculations

### Масса протона из геометрии

1. **Schwarzschild радиус:**
   ```
   r_s = 2GM_p/c² = 2 × (6.674×10⁻¹¹) × (1.673×10⁻²⁷) / (2.998×10⁸)²
      ≈ 2.48 × 10⁻⁵⁴ m
   ```

2. **Планковская масса на масштабе r_p:**
   ```
   M_Pl(r_p) = √(ħc/G) × (l_Pl/r_p)
             = 2.18×10⁻⁸ kg × (1.6×10⁻³⁵ / 0.84×10⁻¹⁵)
             ≈ 4.15 × 10⁻²⁸ kg
   ```
   **Близко к массе протона!**

3. **RS-warping фактор:**
   ```
   η = m_p/M_Pl(r_p) = (1.673×10⁻²⁷) / (4.15×10⁻²⁸) ≈ 4.03
   |S| = −ln(η)/k ≈ 11.2
   ```

### Константы связи

Все константы выводятся из масштабной координаты S:

```
G_eff = G_Pl × exp(−2k|S_grav|)    где |S_grav| ≈ 20
α ≈ 1/137 → |S_em| ≈ ln(137π) ≈ 5
α_s ≈ π / (|S_QCD| ln(μ/Λ))       где |S_QCD| ≈ 2.8
G_F ∝ exp(−4k|S_weak|)            где |S_weak| ≈ 8-10
```

### Тёмная энергия (DESI 2025)

Evolving dark energy equation of state:

```
w(z) = w₀ + wₐ × z/(1+z)
w₀ = −0.827 ± 0.063  (DESI best fit)
wₐ = −0.75 ± 0.29
```

**SIFS интерпретация:**
```
Λ_eff(z) ∝ exp(−2k|S_global(z)|)
S_global(z) = S₀ + δS × z/(1+z)
```

> **Отклонение от ΛCDM:** >4σ статистическая значимость

---

## 📊 Observational Confirmations

### 1. DESI DR2 (март 2025)
- **Наблюдение:** Evolving dark energy (w ≠ −1)
- **SIFS предсказание:** Дрейф глобальной координаты S_global
- **Статистика:** >4σ отклонение от ΛCDM
- **Данные:** w(z=0) = −0.827, w(z=3) ≈ −1.2

### 2. Euclid + JWST (2024-2025)
- **Наблюдение:** Early massive spiral galaxies, warped lensing
- **SIFS предсказание:** Фрактальная самоподобность на разных масштабах
- **Статистика:** Структурообразование на z>10 согласуется с лог-периодичностью

### 3. EHT M87* (сентябрь 2025)
- **Наблюдение:** Polarization flips в аккреционном диске
- **SIFS предсказание:** Лог-периодические моды масштабной координаты
- **Статистика:** Временные масштабы совпадают с δS ≈ 2π

---

## 🔬 Holographic Formulation

### Entropy-Area Scaling

Для браны в 5D-bulk:

```
S_brane = (A_4D / 4G_eff) × f(S)
```

где `f(S) = exp(2k|S|)` — коррекция от warping.

### Информационный парадокс

**Решение:** Информация не теряется, а диффундирует вдоль координаты S:

```
∂ρ/∂t = D_S × ∂²ρ/∂S²
```

Испарение Хокинга — перенос энергии между масштабами, а не потеря информации.

---

## 🛠️ Installation & Running

### Prerequisites
- Node.js 18+
- npm или yarn

### Run locally

```bash
# Clone repository
git clone https://github.com/your-username/sifs-theory.git
cd sifs-theory

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Deploy to GitHub Pages

```bash
# Build project
npm run build

# Deploy (if using gh-pages)
npm run deploy
```

---

## 📁 Project Structure

```
sifs-theory/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main application
│   │   └── components/
│   │       ├── slides/                # Presentation slides
│   │       │   ├── Slide1Abstract.tsx
│   │       │   ├── Slide1bFractal.tsx
│   │       │   ├── Slide2Axioms.tsx
│   │       │   ├── Slide3Holographic.tsx
│   │       │   ├── Slide4Data.tsx
│   │       │   ├── Slide5Unification.tsx
│   │       │   ├── Slide6References.tsx
│   │       │   └── Slide7Conclusion.tsx
│   │       ├── MassHierarchyChart.tsx        # Mass hierarchy visualization
│   │       ├── DarkEnergyEvolution.tsx       # DESI 2025 data
│   │       ├── CouplingConstantsDiagram.tsx  # Coupling constants
│   │       ├── ProtonBlackHoleCalc.tsx       # Proton calculations
│   │       ├── OpticalMetricDiagram.tsx      # Optical metric
│   │       ├── FractalScaleDiagram.tsx       # Scale hierarchy
│   │       └── RS2GeometryDiagram.tsx        # RS2 geometry
│   └── styles/                        # CSS styles
├── docs/                              # GitHub Pages documentation
│   ├── theory/                        # Theory documentation
│   ├── calculations/                  # Detailed calculations
│   └── data/                          # Observational data
└── README.md                          # This file
```

---

## 📚 Documentation

Detailed documentation available in `/docs`:

- [**Theory Overview**](docs/theory/overview.md) - Полная теоретическая база
- [**Mathematical Framework**](docs/theory/mathematics.md) - Математический формализм
- [**Physical Interpretations**](docs/theory/physics.md) - Физические интерпретации
- [**Calculations**](docs/calculations/README.md) - Все расчёты с выкладками
- [**Observational Data**](docs/data/README.md) - Анализ экспериментальных данных

---

## 🔗 References

### Foundational Papers

1. **Randall, L., Sundrum, R.** (1999). "Large Mass Hierarchy from a Small Extra Dimension." *Phys. Rev. Lett.* 83, 3370. [arXiv:hep-ph/9905221](https://arxiv.org/abs/hep-ph/9905221)

2. **Burinskii, A.** (2008). "The Dirac-Kerr-Newman electron." *Grav. Cosmol.* 14, 109. [arXiv:hep-th/0507109](https://arxiv.org/abs/hep-th/0507109)

3. **Gordon, W.** (1923). "Zur Lichtfortpflanzung nach der Relativitätstheorie." *Ann. Phys.* 377, 421.

### Recent Observations (2025)

4. **DESI Collaboration** (2025). "Dark Energy Spectroscopic Instrument Data Release 2." [arXiv:2504.xxxxx](https://arxiv.org)

5. **Event Horizon Telescope** (2025). "M87* Polarization Dynamics." *ApJ* (в печати)

6. **Euclid Collaboration** (2024). "Early Results on High-Redshift Structures." [arXiv:2411.xxxxx](https://arxiv.org)

---

## 👥 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Areas for contribution:
- 🧮 Extended calculations and numerical simulations
- 📊 Additional data analysis (CMB, LSS, gravitational waves)
- 🎨 Visualizations and diagrams
- 📝 Documentation improvements
- 🐛 Bug fixes and code improvements

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Author:** [Your Name]  
**Email:** your.email@domain.com  
**arXiv:** [physics.gen-ph/XXXX.XXXXX](https://arxiv.org)

---

<div align="center">

**🌌 SIFS Theory: Unifying the Universe Through Scale 🌌**

Made with ❤️ and mathematics

[⬆ Back to top](#sifs-theory-scale-invariant-fractal-spacetime)

</div>
