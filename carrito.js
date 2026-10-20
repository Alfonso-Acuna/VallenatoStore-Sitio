/* =========================================================
   VallenatoStore – Carrito persistente (localStorage)
   Guarda { titulo: cantidad } en el navegador y pinta el
   contador del navbar en todas las páginas.
   ========================================================= */

(function () {
    'use strict';

    var CLAVE = 'vallenatostore_carrito';
    var memoria = {};

    function soportado() {
        try {
            window.localStorage.setItem('vallenatostore_prueba', '1');
            window.localStorage.removeItem('vallenatostore_prueba');
            return true;
        } catch (e) {
            return false;
        }
    }

    var disponible = soportado();

    function leer() {
        if (!disponible) { return memoria; }
        try {
            var crudo = window.localStorage.getItem(CLAVE);
            var datos = crudo ? JSON.parse(crudo) : {};
            return (datos && typeof datos === 'object' && !(datos instanceof Array)) ? datos : {};
        } catch (e) {
            return {};
        }
    }

    function guardar(mapa) {
        if (!disponible) { memoria = mapa; return; }
        try {
            window.localStorage.setItem(CLAVE, JSON.stringify(mapa));
        } catch (e) {
            memoria = mapa;
        }
    }

    function agregar(titulo, cantidad) {
        if (!titulo) { return; }
        var mapa = leer();
        var n = parseInt(cantidad, 10) || 1;
        mapa[titulo] = (mapa[titulo] || 0) + n;
        guardar(mapa);
        pintar();
    }

    function quitar(titulo) {
        var mapa = leer();
        if (!mapa[titulo]) { return; }
        if (mapa[titulo] > 1) {
            mapa[titulo]--;
        } else {
            delete mapa[titulo];
        }
        guardar(mapa);
        pintar();
    }

    function vaciar() {
        guardar({});
        pintar();
    }

    function items() {
        var mapa = leer();
        return Object.keys(mapa).map(function (titulo) {
            return { titulo: titulo, cantidad: mapa[titulo] };
        });
    }

    function total() {
        var mapa = leer();
        return Object.keys(mapa).reduce(function (acc, titulo) {
            return acc + mapa[titulo];
        }, 0);
    }

    function cantidadDe(titulo) {
        return leer()[titulo] || 0;
    }

    function pintar() {
        var n = total();
        var contadores = document.querySelectorAll('[data-contador-carrito]');
        for (var i = 0; i < contadores.length; i++) {
            contadores[i].textContent = String(n);
            contadores[i].classList.toggle('d-none', n === 0);
        }
    }

    function montarContador() {
        var enlaces = document.querySelectorAll('a[href="pedido.html"].btn-dorado');
        for (var i = 0; i < enlaces.length; i++) {
            if (enlaces[i].querySelector('.carrito-contador')) { continue; }
            var badge = document.createElement('span');
            badge.className = 'carrito-contador d-none';
            badge.setAttribute('data-contador-carrito', '');
            badge.setAttribute('aria-label', 'Productos en el pedido');
            enlaces[i].appendChild(badge);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        montarContador();
        pintar();
    });

    window.Carrito = {
        CLAVE: CLAVE,
        disponible: disponible,
        agregar: agregar,
        quitar: quitar,
        vaciar: vaciar,
        items: items,
        total: total,
        cantidadDe: cantidadDe,
        pintar: pintar
    };
})();
