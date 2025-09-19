// Script para funcionalidades do site

document.addEventListener('DOMContentLoaded', function() {
    // Suavizar a rolagem para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe ativa ao menu de navegação
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animação de revelação ao rolar
    const revealElements = document.querySelectorAll('.university-card, .info-card, .score-card');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estado inicial para animação
    revealElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Verificar elementos na inicialização e durante a rolagem
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Verificar na carga inicial

    // Adicionar tooltips para as notas de corte
    const scoreCards = document.querySelectorAll('.score-card');
    
    scoreCards.forEach(card => {
        card.title = 'Nota de corte baseada na última edição do Sisu. Sujeita a variações.';
    });

    // Melhorar a experiência em dispositivos móveis
    if (window.innerWidth < 768) {
        // Adicionar menu hamburguer para mobile
        const nav = document.querySelector('.nav-menu');
        const menuToggle = document.createElement('button');
        
        menuToggle.innerHTML = '&#9776;';
        menuToggle.classList.add('menu-toggle');
        document.querySelector('.logo-menu').appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
        });
    }
});