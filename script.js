document.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.getElementById('kobo-clouds');
    const cloudImages = [
        'https://media.tenor.com/hiyRZHvnsh4AAAAi/hololive-kobo-kanaeru.gif',
        'https://media.tenor.com/CPHUccd_FMQAAAAi/kobocil-anya-forger.gif',
    ];

    function createRandomCloud() {
        const cloud = document.createElement('div');
        const image = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        const size = Math.random() * 200 + 300;
        const duration = '10s';

        cloud.classList.add('cloud');
        cloud.style.backgroundImage = `url(${image})`;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * 0.75}px`;
        cloud.style.left = '-200px';
        cloud.style.top = `${(window.innerHeight - size * 0.75)}px`;
        cloud.style.animation = `moveClouds ${duration} linear forwards`;

        cloudContainer.appendChild(cloud);

        cloud.addEventListener('animationend', () => {
            cloudContainer.removeChild(cloud);
        });
    }

    function createCloudPeriodically() {
        setInterval(createRandomCloud, 1000);
    }

    function transitionToGame() {
        const gameIntro = document.getElementById('game-intro');
        const game = document.getElementById('game');
        const gameInfo = document.getElementById('game-info');

        gameIntro.classList.add('transition');

        setTimeout(() => {
            gameIntro.style.display = 'none';
            game.style.opacity = '1'; // Mengatur opacity game menjadi 1
            game.style.zIndex = '1';  // Mengatur zIndex agar game terlihat di atas
            gameInfo.classList.add('transition');
            game.style.display = 'flex'; // Atur display menjadi flex
        }, 1000);
    }

    function addMusic() {
        const musicButton = document.getElementById("musicButton");
        const backgroundMusic = document.getElementById("backgroundMusic");

        function toggleMusic() {
            musicButton.classList.toggle("music-off");
            if (musicButton.classList.contains("music-off")) {
                musicButton.textContent = "🔇 Music Off"; // Change button text when music is off
                backgroundMusic.pause(); // Stop the music
            } else {
                musicButton.textContent = "🎵 Music"; // Change back to original text when music is on
                backgroundMusic.play(); // Play the music
            }
        }

        musicButton.addEventListener("click", toggleMusic);

        // Attempt to start music on user interaction
        document.addEventListener('click', () => {
            backgroundMusic.play().then(() => {
                console.log("Music started");
                musicButton.textContent = "🎵 Music"; // Set initial button text
            }).catch((error) => {
                console.log("Autoplay was prevented: ", error);
                // Handle cases where autoplay is prevented
            });
        });
    }

    function main() {
        createCloudPeriodically();

        const playButton = document.querySelector('.play');
        const textDiv = document.querySelector('#game-intro .text');

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

        addMusic();
    }

    main();
});
