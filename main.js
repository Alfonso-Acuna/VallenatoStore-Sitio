/* =========================================================
   VallenatoStore – Comportamiento compartido entre páginas
   (hero, contadores, navbar, menú móvil, AOS y validación)
   ========================================================= */

(function () {
    'use strict';

    function animarContador(el) {
        var objetivo = parseInt(el.dataset.contador, 10) || 0;
        var decimales = parseInt(el.dataset.decimal, 10) || 0;
        var divisor = Math.pow(10, decimales);
        var actual = 0;
        var pasos = 40;
        var incremento = objetivo / pasos;
        var formatear = function (n) {
            return (n / divisor).toLocaleString('es-CO', {
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales
            });
        };
        var timer = window.setInterval(function () {
            actual += incremento;
            if (actual >= objetivo) {
                actual = objetivo;
                window.clearInterval(timer);
            }
            el.textContent = formatear(Math.round(actual));
        }, 25);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* ---------- AOS: animaciones al hacer scroll ---------- */
        if (window.AOS) {
            AOS.init({
                duration: 700,
                easing: 'ease-out-cubic',
                offset: 60,
                once: true,
                disable: reduceMotion
            });
        }

        /* ---------- Animaciones escalonadas del hero ---------- */
        var heroElementos = document.querySelectorAll('.animar-inicio');
        if (!reduceMotion) {
            var retardo = 150;
            heroElementos.forEach(function (el) {
                var espera = parseInt(el.getAttribute('data-espera'), 10) || 0;
                setTimeout(function () {
                    el.classList.add('visible');
                }, espera * retardo);
            });
        } else {
            heroElementos.forEach(function (el) {
                el.classList.add('visible');
            });
        }

        /* ---------- Contadores animados ---------- */
        var contadores = document.querySelectorAll('[data-contador]');
        if (contadores.length && ('IntersectionObserver' in window)) {
            var obs = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        animarContador(entrada.target);
                        obs.unobserve(entrada.target);
                    }
                });
            }, { threshold: 0.5 });
            contadores.forEach(function (el) {
                obs.observe(el);
            });
        } else {
            contadores.forEach(function (el) {
                el.textContent = el.dataset.contador;
            });
        }

        /* ---------- Navbar compacta y botón volver arriba ---------- */
        var nav = document.querySelector('.navbar');
        var btnVolver = document.getElementById('btnVolver');

        function alHacerScroll() {
            var y = window.scrollY;
            if (nav) {
                nav.classList.toggle('nav-encogida', y > 40);
            }
            if (btnVolver) {
                btnVolver.classList.toggle('visible', y > 500);
            }
        }
        window.addEventListener('scroll', alHacerScroll, { passive: true });
        alHacerScroll();

        if (btnVolver) {
            btnVolver.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
            });
        }

        /* ---------- Cerrar menú móvil al hacer clic en un enlace ---------- */
        var menuMovil = document.getElementById('menuContenido');
        if (menuMovil) {
            document.querySelectorAll('#menuContenido .nav-link').forEach(function (enlace) {
                enlace.addEventListener('click', function () {
                    var colapso = window.bootstrap && bootstrap.Collapse.getInstance(menuMovil);
                    if (colapso) {
                        colapso.hide();
                    }
                });
            });
        }

        /* ---------- Validación genérica de formularios (data-exito) ---------- */
        document.querySelectorAll('form[data-exito]').forEach(function (form) {
            form.addEventListener('submit', function (evento) {
                if (!form.checkValidity()) {
                    evento.preventDefault();
                    evento.stopPropagation();
                } else {
                    evento.preventDefault();
                    window.alert(form.getAttribute('data-exito'));
                    form.reset();
                    form.classList.remove('was-validated');
                }
                form.classList.add('was-validated');
            });
        });
    });
})();