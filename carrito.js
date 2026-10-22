/* =========================================================
   VallenatoStore – Carrito persistente
   - Invitado: { titulo: cantidad } en localStorage.
   - Autenticado: tabla public.cart_items en Supabase.
   - Al iniciar sesión fusiona el carrito local con el remoto.
   ========================================================= */

(function () {
    'use strict';

    var CLAVE = 'vallenatostore_carrito';
    var memoria = {};
    var disponible = soportado();
    var mapa = leerLocal();
    var usuarioId = null;

    function soportado() {
        try {
            window.localStorage.setItem('vallenatostore_prueba', '1');
            window.localStorage.removeItem('vallenatostore_prueba');
            return true;
        } catch (e) {
            return false;
        }
    }

    function leerLocal() {
        if (!disponible) { return memoria; }
        try {
            var crudo = window.localStorage.getItem(CLAVE);
            var datos = crudo ? JSON.parse(crudo) : {};
            if (!datos || typeof datos !== 'object' || (datos instanceof Array)) { return {}; }
            var limpio = {};
            Object.keys(datos).forEach(function (titulo) {
                var cantidad = parseInt(datos[titulo], 10);
                if (titulo && cantidad > 0) { limpio[titulo] = cantidad; }
            });
            return limpio;
        } catch (e) {
            return {};
        }
    }

    function guardarLocal(nuevo) {
        memoria = nuevo;
        if (!disponible) { return; }
        try {
            window.localStorage.setItem(CLAVE, JSON.stringify(nuevo));
        } catch (e) {
            /* Sin localStorage seguimos usando la copia en memoria. */
        }
    }

    function cliente() {
        if (window.VallenatoSupabase && window.VallenatoSupabase.configurado) {
            return window.VallenatoSupabase.cliente;
        }
        return null;
    }

    function normalizarFilas(filas) {
        var nuevo = {};
        (filas || []).forEach(function (fila) {
            var cantidad = parseInt(fila.quantity, 10);
            if (fila.product_id && cantidad > 0) { nuevo[fila.product_id] = cantidad; }
        });
        return nuevo;
    }

    function cargarRemoto(uid) {
        var cli = cliente();
        if (!cli || !uid) { return Promise.resolve({}); }
        return cli.from('cart_items')
            .select('product_id, quantity')
            .eq('user_id', uid)
            .order('created_at', { ascending: true })
            .then(function (res) {
                if (res.error) { throw res.error; }
                return normalizarFilas(res.data);
            });
    }

    function fusionar(uid, invitado) {
        return cargarRemoto(uid).then(function (remoto) {
            var combinado = {};
            Object.keys(remoto).forEach(function (titulo) {
                combinado[titulo] = remoto[titulo];
            });
            Object.keys(invitado).forEach(function (titulo) {
                combinado[titulo] = (combinado[titulo] || 0) + invitado[titulo];
            });

            var filas = Object.keys(combinado).map(function (titulo) {
                return { user_id: uid, product_id: titulo, quantity: combinado[titulo] };
            });

            if (!filas.length) { return combinado; }

            return cliente().from('cart_items')
                .upsert(filas, { onConflict: 'user_id,product_id' })
                .then(function (res) {
                    if (res.error) { throw res.error; }
                    return combinado;
                });
        });
    }

    function guardarRemoto(titulo, cantidad) {
        var cli = cliente();
        if (!cli || !usuarioId) { return; }
        cli.from('cart_items')
            .upsert({
                user_id: usuarioId,
                product_id: titulo,
                quantity: cantidad
            }, { onConflict: 'user_id,product_id' })
            .then(function (res) {
                if (res.error) { throw res.error; }
            }, function (error) {
                if (window.console) {
                    console.warn('[VallenatoStore] No se pudo sincronizar el carrito:', error);
                }
            });
    }

    function borrarRemoto(titulo) {
        var cli = cliente();
        if (!cli || !usuarioId) { return; }
        cli.from('cart_items')
            .delete()
            .eq('user_id', usuarioId)
            .eq('product_id', titulo)
            .then(function (res) {
                if (res.error) { throw res.error; }
            }, function (error) {
                if (window.console) {
                    console.warn('[VallenatoStore] No se pudo quitar el producto del carrito:', error);
                }
            });
    }

    function persistir(titulo) {
        if (usuarioId && cliente()) {
            guardarRemoto(titulo, mapa[titulo]);
        } else {
            guardarLocal(mapa);
        }
    }

    function notificar() {
        pintar();
        var detalle = {
            items: items(),
            total: total(),
            autenticado: !!usuarioId
        };
        if (typeof window.CustomEvent === 'function') {
            document.dispatchEvent(new CustomEvent('carrito:actualizado', { detail: detalle }));
        }
    }

    function agregar(titulo, cantidad) {
        if (!titulo) { return; }
        var n = parseInt(cantidad, 10) || 1;
        mapa[titulo] = (mapa[titulo] || 0) + n;
        persistir(titulo);
        notificar();
    }

    function quitar(titulo) {
        if (!mapa[titulo]) { return; }
        if (mapa[titulo] > 1) {
            mapa[titulo]--;
            persistir(titulo);
        } else {
            delete mapa[titulo];
            if (usuarioId && cliente()) {
                borrarRemoto(titulo);
            } else {
                guardarLocal(mapa);
            }
        }
        notificar();
    }

    function eliminar(titulo) {
        if (!mapa[titulo]) { return; }
        delete mapa[titulo];
        if (usuarioId && cliente()) {
            borrarRemoto(titulo);
        } else {
            guardarLocal(mapa);
        }
        notificar();
    }

    function establecer(titulo, cantidad) {
        if (!titulo) { return; }
        var n = parseInt(cantidad, 10);
        if (!n || n <= 0) {
            eliminar(titulo);
            return;
        }
        mapa[titulo] = n;
        persistir(titulo);
        notificar();
    }

    function vaciar() {
        mapa = {};
        if (usuarioId && cliente()) {
            cliente().from('cart_items').delete().eq('user_id', usuarioId).then(function (res) {
                if (res.error) { throw res.error; }
            }, function (error) {
                if (window.console) {
                    console.warn('[VallenatoStore] No se pudo vaciar el carrito remoto:', error);
                }
            });
        } else {
            guardarLocal({});
        }
        notificar();
    }

    function vaciarRemoto() {
        mapa = {};
        if (!usuarioId || !cliente()) {
            guardarLocal({});
            notificar();
            return Promise.resolve();
        }
        return cliente().from('cart_items')
            .delete()
            .eq('user_id', usuarioId)
            .then(function (res) {
                if (res.error) { throw res.error; }
                notificar();
            });
    }

    function recargar() {
        if (!usuarioId || !cliente()) {
            mapa = leerLocal();
            notificar();
            return Promise.resolve(mapa);
        }
        return cargarRemoto(usuarioId).then(function (remoto) {
            mapa = remoto;
            notificar();
            return mapa;
        });
    }

    function alIniciarSesion(sesion) {
        var uid = sesion && sesion.user && sesion.user.id;
        if (!uid || !cliente()) { return Promise.resolve(); }
        if (usuarioId === uid) { return Promise.resolve(); }

        usuarioId = uid;
        var invitado = leerLocal();

        return fusionar(uid, invitado).then(function (combinado) {
            guardarLocal({});
            mapa = combinado;
            notificar();
            return combinado;
        }, function (error) {
            if (window.console) {
                console.warn('[VallenatoStore] No se pudo cargar el carrito remoto:', error);
            }
            usuarioId = null;
            mapa = invitado;
            guardarLocal(invitado);
            notificar();
        });
    }

    function alCerrarSesion() {
        usuarioId = null;
        mapa = leerLocal();
        notificar();
    }

    function items() {
        return Object.keys(mapa).map(function (titulo) {
            return { titulo: titulo, cantidad: mapa[titulo] };
        });
    }

    function total() {
        return Object.keys(mapa).reduce(function (acc, titulo) {
            return acc + mapa[titulo];
        }, 0);
    }

    function cantidadDe(titulo) {
        return mapa[titulo] || 0;
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
        eliminar: eliminar,
        establecer: establecer,
        vaciar: vaciar,
        vaciarRemoto: vaciarRemoto,
        recargar: recargar,
        alIniciarSesion: alIniciarSesion,
        alCerrarSesion: alCerrarSesion,
        items: items,
        total: total,
        cantidadDe: cantidadDe,
        pintar: pintar
    };
})();
