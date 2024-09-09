document.addEventListener('DOMContentLoaded', () => {
    const cloudContainer = document.getElementById('kobo-clouds');
    const cloudImages = [
        'https://media.tenor.com/hiyRZHvnsh4AAAAi/hololive-kobo-kanaeru.gif',
        'https://media.tenor.com/CPHUccd_FMQAAAAi/kobocil-anya-forger.gif',
        'https://media.tenor.com/vJn0woKbwiIAAAAj/gura-uwu-gura.gif',
        'https://media.tenor.com/BG6hcz48jQ0AAAAi/hololive-kiara.gif',
    ];

    function createRandomCloud() {
        const cloud = document.createElement('div');
        const image = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        const size = Math.random() * 200 + 300;
        const duration = 10 + 's';

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

    const playButton = document.querySelector('.play');
    const textDiv = document.querySelector('#game-intro .text');
    const gameIntro = document.getElementById('game-intro');
    const game = document.getElementById('game');
    const gameInfo = document.getElementById('game-info');

    function main() {
        createCloudPeriodically();

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
    }

    function transitionToGame() {
        gameIntro.classList.add('transition');

        setTimeout(() => {
            gameIntro.style.display = 'none';
            game.style.opacity = '1'; // Mengatur opacity game menjadi 1
            game.style.zIndex = '1';  // Mengatur zIndex agar game terlihat di atas
            gameInfo.classList.add('transition');
            game.style.display = 'flex'; // Atur display menjadi flex atau block
        }, 1000);
    }

    main();
});
