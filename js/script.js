// login.html
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let usersBaru = JSON.parse(localStorage.getItem("usersBaru")) || [];

  let semuaUser = [...dataPengguna, ...usersBaru];
  let user = semuaUser.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (!user) {
    alert("Email atau Password yang Anda masukkan salah!");
    return;
  }
  localStorage.setItem("userLogin", JSON.stringify(user));

  alert("Login berhasil!");

  window.location.href = "dashboard.html";
}

function register() {
  let nama = document.getElementById("nama").value;
  let email = document.getElementById("emailRegister").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("passwordRegister").value;
  let repassword = document.getElementById("repassword").value;

  if (!nama || !email || !username || !password || !repassword) {
    alert("Semua kolom wajib diisi!");
    return;
  }
  if (password !== repassword) {
    alert("Password tidak sama!");
    return;
  }

  let userBaru = JSON.parse(localStorage.getItem("usersBaru")) || [];

  let semuaUser = [...dataPengguna, ...usersBaru];

  let cekUser = semuaUser.find(function (user) {
    return user.email === email;
  });

  if (cekUser) {
    alert("Email sudah terdaftar!");
    return;
  }
  let newUser = {
    id: Date.now(),
    nama: nama,
    email: email,
    username: username,
    password: password,
    role: "User",
    lokasi: "-",
  };

  usersBaru.push(newUser);

  localStorage.setItem("usersBaru", JSON.stringify(usersBaru));

  alert("Registrasi berhasil!");

  closeRegister();

  document.getElementById("formRegister").style.display = "none";

  document.getElementById("btndaftar").style.display = "block";
}

function resetPassword() {
  let email = document.getElementById("forgotEmail").value;

  if (!email) {
    alert("Masukkan email terlebih dahulu!");
    return;
  }

  alert("Link reset password telah dikirim ke email Anda!");

  closeForgot();
}

function openRegister() {
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
}

function tampilForm() {
  document.getElementById("formRegister").style.display = "block";

  document.getElementById("btndaftar").style.display = "none";
}

function openForgot() {
  document.getElementById("forgotModal").style.display = "flex";
}

function closeForgot() {
  document.getElementById("forgotModal").style.display = "none";
}

window.onclick = function (event) {
  let registerModal = document.getElementById("registerModal");

  let forgotModal = document.getElementById("forgotModal");

  if (event.target === registerModal) {
    closeRegister();
  }

  if (event.target === forgotModal) {
    closeForgot();
  }
};

//dashboard.html

window.onload = function () {
  tampilGreeting();

  updateDateTime();
  setInterval(updateDateTime, 1000);

  loadDashboardData();
};

function tampilGreeting() {
  let jam = new Date().getHours();

  let userLogin = JSON.parse(localStorage.getItem("userLogin"));

  let nama = userLogin?.nama || "User";

  let sapaan = "";

  if (jam >= 4 && jam < 11) {
    sapaan = "🌞 Selamat Pagi";
  } else if (jam >= 11 && jam < 15) {
    sapaan = "☀️ Selamat Siang";
  } else if (jam >= 15 && jam < 18) {
    sapaan = "🌤️ Selamat Sore";
  } else {
    sapaan = "🌙 Selamat Malam";
  }

  document.getElementById("greeting").innerHTML = `${sapaan}, ${nama}`;
}

function updateDateTime() {
  const now = new Date();

  const tanggal = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  setText("current-date", tanggal);

  setText("current-time", jam + " WIB");
}

function loadDashboardData() {
  const totalStok = dataBahanAjar.stok.reduce(
    (total, item) => total + item.qty,
    0,
  );

  const trackingAktif = Object.values(dataBahanAjar.tracking).filter(
    (item) => item.status === "Dalam Perjalanan" || item.status === "Dikirim",
  ).length;

  setText("total-stok", totalStok);

  setText("pengiriman-aktif", trackingAktif);
}

// // // stok.html

// // let userLogin = JSON.parse(localStorage.getItem("userLogin"));

// // if (userLogin && userLogin.role === "Administrator") {
// //   document.getElementById("admin-menu").innerHTML = `

// //             <button
// //               class="btn-add"
// //               onclick="showTambah()">

// //               + Tambah Bahan Ajar
// //             </button>
// //           `;
// // }

// let content = document.getElementById("content-bahan-ajar");

// function renderBahanAjar() {
//   content.innerHTML = "";

//   dataBahanAjar.forEach(function (item, index) {
//     content.innerHTML += `

//           <div class="card"
//           onclick="showDetail(${index})">

//           <img src="${item.cover}"
//                alt="${item.namaBarang}"
//                width="150">

//           <h4>${item.kodeBarang}</h4>

//           <p>${item.namaBarang}</p>

//           <p>Stok: ${item.stok}</p>

//           </div>

//           `;
//   });
// }

// renderBahanAjar();

// function showDetail(index) {
//   let item = dataBahanAjar[index];

//   let isAdmin = userLogin && userLogin.role === "Administrator";

//   document.getElementById("popup").style.display = "flex";

//   document.getElementById("detail-content").innerHTML = `

//          <div class="detail-layout">

//             <div class="detail-image">
//                 <img src="${item.cover}">
//            </div>

//            <div class="detail-info">

//                 <p><b>Nama Barang</b></p>
//                   ${
//                     isAdmin
//                       ? `<input
//                         id="namaBarang"
//                         class="detail-input"
//                         value="${item.namaBarang}">`
//                       : item.namaBarang
//                   }

//                <p><b>Kode Lokasi</b></p>

//                ${
//                  isAdmin
//                    ? `
//                     <input
//                      id="kodeLokasi"
//                       class="detail-input"
//                       value="${item.kodeLokasi}">
//                  `
//                    : `
//                     <div class="detail-box">
//                       ${item.kodeLokasi}
//                     </div>
//                   `
//                }

//                 <p><b>Kode Barang</b></p>

//                 ${
//                   isAdmin
//                     ? `
//                    <input
//                       id="kodeBarang"
//                       class="detail-input"
//                      value="${item.kodeBarang}">
//                  `
//                     : `
//                    <div class="detail-box">
//                      ${item.kodeBarang}
//                     </div>
//                   `
//                 }

//                 <p><b>Jenis Barang</b></p>

//                 ${
//                   isAdmin
//                     ? `
//                    <input
//                      id="jenisBarang"
//                       class="detail-input"
//                      value="${item.jenisBarang}">
//                   `
//                     : `
//                     <div class="detail-box">
//                       ${item.jenisBarang}
//                     </div>
//                   `
//                 }

//                <p><b>Edisi</b></p>

//                ${
//                  isAdmin
//                    ? `
//                    <input
//                      id="edisi"
//                      class="detail-input"
//                      value="${item.edisi}">
//                  `
//                    : `
//                     <div class="detail-box">
//                      ${item.edisi}
//                    </div>
//                  `
//                }

//                <p><b>Stok</b></p>

//                 ${
//                   isAdmin
//                     ? `
//                     <input
//                      id="stok"
//                      class="detail-input"
//                      type="number"
//                      value="${item.stok}">
//                  `
//                     : `
//                     <div class="detail-box">
//                      ${item.stok}
//                     </div>
//                  `
//                 }

//                ${
//                  isAdmin
//                    ? `
//                   <button
//                     class="save-btn"
//                     onclick="saveEdit(${index})">

//                    Simpan Perubahan

//                   </button>
//                   `
//                    : ""
//                }
//             </div>
//         </div>
//         `;
// }

// function closePopup() {
//   document.getElementById("popup").style.display = "none";
// }

// function saveEdit(index) {
//   dataBahanAjar[index].namaBarang = document.getElementById("namaBarang").value;

//   dataBahanAjar[index].kodeLokasi = document.getElementById("kodeLokasi").value;

//   dataBahanAjar[index].kodeBarang = document.getElementById("kodeBarang").value;

//   dataBahanAjar[index].jenisBarang =
//     document.getElementById("jenisBarang").value;

//   dataBahanAjar[index].edisi = document.getElementById("edisi").value;

//   dataBahanAjar[index].stok = document.getElementById("stok").value;

//   alert("Data bahan ajar berhasil diubah!");

//   closePopup();

//   renderBahanAjar();
// }

// // function showTambah() {
// //   document.getElementById("popupTambah").style.display = "flex";
// // }

// // function closeTambah() {
// //   document.getElementById("popupTambah").style.display = "none";
// // }

// // function tambahBahanAjar() {
// //   let kodeLokasi = document.getElementById("newKodeLokasi").value;

// //   let kodeBarang = document.getElementById("newKodeBarang").value;

// //   let namaBarang = document.getElementById("newNamaBarang").value;

// //   let jenisBarang = document.getElementById("newJenisBarang").value;

// //   let edisi = document.getElementById("newEdisi").value;

// //   let stok = document.getElementById("newStok").value;

// //   let cover = document.getElementById("newCover").files[0];

// //   if (
// //     !kodeLokasi ||
// //     !kodeBarang ||
// //     !namaBarang ||
// //     !jenisBarang ||
// //     !edisi ||
// //     !stok ||
// //     !cover
// //   ) {
// //     alert("Semua kolom wajib diisi!");
// //     return;
// //   }

// //   let fileInput = document.getElementById("newCover");

// //   let file = fileInput.files[0];

// //   let coverImage = "img/default-book.jpg";

// //   if (file) {
// //     coverImage = URL.createObjectURL(file);
// //   }

// //   let newItem = {
// //     kodeLokasi: document.getElementById("newKodeLokasi").value,

// //     kodeBarang: document.getElementById("newKodeBarang").value,

// //     namaBarang: document.getElementById("newNamaBarang").value,

// //     jenisBarang: document.getElementById("newJenisBarang").value,

// //     edisi: document.getElementById("newEdisi").value,

// //     stok: document.getElementById("newStok").value,

// //     cover: coverImage,
// //   };

// //   dataBahanAjar.push(newItem);

// //   let index = dataBahanAjar.length - 1;
// //   content.innerHTML += `

// //             <div class="card" onclick="showDetail(${index})">
// //               <img src="${newItem.cover}" width="150">

// //               <h4> ${newItem.kodeBarang} </h4>
// //               <p> ${newItem.namaBarang} </p>
// //               <p> ${newItem.stok} </p>
// //             </div>
// //           `;

// //   alert("Bahan ajar berhasil ditambahkan!");

// //   closeTambah();
// // }

// // tracking.html

// // function lacakPaket() {
// //   let nomor = document.getElementById("trackingInput").value;

// //   let data = dataTracking[nomor];

// //   let hasil = document.getElementById("hasilTracking");

// //   if (!data) {
// //     hasil.innerHTML = `
// //             <p>Data tracking tidak ditemukan.</p>`;

// //     return;
// //   }

// //   let timeline = "";

// //   data.perjalanan.forEach((item) => {
// //     timeline += `
// //           <div class="timeline-item">

// //       <div class="timeline-left">
// //         <div class="timeline-dot"></div>
// //       </div>

// //       <div class="timeline-content">

// //         <div class="timeline-info">

// //           <p class="status">
// //             ${item.keterangan}
// //           </p>

// //           <span>
// //             ${item.waktu}
// //           </span>

// //         </div>

// //       </div>

// //     </div>
// //   `;
// //   });

// //   hasil.innerHTML = `
// //     <div class="tracking-card">

// //       <div>
// //        <h3>${data.nama}</h3>
// //        <p>${data.nomorDO}</p>
// //        <p>${data.ekspedisi}</p>
// //        <p>${data.paket}</p>
// //        <p>${data.total}</p>
// //      </div>

// //      <div class="tanggal">
// //         <h4>${data.tanggalKirim}</h4>
// //         <span class="status-badge">
// //          ${data.status}
// //        </span>
// //      </div>

// //     </div>

// //     <h4 class="judul-perjalanan">
// //      Perjalanan Paket
// //     </h4>

// //     <div class="timeline">
// //      ${timeline}
// //     </div>
// //   `;
// // }

// // function resetTracking() {
// //   document.getElementById("trackingInput").value = "";

// //   document.getElementById("hasilTracking").innerHTML = "";

// //   document.getElementById("trackingInput").focus();
// // }

function logout() {
  localStorage.removeItem("loginUser");

  window.location.href = "login.html";
}

function setText(id, value) {
  const el = document.getElementById(id);

  if (el) {
    el.innerText = value;
  }
}
