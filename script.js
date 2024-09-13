// Menunggu sampai semua konten halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Mengambil elemen container untuk awan dan daftar gambar awan
    const cloudContainer = document.getElementById('kobo-clouds');
    const cloudImages = [
        'https://media.tenor.com/hiyRZHvnsh4AAAAi/hololive-kobo-kanaeru.gif',
        'https://media.tenor.com/CPHUccd_FMQAAAAi/kobocil-anya-forger.gif',
    ];

    // Fungsi untuk membuat awan secara acak
    function createRandomCloud() {
        const cloud = document.createElement('div');
        const image = cloudImages[Math.floor(Math.random() * cloudImages.length)]; // Pilih gambar acak
        const size = Math.random() * 200 + 300; // Ukuran awan acak antara 300 dan 500px
        const duration = '10s'; // Durasi animasi

        cloud.classList.add('cloud');
        cloud.style.backgroundImage = `url(${image})`;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * 0.75}px`; // Sesuaikan proporsi awan
        cloud.style.left = '-200px'; // Awal posisi dari kiri luar layar
        cloud.style.top = `${(window.innerHeight - size * 0.75)}px`; // Posisi vertikal awan
        cloud.style.animation = `moveClouds ${duration} linear forwards`; // Beri animasi gerakan awan

        cloudContainer.appendChild(cloud);

        // Hapus awan setelah animasinya selesai
        cloud.addEventListener('animationend', () => {
            cloudContainer.removeChild(cloud);
        });
    }

    // Fungsi untuk membuat awan secara berkala setiap 1 detik
    function createCloudPeriodically() {
        setInterval(createRandomCloud, 1000);
    }

    // Fungsi untuk transisi dari halaman intro ke permainan
    function transitionToGame() {
        const gameIntro = document.getElementById('game-intro');
        const game = document.getElementById('game');
        const gameInfo = document.getElementById('game-info');

        gameIntro.classList.add('transition'); // Tambah efek transisi pada intro

        // Tunggu 1 detik sebelum menyembunyikan halaman intro dan menampilkan permainan
        setTimeout(() => {
            gameIntro.style.display = 'none';
            game.style.opacity = '1';
            game.style.zIndex = '1';
            gameInfo.classList.add('transition');
            game.style.display = 'flex';
        }, 1000);
    }

    // Fungsi untuk menambahkan fungsionalitas musik
    function addMusic() {
        const musicButton = document.getElementById("musicButton");
        const backgroundMusic = document.getElementById("backgroundMusic");

        // Fungsi untuk mengaktifkan/mematikan musik
        function toggleMusic() {
            musicButton.classList.toggle("music-off");
            if (musicButton.classList.contains("music-off")) {
                musicButton.textContent = "🔇 Music Off";
                backgroundMusic.pause();
            } else {
                musicButton.textContent = "🎵 Music";
                backgroundMusic.play();
            }
        }

        musicButton.addEventListener("click", toggleMusic);

        // Otomatis memutar musik dan tangani jika ada error terkait autoplay
        backgroundMusic.play().then(() => {
            musicButton.textContent = "🎵 Music";
        }).catch((error) => {
            console.log("Autoplay was prevented: ", error);
        });
    }

    // Variabel untuk skor dan ronde
    let playerScore = 0;
    let computerScore = 0;
    let roundNum = 1;

    // Ambil elemen untuk menampilkan informasi game
    const roundN = document.querySelector("#game-info .round");
    const pScore = document.getElementById("p-points");
    const cScore = document.getElementById("e-points");

    // Ambil elemen untuk pilihan pemain dan komputer
    const rockDiv = document.querySelector("#selection #rock");
    const paperDiv = document.querySelector("#selection #paper");
    const scissorsDiv = document.querySelector("#selection #scissors");
    const selectionSect = document.querySelector("#game #selection");

    // Elemen untuk menampilkan gambar pilihan pemain dan komputer
    const roundSec = document.getElementById("round");
    const pSelectionImg = document.createElement("img");
    const cSelectionImg = document.createElement("img");
    const pSelectionDiv = document.querySelector("#round .player-selection");
    const cSelectionDiv = document.querySelector("#round .cpu-selection");

    // Elemen untuk pesan akhir dan tombol replay
    const endMsg = document.querySelector("#game #game-end .end-msg");
    const gameEndSect = document.querySelector("#game #game-end");
    const replayButton = document.querySelector("#game #game-end .replay.btn");

    // Fungsi untuk menentukan pemenang ronde berdasarkan pilihan pemain dan komputer
    function playRound(playerChoice, computerChoice) {
        let roundWinner;
        if (playerChoice === computerChoice) {
            roundWinner = "none"; // Seri
        } else if (playerChoice === "paper" && computerChoice === "rock") {
            roundWinner = "player";
        } else if (playerChoice === "rock" && computerChoice === "paper") {
            roundWinner = "computer";
        } else if (playerChoice === "rock" && computerChoice === "scissors") {
            roundWinner = "player";
        } else if (playerChoice === "scissors" && computerChoice === "rock") {
            roundWinner = "computer";
        } else if (playerChoice === "scissors" && computerChoice === "paper") {
            roundWinner = "player";
        } else if (playerChoice === "paper" && computerChoice === "scissors") {
            roundWinner = "computer";
        }
        return roundWinner;
    }

    // Update tampilan skor dan ronde
    function updateInfo() {
        roundN.innerText = `Round ${roundNum}`;
        pScore.innerText = playerScore;
        cScore.innerText = computerScore;
    }

    // Fungsi untuk mendapatkan pilihan acak komputer
    function getComputerChoice() {
        let choices = ["rock", "paper", "scissors"];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    // Fungsi utama permainan
    function game(playerChoice) {
        let computerChoice = getComputerChoice();
        cSelectionImg.src = `/RockPaperScissors/Img/${computerChoice}.png`;
        pSelectionDiv.appendChild(pSelectionImg);
        cSelectionDiv.appendChild(cSelectionImg);

        let roundWinner = playRound(playerChoice, computerChoice);
        switch (roundWinner) {
            case "player":
                playerScore++;
                cSelectionDiv.classList.add("lose");
                break;
            case "computer":
                computerScore++;
                pSelectionDiv.classList.add("lose");
                break;
            case "none":
                pSelectionDiv.classList.add("lose");
                cSelectionDiv.classList.add("lose");
                break;
        }
        roundNum++;
        updateInfo();
        roundSec.addEventListener("transitionend", removeTransitionClass);
        if (playerScore === 5 || computerScore === 5) {
            gameEnd();
        }
    }

    // Fungsi untuk menghapus kelas transisi
    function removeTransitionClass(e) {
        if (e.propertyName !== "transform") return;
        roundSec.classList.remove("transition");
        selectionSect.classList.remove("transition");
        pSelectionDiv.classList.remove("lose");
        cSelectionDiv.classList.remove("lose");
    }

    // Fungsi untuk mengakhiri permainan dan menampilkan pesan akhir
    function gameEnd() {
        let messages = ["You Won, congratulations!", "You lost, better luck next time!"];
        selectionSect.classList.add("fadeOut");
        endMsg.innerText = playerScore > computerScore ? messages[0] : messages[1];
        gameEndSect.classList.add("transition");
    }

    // Fungsi utama yang menjalankan semua logika permainan
    function main() {
        createCloudPeriodically(); // Mulai membuat awan berkala

        const playButton = document.querySelector('.play');
        const textDiv = document.querySelector('#game-intro .text');

        addMusic(); // Tambahkan fungsionalitas musik

        // Klik tombol untuk memulai permainan
        playButton.addEventListener('click', () => {
            textDiv.classList.add('transition');

            setTimeout(() => {
                const clouds = document.querySelectorAll('.cloud');
                clouds.forEach(cloud => {
                    cloud.classList.add('transition');
                });

                transitionToGame();
            }, 500);
        });

        // Klik tombol replay untuk mulai ulang permainan
        replayButton.addEventListener("click", () => {
            gameEndSect.classList.remove("transition");
            selectionSect.classList.remove("fadeOut");
            playerScore = 0;
            computerScore = 0;
            roundNum = 1;
            updateInfo();
        });

        // Tambahkan event listener untuk pilihan pemain (Batu, Kertas, Gunting)
        rockDiv.addEventListener('click', () => {
            selectionSect.classList.add('transition');
            roundSec.classList.add('transition');
            pSelectionImg.src = '/RockPaperScissors/Img/paper.png';
            game("rock");
        });

        paperDiv.addEventListener('click', () => {
            selectionSect.classList.add('transition');
            roundSec.classList.add('transition');
            pSelectionImg.src = "/RockPaperScissors/Img/paper.png";
            game("paper");
        });

        scissorsDiv.addEventListener('click', () => {
            selectionSect.classList.add('transition');
            roundSec.classList.add('transition');
            pSelectionImg.src = "/RockPaperScissors/Img/scissors.png";
            game("scissors");
        });
    }

    // Jalankan fungsi utama
    main();
});
