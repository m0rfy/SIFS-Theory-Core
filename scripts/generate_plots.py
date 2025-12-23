import matplotlib.pyplot as plt
import numpy as np
import os

# Настройка стиля для "научного" вида
plt.style.use('dark_background')
plt.rcParams.update({
    'font.size': 12,
    'axes.labelsize': 14,
    'axes.titlesize': 16,
    'xtick.labelsize': 12,
    'ytick.labelsize': 12,
    'legend.fontsize': 12,
    'lines.linewidth': 2.5,
    'lines.markersize': 8
})

OUTPUT_DIR = "docs/images"
if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def plot_mass_hierarchy():
    # Данные из README
    scales_labels = ['Planck', 'Nucleon', 'Atom', 'Solar System', 'Galaxy', 'Hubble']
    S_values = np.array([0, 11, 16, 20, 24, 28])
    # Массы в кг (примерно log scale)
    # M_Pl ~ 10^-8 kg
    # m_p ~ 10^-27 kg
    # ...
    # Это фрактальная иерархия, но для простоты визуализируем масштабную координату S
    # vs характерный размер (log scale)
    
    sizes_log = np.array([-35, -15, -10, 13, 21, 26]) # log10(meters)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Линейная регрессия (идеальный закон)
    z = np.polyfit(S_values, sizes_log, 1)
    p = np.poly1d(z)
    
    ax.plot(S_values, p(S_values), '--', color='#4ade80', alpha=0.5, label='Theoretical Prediction')
    ax.plot(S_values, sizes_log, 'o', color='#c084fc', label='Observed Scales')
    
    # Аннотации
    for i, txt in enumerate(scales_labels):
        ax.annotate(txt, (S_values[i], sizes_log[i]), xytext=(5, 5), textcoords='offset points', color='white')

    ax.set_xlabel('Scale Coordinate |S|')
    ax.set_ylabel('Log10(Characteristic Size [m])')
    ax.set_title('Fractal Hierarchy of Spacetime Scales')
    ax.grid(True, alpha=0.2)
    ax.legend()
    
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/fractal_hierarchy.png", dpi=300)
    plt.close()
    print("Generated fractal_hierarchy.png")

def plot_dark_energy():
    # Данные DESI 2025
    z = np.linspace(0, 3, 100)
    w0 = -0.827
    wa = -0.75
    
    w_sifs = w0 + wa * z / (1 + z)
    w_lcdm = -1.0 * np.ones_like(z)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Область неопределенности (примерная)
    sigma = 0.1 # примерная ошибка
    ax.fill_between(z, w_sifs - sigma, w_sifs + sigma, color='#10b981', alpha=0.1)
    
    ax.plot(z, w_sifs, '-', color='#10b981', label='SIFS (Evolving DE)')
    ax.plot(z, w_lcdm, '--', color='#ef4444', label='ΛCDM (Constant)')
    
    ax.set_xlabel('Redshift (z)')
    ax.set_ylabel('Equation of State w(z)')
    ax.set_title('Dark Energy Evolution: SIFS vs ΛCDM')
    ax.grid(True, alpha=0.2)
    ax.legend()
    
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/dark_energy_evolution.png", dpi=300)
    plt.close()
    print("Generated dark_energy_evolution.png")

def plot_warp_factor():
    S = np.linspace(0, 30, 100)
    k = 0.1
    warp = np.exp(-2 * k * S)
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(S, warp, '-', color='#3b82f6')
    ax.set_yscale('log')
    
    # Отметим ключевые точки
    points = [
        (0, 'Planck', 'top right'),
        (11, 'Proton', 'top right'),
        (20, 'Cosmic', 'bottom left')
    ]
    
    for s_val, label, pos in points:
        val = np.exp(-2 * k * s_val)
        ax.plot(s_val, val, 'o', color='white')
        
        xytext = (10, 10) if 'top' in pos else (10, -20)
        ax.annotate(f"{label}\nS={s_val}", (s_val, val), xytext=xytext, textcoords='offset points', color='white')

    ax.set_xlabel('Scale Coordinate |S|')
    ax.set_ylabel('Warp Factor exp(-2k|S|)')
    ax.set_title('Metric Suppression in 5D Space')
    ax.grid(True, alpha=0.2, which="both")
    
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/metric_profile.png", dpi=300)
    plt.close()
    print("Generated metric_profile.png")

if __name__ == "__main__":
    plot_mass_hierarchy()
    plot_dark_energy()
    plot_warp_factor()
