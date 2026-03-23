// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global State
let userName = "Beautiful";
let isMusicPlaying = false;
let bgMusic = document.getElementById('bg-music');
let partyMusic = document.getElementById('party-music');

// Elements
const nameModal = document.getElementById('name-modal');
const nameInput = document.getElementById('user-name-input');
const startBtn = document.getElementById('start-btn');

const introSequence = document.getElementById('intro-sequence');
const enterBtn = document.getElementById('enter-btn');
const mainContent = document.getElementById('main-content');
const topNav = document.querySelector('.top-nav');
const footer = document.getElementById('footer');

// 0. Initial Setup
window.onload = () => {
    document.body.classList.add('locked');
    nameInput.focus();
};

// Start Journey Button
startBtn.addEventListener('click', () => {
    const val = nameInput.value.trim();
    if (val) userName = val;

    // Update Name across the site
    document.getElementById('intro-name').innerText = userName;
    document.getElementById('hero-name').innerText = userName;
    document.getElementById('nav-name').innerText = userName;

    // Hide Modal
    gsap.to(nameModal, {
        opacity: 0, duration: 0.5, onComplete: () => {
            nameModal.classList.add('hidden');
            nameModal.style.display = 'none';
            playIntroSequence();
        }
    });
});

// Name input enter key support
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startBtn.click();
});

// 1. Cinematic Intro Sequence
function playIntroSequence() {
    introSequence.classList.remove('hidden');

    const tl = gsap.timeline();

    tl.to('#intro-1', { opacity: 1, y: -20, duration: 2, ease: "power2.out" })
        .to('#intro-1', { opacity: 0, y: -40, duration: 1.5, delay: 1 })

        .to('#intro-2', { opacity: 1, y: -20, duration: 2, ease: "power2.out" })
        .to('#intro-2', { opacity: 0, y: -40, duration: 1.5, delay: 1 })

        .to('#intro-3', { opacity: 1, scale: 1.1, duration: 2.5, ease: "power2.out" })
        .to(enterBtn, { duration: 1, opacity: 1, onStart: () => enterBtn.classList.remove('hidden') });
}

// Enter Main Site
enterBtn.addEventListener('click', () => {
    // Attempt to play music
    bgMusic.volume = 0.5;
    let playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isMusicPlaying = true;
            updateMusicIcon();
        }).catch(error => {
            console.log("Auto-play prevented", error);
        });
    }

    gsap.to(introSequence, {
        opacity: 0, duration: 1.5, onComplete: () => {
            introSequence.classList.add('hidden');
            introSequence.style.display = 'none';
            mainContent.classList.remove('hidden');
            topNav.classList.remove('hidden');
            document.getElementById('chatbot-container').classList.remove('hidden');
            footer.classList.remove('hidden');
            document.body.classList.remove('locked');

            initMainAnimations();
        }
    });
});


// 2. Main Scroll Animations
function initMainAnimations() {
    // Hero Elements Pop In
    gsap.from(".hero .title", { y: 50, opacity: 0, duration: 1.5, ease: "back.out(1.7)" });
    gsap.from(".hero .subtitle", { y: 30, opacity: 0, duration: 1.5, delay: 0.5 });

    // Setup ScrollTriggers for elements
    const sections = gsap.utils.toArray('.g-section');
    sections.forEach(sec => {
        gsap.from(sec, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
            }
        });
    });

    // Timeline Animations
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item, i) => {
        let xOffset = item.classList.contains('left') ? -50 : 50;
        gsap.fromTo(item,
            { opacity: 0, x: xOffset },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                }
            }
        );
    });

    // Typewriter effect for Emotional Letter
    ScrollTrigger.create({
        trigger: ".letter-section",
        start: "top 60%",
        once: true,
        onEnter: () => {
            gsap.to("#typewriter-letter", {
                duration: 12,
                text: `Words are not just a thing to describe my love toward you🫠🤌each and every moment with you is special full moment for me💟 A day without texting you will make me go mad💢 I don't know how we became these much closee🫣❤️ though we fightt alot we can't leave or forget us just likee something 👊you have such a great place in my kuttyyy heart which will never fade who ever may come and go but my panda boii will stay forever in my heart 💗♾️ we fight shout cry argue at the end of the day we can't leave each of us 🐼❤️🩹🧿 Vishaaa loves you alotz rah pattiiii 🫂my treasure forever💎🫠🤌<br><br># kadhaipoma is not just a word between us it's a word with lots of emotions🎀❤️🩹🫠♾️👊even I can't describe how emotion and love it holds🥹🤧🤌 #Trustable soul forever my gem 💎🧿❤️🩹 the way I trust youu nobody can even touch your place boii🤌💟 <br><br>Wishing you the bestest bestest bestest birthday 🎂 happpieeest Bornday to Vishaaaa's Pandaaa boiii Molyyyyy the patttiii🫣🎀💗keep dancing likeee a dogggyyy 🐶🐕🕺🕺and enjoy your dayyy and stay happieee keeeeep smiling rahh paiyaaaa`,
                ease: "none"
            });
        }
    });
}

// 3. Smart Photo Gallery
const galleryData = [
    { src: 'assets/photo-1.jpeg', caption: 'Beautiful moments' },
    { src: 'assets/photo-2.jpeg', caption: 'Beautiful moments' },
    { src: 'assets/photo-3.jpeg', caption: 'Memories to cherish' },
    { src: 'assets/photo-4.jpeg', caption: 'Smile 😊' },
    { src: 'assets/photo-5.jpeg', caption: 'The best day' },
    { src: 'assets/photo-6.jpeg', caption: 'Pure Magic' },
    { src: 'assets/photo-7.jpeg', caption: 'Unforgettable' },
    { src: 'assets/photo-8.jpeg', caption: 'Beautiful moments' },
    { src: 'assets/photo-9.jpeg', caption: 'Smile 😊' },
    { src: 'assets/photo-10.jpeg', caption: 'Memories to cherish' },
    { src: 'assets/photo-11.jpeg', caption: 'Sweet memory' },
    { src: 'assets/photo-12.jpeg', caption: 'Beautiful moments' },
    { src: 'assets/photo-13.jpeg', caption: 'The best day' },
    { src: 'assets/photo-14.jpeg', caption: 'Always' },
    { src: 'assets/photo-15.jpeg', caption: 'Smile 😊' },
    { src: 'assets/photo-16.jpeg', caption: 'Beautiful moments' },
    { src: 'assets/photo-17.jpeg', caption: 'Memories to cherish' },
    { src: 'assets/photo-18.jpeg', caption: 'Pure Magic' },
    { src: 'assets/photo-19.jpeg', caption: 'Beautiful moments' },
    { src: 'assets/frame-1774247039735.jpg', caption: 'Beautiful moments' },
    { src: 'assets/frame-1774247039887.jpg', caption: 'Memories to cherish' },
    { src: 'assets/frame-1774247040028.jpg', caption: 'Smile 😊' },
    { src: 'assets/frame-1774247040138.jpg', caption: 'The best day' },
    { src: 'assets/frame-1774247040176.jpg', caption: 'Pure Magic' }
];

const galleryContainer = document.getElementById('photo-gallery');
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalAmbientBg = document.getElementById('modal-ambient-bg');
const modalCaption = document.getElementById('modal-caption');
const closeModalBtn = document.getElementById('close-image');

galleryData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${item.src}" alt="Memory" loading="lazy">
        <div class="gallery-overlay font-outfit font-light text-lg text-center">${item.caption}</div>
    `;
    div.addEventListener('click', () => openImageModal(index));
    galleryContainer.appendChild(div);
});

let currentImageIndex = 0;

function openImageModal(index) {
    currentImageIndex = index;
    updateModalContent();
    imageModal.classList.remove('hidden');
    gsap.fromTo(modalImg, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" });
    gsap.to(imageModal, { opacity: 1, duration: 0.3 });
    document.body.classList.add('locked');
}

function updateModalContent() {
    const item = galleryData[currentImageIndex];
    modalImg.src = item.src;
    if(modalAmbientBg) modalAmbientBg.src = item.src;
    modalCaption.innerText = item.caption;
}

const nextImageBtn = document.getElementById('next-image');
const prevImageBtn = document.getElementById('prev-image');

nextImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    gsap.fromTo(modalImg, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    updateModalContent();
});

prevImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    gsap.fromTo(modalImg, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    updateModalContent();
});

closeModalBtn.addEventListener('click', () => {
    gsap.to(imageModal, {
        opacity: 0, duration: 0.3, onComplete: () => {
            imageModal.classList.add('hidden');
            document.body.classList.remove('locked');
        }
    });
});

window.addEventListener('keydown', (e) => {
    if (imageModal.classList.contains('hidden')) return;
    if (e.key === 'ArrowRight') nextImageBtn.click();
    if (e.key === 'ArrowLeft') prevImageBtn.click();
    if (e.key === 'Escape') closeModalBtn.click();
});

// Swipe / Drag Gestures for Image Navigation
let touchStartX = 0;
let touchEndX = 0;

const handleSwipeGesture = () => {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe Left (Next)
        nextImageBtn.click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe Right (Prev)
        prevImageBtn.click();
    }
};

imageModal.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

imageModal.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, {passive: true});

imageModal.addEventListener('mousedown', e => {
    touchStartX = e.screenX;
    // prevent default image drag ghost
    e.preventDefault();
});

imageModal.addEventListener('mouseup', e => {
    touchEndX = e.screenX;
    handleSwipeGesture();
});

// Custom click outside to close for image modal
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target.classList.contains('modal-img-container')) {
        closeModalBtn.click();
    }
});


// 4. Live Countdown Timer
const currentYear = new Date().getFullYear();
let birthdayDate = new Date(`March 31, ${currentYear} 00:00:00`);

// If the birthday already passed this year, count down to next year
if (new Date() > birthdayDate) {
    birthdayDate.setFullYear(currentYear + 1);
}

function updateCountdown() {
    const now = new Date();
    const diff = birthdayDate - now;

    if (diff <= 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        triggerBirthdaySurprise();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

let bdayTriggered = false;
function triggerBirthdaySurprise() {
    if (bdayTriggered) return;
    bdayTriggered = true;
    clearInterval(countdownInterval);

    // Switch Music
    if (isMusicPlaying) {
        bgMusic.pause();
        partyMusic.volume = 0.6;
        partyMusic.play();
    }

    // Confetti
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Show Panda Modal beautifully
    const pandaModal = document.getElementById('panda-modal');
    if(pandaModal) {
        pandaModal.classList.remove('hidden');
        gsap.fromTo(pandaModal.querySelector('.glass-card'), 
            { opacity: 0, scale: 0.5, y: 50 }, 
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" }
        );
        document.body.classList.add('locked');
    }
}

document.getElementById('test-confetti').addEventListener('click', triggerBirthdaySurprise);

const closePandaBtn = document.getElementById('close-panda');
if(closePandaBtn) {
    closePandaBtn.addEventListener('click', () => {
        const pandaModal = document.getElementById('panda-modal');
        gsap.to(pandaModal, {
            opacity: 0, duration: 0.4, onComplete: () => {
                pandaModal.classList.add('hidden');
                document.body.classList.remove('locked');
                pandaModal.style.opacity = ""; // Reset
            }
        });
    });
}

// 8. Love Interaction System
let loveLevel = 0;
const loveBar = document.getElementById('love-bar');
const loveText = document.getElementById('love-percentage');
const increaseLoveBtn = document.getElementById('increase-love-btn');

increaseLoveBtn.addEventListener('click', () => {
    if (loveLevel >= 100) return;
    loveLevel += 10;
    if (loveLevel > 100) loveLevel = 100;

    loveBar.style.width = loveLevel + '%';
    loveText.innerText = loveLevel + '%';

    // Mini confetti on click
    confetti({
        particleCount: 20,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ff007f', '#ff7eb3']
    });

    if (loveLevel === 100) {
        gsap.to(increaseLoveBtn, { scale: 0, opacity: 0, duration: 0.5 });
        document.getElementById('love-finish-msg').classList.remove('hidden');
        gsap.from('#love-finish-msg', { scale: 0.5, opacity: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.5 },
            colors: ['#ff007f', '#fbbf24', '#a855f7']
        });
    }
});

// 6. Video Surprises Fullscreen Modal
const videoModal = document.getElementById('video-modal');
const modalVideoPlayer = document.getElementById('modal-video-player');
const closeVideoBtn = document.getElementById('close-video');
const playBtns = document.querySelectorAll('.play-video-btn');

playBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const src = this.getAttribute('data-src');
        if (!src) return;
        
        modalVideoPlayer.src = src;
        videoModal.classList.remove('hidden');
        gsap.fromTo(videoModal, {opacity: 0}, {opacity: 1, duration: 0.4});
        document.body.classList.add('locked');
        
        // Pause background music so they can hear the video!
        if(isMusicPlaying) {
            bgMusic.pause();
            partyMusic.pause();
            isMusicPlaying = false;
            updateMusicIcon();
        }
        
        modalVideoPlayer.play();
    });
});

if(closeVideoBtn) {
    closeVideoBtn.addEventListener('click', () => {
        gsap.to(videoModal, {
            opacity: 0, duration: 0.4, onComplete: () => {
                modalVideoPlayer.pause();
                modalVideoPlayer.src = "";
                videoModal.classList.add('hidden');
                document.body.classList.remove('locked');
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (!videoModal.classList.contains('hidden') && e.key === 'Escape') {
            // If the video is in fullscreen, the browser exits fullscreen naturally.
            // We just ensure we click the close button to exit the modal too.
            closeVideoBtn.click();
        }
    }, true); // Use capture phase so video elements don't swallow the event

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal || e.target.classList.contains('modal-img-container')) {
            closeVideoBtn.click();
        }
    });
}

document.getElementById('secret-btn').addEventListener('click', function () {
    const secretContent = document.getElementById('secret-content');
    secretContent.classList.remove('hidden');
    this.style.display = 'none';
    gsap.from(secretContent, { y: 20, opacity: 0, duration: 0.8 });
});

// 11. AI Chatbot (Visha)
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendMsgBtn = document.getElementById('send-msg-btn');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

let isChatOpen = false;

chatToggle.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        chatWindow.classList.remove('hidden');
        if (chatMessages.children.length === 0) {
            setTimeout(() => {
                addBotMessage(`Heyy ${userName}! I'm Visha 💖 I'm here to make this day extra special for you!`);
            }, 500);
        }
    } else {
        chatWindow.classList.add('hidden');
    }
});

closeChat.addEventListener('click', () => {
    isChatOpen = false;
    chatWindow.classList.add('hidden');
});

// Mock Chat Responses
const botResponses = [
    "Aww, you're so sweet! 🥺",
    "Did you know you are basically the best thing ever? ✨",
    "I'm an AI, but even I can tell how amazing you are! 💖",
    "Happy Birthday! May your day be as sparkling as your smile! 🎂🎉",
    "Tell me a secret? 😏 Just kidding, you don't have to!",
    "Visha coded me just to tell you how much you are loved. Mission accomplished! 🚀"
];

function addBotMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg bot';
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg user';
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';

    // Show typing
    typingIndicator.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Fake bot delay
    setTimeout(() => {
        typingIndicator.classList.add('hidden');
        // If message contains "birthday"
        if (text.toLowerCase().includes('birthday')) {
            addBotMessage("HAPPY BIRTHDAY!! 🎂🎁 I hope you have the most beautiful day!");
        } else if (text.toLowerCase().includes('love')) {
            addBotMessage("Love is in the air! 💕 You mean the world!");
        } else {
            const randomReply = botResponses[Math.floor(Math.random() * botResponses.length)];
            addBotMessage(randomReply);
        }
    }, 1500);
}

sendMsgBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
});

// UI Controls (Theme/Music)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
    }
});

const musicToggle = document.getElementById('music-toggle');
function updateMusicIcon() {
    const vintagePlayer = document.getElementById('vintage-player');
    const vintageIcon = document.getElementById('vintage-play-icon');

    if (isMusicPlaying) {
        musicToggle.innerHTML = '<i class="ph ph-speaker-high"></i>';
        if(vintagePlayer) vintagePlayer.classList.add('playing');
        if(vintageIcon) {
            vintageIcon.classList.remove('ph-play');
            vintageIcon.classList.add('ph-pause');
        }
    } else {
        musicToggle.innerHTML = '<i class="ph ph-speaker-slash"></i>';
        if(vintagePlayer) vintagePlayer.classList.remove('playing');
        if(vintageIcon) {
            vintageIcon.classList.remove('ph-pause');
            vintageIcon.classList.add('ph-play');
        }
    }
}

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        partyMusic.pause();
        isMusicPlaying = false;
    } else {
        if (bdayTriggered) {
            partyMusic.play();
        } else {
            bgMusic.play();
        }
        isMusicPlaying = true;
    }
    updateMusicIcon();
});

const vintagePlayBtn = document.getElementById('vintage-play-btn');
if(vintagePlayBtn) {
    vintagePlayBtn.addEventListener('click', () => {
        musicToggle.click();
    });
}

// --- NEW PREMIUM EFFECTS ---

// Custom Cursor Logic
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    // Update Dot immediately
    if(cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }
    
    // Update Outline with a tiny delay
    if(cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Add hover effect for clickable elements
const updateCursorHoverElements = () => {
    const clickables = document.querySelectorAll('a, button, input, .gallery-item, .glass-card, .time-box, .chat-fab, .cursor-pointer');
    clickables.forEach(el => {
        // Prevent multiple bindings
        if(el.dataset.cursorBound) return;
        el.dataset.cursorBound = "true";
        
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
};

// Bind on load
setTimeout(updateCursorHoverElements, 500);

// 3D Tilt Effect for premium glass feel
const init3DTilts = () => {
    const tiltElements = document.querySelectorAll('.glass-card, .time-box, .gallery-item');
    tiltElements.forEach(el => {
        if(el.dataset.tiltBound) return;
        el.dataset.tiltBound = "true";

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            el.style.zIndex = 10;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.zIndex = 1;
        });
    });
};

setTimeout(init3DTilts, 500);
