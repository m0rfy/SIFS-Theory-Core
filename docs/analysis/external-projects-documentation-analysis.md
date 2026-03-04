# Анализ документации из C:\Users\m0rfy\Projects

**Дата анализа:** 2026-03-04  
**Цель:** Учёт идей и данных из внешнего проекта для срочного обновления репозитория SIFS-Theory-Core.

---

## 1. Обзор источников

В `C:\Users\m0rfy\Projects` находятся несколько связанных с SIFS проектов и единая документация.

### 1.1 Структура каталогов (релевантные для документации)

| Путь | Назначение |
|------|------------|
| **документация/** | Теория SIFS (математическое ядро), планы синхронизации, Cursor/MCP |
| **sifs_ft/** | Стратегия Freqtrade на ядре SIFS (бэктесты, конфиги) |
| **sifs_agents/** | Мульти-агентная система (10 агентов, MCP) |
| **.cursor/** | Правила, агенты, MCP, хуки |
| **AGENTS.md** | Предпочтения пользователя и факты workspace |
| **CLAUDE.md** | Правила проекта для AI (полный контекст) |
| **PROJECT_STRUCTURE.md** | Описание структуры проекта |

### 1.2 Ключевые документы (по папке документация)

| Файл | Содержание |
|------|------------|
| **SIFS_Theory_Documentation.md** | Полная теоретическая документация v1.1: аксиомы, k, W(n), RS-метрика, 10 S-уровней, нейроархитектура, применения (финансы, нейронаука, космология и др.), связь с SIFS Theory (Spacetime) |
| **SIFS_Documentation_Update_Plan.md** | План синхронизации с SIFS-Theory-Core: терминология, константы, пошаговые фазы, что не дублировать |
| **README.md** | Оглавление документации, источники (в т.ч. SIFS-Theory-Core) |
| **CURSOR_HOOKS_SKILLS_MCP.md** | Выжимка по Cursor: хуки, скиллы, MCP |
| **CONTEXT_MODE.md** | Context Mode (MCP): экономия контекста |
| **Habr_MCP_Review.md** | Обзор MCP с Хабра |

---

## 2. Два контекста SIFS (критично для репозитория)

В AGENTS.md и CLAUDE.md явно зафиксировано:

| Контекст | Название | Фокус | Репозиторий/расположение |
|----------|----------|--------|---------------------------|
| **1** | **Scale-Invariant Fractal System** | Математическое ядро (k, FIB, W, φ) + приложения: финансы, дашборды, торговля | Проект в `C:\Users\m0rfy\Projects`; ядро в `sifs_ft/strategies/modules/core.py` |
| **2** | **SIFS Theory (Spacetime)** | Физическая теория: 5D, гравитация, КМ, частицы, DESI, терминология в docs/terminology-guide.md | **github.com/m0rfy/SIFS-Theory-Core** (этот репозиторий) |

**Общее:** масштабная инвариантность, фрактальная иерархия, варпинг exp(−2k·|S|) / W(n)=exp(−2kn).  
**Различие:** в System k = 1/π² безразмерный; в Theory (Spacetime) k ≈ 0.1 M_Pl размерный.

---

## 3. Математическое ядро (единый источник в Projects)

Единственный источник истины для кода: `sifs_ft/strategies/modules/core.py`.

- **K** = 1/π² ≈ 0.10132  
- **PHI** = (1+√5)/2 ≈ 1.618  
- **FIB** = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]  
- **W(n)** = exp(−2·K·n)  
- **SIFS** = Σ W(n)·(price − EMA_n), порог входа score ≥ 55  
- **Стоп:** ATR(14)×1.5; **цели:** ROI%, ROI×φ, ROI×φ²  

Константы должны совпадать в core.py, SIFS Live (HTML), дашбордах. Менять ядро только с согласования с `документация/SIFS_Theory_Documentation.md` и SIFS-Theory-Core.

---

## 4. Идеи для SIFS-Theory-Core (что внести в репозиторий)

### 4.1 Уже учтено в плане обновления (SIFS_Documentation_Update_Plan)

- Терминология: «согласуется с данными» / «предсказано теорией» (не «доказано»).
- Явная связь двух документов: «Связь с SIFS Theory (Spacetime)» со ссылками на этот репозиторий.
- Константы: k безразмерный (1/π²) здесь vs размерный (M_Pl) в Theory-Core.
- Не смешивать физические предсказания (DESI, протон и т.д.) в текст математического ядра; не дублировать White Paper.

### 4.2 Что добавить в SIFS-Theory-Core

1. **Раздел «Связанные проекты и применения»** в docs:
   - Ссылка на математическое ядро и приложения (финансы, SIFS Live, Freqtrade) — без переноса кода, только описание и ссылки.
   - Чётко указать: Theory-Core = физическая теория; другой проект = то же ядро k, W(n), φ, FIB в приложениях.

2. **Справочная страница «Два контекста SIFS»** (или подраздел в README/terminology):
   - Краткая таблица: System vs Spacetime, где что лежит, единые константы и различия (k безразмерный/размерный).

3. **План синхронизации документации:**
   - Взять из `SIFS_Documentation_Update_Plan.md` фазы 1–4 как рекомендации для сторонней документации, которая ссылается на Theory-Core (терминология, связь, константы, версионирование).

4. **Бэктесты и стратегия (только ссылка/упоминание):**
   - В контексте «применения математического ядра» можно кратко упомянуть: бэктесты (Spot/Futures Binance), профили conservative/balanced/aggressive, результаты в BACKTEST_RESULTS.md — без переноса данных, только «где искать актуальные результаты».

---

## 5. Мульти-агентная система (sifs_agents)

- 10 агентов: orchestrator, market_analyst, strategy_dev, reviewer, backtester, risk_manager, math_verifier, doc_writer и др.
- MCP-сервер (JSON-RPC 2.0), разделяемая память, провайдеры OpenRouter/Ollama/OpenCode.
- Для Theory-Core релевантен **sifs-math-verifier** (верификация SIFS-формул) и **sifs-doc-writer** (стиль документации, терминология, changelog). Идеи по стилю документации можно отразить в CONTRIBUTING или в правилах для агентов (AGENTS.md).

---

## 6. Cursor: агенты, правила, MCP

- В `.cursor/agents/`: sifs-doc-writer, sifs-math-verifier, sifs-orchestrator, sifs-backtester, sifs-reviewer и др.
- Правила: sifs-domain, sifs-python, sifs-frontend, cursor-workflow, context-mode и т.д.
- Для Theory-Core полезно: формулировки из sifs-doc-writer (терминология, единые обозначения k, W(n), φ, FIB, шаблон changelog) и из sifs-orchestrator (разбиение задач, синтез). Можно вынести в AGENTS.md или в .cursor/rules только идеи, без копирования конфигов другого проекта.

---

## 7. Рекомендуемые действия (срочное обновление репозитория)

| № | Действие | Где в SIFS-Theory-Core |
|---|----------|------------------------|
| 1 | Добавить документ «Связанные проекты и два контекста SIFS» | docs/related-projects.md (или раздел в docs/README.md) |
| 2 | Добавить краткий «План синхронизации внешней документации» (по мотиву SIFS_Documentation_Update_Plan) | docs/analysis/external-docs-sync-plan.md |
| 3 | В Terminology Guide или README — один подраздел «SIFS System vs SIFS Theory (Spacetime)» с таблицей и ссылками | docs/terminology-guide.md или docs/README.md |
| 4 | Обновить docs/README.md: раздел «Источники и связанные проекты» со ссылкой на проект в Projects (математическое ядро и приложения) | docs/README.md |

---

## 8. Итог

- Вся релевантная документация из `C:\Users\m0rfy\Projects` проанализирована: документация (теория, план синхронизации), AGENTS.md, CLAUDE.md, PROJECT_STRUCTURE, бэктесты, мульти-агенты, Cursor.
- Ключевые идеи: два контекста SIFS, единое математическое ядро (k, W(n), φ, FIB), терминология «согласуется с данными»/«предсказано теорией», план синхронизации с Theory-Core, приложения (финансы, SIFS Live, Freqtrade).
- В репозиторий SIFS-Theory-Core внесены: отчёт анализа (этот файл), [related-projects.md](../related-projects.md) (два контекста SIFS и связанные проекты), [external-docs-sync-plan.md](external-docs-sync-plan.md) (план синхронизации), обновлён [docs/README.md](../README.md).
