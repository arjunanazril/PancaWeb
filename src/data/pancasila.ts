export interface PancasilaPrinciple {
  number: number;
  title: string;
  symbol: string;
  description: string;
  values: string[];
  examples: string[];
}

export const principles: PancasilaPrinciple[] = [
  {
    number: 1,
    title: "Ketuhanan Yang Maha Esa",
    symbol: "Bintang",
    description: "Menghormati keyakinan, menjalankan ibadah, dan menjaga ruang hidup yang saling menghargai.",
    values: ["iman", "toleransi", "hormat"],
    examples: ["Menghargai teman yang sedang beribadah", "Tidak memaksakan keyakinan", "Merawat kerukunan lintas agama"],
  },
  {
    number: 2,
    title: "Kemanusiaan yang Adil dan Beradab",
    symbol: "Rantai",
    description: "Menempatkan martabat manusia sebagai dasar sikap, tindakan, dan keputusan bersama.",
    values: ["empati", "keadilan", "kesetaraan"],
    examples: ["Membantu korban bencana", "Menolak perundungan", "Memperlakukan semua orang secara bermartabat"],
  },
  {
    number: 3,
    title: "Persatuan Indonesia",
    symbol: "Pohon Beringin",
    description: "Merawat kebersamaan dalam keberagaman suku, budaya, bahasa, dan latar belakang.",
    values: ["gotong royong", "nasional", "rukun"],
    examples: ["Kerja bakti lingkungan", "Menghargai budaya daerah", "Mengutamakan kepentingan bersama"],
  },
  {
    number: 4,
    title: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan",
    symbol: "Kepala Banteng",
    description: "Mengambil keputusan melalui musyawarah, mendengar pendapat, dan bertanggung jawab atas hasil bersama.",
    values: ["musyawarah", "demokrasi", "bijaksana"],
    examples: ["Rapat kelas secara tertib", "Menerima hasil voting", "Memberi ruang pendapat minoritas"],
  },
  {
    number: 5,
    title: "Keadilan Sosial bagi Seluruh Rakyat Indonesia",
    symbol: "Padi dan Kapas",
    description: "Mendorong kesejahteraan, kesempatan yang adil, dan kepedulian pada yang membutuhkan.",
    values: ["adil", "sejahtera", "peduli"],
    examples: ["Berbagi sumber belajar", "Mendukung UMKM lokal", "Mengutamakan akses yang setara"],
  },
];

export function getPrinciple(number: number) {
  return principles.find((principle) => principle.number === number);
}
