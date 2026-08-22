import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import './JournalDetail.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const journalData = {
  automotive: {
    meta: "MANUFAKTUR OTOMOTIF • JAKARTA, 2025",
    title: "Mereduksi Biaya Scrap Hingga 94% dalam Kuartal Pertama",
    lead: "Bagaimana integrasi 40 unit Titanium Arm di lini perakitan EV (Electric Vehicle) berhasil mengeliminasi cacat pengelasan mikro dan menyelamatkan jutaan dolar bagi klien otomotif kami.",
    image: "/car_assembly.jpg",
    content: [
      {
        heading: "Tantangan Ekstrem di Garis Depan",
        paragraphs: [
          "Dalam industri pembuatan kendaraan listrik (EV), presisi bukanlah sebuah kemewahan—melainkan syarat mutlak keselamatan. Klien kami, salah satu pabrikan EV terkemuka di Asia Tenggara, menghadapi tingkat penolakan kualitas (scrap rate) sebesar 4.2% pada sambungan las sasis aluminium. Setiap kesalahan mikro bernilai ribuan dolar akibat material yang terbuang.",
          "Mereka membutuhkan solusi yang tidak hanya cepat, tetapi memiliki konsistensi absolut yang melampaui kemampuan operator manusia terbaik sekalipun."
        ]
      },
      {
        heading: "Intervensi Vin Robotik",
        paragraphs: [
          "Tim Principal Engineer kami melakukan audit selama 72 jam di fasilitas klien. Solusi kami jelas: Mengganti sistem lama dengan 40 unit Titanium Arm Series (T-900) yang dikonfigurasi khusus dengan sensor termal milidetik.",
          "Dengan tingkat pengulangan (repeatability) hingga ±0.02 mm, lengan robotik kami melakukan pengelasan presisi tinggi tanpa getaran, sambil secara simultan mengukur suhu lelehan aluminium secara real-time menggunakan AI."
        ],
        quote: "Kami tidak hanya memasang lengan mekanik; kami menanamkan sistem saraf cerdas ke dalam jantung pabrik mereka."
      },
      {
        heading: "Hasil yang Berbicara",
        paragraphs: [
          "Hanya dalam waktu tiga bulan (satu kuartal) setelah transisi zero-downtime, hasilnya melampaui metrik yang ditargetkan:"
        ],
        list: [
          "Scrap Rate: Turun drastis dari 4.2% menjadi 0.25% (Reduksi 94%).",
          "Throughput: Peningkatan volume perakitan harian sebesar 28%.",
          "ROI: Investasi sistem kembali modal sepenuhnya di bulan ke-7."
        ],
        conclusion: "Vin Robotik sekali lagi membuktikan bahwa otomasi kelas atas bukan sekadar alat pembantu, melainkan pendorong utama profitabilitas absolut."
      }
    ]
  },
  electronics: {
    meta: "ELEKTRONIK • TOKYO, 2026",
    title: "Era Baru Perakitan Mikro Semikonduktor",
    lead: "Presisi ±0.01mm V-Cobot Harmony dalam merakit sirkuit semikonduktor beresolusi ultra-tinggi tanpa ruang debu berlebih.",
    image: "/micro_chip.jpg",
    content: [
      {
        heading: "Batas Fisika Perakitan Skala Nano",
        paragraphs: [
          "Industri semikonduktor terus mengecilkan ukuran komponen. Pabrikan di Tokyo mendapati bahwa getaran sekecil apapun dari sistem robotik konvensional mereka menyebabkan tingkat kegagalan mikroskopis yang tinggi saat merakit wafer silikon berdensitas ekstrem."
        ]
      },
      {
        heading: "Injeksi V-Cobot Harmony",
        paragraphs: [
          "Solusinya adalah mendeploy V-Cobot Harmony yang dilengkapi dengan Magnetic Servo kami. Tanpa roda gigi mekanis konvensional, lengan ini bergerak mulus, nyaris tanpa gesekan."
        ],
        quote: "Ketepatan di tingkat mikrometer tidak bisa diraih dengan memaksakan teknologi lama. Ia membutuhkan paradigma mekanis baru."
      },
      {
        heading: "Efisiensi Tak Tertandingi",
        paragraphs: [
          "Hasilnya, yield rate (tingkat keberhasilan perakitan) melesat ke 99.98%."
        ],
        list: [
          "Tingkat Kegagalan: Berkurang hingga nyaris nol.",
          "Kecepatan Perakitan: 2x lipat lebih cepat dari sistem sebelumnya."
        ],
        conclusion: "Sistem robotik yang presisi adalah pembeda antara perusahaan yang bertahan dan perusahaan yang memimpin pasar."
      }
    ]
  },
  logistics: {
    meta: "LOGISTIK • SINGAPURA, 2026",
    title: "Manajemen Gudang Otonom Tingkat Lanjut",
    lead: "Bagaimana armada 100+ Aero AMR mendisrupsi manajemen fasilitas e-commerce raksasa.",
    image: "/warehouse_amr.jpg",
    content: [
      {
        heading: "Kemacetan Jalur Distribusi E-Commerce",
        paragraphs: [
          "Dengan volume transaksi menembus 2 juta paket per hari, klien logistik kami menghadapi krisis bottleneck di pusat penyortiran mereka."
        ]
      },
      {
        heading: "Aero AMR Swarm Intelligence",
        paragraphs: [
          "Kami mengerahkan 150 unit Aero AMR yang dikendalikan oleh AI Swarm Intelligence terpusat. Mereka tidak berjalan di jalur tetap, melainkan bermanuver secara dinamis layaknya sekawanan lebah."
        ],
        quote: "Ini bukan lagi sekadar robot yang memindahkan barang, ini adalah orkestrasi jutaan data yang bergerak di lantai pabrik."
      },
      {
        heading: "Hasil Kinerja",
        paragraphs: [
          "Transformasi ini menciptakan fasilitas tanpa henti sejati:"
        ],
        list: [
          "Peningkatan Volume: 300% paket lebih banyak diproses per jam.",
          "Akurasi Sortir: 100% tanpa salah alamat."
        ],
        conclusion: "Gudang masa depan tidak dikendalikan oleh manusia, tetapi diorkestrasi oleh AI logistik."
      }
    ]
  },
  medical: {
    meta: "FARMASI & MEDIS • FRANKFURT, 2025",
    title: "Sterilisasi 100% dengan Lengan Robot Medis",
    lead: "Otomatisasi pengemasan vaksin menggunakan lengan robot berbahan titanium khusus medis yang tahan terhadap korosi kimia murni.",
    image: "/factory_luxury.jpg",
    content: [
      {
        heading: "Standar Kemurnian Tingkat Tinggi",
        paragraphs: [
          "Pabrikan vaksin membutuhkan lingkungan cleanroom ISO Kelas 1 di mana debu mikroskopis dapat menghancurkan seluruh batch produksi bernilai jutaan dolar."
        ]
      },
      {
        heading: "Titanium Murni",
        paragraphs: [
          "Kami menggunakan lengan robot berbahan titanium padat tanpa pelumas eksternal. Semua segel terbuat dari materi khusus ruang hampa udara."
        ],
        quote: "Bakteri tidak bisa hidup di mesin yang kami desain, dan debu tidak akan pernah keluar darinya."
      },
      {
        heading: "Dampak Jangka Panjang",
        paragraphs: [
          "Klien dapat beroperasi 24 jam sehari di dalam fasilitas steril tanpa perlu intervensi manusia sama sekali selama proses packing."
        ],
        list: [
          "Kontaminasi Lintas: 0%.",
          "Kapasitas Produksi: 45 Juta Vial per bulan."
        ],
        conclusion: "Kami melindungi kehidupan dengan memastikan obat-obatan dirakit dalam kemurnian mekanis absolut."
      }
    ]
  },
  aerospace: {
    meta: "DIRGANTARA • TOULOUSE, 2024",
    title: "Presisi Turbin Jet Masa Depan",
    lead: "Kalibrasi pemasangan bilah turbin pesawat terbang komersial yang membutuhkan tingkat toleransi nol kesalahan menggunakan sensor AI kami.",
    image: "/jet_turbine_robot.jpg",
    content: [
      {
        heading: "Taruhan Keselamatan Tertinggi",
        paragraphs: [
          "Bilah turbin jet bergerak pada putaran puluhan ribu RPM. Ketidakseimbangan seberat 1 gram dapat merobek mesin saat mengudara."
        ]
      },
      {
        heading: "Penglihatan AI Mikrometer",
        paragraphs: [
          "Robot industri kami dipasangkan dengan kamera laser optik yang memindai dan menempatkan bilah turbin sambil mengukur tekanan sekrup secara simultan."
        ],
        quote: "Bagi kami, membangun turbin pesawat sama dengan menyusun karya seni jam tangan presisi raksasa."
      },
      {
        heading: "Hasil Operasional",
        paragraphs: [
          "Pemasangan manual memakan waktu berhari-hari. Sistem kami melakukannya dalam hitungan jam."
        ],
        list: [
          "Efisiensi Waktu: Berkurang 75%.",
          "Tingkat Keamanan: Disertifikasi melampaui standar FAA dan EASA tertinggi."
        ],
        conclusion: "Langit menjadi lebih aman ketika mesin yang membawanya dirakit oleh presisi tanpa emosi."
      }
    ]
  }
};

export default function JournalDetail() {
  const { id } = useParams();
  const article = journalData[id] || journalData['automotive']; // Fallback to automotive if not found

  return (
    <div className="page-wrapper journal-detail-page">
      <section className="article-header">
        <div className="container">
          <Link to="/casestudies" className="back-link">
            <ArrowLeft size={16} style={{marginRight: '8px'}} /> Kembali ke Jurnal
          </Link>
          
          <motion.div className="article-meta" initial="hidden" animate="visible" variants={fadeUp}>
            <span>{article.meta}</span>
          </motion.div>
          
          <motion.h1 className="font-serif article-title" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}>
            {article.title}
          </motion.h1>
          
          <motion.p className="article-lead" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            {article.lead}
          </motion.p>
        </div>
      </section>

      <section className="article-hero-image">
        <motion.img 
          src={article.image} 
          alt={article.title} 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </section>

      <section className="article-body">
        <div className="container article-container">
          {article.content.map((section, index) => (
            <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="font-serif">{section.heading}</h3>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              
              {section.quote && (
                <blockquote className="article-quote font-serif">
                  "{section.quote}"
                </blockquote>
              )}

              {section.list && (
                <ul className="article-list">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {section.conclusion && (
                <p><em>{section.conclusion}</em></p>
              )}
            </motion.div>
          ))}
          
          <div className="article-footer">
            <Link to="/contact" className="btn btn-primary">Konsultasikan Studi Kasus Serupa</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
