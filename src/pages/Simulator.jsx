import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';
import './Simulator.css';

export default function Simulator() {
  const { t } = useLanguage();
  const simData = t('simulator');

  const [workers, setWorkers] = useState(100);
  const [salary, setSalary] = useState(5);
  const [fleetSize, setFleetSize] = useState(5);
  
  const [manualCost, setManualCost] = useState(0);
  const [robotCost, setRobotCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [bepMonths, setBepMonths] = useState(0);
  const [monthlySavingsDisplay, setMonthlySavingsDisplay] = useState(0);

  useEffect(() => {
    const totalManual = workers * (salary * 1000000) * 12 * 5;
    const robotsNeeded = Math.ceil(workers / 3);
    const robotPrice = 850000000;
    const robotMaintenance = 45000000;
    const totalRobot = (robotsNeeded * robotPrice) + (robotsNeeded * robotMaintenance * 5);
    const totalSavings = totalManual - totalRobot;
    const monthlyManualCost = totalManual / 60;
    const monthlyRobotOpex = (robotsNeeded * robotMaintenance) / 12;
    const monthlySav = monthlyManualCost - monthlyRobotOpex;
    let bep = 0;
    if (monthlySav > 0) bep = (robotsNeeded * robotPrice) / monthlySav;
    setManualCost(totalManual);
    setRobotCost(totalRobot);
    setSavings(totalSavings > 0 ? totalSavings : 0);
    setBepMonths(bep > 0 ? Math.ceil(bep) : 'N/A');
    setMonthlySavingsDisplay(monthlySav > 0 ? monthlySav : 0);
  }, [workers, salary]);

  const formatMilyar = (value) => `Rp ${(value / 1000000000).toFixed(1)} ${simData.results.milyar}`;
  const formatJuta = (value) => `Rp ${(value / 1000000).toFixed(0)} Jt/bln`;

  const maxChartValue = Math.max(manualCost, robotCost);
  const manualBarHeight = maxChartValue > 0 ? (manualCost / maxChartValue) * 100 : 0;
  const robotBarHeight = maxChartValue > 0 ? (robotCost / maxChartValue) * 100 : 0;

  // ROI Calculator
  const fleetRevPerRobot = 85000000;
  const fleetOpexPerRobot = 45000000 / 12;
  const fleetMonthlyRevenue = fleetSize * fleetRevPerRobot;
  const fleetMonthlyOpex = fleetSize * fleetOpexPerRobot;
  const fleetMonthlyNet = fleetMonthlyRevenue - fleetMonthlyOpex;
  const fleetROIPercent = ((fleetMonthlyNet / fleetMonthlyOpex) * 100).toFixed(0);

  const handleROIExport = () => {
    toast.success(
      `Laporan ROI untuk ${fleetSize} armada berhasil dibuat!\nNet Bulanan: ${formatJuta(fleetMonthlyNet)}`,
      { duration: 4000, icon: '📊' }
    );
  };

  return (
    <div className="simulator-page container" style={{ paddingTop: '220px' }}>
      <div className="simulator-header">
        <h1 className="font-serif">
          {simData.hero.title1} <span className="italic text-primary">{simData.hero.title2}</span>
        </h1>
        <p>{simData.hero.subtitle}</p>
      </div>

      {/* ── ROI KALKULATOR INTERAKTIF ── */}
      <motion.div
        className="roi-calculator glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '4rem', padding: '3rem', borderRadius: '16px', border: '1px solid rgba(var(--primary-rgb, 200,170,110),0.3)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <TrendingUp size={32} className="text-primary" />
          <h2 className="font-serif" style={{ fontSize: '2rem', margin: 0 }}>
            Kalkulator ROI Armada Robot
          </h2>
        </div>
        <p className="text-muted" style={{ marginBottom: '2.5rem' }}>
          Geser slider untuk melihat proyeksi efisiensi biaya armada Anda secara <em>real-time</em>.
        </p>

        <div className="roi-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          {/* Slider */}
          <div>
            <div className="control-group">
              <div className="control-label">
                <span>Jumlah Armada Robot</span>
                <span className="control-value">{fleetSize} unit</span>
              </div>
              <input
                type="range" className="range-slider"
                min="1" max="50" step="1"
                value={fleetSize}
                onChange={(e) => setFleetSize(parseInt(e.target.value))}
              />
            </div>

            <div className="roi-metrics" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
              <div className="glass-panel" style={{ padding: '1.2rem', borderRadius: '12px', textAlign: 'center' }}>
                <DollarSign size={20} className="text-primary" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Pendapatan / Bln</div>
                <div className="font-serif" style={{ fontSize: '1.1rem', fontWeight: '600' }}>{formatJuta(fleetMonthlyRevenue)}</div>
              </div>
              <div className="glass-panel" style={{ padding: '1.2rem', borderRadius: '12px', textAlign: 'center' }}>
                <Clock size={20} className="text-primary" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Biaya Operasional</div>
                <div className="font-serif" style={{ fontSize: '1.1rem', fontWeight: '600' }}>{formatJuta(fleetMonthlyOpex)}</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Estimasi Penghematan Bersih / Bulan
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={fleetMonthlyNet}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="font-serif"
                style={{ fontSize: '3rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '0.5rem' }}
              >
                {formatJuta(fleetMonthlyNet)}
              </motion.div>
            </AnimatePresence>
            <div style={{ fontSize: '1.2rem', color: '#00ff88', marginBottom: '2rem' }}>
              ROI: <strong>+{fleetROIPercent}%</strong>
            </div>

            {/* Progress bar visual */}
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: '8px', overflow: 'hidden', marginBottom: '2rem' }}>
              <motion.div
                style={{ background: 'var(--primary)', height: '100%', borderRadius: '8px' }}
                animate={{ width: `${Math.min(parseInt(fleetROIPercent), 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <button className="btn btn-outline" onClick={handleROIExport} style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              📊 Ekspor Laporan ROI
            </button>
          </div>
        </div>
      </motion.div>

      <div className="simulator-container">
        {/* LEFT PANEL */}
        <motion.div className="simulator-controls" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{simData.controls.title}</h3>
          
          <div className="control-group">
            <div className="control-label">
              <span>{simData.controls.workers}</span>
              <span className="control-value">{workers} {simData.controls.workersUnit}</span>
            </div>
            <input type="range" className="range-slider" min="10" max="1000" step="10"
              value={workers} onChange={(e) => setWorkers(parseInt(e.target.value))} />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>{simData.controls.salary}</span>
              <span className="control-value">Rp {salary} {simData.controls.salaryUnit}</span>
            </div>
            <input type="range" className="range-slider" min="3" max="20" step="0.5"
              value={salary} onChange={(e) => setSalary(parseFloat(e.target.value))} />
          </div>

          {/* Monthly savings highlight */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid rgba(0,255,136,0.2)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              Penghematan / Bulan
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={monthlySavingsDisplay}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-serif"
                style={{ fontSize: '1.5rem', color: '#00ff88' }}
              >
                {formatJuta(monthlySavingsDisplay)}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '2rem', fontStyle: 'italic' }}>
            {simData.controls.note}
          </p>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div className="simulator-results" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className="result-card">
            <div className="result-title">{simData.results.manual}</div>
            <div className="result-value" style={{ fontSize: '2rem' }}>{formatMilyar(manualCost)}</div>
          </div>
          <div className="result-card">
            <div className="result-title">{simData.results.robot}</div>
            <div className="result-value" style={{ fontSize: '2rem' }}>{formatMilyar(robotCost)}</div>
          </div>
          <div className="result-card highlight">
            <div className="result-title text-primary">{simData.results.savings}</div>
            <div className="result-value">{savings > 0 ? formatMilyar(savings) : 'Rp 0'}</div>
          </div>
        </motion.div>
      </div>

      {/* CHART */}
      <motion.div className="chart-container" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="chart-title">{simData.chart.title}</div>
        <div className="chart-bars">
          <div className="chart-bar-wrapper">
            <div className="chart-bar manual" style={{ height: `${manualBarHeight}%` }}>
              <span className="chart-value">{formatMilyar(manualCost)}</span>
            </div>
            <span className="chart-label">{simData.chart.manualLabel}</span>
          </div>
          <div className="chart-bar-wrapper">
            <div className="chart-bar robot" style={{ height: `${robotBarHeight}%` }}>
              <span className="chart-value">{formatMilyar(robotCost)}</span>
            </div>
            <span className="chart-label">{simData.chart.robotLabel}</span>
          </div>
        </div>
      </motion.div>

      {/* METRICS */}
      <motion.div className="executive-metrics" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h3 className="metrics-title font-serif">{simData.metrics.title}</h3>
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-icon">⏱️</span>
            <h4>{simData.metrics.bep}</h4>
            <div className="metric-val">{bepMonths !== 'N/A' ? `${bepMonths} ${simData.metrics.bepMonths}` : simData.metrics.bepInvalid}</div>
            <p>{simData.metrics.bepDesc}</p>
          </div>
          <div className="metric-box">
            <span className="metric-icon">⚡</span>
            <h4>{simData.metrics.cap}</h4>
            <div className="metric-val">+300%</div>
            <p>{simData.metrics.capDesc}</p>
          </div>
          <div className="metric-box">
            <span className="metric-icon">🎯</span>
            <h4>{simData.metrics.pre}</h4>
            <div className="metric-val">0.01 mm</div>
            <p>{simData.metrics.preDesc}</p>
          </div>
          <div className="metric-box">
            <span className="metric-icon">🛡️</span>
            <h4>{simData.metrics.red}</h4>
            <div className="metric-val">99.9%</div>
            <p>{simData.metrics.redDesc}</p>
          </div>
        </div>
        <div className="download-report-wrapper">
          <p className="download-text">{simData.download.text}</p>
          <Link to="/contact" state={{ fromPdf: true }} className="btn btn-outline hover-target" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            {simData.download.btn}
          </Link>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div className="simulator-cta" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="font-serif">{simData.cta.title}</h2>
        <p>{simData.cta.desc}</p>
        <Link to="/contact" className="btn btn-primary hover-target">{simData.cta.btn}</Link>
      </motion.div>
    </div>
  );
}
