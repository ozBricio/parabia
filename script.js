document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Redireciona para a página de memórias após o clique
            window.location.href = 'memory.html';
        });
    }
});