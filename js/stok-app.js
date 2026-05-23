var app = new Vue({
  el: "#app",

  data: {
    upbjjList: dataBahanAjar.upbjjList,

    kategoriList: dataBahanAjar.kategoriList,

    stok: dataBahanAjar.stok,

    editIndex: null,

    showModal: false,

    newItem: {
      kode: "",
      judul: "",
      kategori: "",
      upbjj: "",
      lokasiRak: "",
      harga: "",
      qty: "",
      safety: "",
      catatanText: "",
    },

    selectedUpbjj: "",
    selectedKategori: "",
    stokFilter: "",
    sortBy: "",
    filterApplied: false,
  },

  computed: {
    filteredStok() {
      if (!this.filterApplied) {
        return this.stok;
      }

      let hasil = [...this.stok];

      // filter UT
      if (this.selectedUpbjj) {
        hasil = hasil.filter((item) => item.upbjj === this.selectedUpbjj);
      }

      // kategori
      if (this.selectedKategori) {
        hasil = hasil.filter((item) => item.kategori === this.selectedKategori);
      }

      // stok
      if (this.stokFilter === "menipis") {
        hasil = hasil.filter((item) => item.qty < item.safety && item.qty > 0);
      }

      if (this.stokFilter === "kosong") {
        hasil = hasil.filter((item) => item.qty === 0);
      }

      // sort
      if (this.sortBy === "judul") {
        hasil.sort((a, b) => a.judul.localeCompare(b.judul));
      }

      if (this.sortBy === "stok") {
        hasil.sort((a, b) => b.qty - a.qty);
      }

      if (this.sortBy === "harga") {
        hasil.sort((a, b) => b.harga - a.harga);
      }

      return hasil;
    },
  },

  methods: {
    editData(index) {
      this.editIndex = index;
    },

    saveData() {
      this.stok.forEach((item) => {
        item.catatanHTML = item.catatanHTML || item.catatanText;
      });

      this.editIndex = null;
    },

    formatText(item, type) {
      let text = item.catatanText;

      if (type === "bold") {
        item.catatanHTML = `<strong>${text}</strong>`;
      }

      if (type === "italic") {
        item.catatanHTML = `<em>${text}</em>`;
      }

      if (type === "underline") {
        item.catatanHTML = `<u>${text}</u>`;
      }
    },

    changeColor(item, color) {
      item.catatanHTML = `<span style="
      color:${color}
    ">
      ${item.catatanText}
    </span>`;
    },
    applyFilter() {
      this.filterApplied = true;
    },

    resetFilter() {
      this.selectedUpbjj = "";

      this.selectedKategori = "";

      this.stokFilter = "";

      this.sortBy = "";

      this.filterApplied = false;
    },

    tambahData() {
      // validasi sederhana
      if (
        !this.newItem.kode ||
        !this.newItem.judul ||
        !this.newItem.kategori ||
        !this.newItem.upbjj ||
        !this.newItem.lokasiRak
      ) {
        alert("Semua field wajib diisi!");
        return;
      }

      if (
        this.newItem.qty < 0 ||
        this.newItem.safety < 0 ||
        this.newItem.harga < 0
      ) {
        alert("Angka tidak boleh negatif!");
        return;
      }

      this.stok.push({
        ...this.newItem,

        qty: Number(this.newItem.qty),

        safety: Number(this.newItem.safety),

        harga: Number(this.newItem.harga),

        catatanHTML: this.newItem.catatanText,
      });

      this.closeModal();
    },

    closeModal() {
      this.showModal = false;

      this.newItem = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: "",
        qty: "",
        safety: "",
        catatanText: "",
      };
    },
  },
});
