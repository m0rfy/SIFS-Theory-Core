# SIFS Freqtrade Strategy: результаты бэктестов

Реализация математического ядра SIFS в виде алгоритмической торговой стратегии на Freqtrade.
Бэктест: **2024-06-01 — 2026-03-01 (≈638 дней)**. Стартовый баланс: 1000 USDT.

> Не является инвестиционной рекомендацией. Прошлые результаты не гарантируют будущих.

---

## Архитектура стратегии

```
Sifs.py (IStrategy)
  ├── populate_indicators()    → SIFS Engine pipeline (ядро из core.py)
  ├── populate_entry_trend()   → entry_long из физических условий
  └── populate_exit_trend()    → exit_long + физический стоп

Модули:
  core.py        → K, PHI, FIB, W, ema_calc, calc_sifs_simple
  profiles.py    → conservative / balanced / aggressive / ultra
  mtf.py         → мультитаймфрейм (10 ТФ одновременно)
  entry.py       → SIFS score ≥ threshold, apsidal_state, orbit_energy
  exit_logic.py  → strong_profit, trailing_lock, mtf_decay, htf_reversal
  dca.py         → усреднение с защитой ликвидации
  position.py    → size = balance × position_size_balance_ratio
  trading_mode.py→ spot / isolated futures
  funding.py     → обработка фандинга (futures)
```

---

## Условия входа (LONG)

```python
# Физическая аналогия: вход при PERIAPSIS (ближайшая точка орбиты)
apsidal_state ∈ {PERIAPSIS, DESCENDING} AND orbit_energy = BOUND
AND sifs_final > threshold  AND theta_agreement > 0.4
# ИЛИ экстренный вход:
OR collapse_urgency > 0.7
```

---

## Условия выхода

```python
# Физическая аналогия: выход при APOAPSIS (дальняя точка орбиты)
orbit_mode = ESCAPE        # гиперболическая орбита
OR apsidal_state = APOAPSIS # максимальное удаление
OR momentum_reversal_total = 1  # разворот тяжёлых тел

# custom_exit иерархия:
# timeout → strong_profit → trailing_lock → mtf_decay → score_flip → htf_reversal
```

---

## Ключевые параметры

| Параметр | Значение |
|----------|----------|
| stoploss | -0.04 (запасной) |
| trailing_stop | True, positive: 0.01, offset: 0.02 |
| timeframe | 15m (основной) |
| startup_candle_count | 600 (прогрев EMA500 + orbital) |
| Цели (TP) | ROI%, ROI×φ, ROI×φ² |
| Стоп-лосс | ATR(14) × 1.5 |
| Порог входа | score ≥ 55 |

---

## Сводная таблица результатов (1000 USDT, XRP/USDT)

| Биржа | Режим | Профиль | Сделок | Win/Loss | Прибыль USDT | Прибыль % | Просадка |
|-------|-------|---------|--------|----------|-------------|-----------|---------|
| Binance | Spot | conservative | 125 | **125/0** | +67.59 | **6.76%** | 0.00% |
| Binance | Spot | balanced | 174 | **174/0** | +97.18 | **9.72%** | 0.00% |
| Binance | Spot | aggressive | 337 | 336/1 | +147.04 | **14.70%** | 1.18% |
| Binance | Futures | conservative | 142 | **142/0** | +89.25 | **8.92%** | 0.00% |
| Binance | Futures | balanced | 198 | 197/1 | +108.55 | **10.86%** | 1.18% |
| Binance | Futures | aggressive | 350 | 349/1 | +190.52 | **19.05%** | 1.53% |

**Рекомендуемая конфигурация:**
- Spot: `position_size_balance_ratio = 0.15`, `absolute_max_order = 550`
- Futures: `ratio = 0.18`, `max_leverage = 5`, `absolute_max_order = 600`

---

## Прогон с 10 000 USDT и market-ордерами (2026-03-04)

### XRP Futures одна пара (лучший результат)

| Метрика | Значение |
|---------|---------|
| Период | 637 дней |
| Сделок | 746 (≈1.17/день) |
| **Win Rate** | **745/1 (99.9%)** |
| Final balance | 12 517.28 USDT |
| **Прибыль** | **+2 517.28 USDT (+25.17%)** |
| Max drawdown | 724.49 USDT (5.49%) |
| Выходы | strong_profit 525, roi 212 |

**Ключевое исправление DCA:** расчёт `drop_price_pct = (-current_profit × 100) / leverage` — порог в % цены, а не прибыли. Ликвидация сократилась в 10×: просадка с 30.42% до 5.49%.

### Многопарный тест — критические выводы

| Режим | Пары | DD | Итог |
|-------|------|----|------|
| Futures 17 пар, max=5 | 6750 сделок, 99.5% WR | 80.57% | **−51.52%** |
| Spot 17 пар, max=5 | 1912 сделок, 99.7% WR | 40.58% | **−6.81%** |
| Futures ultra 16 пар, max=3 | 6464 сделок, 99.5% WR | 98.69% | **−96.58%** |

> **Вывод:** При высоком плече (5×) и DCA-сетках крайне важно `max_open_trades = 1`. При кросс-коррелирующем рыночном обвале все позиции уходят в просадку одновременно, истощая маржу.

---

## Профили стратегии

| Профиль | Назначение | Spot | Futures | DD типичная |
|---------|-----------|------|---------|------------|
| conservative | Минимум риска | ~6–7% | ~9% | 0% |
| balanced | Баланс риск/доход | ~10% | ~11% | 0–1.2% |
| aggressive | Максимум дохода | ~14–15% | ~19% | ~1.5% |
| ultra | Максимальный риск | — | −96.58% | 98.69% |

---

## DCA (Dynamic Cost Averaging)

```python
# Fibonacci-based DCA multipliers
DCA_FIB_MULT        = [1.0, 1.2, 1.5, 2.0, 2.5]       # Spot
DCA_FIB_MULT_FUTURES = [1.0, 1.2, 1.8, 2.5, 3.0, 3.5]  # Futures

# Margin rescue (distance_to_liquidation)
liquidation_danger_threshold    = 0.20
liquidation_emergency_threshold = 0.15
liquidation_last_chance_threshold = 0.10
rescue_max_count = 3
rescue_min_interval_seconds = 60

# DCA budget cap
dca_budget_ratio = 0.80   # max 80% of trade budget across all DCA
```

---

## ROI таблицы

```json
// Futures
{"0": 0.06, "60": 0.035, "240": 0.02, "480": 0.01, "960": 0.004}

// Spot
{"0": 0.08, "120": 0.045, "480": 0.025, "1440": 0.012, "4320": 0.005}
```

---

## Физические аналогии стратегии

| Параметр стратегии | Физическая аналогия (SIFS Theory) |
|-------------------|-----------------------------------|
| `orbit_energy = BOUND` | Частица на связанной орбите в 5D bulk |
| `orbit_mode = ESCAPE` | Гиперболическая орбита — частица покидает систему |
| `apsidal_state = PERIAPSIS` | Ближайшая точка орбиты (максимальная кривизна) |
| `apsidal_state = APOAPSIS` | Дальняя точка орбиты (минимальная кривизна) |
| `sifs_final = Σ W(n)·(EMA_n − price)` | Информационный потенциал |
| Стоп ATR×1.5 | Horizon radius в метрике SIFS |
| Цели ROI×φ, ROI×φ² | φ-кратные уровни как в φ-пороговом ряду теории |

---

## Связи

- [Математическое ядро core.py](sifs-system-overview.md)
- [Компоненты Score W1–W9](sifs-engine-components.md)
- [SIFS Live Dashboard](sifs-live-dashboard.md)
- [Результаты бэктестов (полный файл)](https://github.com/m0rfy/SIFS-Theory-Core/blob/main/docs/SiFS_6.1.md)
