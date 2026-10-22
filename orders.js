/* =========================================================
   VallenatoStore – Órdenes de compra
   Registra orders + order_items en Supabase y muestra el
   historial del usuario autenticado.
   ========================================================= */

(function () {
    'use strict';

    var VS = window.VallenatoSupabase || {};

    function configurado() {
        return !!(VS.configurado && VS.cliente);
    }

    function cliente() {
        return configurado() ? VS.cliente : null;
    }

    function escapar(texto) {
        return String(texto == null ? '' : texto).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function moneda(valor) {
        return '$' + Number(valor || 0).toLocaleString('es-CO');
    }

    function fecha(iso) {
        var d = new Date(iso);
        if (isNaN(d.getTime())) { return ''; }
        return d.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function estadoEtiqueta(estado) {
        if (estado === 'completed') { return 'Completado'; }
        if (estado === 'pending') { return 'Pendiente'; }
        if (estado === 'cancelled') { return 'Cancelado'; }
        return estado || 'Completado';
    }

    function obtenerUsuario() {
        if (!cliente()) {
            return Promise.reject(new Error('Supabase no está configurado. Revisa config.js.'));
        }
        return cliente().auth.getUser().then(function (res) {
            if (res.error) { throw res.error; }
            if (!res.data || !res.data.user) {
                throw new Error('Debes iniciar sesión para guardar tu pedido.');
            }
            return res.data.user;
        });
    }

    function normalizarItems(items) {
        var vistos = {};
        var filas = [];

        (items || []).forEach(function (item) {
            var producto = item.product_id || item.titulo;
            var cantidad = parseInt(item.quantity || item.cantidad, 10);
            var precio = Number(item.unit_price != null ? item.unit_price : item.precio);
            if (!producto || !cantidad || cantidad <= 0 || isNaN(precio)) { return; }

            if (vistos[producto]) {
                vistos[producto].quantity += cantidad;
            } else {
                vistos[producto] = {
                    product_id: producto,
                    quantity: cantidad,
                    unit_price: precio
                };
                filas.push(vistos[producto]);
            }
        });

        return filas;
    }

    function crear(items, meta) {
        if (!configurado()) {
            return Promise.reject(new Error('Supabase no está configurado. Revisa config.js.'));
        }

        var filas = normalizarItems(items);
        if (!filas.length) {
            return Promise.reject(new Error('El carrito está vacío.'));
        }

        var totalCalculado = filas.reduce(function (acc, item) {
            return acc + (item.quantity * item.unit_price);
        }, 0);
        var total = (meta && meta.total != null) ? Number(meta.total) : totalCalculado;

        return obtenerUsuario().then(function (usuario) {
            var nuevaOrden = {
                user_id: usuario.id,
                total_amount: total,
                status: 'completed'
            };

            return cliente().from('orders')
                .insert(nuevaOrden)
                .select('id, total_amount, status, created_at')
                .single()
                .then(function (res) {
                    if (res.error) { throw res.error; }
                    var orden = res.data;

                    var detalle = filas.map(function (item) {
                        return {
                            order_id: orden.id,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            unit_price: item.unit_price
                        };
                    });

                    return cliente().from('order_items').insert(detalle).then(function (resDetalle) {
                        if (resDetalle.error) {
                            /* Si falla el detalle, eliminamos la orden para no dejar basura. */
                            return cliente().from('orders').delete().eq('id', orden.id).then(function () {
                                throw resDetalle.error;
                            }, function () {
                                throw resDetalle.error;
                            });
                        }

                        return orden;
                    });
                });
        }).then(function (orden) {
            if (window.Carrito && window.Carrito.vaciarRemoto) {
                return window.Carrito.vaciarRemoto().then(function () {
                    return orden;
                }, function () {
                    return orden;
                });
            }
            return orden;
        });
    }

    function historial() {
        return obtenerUsuario().then(function (usuario) {
            return cliente().from('orders')
                .select('id, total_amount, status, created_at, order_items(id, product_id, quantity, unit_price)')
                .eq('user_id', usuario.id)
                .order('created_at', { ascending: false });
        }).then(function (res) {
            if (res.error) { throw res.error; }
            return res.data || [];
        });
    }

    function construirModal() {
        if (document.getElementById('historialModal')) { return; }

        var html = [
            '<div class="modal fade" id="historialModal" tabindex="-1" aria-labelledby="historialModalLabel" aria-hidden="true">',
            '<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">',
            '<div class="modal-content auth-modal">',
            '<div class="modal-header">',
            '<h2 class="modal-title fs-5" id="historialModalLabel"><i class="bi bi-receipt me-2"></i>Mis pedidos</h2>',
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>',
            '</div>',
            '<div class="modal-body" id="historialContenido">',
            '<p class="text-muted mb-0"><span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Cargando tus pedidos…</p>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');

        document.body.insertAdjacentHTML('beforeend', html);
    }

    function renderizar(pedidos) {
        var contenedor = document.getElementById('historialContenido');
        if (!contenedor) { return; }

        if (!pedidos.length) {
            contenedor.innerHTML = '<div class="text-center py-4"><i class="bi bi-bag-x display-6 text-muted"></i><p class="mt-3 mb-1 fw-semibold">Aún no tienes pedidos guardados.</p><p class="small text-muted mb-0">Cuando confirmes una compra con tu cuenta, aparecerá aquí.</p></div>';
            return;
        }

        contenedor.innerHTML = pedidos.map(function (pedido) {
            var items = pedido.order_items || [];
            var filas = items.map(function (item) {
                return [
                    '<li class="historial-item">',
                    '<span>' + escapar(item.product_id) + '</span>',
                    '<span class="historial-cantidad">×' + item.quantity + '</span>',
                    '<span class="historial-precio">' + moneda(item.unit_price * item.quantity) + '</span>',
                    '</li>'
                ].join('');
            }).join('');

            return [
                '<article class="historial-pedido">',
                '<div class="historial-cabecera">',
                '<div>',
                '<strong>Pedido #' + escapar(String(pedido.id).slice(0, 8).toUpperCase()) + '</strong>',
                '<p class="small text-muted mb-0">' + escapar(fecha(pedido.created_at)) + '</p>',
                '</div>',
                '<span class="badge text-bg-success">' + escapar(estadoEtiqueta(pedido.status)) + '</span>',
                '</div>',
                '<ul class="historial-items">' + filas + '</ul>',
                '<div class="historial-total"><span>Total</span><strong>' + moneda(pedido.total_amount) + '</strong></div>',
                '</article>'
            ].join('');
        }).join('');
    }

    function abrirHistorial() {
        if (!configurado()) {
            window.alert('Falta configurar Supabase. Completa config.js para ver tus pedidos.');
            return;
        }
        if (window.Auth && !window.Auth.estaAutenticado()) {
            window.Auth.abrir('login');
            return;
        }

        construirModal();
        var modal = window.bootstrap
            ? bootstrap.Modal.getOrCreateInstance(document.getElementById('historialModal'))
            : null;
        if (modal) { modal.show(); }

        var contenedor = document.getElementById('historialContenido');
        if (contenedor) {
            contenedor.innerHTML = '<p class="text-muted mb-0"><span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Cargando tus pedidos…</p>';
        }

        historial().then(function (pedidos) {
            renderizar(pedidos);
        }, function (error) {
            if (contenedor) {
                contenedor.innerHTML = '<div class="alert alert-danger mb-0">No fue posible cargar tus pedidos: ' + escapar(error.message || 'error desconocido') + '</div>';
            }
        });
    }

    window.Pedidos = {
        disponible: configurado,
        crear: crear,
        historial: historial,
        abrirHistorial: abrirHistorial
    };
})();
