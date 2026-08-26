import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Simulator.css';

export default function Simulator() {
  const { t } = useLanguage();
  const simData = t('simulator');

  const [workers, setWorkers] = useState(100);
  const [salary, setSalary] = useState(5); // in millions
  
  const [manualCost, setManualCost] = useState(0);
  const [robotCost, setRobotCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [bepMonths, setBepMonths] = useState(0);

  // Recalculate costs whenever inputs change
  useEffect(() => {
    // 1. Biaya Manual (5 Tahun)
    // Gaji bulanan * 12 bulan * 5 tahun * jumlah pekerja
    const totalManual = workers * (salary * 1000000) * 12 * 5;
    
    // 2. Biaya Robot Vin (5 Tahun)
    // Asumsi: 1 Robot Vin menggantikan 3 pekerja (bekerja 24 jam / 3 shift)
    const robotsNeeded = Math.ceil(workers / 3);
    const robotPrice = 850000000; // Rp 850 Juta per robot (CAPEX)
    const robotMaintenance = 45000000; // Rp 45 Juta per tahun (OPEX)
    
    const totalRobot = (robotsNeeded * robotPrice) + (robotsNeeded * robotMaintenance * 5);
    
    // 3. Penghematan
    const totalSavings = totalManual - totalRobot;

    // 4. Break Even Point (Balik Modal) dalam bulan
    // Biaya bulanan manual vs Biaya perawatan bulanan robot
    const monthlyManualCost = totalManual / 60;
    const monthlyRobotOpex = (robotsNeeded * robotMaintenance) / 12;
    const monthlySavings = monthlyManualCost - monthlyRobotOpex;
    
    let bep = 0;
    if (monthlySavings > 0) {
      bep = (robotsNeeded * robotPrice) / monthlySavings;
    }

    setManualCost(totalManual);
    setRobotCost(totalRobot);
    setSavings(totalSavings > 0 ? totalSavings : 0);
    setBepMonths(bep > 0 ? Math.ceil(bep) : 'N/A');
  }, [workers, salary]);

  // Helper to format currency elegantly (in Billions)
  const formatMilyar = (value) => {
    return `Rp ${(value / 1000000000).toFixed(1)} ${simData.results.milyar}`;
  };

  // Calculate chart heights (relative to max value for visual scale)
  const maxChartValue = Math.max(manualCost, robotCost);
  const manualBarHeight = maxChartValue > 0 ? (manualCost / maxChartValue) * 100 : 0;
  const robotBarHeight = maxChartValue > 0 ? (robotCost / maxChartValue) * 100 : 0;

  return (
    <div className="simulator-page container" style={{ paddingTop: '220px' }}>
      <div className="simulator-header">
        <h1 className="font-serif">
          {simData.hero.title1} <span className="italic text-primary">{simData.hero.title2}</span>
        </h1>
        <p>
          {simData.hero.subtitle}
        </p>
      </div>

      <div className="simulator-container">
        
        {/* LEFT PANEL: CONTROLS */}
        <motion.div 
          className="simulator-controls"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>{simData.controls.title}</h3>
          
          <div className="control-group">
            <div className="control-label">
              <span>{simData.controls.workers}</span>
              <span className="control-value">{workers} {simData.controls.workersUnit}</span>
            </div>
            <input 
              type="range" 
              className="range-slider" 
              min="10" 
              max="1000" 
              step="10"
              value={workers}
              onChange={(e) => setWorkers(parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <div className="control-label">
              <span>{simData.controls.salary}</span>
              <span className="control-value">Rp {salary} {simData.controls.salaryUnit}</span>
            </div>
            <input 
              type="range" 
              className="range-slider" 
              min="3" 
              max="20" 
              step="0.5"
              value={salary}
              onChange={(e) => setSalary(parseFloat(e.target.value))}
            />
          </div>
          
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '3rem', fontStyle: 'italic' }}>
            {simData.controls.note}
          </p>
        </motion.div>

        {/* RIGHT PANEL: RESULTS & CHART */}
        <motion.div 
          className="simulator-results"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
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
            <div className="result-value">
              {savings > 0 ? formatMilyar(savings) : 'Rp 0'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* VISUALIZER CHART */}
      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
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

      {/* EXECUTIVE METRICS GRID */}
      <motion.div 
        className="executive-metrics"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
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

      {/* CTA SECTION */}
      <motion.div 
        className="simulator-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif">{simData.cta.title}</h2>
        <p>{simData.cta.desc}</p>
        <Link to="/contact" className="btn btn-primary hover-target">{simData.cta.btn}</Link>
      </motion.div>

    </div>
  );
}
