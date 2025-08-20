# NabungAsik (SITASIS)

*NabungAsik* adalah sebuah platform web yang dirancang untuk mendorong kebiasaan menabung pada siswa melalui sistem poin *reward*. Aplikasi ini memungkinkan siswa untuk menyimpan uang secara digital, melacak saldo tabungan, dan menukarkan poin yang mereka kumpulkan dengan berbagai hadiah menarik di koperasi sekolah.

## Fitur Utama
* **Sistem Tabungan Digital**: Mencatat transaksi tabungan dan penarikan secara digital.
* **Manajemen Poin Reward**: Menerapkan sistem poin yang terakumulasi berdasarkan aktivitas menabung siswa.
* **Katalog Hadiah Koperasi**: Menampilkan daftar hadiah yang dapat ditukarkan oleh siswa
* **Dashboard Pengguna**: Menyajikan informasi saldo, riwayat transaksi, dan poin yang dimiliki.
* **Admin Panel**: Untuk mengelola data siswa, mencatat transaksi, dan memperbarui daftar hadiah.

### Teknologi yang Digunakan

* **Front-End**: `React.js`
* **Back-End**: `Node.js` (Express.js)
* **Database**: `MongoDB`

### Panduan Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

**Persyaratan:**
* `Node.js` (Versi 14 atau lebih baru)
* `MongoDB` (Pastikan layanan berjalan)
* `Git`

**Langkah-langkah:**

1.  **Clone Repositori**
    Buka Terminal atau Command Prompt, lalu jalankan perintah berikut:
    ```sh
    git clone [https://github.com/hyupra/NabungAsik.git](https://github.com/hyupra/NabungAsik.git)
    cd NabungAsik
    ```

2.  **Pengaturan Back-End**
    Navigasi ke folder `backend`, instal dependensi, dan jalankan server:
    ```sh
    cd backend
    npm install
    ```
    Buat file `.env` di dalam folder `backend` dan tambahkan variabel lingkungan berikut:
    ```
    MONGO_URI=mongodb://localhost:27017/nabungasik_db
    PORT=5000
    ```
    Setelah itu, jalankan server:
    ```sh
    npm start
    ```
    Server akan berjalan di `http://localhost:5000`.

3.  **Pengaturan Front-End**
    Buka Terminal atau Command Prompt baru, navigasi kembali ke folder utama, lalu masuk ke folder `frontend`, instal dependensi, dan jalankan aplikasi:
    ```sh
    cd ../frontend
    npm install
    npm start
    ```
    Aplikasi akan terbuka di `http://localhost:3000`.

### Kontributor

* **Wahyu Prayoga** - [GitHub](https://github.com/hyupra)
