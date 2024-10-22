
const playButton = document.getElementById('playButton');
const audioPlayer = document.getElementById('audioPlayer');

// Función para reproducir o pausar la canción al hacer clic en el botón
playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = 'Pause'; // Cambiar el texto a "Pause"
    } else {
        audioPlayer.pause();
        playButton.textContent = 'Play'; // Cambiar el texto a "Play"
    }
});
