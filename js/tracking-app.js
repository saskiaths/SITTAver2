var app = new Vue({
  el: "#app",

  data: {
    showModal: false,

    tracking: dataBahanAjar.tracking,

    pengirimanList: dataBahanAjar.pengirimanList,

    paketList: dataBahanAjar.paket,

    newTracking: {
      nim: "",
      nama: "",
      ekspedisi: "",
      paket: "",
      tanggalKirim: new Date().toISOString().split("T")[0],
    },
  },

  computed: {
    nomorDOBaru() {
      const tahun = new Date().getFullYear();

      const jumlah = Object.keys(this.tracking).length + 1;

      return `DO${tahun}-${String(jumlah).padStart(4, "0")}`;
    },

    selectedPaket() {
      return this.paketList.find(
        (item) => item.kode === this.newTracking.paket,
      );
    },

    totalHarga() {
      return this.selectedPaket ? this.selectedPaket.harga : 0;
    },
  },

  methods: {
    formatRupiah(value) {
      return "Rp " + value.toLocaleString("id-ID");
    },

    closeModal() {
      this.showModal = false;
    },

    tambahTracking() {
      if (
        !this.newTracking.nim ||
        !this.newTracking.nama ||
        !this.newTracking.ekspedisi ||
        !this.newTracking.paket
      ) {
        alert("Semua field wajib diisi!");
        return;
      }

      this.$set(this.tracking, this.nomorDOBaru, {
        nim: this.newTracking.nim,

        nama: this.newTracking.nama,

        status: "Dikirim",

        ekspedisi: this.newTracking.ekspedisi,

        tanggalKirim: this.newTracking.tanggalKirim,

        paket: this.newTracking.paket,

        total: this.totalHarga,

        perjalanan: [
          {
            waktu: new Date().toLocaleString("id-ID"),

            keterangan: "Delivery Order dibuat",
          },
        ],
      });

      alert("Delivery Order berhasil ditambahkan!");

      this.newTracking = {
        nim: "",
        nama: "",
        ekspedisi: "",
        paket: "",
        tanggalKirim: new Date().toISOString().split("T")[0],
      };

      this.showModal = false;
    },
  },
});
