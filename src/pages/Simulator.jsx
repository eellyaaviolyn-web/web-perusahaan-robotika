import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Simulator.css';

export default function Simulator() {
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
    return `Rp ${(value / 1000000000).toFixed(1)} Milyar`;
  };

  // Calculate chart heights (relative to max value for visual scale)
  const maxChartValue = Math.max(manualCost, robotCost);
  const manualBarHeight = maxChartValue > 0 ? (manualCost / maxChartValue) * 100 : 0;
  const robotBarHeight = maxChartValue > 0 ? (robotCost / maxChartValue) * 100 : 0;

  return (
    <div className="simulator-page container" style={{ paddingTop: '220px' }}>
      <div className="simulator-header">
        <h1 className="font-serif">
          Kalkulator <span className="italic text-primary">ROI</span>
        </h1>
        <p>
          Simulasikan perbandingan biaya operasional pabrik Anda antara menggunakan tenaga kerja manual versus integrasi sistem otomasi Vin Robotik selama 5 tahun ke depan.
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
          <h3 className="font-serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Parameter Pabrik</h3>
          
          <div className="control-group">
            <div className="control-label">
              <span>Total Pekerja Manual</span>
              <span className="control-value">{workers} Orang</span>
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
              <span>Gaji Rata-rata per Bulan</span>
              <span className="control-value">Rp {salary} Juta</span>
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
            * Asumsi perhitungan: 1 unit Robot Vin beroperasi 24/7 menggantikan 3 shift pekerja manual. Biaya robot sudah termasuk CAPEX dan biaya pemeliharaan (OPEX) selama 5 tahun.
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
            <div className="result-title">Biaya Manual (5 Tahun)</div>
            <div className="result-value" style={{ fontSize: '2rem' }}>{formatMilyar(manualCost)}</div>
          </div>
          
          <div className="result-card">
            <div className="result-title">Investasi Vin Robotik (5 Tahun)</div>
            <div className="result-value" style={{ fontSize: '2rem' }}>{formatMilyar(robotCost)}</div>
          </div>

          <div className="result-card highlight">
            <div className="result-title text-primary">Potensi Penghematan Bersih</div>
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
        <div className="chart-title">Proyeksi Pengeluaran 5 Tahun</div>
        <div className="chart-bars">
          <div className="chart-bar-wrapper">
            <div className="chart-bar manual" style={{ height: `${manualBarHeight}%` }}>
              <span className="chart-value">{formatMilyar(manualCost)}</span>
            </div>
            <span className="chart-label">Sistem Manual</span>
          </div>
          
          <div className="chart-bar-wrapper">
            <div className="chart-bar robot" style={{ height: `${robotBarHeight}%` }}>
              <span className="chart-value">{formatMilyar(robotCost)}</span>
            </div>
            <span className="chart-label">Vin Robotik</span>
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
        <h3 className="metrics-title font-serif">Analisis Dampak Operasional</h3>
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-icon">⏱️</span>
            <h4>Titik Impas (ROI)</h4>
            <div className="metric-val">{bepMonths !== 'N/A' ? `${bepMonths} Bulan` : 'Tidak Valid'}</div>
            <p>Pengembalian modal investasi secara penuh.</p>
          </div>
          <div className="metric-box">
            <span className="metric-icon">⚡</span>
            <h4>Kapasitas Produksi</h4>
            <div className="metric-val">+300%</div>
            <p>Beroperasi 24/7 tanpa henti dan pergantian shift.</p>
          </div>
          <div className="metric-box">
            <span className="metric-icon">🎯</span>
            <h4>Tingkat Presisi</h4>
            <div className="metric-val">0.01 mm</div>
            <p>Akurasi perakitan tingkat industri kedirgantaraan.</p>
          </div>
          <div className="metric-box">
            <span className="metric-icon">🛡️</span>
            <h4>Reduksi Kecelakaan</h4>
            <div className="metric-val">99.9%</div>
            <p>Menghilangkan risiko cedera manusia di area berbahaya.</p>
          </div>
        </div>

        <div className="download-report-wrapper">
          <p className="download-text">Unduh hasil kalkulasi simulasi ini sebagai laporan PDF lengkap untuk direksi Anda.</p>
          <Link to="/contact" state={{ fromPdf: true }} className="btn btn-outline hover-target" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            Unduh Laporan Proyeksi (PDF)
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
        <h2 className="font-serif">Berhenti Membakar Uang Anda</h2>
        <p>Ribuan miliaran rupiah menguap setiap tahun karena inefisiensi. Jadwalkan audit otomasi pabrik Anda bersama para ahli kami hari ini.</p>
        <Link to="/contact" className="btn btn-primary hover-target">Jadwalkan Konsultasi Gratis</Link>
      </motion.div>

    </div>
  );
}
