AOS.init({
    duration: 1000,
    once: true
});


const playButton = document.getElementById('playButton');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;


bgMusic.addEventListener('loadeddata', () => {
    console.log('Musik berhasil dimuat');
});


bgMusic.addEventListener('error', (e) => {
    console.error('Error memuat musik:', e);
});

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const playButton = document.getElementById('playButton');

    // Fungsi untuk memulai musik
    function playMusic() {
        music.play().then(() => {
            playButton.classList.add('playing');
        }).catch((error) => {
            console.log("Playback failed:", error);
        });
    }

    // Coba putar musik saat user berinteraksi dengan halaman
    document.body.addEventListener('click', function() {
        playMusic();
    }, { once: true }); // Event listener hanya dijalankan sekali

    // Coba putar musik saat scroll
    document.body.addEventListener('scroll', function() {
        playMusic();
    }, { once: true }); // Event listener hanya dijalankan sekali

    // Toggle play/pause saat tombol musik diklik
    playButton.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            playButton.classList.add('playing');
        } else {
            music.pause();
            playButton.classList.remove('playing');
        }
    });

    // Coba putar musik saat halaman dimuat
    playMusic();
});

// Tambahkan smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Handle RSVP Form
const rsvpForm = document.getElementById('rsvpForm');
const attendanceButtons = document.querySelectorAll('.btn-attendance');
let selectedAttendance = null;

attendanceButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus kelas active dari semua tombol
        attendanceButtons.forEach(btn => btn.classList.remove('active'));
        // Tambah kelas active ke tombol yang dipilih
        button.classList.add('active');
        selectedAttendance = button.dataset.status;
    });
});

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedAttendance) {
        alert('Silakan pilih status kehadiran Anda');
        return;
    }

    const nama = document.getElementById('nama').value;
    const ucapan = document.getElementById('ucapan').value;

    console.log({
        nama,
        ucapan,
        kehadiran: selectedAttendance
    });

    alert('Terima kasih atas konfirmasi Anda!');
    rsvpForm.reset();
    attendanceButtons.forEach(btn => btn.classList.remove('active'));
    selectedAttendance = null;
});