document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');
    
    // Ajusta o canvas para o tamanho da tela
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Array para armazenar os corações
    const hearts = [];
    const heartColors = ['#ff4081', '#ff79b0', '#ffb6c1', '#ff69b4', '#ff1493'];
    
    // Classe Coração
    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 10;
            this.speed = Math.random() * 2 + 1;
            this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
            this.opacity = Math.random() * 0.7 + 0.3;
            this.angle = Math.random() * Math.PI * 2;
            this.velocity = Math.random() * 0.2 - 0.1;
        }
        
        update() {
            this.y += this.speed;
            this.angle += this.velocity;
            this.x += Math.sin(this.angle) * 0.5;
            
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Desenha o coração
            ctx.beginPath();
            ctx.moveTo(0, 0 - this.size/4);
            ctx.bezierCurveTo(
                0, 0 - this.size/2, 
                -this.size/2, 0 - this.size/2, 
                -this.size/2, 0
            );
            ctx.bezierCurveTo(
                -this.size/2, this.size/3, 
                0, this.size/1.5, 
                0, this.size
            );
            ctx.bezierCurveTo(
                0, this.size/1.5, 
                this.size/2, this.size/3, 
                this.size/2, 0
            );
            ctx.bezierCurveTo(
                this.size/2, 0 - this.size/2, 
                0, 0 - this.size/2, 
                0, 0 - this.size/4
            );
            
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Cria os corações
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }
    
    // Animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (const heart of hearts) {
            heart.update();
            heart.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionamento
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});


    // Player de Música
        const playButton = document.getElementById("playButton");
        const music = document.getElementById("romanticMusic");
        const volumeControl = document.getElementById("volumeControl");
        const progressContainer = document.getElementById("progressContainer");
        const progressBar = document.getElementById("progressBar");
        const songTitle = document.querySelector(".song-title");
        const songArtist = document.querySelector(".song-artist");

        let isPlaying = false;

        // Atualiza a barra de progresso
        music.addEventListener("timeupdate", () => {
            const progress = (music.currentTime / music.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });

        // Clica na barra de progresso para avançar
        progressContainer.addEventListener("click", (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = music.duration;
            
            music.currentTime = (clickX / width) * duration;
        });

        // Controle de volume
        volumeControl.addEventListener("input", () => {
            music.volume = volumeControl.value;
            
            // Atualiza ícone do volume
            const volumeIcon = document.querySelector(".volume-icon");
            if (music.volume == 0) {
                volumeIcon.textContent = "🔇";
            } else if (music.volume < 0.5) {
                volumeIcon.textContent = "🔉";
            } else {
                volumeIcon.textContent = "🔊";
            }
        });

        // Controle de play/pause
        playButton.addEventListener("click", () => {
            if (!isPlaying) {
                music.play();
                isPlaying = true;
                playButton.textContent = "⏸";
            } else {
                music.pause();
                isPlaying = false;
                playButton.textContent = "▶";
            }
        });

        // Quando a música termina
        music.addEventListener("ended", () => {
            isPlaying = false;
            playButton.textContent = "▶";
            progressBar.style.width = "0%";
        });

        // Slideshow de Fotos
        const slides = document.querySelectorAll('.slideshow img');
        let currentSlide = 0;

        function showNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(showNextSlide, 3000); // Muda a imagem a cada 3 segundos