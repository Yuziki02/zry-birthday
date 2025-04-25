// 设置目标日期：2025年4月26日
const targetDate = new Date("2025-04-26T00:00:00");

// 整个文档加载完成后的主函数
document.addEventListener("DOMContentLoaded", function() {
    // 直接显示生日页面
    document.getElementById("birthday-container").style.display = "block";
    createConfetti();
    setupScrollDetection();
    
    // 添加烟花效果监听器
    setupFireworks();
    
    // 增强手机端角色响应
    setupMobileCharacterInteraction();
    
    // 自动发射一些烟花
    setTimeout(() => {
        launchMultipleFireworks(5);
    }, 1000);

    // 小纸条翻转效果 - 只能翻转一次
    const note = document.getElementById("note");
    if (note) {
        const flipNote = () => {
            if (!note.classList.contains("flipped")) {
                note.classList.add("flipped");
                // 翻转后移除事件监听器
                note.removeEventListener("click", flipNote);
                note.removeEventListener("touchend", handleTouch);
            }
        };

        const handleTouch = (e) => {
            e.preventDefault();
            flipNote();
        };

        note.addEventListener("click", flipNote);
        note.addEventListener("touchend", handleTouch);
    }

    // 设置背景音乐
    setupBackgroundMusic();
});

// 设置背景音乐
function setupBackgroundMusic() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicButton');
    
    if (!music || !musicBtn) return;

    // 尝试自动播放的函数
    const tryToPlay = async () => {
        try {
            await music.play();
            musicBtn.classList.remove('paused');
        } catch (err) {
            musicBtn.classList.add('paused');
        }
    };

    // 多种方式尝试自动播放
    tryToPlay();  // 首次尝试
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            tryToPlay();
        }
    });

    // 监听页面点击
    const pageClickHandler = () => {
        tryToPlay();
        // 一旦成功播放，就移除这些事件监听器
        if (!music.paused) {
            document.removeEventListener('click', pageClickHandler);
            document.removeEventListener('touchstart', pageClickHandler);
            window.removeEventListener('scroll', pageClickHandler);
        }
    };

    // 添加各种事件监听来尝试自动播放
    document.addEventListener('click', pageClickHandler);
    document.addEventListener('touchstart', pageClickHandler);
    window.addEventListener('scroll', pageClickHandler);

    // 监听音乐播放状态
    music.addEventListener('play', () => {
        musicBtn.classList.remove('paused');
    });

    music.addEventListener('pause', () => {
        musicBtn.classList.add('paused');
    });

    // 点击按钮控制音乐
    const toggleMusic = (e) => {
        if (e) e.preventDefault();
        if (music.paused) {
            tryToPlay();
        } else {
            music.pause();
        }
    };

    // 点击事件
    musicBtn.addEventListener('click', toggleMusic);
    
    // 触摸事件
    musicBtn.addEventListener('touchend', toggleMusic);

    // 当窗口获得焦点时尝试播放
    window.addEventListener('focus', () => {
        if (!music.paused) {
            tryToPlay();
        }
    });
}

// 滚动检测与动画触发
function setupScrollDetection() {
    const sections = document.querySelectorAll('.anime-section');
    
    // 初始激活第一个部分
    setTimeout(() => {
        if (sections.length > 0) {
            sections[0].classList.add('visible-section');
            animateCharactersInSection(sections[0].id);
        }
    }, 500);
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.getBoundingClientRect().height;
            const windowHeight = window.innerHeight;
            
            // 当部分进入视图的40%时
            if (sectionTop < windowHeight * 0.6 && sectionTop > -sectionHeight * 0.4) {
                if (!section.classList.contains('visible-section')) {
                    section.classList.add('visible-section');
                    animateCharactersInSection(section.id);
                }
            }
        });
    });
}

// 根据部分ID激活角色动画
function animateCharactersInSection(sectionId) {
    let charactersToAnimate = [];
    
    switch(sectionId) {
        case 'haikyuu-section':
            charactersToAnimate = ['hinata', 'oikawa', 'tsukishima', 'yamaguchi'];
            break;
        case 'identity-section':
            charactersToAnimate = ['perfumer', 'gardener', 'littlegirl', 'acrobat'];
            break;
        case 'gintama-section':
            charactersToAnimate = ['gintoki', 'shinpachi', 'hijikata', 'okita'];
            break;
        default:
            return;
    }
    
    charactersToAnimate.forEach((charId, index) => {
        const character = document.getElementById(charId);
        if (character) {
            anime({
                targets: character,
                translateY: [100, 0],
                opacity: [0, 1],
                easing: "spring(1, 80, 10, 0)",
                duration: 1200,
                delay: 300 + (index * 200)
            });
        }
    });
}

// 创建五彩纸屑效果
function createConfetti() {
    const confettiContainer = document.getElementById("confetti-container");
    if (!confettiContainer) return;
    
    const colors = ["#ff69b4", "#9370db", "#64ceff", "#5c9ade", "#4caf50"];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        
        // 随机样式
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        
        // 随机位置
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `-50px`;
        
        // 随机动画
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // 添加五彩纸屑下落动画样式
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        .confetti {
            position: absolute;
            border-radius: 0;
            transform: rotate(0deg);
        }
        
        @keyframes fall {
            0% {
                top: -50px;
                transform: translateX(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                top: 100vh;
                transform: translateX(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 200}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// 设置烟花效果
function setupFireworks() {
    console.log("设置烟花按钮...");
    const fireworkButton = document.getElementById('firework-button');
    
    if (!fireworkButton) {
        console.error("未找到烟花按钮!");
        return;
    }
    
    console.log("找到烟花按钮，添加点击事件");
    
    // 确保按钮可见
    fireworkButton.style.display = 'block';
    
    // 添加点击事件
    fireworkButton.removeEventListener('click', fireworkClickHandler); // 移除可能已存在的事件监听器
    fireworkButton.addEventListener('click', fireworkClickHandler);
    
    // 自动发射一些烟花
    setTimeout(() => {
        const birthdayContainer = document.getElementById('birthday-container');
        if (birthdayContainer && birthdayContainer.style.display !== 'none') {
            console.log("自动发射烟花");
            launchMultipleFireworks(5);
        }
    }, 2000);
}

// 烟花按钮点击处理函数
function fireworkClickHandler(event) {
    console.log("烟花按钮被点击!");
    event.preventDefault();
    launchMultipleFireworks(10); // 一次发射10个烟花
}

// 烟花爆炸效果
function explodeFirework(x, y, mainColor) {
    // 检测是否是移动设备，减少移动端的粒子数量
    const isMobile = window.innerWidth < 768;
    
    // 获取更好的性能
    const fragmentContainer = new DocumentFragment();
    
    // 创建爆炸中心闪光
    const center = document.createElement('div');
    center.className = 'explosion-center';
    center.style.left = `${x}px`;
    center.style.top = `${y}px`;
    center.style.animation = 'explosion-flash 0.6s forwards';
    fragmentContainer.appendChild(center);
    
    // 创建粒子容器
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'firework-particles';
    particlesContainer.style.left = `${x}px`;
    particlesContainer.style.top = `${y}px`;
    fragmentContainer.appendChild(particlesContainer);
    
    // 播放爆炸音效
    playFireworkSound(0.4); // 爆炸音效音量
    
    // 烟花形状选择 - 简化形状种类以减少问题
    const shapes = ['球形', '环形', '菊花形', '双层'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // 粒子总数 - 根据设备性能调整
    let particleCount = isMobile ? 50 : 100;
    
    // 生成颜色变化 - 简化颜色生成逻辑
    const generateColor = (baseColor, variation = 30) => {
        // 将十六进制颜色转为RGB
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        
        // 添加随机变化
        const randVar = Math.random() * variation * 2 - variation;
        return `rgb(
            ${Math.max(0, Math.min(255, r + randVar))}, 
            ${Math.max(0, Math.min(255, g + randVar))}, 
            ${Math.max(0, Math.min(255, b + randVar))})`;
    };
    
    // 随机选择白色或金色粒子
    const getSpecialColor = () => {
        return Math.random() > 0.5 ? 'rgb(255, 255, 255)' : 'rgb(255, 215, 0)';
    };
    
    // 创建所有粒子
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        
        // 根据形状决定粒子属性
        let angle, distance, delay;
        
        switch (shape) {
            case '环形':
                // 环形分布
                angle = (Math.PI * 2) * (i / particleCount);
                distance = 120 + Math.random() * 30;
                break;
                
            case '菊花形':
                // 菊花形分布
                const layerIndex = Math.floor(i / (particleCount / 3));
                angle = (Math.PI * 2) * (i % (particleCount / 3)) / (particleCount / 3);
                distance = 80 + layerIndex * 40;
                break;
                
            case '双层':
                // 双层爆炸
                const isOuterLayer = i >= particleCount / 2;
                angle = (Math.PI * 2) * (i / (particleCount / 2));
                distance = isOuterLayer ? 150 + Math.random() * 30 : 70 + Math.random() * 20;
                
                // 外层延迟爆炸
                if (isOuterLayer) {
                    delay = 0.2;
                }
                break;
                
            default: // 球形
                // 随机角度和距离的球形分布
                angle = Math.random() * Math.PI * 2;
                distance = 30 + Math.random() * 150;
                break;
        }
        
        // 计算粒子位置
        const posX = Math.cos(angle) * distance;
        const posY = Math.sin(angle) * distance;
        
        // 设置CSS变量
        particle.style.setProperty('--x', `${posX}px`);
        particle.style.setProperty('--y', `${posY}px`);
        particle.style.setProperty('--z', '0px');
        
        // 随机大小
        const size = 2 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 设置颜色 (10%的几率使用特殊颜色)
        const useSpecialColor = Math.random() < 0.1;
        const color = useSpecialColor ? getSpecialColor() : generateColor(mainColor);
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${4 + size}px ${size * 0.8}px ${color}`;
        
        // 设置动画
        const duration = 0.5 + Math.random() * 0.7;
        delay = delay || Math.random() * 0.1;
        particle.style.animation = `firework-particle-animation ${duration}s ease-out ${delay}s forwards`;
        
        // 添加到容器
        particlesContainer.appendChild(particle);
    }
    
    // 添加一些大闪光粒子在中心
    const specialParticleCount = isMobile ? 3 : 5;
    for (let i = 0; i < specialParticleCount; i++) {
        const bigParticle = document.createElement('div');
        bigParticle.className = 'firework-particle';
        
        // 靠近中心的位置
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30;
        
        bigParticle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        bigParticle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        bigParticle.style.setProperty('--z', '0px');
        
        // 大尺寸
        const size = 4 + Math.random() * 4;
        bigParticle.style.width = `${size}px`;
        bigParticle.style.height = `${size}px`;
        
        // 设置为白色/金色
        const specialColor = getSpecialColor();
        bigParticle.style.backgroundColor = specialColor;
        bigParticle.style.boxShadow = `0 0 ${10 + size}px ${size}px ${specialColor}`;
        
        // 快速动画
        bigParticle.style.animation = `firework-particle-animation ${0.3 + Math.random() * 0.3}s ease-out forwards`;
        
        particlesContainer.appendChild(bigParticle);
    }
    
    // 添加到DOM
    document.body.appendChild(fragmentContainer);
    
    // 清理元素
    setTimeout(() => {
        if (document.body.contains(center)) {
            document.body.removeChild(center);
        }
        if (document.body.contains(particlesContainer)) {
            document.body.removeChild(particlesContainer);
        }
    }, 2000);
}

// 播放烟花音效
function playFireworkSound(volume = 0.3) {
    const audio = new Audio();
    audio.volume = volume;
    
    // 随机选择不同的爆炸音效
    const soundType = Math.floor(Math.random() * 3);
    switch(soundType) {
        case 0:
            audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCgUFBQUFDMzMzMzM0VFRUVFRVhYWFhYWGxsbGxsbH9/f39/f5OTk5OTk6ampqampry8vLy8vM/Pz8/Pz+Li4uLi4vX19fX19f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAX/////////////////////////////////';
            break;
        case 1:
            audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCgUFBQUFDMzMzMzM0VFRUVFRVhYWFhYWGxsbGxsbH9/f39/f5OTk5OTk6ampqampry8vLy8vM/Pz8/Pz+Li4uLi4vX19fX19f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAT/////////////////////////////////';
            break;
        case 2:
            audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCgUFBQUFDMzMzMzM0VFRUVFRVhYWFhYWGxsbGxsbH9/f39/f5OTk5OTk6ampqampry8vLy8vM/Pz8/Pz+Li4uLi4vX19fX19f////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAb/////////////////////////////////';
            break;
    }
    
    audio.play().catch(e => {
        // 浏览器可能会阻止自动播放，但这不会影响网页的其他功能
        console.log("自动播放音频被阻止，这是正常的浏览器行为");
    });
}

// 平滑滚动到下一部分
function scrollToNextSection(currentSection) {
    const sections = document.querySelectorAll('.anime-section, .ending-section');
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].id === currentSection) {
            if (i + 1 < sections.length) {
                sections[i + 1].scrollIntoView({ behavior: 'smooth' });
            }
            break;
        }
    }
}

// 为手机端增强角色交互体验
function setupMobileCharacterInteraction() {
    // 获取所有角色元素
    const characters = document.querySelectorAll('.character');
    
    // 对每个角色添加触摸事件
    characters.forEach(character => {
        // 监听触摸结束事件
        character.addEventListener('touchend', function(e) {
            // 阻止默认行为，防止滚动或点击冲突
            e.preventDefault();
            
            // 获取角色的气泡
            const bubble = this.querySelector('.speech-bubble');
            if (bubble) {
                // 切换气泡的可见状态
                if (bubble.style.opacity === '1') {
                    bubble.style.opacity = '0';
                    bubble.style.transform = 'translateX(-50%) translateY(0px)';
                } else {
                    // 确保其他所有气泡都隐藏
                    document.querySelectorAll('.speech-bubble').forEach(b => {
                        b.style.opacity = '0';
                        b.style.transform = 'translateX(-50%) translateY(0px)';
                    });
                    
                    // 显示当前气泡
                    bubble.style.opacity = '1';
                    bubble.style.transform = 'translateX(-50%) translateY(-10px)';
                }
            }
        });
    });
    
    // 当点击气泡之外的地方时，隐藏所有气泡
    document.addEventListener('touchend', function(e) {
        // 检查点击的不是角色元素
        if (!e.target.closest('.character')) {
            document.querySelectorAll('.speech-bubble').forEach(bubble => {
                bubble.style.opacity = '0';
                bubble.style.transform = 'translateX(-50%) translateY(0px)';
            });
        }
    });
    
    // 检测是否是移动设备
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // 添加烟花按钮的触摸反馈
        const fireworkButton = document.getElementById('firework-button');
        if (fireworkButton) {
            fireworkButton.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            fireworkButton.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
}

// 发射多个烟花 - 使用更智能的发射方式，避免同时发射过多导致卡顿
function launchMultipleFireworks(count) {
    console.log(`准备发射${count}个烟花`);
    
    // 在移动设备上减少烟花数量，提高性能
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        count = Math.min(count, 6); // 移动设备最多6个烟花
    }
    
    // 创建烟花队列，避免同时创建太多烟花
    const queue = Array.from({length: count}, (_, i) => i);
    
    // 初始同时发射的烟花数量
    const initialBatch = Math.min(isMobile ? 2 : 3, count);
    let activeFireworks = 0;
    
    // 发射函数
    const launchNext = () => {
        if (queue.length === 0) return;
        
        // 从队列中取出一个烟花发射
        queue.shift();
        activeFireworks++;
        
        // 发射当前烟花
        launchFirework();
        
        // 发射完成后减少计数并检查是否需要发射下一个
        setTimeout(() => {
            activeFireworks--;
            // 如果活跃烟花少于限制且队列不为空，继续发射
            const maxActive = isMobile ? 2 : 3;
            if (activeFireworks < maxActive && queue.length > 0) {
                // 添加一些随机延迟，使发射更自然
                setTimeout(launchNext, 100 + Math.random() * 200);
            }
        }, 400 + Math.random() * 300); // 每个烟花的准备时间
    };
    
    // 初始发射几个烟花
    for (let i = 0; i < initialBatch; i++) {
        if (queue.length > 0) {
            setTimeout(() => launchNext(), i * 250); // 初始几个烟花间隔发射
        }
    }
}

// 发射单个烟花
function launchFirework() {
    console.log("发射一个烟花");
    
    // 检测是否是移动设备
    const isMobile = window.innerWidth < 768;
    
    // 获取页面滚动距离
    const scrollY = window.scrollY || window.pageYOffset;
    
    // 随机位置 - 在当前可视区域的底部开始
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + scrollY; // 考虑滚动距离
    
    // 随机结束位置 - 在当前可视区域的中上部分爆炸
    const endX = startX + (Math.random() * 100 - 50);
    const endY = scrollY + window.innerHeight * 0.1 + (Math.random() * window.innerHeight * 0.4); // 考虑滚动距离
    
    // 创建烟花元素
    const firework = document.createElement('div');
    firework.className = 'firework';
    document.body.appendChild(firework);
    
    // 选择烟花颜色和轨迹颜色
    const colors = [
        '#ff69b4', '#9370db', '#64ceff', '#5c9ade', '#4caf50',
        '#ff5252', '#7c4dff', '#40c4ff', '#69f0ae', '#1976d2',
        '#ff1744', '#f50057', '#d500f9', '#651fff', '#3d5afe',
        '#2979ff', '#00b0ff', '#00e5ff', '#1de9b6', '#76ff03'
    ];
    const mainColor = colors[Math.floor(Math.random() * colors.length)];
    const trailColor = 'rgba(255, 255, 255, 0.9)';
    
    // 发射动画变量
    let currentX = startX;
    let currentY = startY;
    const duration = 700 + Math.random() * 500; // 发射时间0.7-1.2秒
    const startTime = Date.now();
    
    // 创建烟花轨迹 - 使用时间间隔控制，移动端减少轨迹
    let lastTrailTime = 0;
    const trailIntervalTime = isMobile ? 25 : 15; // 轨迹生成间隔（毫秒），移动端更长
    
    const createTrail = () => {
        const now = Date.now();
        if (now - lastTrailTime >= trailIntervalTime) {
            lastTrailTime = now;
            
            const trail = document.createElement('div');
            trail.className = 'firework-trail';
            trail.style.left = `${currentX}px`;
            trail.style.top = `${currentY}px`;
            trail.style.backgroundColor = trailColor;
            trail.style.animation = `trail-fade ${0.4 + Math.random() * 0.2}s linear forwards`;
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (document.body.contains(trail)) {
                    document.body.removeChild(trail);
                }
            }, 600);
        }
    };
    
    // 发射音效
    playFireworkSound(0.2); // 发射音效音量较小
    
    // 发射动画 - 修复帧动画
    const launchAnimation = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 计算当前位置 - 使用二次方程使其看起来更自然
        currentX = startX + (endX - startX) * progress;
        currentY = startY - (startY - endY) * (progress * progress);
        
        // 添加一些微小的随机摆动，更自然
        if (progress > 0.2) {
            currentX += Math.sin(progress * 12) * 1.5;
        }
        
        firework.style.left = `${currentX}px`;
        firework.style.top = `${currentY}px`;
        
        // 创建轨迹
        createTrail();
        
        if (progress < 1) {
            requestAnimationFrame(launchAnimation);
        } else {
            // 发射完成，爆炸
            explodeFirework(currentX, currentY, mainColor);
            if (document.body.contains(firework)) {
                document.body.removeChild(firework);
            }
        }
    };
    
    // 开始动画
    requestAnimationFrame(launchAnimation);
} 