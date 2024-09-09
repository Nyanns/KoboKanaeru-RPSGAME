// Game - Intro Kobo Kanaeru //
document.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.getElementById('kobo-clouds');
    const cloudImages = [
        'https://media.tenor.com/hiyRZHvnsh4AAAAi/hololive-kobo-kanaeru.gif',
        'https://media.tenor.com/CPHUccd_FMQAAAAi/kobocil-anya-forger.gif',
        'https://media.tenor.com/vJn0woKbwiIAAAAj/gura-uwu-gura.gif',
        'https://media.tenor.com/BG6hcz48jQ0AAAAi/hololive-kiara.gif',
        // Tambahkan lebih banyak URL gambar awan jika diperlukan
    ];

    function createRandomCloud() {
        const cloud = document.createElement('div');
        const image = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        const size = Math.random() * 200 + 300;  // Ukuran acak antara 300px dan 500px
        const duration = 10 + 's';  // Durasi tetap 10s untuk konsistensi

        cloud.classList.add('cloud');
        cloud.style.backgroundImage = `url(${image})`;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * 0.75}px`;  // Menjaga rasio aspek
        cloud.style.left = '-200px';  // Mulai dari luar layar kiri
        cloud.style.top = `${(window.innerHeight - size * 0.75)}px`;  // Posisi vertikal acak
        cloud.style.animation = `moveClouds ${duration} linear forwards`; // Animasi berhenti pada akhir

        cloudContainer.appendChild(cloud);

        // Hapus awan setelah animasi selesai
        cloud.addEventListener('animationend', () => {
            cloudContainer.removeChild(cloud);
        });
    }

    function createCloudPeriodically() {
        setInterval(createRandomCloud, 2000); // Buat awan setiap 2 detik
    }

    createCloudPeriodically();
});
