// Photo sources (replace with your own images)
const photos = [
    'assets/images/1.jpg',
    'assets/images/2.jpg',
    'assets/images/3.jpg'     
];

let current = 0;
let autoPlay = false;
let autoInterval = null;

const photo3d = document.getElementById('photo3d');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const autoBtn = document.querySelector('.auto-btn');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');
const clickAudio = document.getElementById('clickAudio');
// Render current photo




function playClickAudio() {
    clickAudio.currentTime = 0;
    clickAudio.play();
}

// Navigation
prevBtn.addEventListener('click', () => {
    playClickAudio();
    current = (current - 1 + photos.length) % photos.length;
    renderPhoto();
});
nextBtn.addEventListener('click', () => {
    playClickAudio();
    current = (current + 1) % photos.length;
    renderPhoto();
});
autoBtn.addEventListener('click', () => {
    playClickAudio();
    autoPlay = !autoPlay;
    autoBtn.textContent = autoPlay ? 'Stop' : 'Auto';
    if (autoPlay) {
        autoInterval = setInterval(() => {
            current = (current + 1) % photos.length;
            renderPhoto();
        }, 2000);
    } else {
        clearInterval(autoInterval);
    }
});

// ...existing code...

function playClickAudio() {
    clickAudio.currentTime = 0;
    clickAudio.play();
}

// Modal functions
function openModal() {
    playClickAudio(); // <-- yahan audio bajao
    modal.classList.add('show');
    modalImg.src = photos[current];
}
closeModal.addEventListener('click', () => {
    playClickAudio(); // <-- yahan bhi audio bajao
    modal.classList.remove('show');
    modalImg.src = '';
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        playClickAudio(); // <-- modal background pe click par bhi audio
        modal.classList.remove('show');
        modalImg.src = '';
    }
});

// ...existing code...
function renderPhoto() {
    photo3d.innerHTML = '';
    const img = document.createElement('img');
    img.src = photos[current];
    img.alt = `Photo ${current + 1}`;
    img.draggable = false;
    img.classList.add('album-photo');
    photo3d.appendChild(img);

    // 3D tilt effect
    img.addEventListener('mousemove', handleTilt);
    img.addEventListener('mouseleave', resetTilt);
    img.addEventListener('touchmove', handleTiltTouch, { passive: false });
    img.addEventListener('touchend', resetTilt);

    // Open modal on click/tap
    img.addEventListener('click', openModal);
    img.addEventListener('touchstart', (e) => {
        // Prevent accidental drag
        if (e.touches.length === 1) {
            openModal();
        }
    }, { passive: true });
}

// 3D tilt effect (mouse)
function handleTilt(e) {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    img.classList.add('tilted');
}

// 3D tilt effect (touch)
function handleTiltTouch(e) {
    if (e.touches.length !== 1) return;
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    img.classList.add('tilted');
    e.preventDefault();
}

// Reset tilt
function resetTilt(e) {
    const img = e.currentTarget;
    img.style.transform = '';
    img.classList.remove('tilted');
}

// Navigation
prevBtn.addEventListener('click', () => {
    current = (current - 1 + photos.length) % photos.length;
    renderPhoto();
});
nextBtn.addEventListener('click', () => {
    current = (current + 1) % photos.length;
    renderPhoto();
});

// Auto play
autoBtn.addEventListener('click', () => {
    autoPlay = !autoPlay;
    autoBtn.textContent = autoPlay ? 'Stop' : 'Auto';
    if (autoPlay) {
        autoInterval = setInterval(() => {
            current = (current + 1) % photos.length;
            renderPhoto();
        }, 2000);
    } else {
        clearInterval(autoInterval);
    }
});

// Modal functions
function openModal() {
    modal.classList.add('show');
    modalImg.src = photos[current];
}
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    modalImg.src = '';
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modalImg.src = '';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            modal.classList.remove('show');
            modalImg.src = '';
        }
    } else {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight');
    }
});

renderPhoto(); // Initial render