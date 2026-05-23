const dataBahanAjar = {
  upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],

  kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],

  pengirimanList: [
    {
      kode: "JNE-REG",
      nama: "JNE Regular",
    },

    {
      kode: "JNE-EXP",
      nama: "JNE Express",
    },

    {
      kode: "SICEPAT",
      nama: "SiCepat",
    },

    {
      kode: "JNT",
      nama: "J&T Express",
    },

    {
      kode: "POS",
      nama: "Pos Indonesia",
    },
  ],

  paket: [
    {
      kode: "PAKET-UT-001",
      nama: "PAKET IPS Dasar",
      isi: ["EKMA4116", "EKMA4115"],
      harga: 120000,
    },

    {
      kode: "PAKET-UT-002",
      nama: "PAKET IPA Dasar",
      isi: ["BIOL4201", "FISIP4001"],
      harga: 140000,
    },
  ],

  stok: [
    {
      kode: "EKMA4116",
      judul: "Pengantar Manajemen",
      kategori: "MK Wajib",
      upbjj: "Jakarta",
      lokasiRak: "R1-A3",
      harga: 65000,
      qty: 28,
      safety: 20,
      catatanText: "Edisi 2024, cetak ulang",
      catatanHTML: "<em>Edisi 2024, cetak ulang</em>",
    },

    {
      kode: "EKMA4115",
      judul: "Pengantar Akuntansi",
      kategori: "MK Wajib",
      upbjj: "Jakarta",
      lokasiRak: "R1-A4",
      harga: 60000,
      qty: 7,
      safety: 15,
      catatanText: "Cover baru",
      catatanHTML: "<strong>Cover baru</strong>",
    },

    {
      kode: "BIOL4201",
      judul: "Biologi Umum (Praktikum)",
      kategori: "Praktikum",
      upbjj: "Surabaya",
      lokasiRak: "R3-B2",
      harga: 80000,
      qty: 12,
      safety: 10,
      catatanText: "Butuh pendingin untuk kit basah",
      catatanHTML: "Butuh <u>pendingin</u> untuk kit basah",
    },

    {
      kode: "FISIP4001",
      judul: "Dasar-Dasar Sosiologi",
      kategori: "MK Pilihan",
      upbjj: "Makassar",
      lokasiRak: "R2-C1",
      harga: 55000,
      qty: 2,
      safety: 8,
      catatanHTML: "Stok menipis, prioritaskan reorder",
      catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder",
    },

    {
      kode: "EKON4302",
      judul: "Ekonomi Mikro",
      kategori: "Problem-Based",
      upbjj: "Padang",
      lokasiRak: "R4-D1",
      harga: 70000,
      qty: 18,
      safety: 15,
      catatanText: "Stok aman",
      catatanHTML: "Stok aman",
    },

    {
      kode: "MATK4101",
      judul: "Matematika Dasar",
      kategori: "MK Wajib",
      upbjj: "Denpasar",
      lokasiRak: "R2-A1",
      harga: 75000,
      qty: 0,
      safety: 10,
      catatanText: "Stok habis",
      catatanHTML: "<span style='color:red'>Stok habis</span>",
    },
  ],

  tracking: {
    "DO2025-0001": {
      nim: "123456789",
      nama: "Rina Wulandari",
      status: "Dalam Perjalanan",
      ekspedisi: "JNE Regular",
      tanggalKirim: "2025-08-25",
      paket: "PAKET-UT-001",
      total: 120000,

      perjalanan: [
        {
          waktu: "2025-08-25 10:12:20",

          keterangan: "Penerimaan di Loket: TANGSEL",
        },

        {
          waktu: "2025-08-25 14:07:56",

          keterangan: "Tiba di Hub: JAKSEL",
        },

        {
          waktu: "2025-08-26 08:44:01",

          keterangan: "Diteruskan ke Kantor Tujuan",
        },
      ],
    },
    "DO2025-0002": {
      nim: "230491102",
      nama: "Andi Saputra",
      status: "Dikirim",
      ekspedisi: "SiCepat",
      tanggalKirim: "2025-08-28",
      paket: "PAKET-UT-002",
      total: 140000,

      perjalanan: [
        {
          waktu: "2025-08-28 10:15:00",
          keterangan: "Paket berhasil dibuat resi",
        },
        {
          waktu: "2025-08-28 12:50:12",
          keterangan: "Paket diserahkan ke ekspedisi",
        },
      ],
    },

    "DO2025-0003": {
      nim: "230491103",
      nama: "Dewi Lestari",
      status: "Diterima",
      ekspedisi: "Pos Indonesia",
      tanggalKirim: "2025-08-25",
      paket: "PAKET-UT-001",
      total: 120000,

      perjalanan: [
        {
          waktu: "2025-08-25 09:00:20",
          keterangan: "Paket diterima ekspedisi",
        },
        {
          waktu: "2025-08-25 18:25:10",
          keterangan: "Paket tiba di kantor cabang Surabaya",
        },
        {
          waktu: "2025-08-26 11:30:45",
          keterangan: "Paket berhasil dikirim",
        },
      ],
    },

    "DO2025-0004": {
      nim: "230491104",
      nama: "Agus Pranoto",
      status: "Diterima",
      ekspedisi: "J&T Express",
      tanggalKirim: "2025-08-24",
      paket: "PAKET-UT-002",
      total: 140000,

      perjalanan: [
        {
          waktu: "2025-08-24 08:45:00",
          keterangan: "Paket diterima ekspedisi",
        },
        {
          waktu: "2025-08-25 14:20:00",
          keterangan: "Paket sampai kota tujuan",
        },
        {
          waktu: "2025-08-26 15:00:00",
          keterangan: "Paket diterima oleh penerima",
        },
      ],
    },
  },
};
