/* =========================================================
   VallenatoStore – Autenticación con Supabase
   Registro, inicio/cierre de sesión, perfil y barra de cuenta.
   ========================================================= */

(function () {
    'use strict';

    var VS = window.VallenatoSupabase || {};
    var cliente = VS.cliente;
    var sesionActual = null;
    var perfilActual = null;
    var modalAuth = null;

    function configurado() {
        return !!(VS.configurado && cliente);
    }

    function escapar(texto) {
        return String(texto == null ? '' : texto).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function nombreVisible() {
        if (perfilActual && perfilActual.full_name) { return perfilActual.full_name; }
        if (sesionActual && sesionActual.user) {
            var meta = sesionActual.user.user_metadata || {};
            if (meta.full_name) { return meta.full_name; }
            return sesionActual.user.email || 'Mi cuenta';
        }
        return '';
    }

    function mostrarEstado(el, mensaje, tipo) {
        if (!el) { return; }
        el.textContent = mensaje || '';
        el.className = 'form-text mt-2' + (tipo ? ' text-' + tipo : '');
    }

    function habilitarBoton(boton, habilitar) {
        if (boton) { boton.disabled = !habilitar; }
    }

    function mensajeError(error) {
        var m = (error && error.message) || '';
        if (/Invalid login credentials/i.test(m)) { return 'Correo o contraseña incorrectos.'; }
        if (/Email not confirmed/i.test(m)) { return 'Confirma tu correo antes de iniciar sesión.'; }
        if (/User already registered/i.test(m)) { return 'Ese correo ya tiene una cuenta. Inicia sesión.'; }
        if (/Password should be at least/i.test(m)) { return 'La contraseña debe tener al menos 6 caracteres.'; }
        return m || 'No fue posible completar la operación. Intenta de nuevo.';
    }

    function construirModal() {
        if (document.getElementById('authModal')) { return; }

        var html = [
            '<div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="true">',
            '<div class="modal-dialog modal-dialog-centered">',
            '<div class="modal-content auth-modal">',
            '<div class="modal-header">',
            '<h2 class="modal-title fs-5" id="authModalLabel"><i class="bi bi-person-circle me-2"></i>Tu cuenta</h2>',
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>',
            '</div>',
            '<div class="modal-body">',
            '<ul class="nav nav-pills nav-fill mb-3" role="tablist">',
            '<li class="nav-item" role="presentation"><button class="nav-link active" id="tabLoginBtn" data-bs-toggle="pill" data-bs-target="#tabLogin" type="button" role="tab" aria-controls="tabLogin" aria-selected="true">Ingresar</button></li>',
            '<li class="nav-item" role="presentation"><button class="nav-link" id="tabRegistroBtn" data-bs-toggle="pill" data-bs-target="#tabRegistro" type="button" role="tab" aria-controls="tabRegistro" aria-selected="false">Crear cuenta</button></li>',
            '</ul>',
            '<div class="tab-content">',
            '<div class="tab-pane fade show active" id="tabLogin" role="tabpanel" aria-labelledby="tabLoginBtn">',
            '<form id="formLogin" novalidate>',
            '<div class="mb-3">',
            '<label class="form-label" for="loginCorreo">Correo electrónico *</label>',
            '<input type="email" class="form-control" id="loginCorreo" name="email" required autocomplete="email" placeholder="tucorreo@ejemplo.com">',
            '<div class="invalid-feedback">Ingresa un correo válido.</div>',
            '</div>',
            '<div class="mb-3">',
            '<label class="form-label" for="loginPassword">Contraseña *</label>',
            '<input type="password" class="form-control" id="loginPassword" name="password" required minlength="6" autocomplete="current-password" placeholder="Tu contraseña">',
            '<div class="invalid-feedback">Escribe tu contraseña (mínimo 6 caracteres).</div>',
            '</div>',
            '<button type="submit" class="btn btn-dorado w-100" id="loginSubmit"><i class="bi bi-box-arrow-in-right me-1"></i>Ingresar</button>',
            '<p class="form-text mt-2 mb-0" id="loginEstado" role="status"></p>',
            '</form>',
            '</div>',
            '<div class="tab-pane fade" id="tabRegistro" role="tabpanel" aria-labelledby="tabRegistroBtn">',
            '<form id="formRegistro" novalidate>',
            '<div class="mb-3">',
            '<label class="form-label" for="regNombre">Nombre completo *</label>',
            '<input type="text" class="form-control" id="regNombre" name="full_name" required minlength="3" autocomplete="name" placeholder="Ej. María Corrales">',
            '<div class="invalid-feedback">Escribe tu nombre completo.</div>',
            '</div>',
            '<div class="mb-3">',
            '<label class="form-label" for="regCorreo">Correo electrónico *</label>',
            '<input type="email" class="form-control" id="regCorreo" name="email" required autocomplete="email" placeholder="tucorreo@ejemplo.com">',
            '<div class="invalid-feedback">Ingresa un correo válido.</div>',
            '</div>',
            '<div class="mb-3">',
            '<label class="form-label" for="regPassword">Contraseña *</label>',
            '<input type="password" class="form-control" id="regPassword" name="password" required minlength="6" autocomplete="new-password" placeholder="Mínimo 6 caracteres">',
            '<div class="invalid-feedback">La contraseña debe tener al menos 6 caracteres.</div>',
            '</div>',
            '<div class="mb-3">',
            '<label class="form-label" for="regPassword2">Confirmar contraseña *</label>',
            '<input type="password" class="form-control" id="regPassword2" name="password2" required minlength="6" autocomplete="new-password" placeholder="Repite tu contraseña">',
            '<div class="invalid-feedback">Confirma tu contraseña.</div>',
            '</div>',
            '<button type="submit" class="btn btn-dorado w-100" id="regSubmit"><i class="bi bi-person-plus me-1"></i>Crear mi cuenta</button>',
            '<p class="form-text mt-2 mb-0" id="regEstado" role="status"></p>',
            '</form>',
            '</div>',
            '</div>',
            '<p class="small text-muted mt-3 mb-0"><i class="bi bi-shield-lock me-1"></i>Tus datos se guardan de forma segura en Supabase.</p>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');

        document.body.insertAdjacentHTML('beforeend', html);

        var formLogin = document.getElementById('formLogin');
        var formRegistro = document.getElementById('formRegistro');

        formLogin.addEventListener('submit', manejarLogin);
        formRegistro.addEventListener('submit', manejarRegistro);

        document.getElementById('tabLoginBtn').addEventListener('click', function () {
            mostrarEstado(document.getElementById('loginEstado'), '', '');
        });
        document.getElementById('tabRegistroBtn').addEventListener('click', function () {
            mostrarEstado(document.getElementById('regEstado'), '', '');
        });
    }

    function construirModalPerfil() {
        if (document.getElementById('perfilModal')) { return; }

        var html = [
            '<div class="modal fade" id="perfilModal" tabindex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">',
            '<div class="modal-dialog modal-dialog-centered">',
            '<div class="modal-content auth-modal">',
            '<div class="modal-header">',
            '<h2 class="modal-title fs-5" id="perfilModalLabel"><i class="bi bi-person-gear me-2"></i>Mi perfil</h2>',
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>',
            '</div>',
            '<div class="modal-body">',
            '<form id="formPerfil" novalidate>',
            '<div class="mb-3">',
            '<label class="form-label" for="perfilNombre">Nombre completo *</label>',
            '<input type="text" class="form-control" id="perfilNombre" required minlength="3" autocomplete="name">',
            '<div class="invalid-feedback">Escribe tu nombre completo.</div>',
            '</div>',
            '<div class="mb-3">',
            '<label class="form-label" for="perfilCorreo">Correo electrónico</label>',
            '<input type="email" class="form-control" id="perfilCorreo" disabled>',
            '<div class="form-text">El correo se cambia desde la confirmación de tu cuenta.</div>',
            '</div>',
            '<button type="submit" class="btn btn-dorado w-100" id="perfilSubmit"><i class="bi bi-check2-circle me-1"></i>Guardar cambios</button>',
            '<p class="form-text mt-2 mb-0" id="perfilEstado" role="status"></p>',
            '</form>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');

        document.body.insertAdjacentHTML('beforeend', html);
        document.getElementById('formPerfil').addEventListener('submit', manejarPerfil);
    }

    function abrirPerfil() {
        if (!configurado()) {
            window.alert('Falta configurar Supabase. Completa config.js y recarga la página.');
            return;
        }
        if (!sesionActual) {
            abrir('login');
            return;
        }

        construirModalPerfil();
        var nombre = document.getElementById('perfilNombre');
        var correo = document.getElementById('perfilCorreo');
        var estado = document.getElementById('perfilEstado');
        var form = document.getElementById('formPerfil');
        if (nombre) { nombre.value = nombreVisible(); }
        if (correo) { correo.value = (sesionActual.user && sesionActual.user.email) || ''; }
        if (form) { form.classList.remove('was-validated'); }
        mostrarEstado(estado, '', '');

        var modal = window.bootstrap
            ? bootstrap.Modal.getOrCreateInstance(document.getElementById('perfilModal'))
            : null;
        if (modal) { modal.show(); }
    }

    function manejarPerfil(evento) {
        evento.preventDefault();
        var form = document.getElementById('formPerfil');
        var nombreInput = document.getElementById('perfilNombre');
        var estado = document.getElementById('perfilEstado');
        var boton = document.getElementById('perfilSubmit');

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        form.classList.add('was-validated');

        var nombre = nombreInput.value.trim();
        habilitarBoton(boton, false);
        mostrarEstado(estado, 'Guardando…', 'muted');

        cliente.from('profiles')
            .upsert({ id: sesionActual.user.id, full_name: nombre }, { onConflict: 'id' })
            .select('full_name')
            .single()
            .then(function (res) {
                habilitarBoton(boton, true);
                if (res.error) {
                    mostrarEstado(estado, mensajeError(res.error), 'danger');
                    return;
                }
                perfilActual = res.data;
                actualizarCuenta();
                mostrarEstado(estado, 'Perfil actualizado correctamente.', 'success');
            }, function (error) {
                habilitarBoton(boton, true);
                mostrarEstado(estado, mensajeError(error), 'danger');
            });
    }

    function seleccionarPestana(modo) {
        var esRegistro = modo === 'registro';
        var btnLogin = document.getElementById('tabLoginBtn');
        var btnRegistro = document.getElementById('tabRegistroBtn');
        var paneLogin = document.getElementById('tabLogin');
        var paneRegistro = document.getElementById('tabRegistro');
        if (!btnLogin || !btnRegistro || !paneLogin || !paneRegistro) { return; }

        btnLogin.classList.toggle('active', !esRegistro);
        btnLogin.setAttribute('aria-selected', String(!esRegistro));
        btnRegistro.classList.toggle('active', esRegistro);
        btnRegistro.setAttribute('aria-selected', String(esRegistro));
        paneLogin.classList.toggle('show', !esRegistro);
        paneLogin.classList.toggle('active', !esRegistro);
        paneRegistro.classList.toggle('show', esRegistro);
        paneRegistro.classList.toggle('active', esRegistro);
    }

    function abrir(modo) {
        if (!configurado()) {
            window.alert('Falta configurar Supabase. Completa SUPABASE_URL y SUPABASE_ANON_KEY en config.js y recarga la página.');
            return;
        }
        construirModal();
        modalAuth = window.bootstrap
            ? bootstrap.Modal.getOrCreateInstance(document.getElementById('authModal'))
            : null;
        if (modalAuth) { modalAuth.show(); }
        seleccionarPestana(modo || 'login');
    }

    function cerrar() {
        if (modalAuth) { modalAuth.hide(); }
    }

    function manejarLogin(evento) {
        evento.preventDefault();
        var form = document.getElementById('formLogin');
        var estado = document.getElementById('loginEstado');
        var boton = document.getElementById('loginSubmit');

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        form.classList.add('was-validated');

        var correo = document.getElementById('loginCorreo').value.trim();
        var password = document.getElementById('loginPassword').value;

        habilitarBoton(boton, false);
        mostrarEstado(estado, 'Ingresando…', 'muted');

        cliente.auth.signInWithPassword({ email: correo, password: password }).then(function (res) {
            habilitarBoton(boton, true);
            if (res.error) {
                mostrarEstado(estado, mensajeError(res.error), 'danger');
                return;
            }
            mostrarEstado(estado, 'Sesión iniciada correctamente.', 'success');
            form.reset();
            form.classList.remove('was-validated');
            window.setTimeout(cerrar, 500);
        }, function (error) {
            habilitarBoton(boton, true);
            mostrarEstado(estado, mensajeError(error), 'danger');
        });
    }

    function manejarRegistro(evento) {
        evento.preventDefault();
        var form = document.getElementById('formRegistro');
        var estado = document.getElementById('regEstado');
        var boton = document.getElementById('regSubmit');

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        form.classList.add('was-validated');

        var nombre = document.getElementById('regNombre').value.trim();
        var correo = document.getElementById('regCorreo').value.trim();
        var password = document.getElementById('regPassword').value;
        var password2 = document.getElementById('regPassword2').value;

        if (password !== password2) {
            mostrarEstado(estado, 'Las contraseñas no coinciden.', 'danger');
            document.getElementById('regPassword2').focus();
            return;
        }

        habilitarBoton(boton, false);
        mostrarEstado(estado, 'Creando tu cuenta…', 'muted');

        cliente.auth.signUp({
            email: correo,
            password: password,
            options: { data: { full_name: nombre } }
        }).then(function (res) {
            habilitarBoton(boton, true);
            if (res.error) {
                mostrarEstado(estado, mensajeError(res.error), 'danger');
                return;
            }
            form.reset();
            form.classList.remove('was-validated');
            if (res.data && res.data.session) {
                mostrarEstado(estado, '¡Cuenta creada! Ya iniciaste sesión.', 'success');
                window.setTimeout(cerrar, 600);
            } else {
                mostrarEstado(estado, 'Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.', 'success');
            }
        }, function (error) {
            habilitarBoton(boton, true);
            mostrarEstado(estado, mensajeError(error), 'danger');
        });
    }

    function cerrarSesion() {
        cliente.auth.signOut().then(function (res) {
            if (res.error) {
                window.alert('No fue posible cerrar la sesión. Intenta de nuevo.');
            }
        }, function () {
            window.alert('No fue posible cerrar la sesión. Intenta de nuevo.');
        });
    }

    function cargarPerfil(usuario) {
        if (!usuario) { return; }
        cliente.from('profiles').select('full_name').eq('id', usuario.id).maybeSingle().then(function (res) {
            if (!res.error && res.data) {
                perfilActual = res.data;
                actualizarCuenta();
            }
        }, function () {
            /* El perfil es opcional: usamos los metadatos del usuario. */
        });
    }

    function insertarCuentaNav() {
        if (document.getElementById('cuentaNavItem')) { return; }
        var nav = document.querySelector('#menuContenido .navbar-nav');
        if (!nav) { return; }
        var li = document.createElement('li');
        li.id = 'cuentaNavItem';
        li.className = 'nav-item ms-lg-2 mt-2 mt-lg-0';
        nav.appendChild(li);
    }

    function actualizarCuenta() {
        var contenedor = document.getElementById('cuentaNavItem');
        if (!contenedor) { return; }

        if (sesionActual) {
            var email = (sesionActual.user && sesionActual.user.email) || '';
            contenedor.innerHTML = [
                '<div class="dropdown">',
                '<button class="btn btn-cuenta btn-sm px-3 dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">',
                '<i class="bi bi-person-circle me-1"></i><span class="cuenta-nombre">' + escapar(nombreVisible()) + '</span>',
                '</button>',
                '<ul class="dropdown-menu dropdown-menu-end shadow">',
                '<li><h6 class="dropdown-header cuenta-email">' + escapar(email) + '</h6></li>',
                '<li><button class="dropdown-item" type="button" id="btnMiPerfil"><i class="bi bi-person-gear me-1"></i>Mi perfil</button></li>',
                '<li><button class="dropdown-item" type="button" id="btnMisPedidos"><i class="bi bi-receipt me-1"></i>Mis pedidos</button></li>',
                '<li><hr class="dropdown-divider"></li>',
                '<li><button class="dropdown-item text-danger" type="button" id="btnCerrarSesion"><i class="bi bi-box-arrow-right me-1"></i>Cerrar sesión</button></li>',
                '</ul>',
                '</div>'
            ].join('');

            var miPerfil = document.getElementById('btnMiPerfil');
            var misPedidos = document.getElementById('btnMisPedidos');
            var salir = document.getElementById('btnCerrarSesion');
            if (miPerfil) { miPerfil.addEventListener('click', abrirPerfil); }
            if (misPedidos) {
                misPedidos.addEventListener('click', function () {
                    if (window.Pedidos && window.Pedidos.abrirHistorial) {
                        window.Pedidos.abrirHistorial();
                    }
                });
            }
            if (salir) { salir.addEventListener('click', cerrarSesion); }
        } else {
            contenedor.innerHTML = '<button type="button" class="btn btn-cuenta btn-sm px-3 w-100" id="btnIngresarCuenta"><i class="bi bi-person-circle me-1"></i>Ingresar</button>';
            var ingresar = document.getElementById('btnIngresarCuenta');
            if (ingresar) {
                ingresar.addEventListener('click', function () { abrir('login'); });
            }
        }
    }

    function notificarAuth() {
        var detalle = { autenticado: !!sesionActual, nombre: nombreVisible() };
        document.dispatchEvent(new CustomEvent('auth:actualizado', { detail: detalle }));
    }

    function escucharSesion() {
        cliente.auth.onAuthStateChange(function (evento, sesion) {
            sesionActual = sesion || null;

            if (!sesionActual) { perfilActual = null; }
            actualizarCuenta();
            notificarAuth();

            /* Las llamadas a Supabase se difieren para no bloquear el
               callback síncrono de onAuthStateChange. */
            if (sesionActual && (evento === 'SIGNED_IN' || evento === 'INITIAL_SESSION')) {
                var sesionEvento = sesionActual;
                window.setTimeout(function () {
                    cargarPerfil(sesionEvento.user);
                    if (window.Carrito && window.Carrito.alIniciarSesion) {
                        window.Carrito.alIniciarSesion(sesionEvento);
                    }
                }, 0);
            }

            if (evento === 'SIGNED_OUT') {
                window.setTimeout(function () {
                    if (window.Carrito && window.Carrito.alCerrarSesion) {
                        window.Carrito.alCerrarSesion();
                    }
                }, 0);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!configurado()) {
            /* Sin Supabase el sitio sigue funcionando como tienda estática. */
            return;
        }
        construirModal();
        insertarCuentaNav();
        actualizarCuenta();
        escucharSesion();
    });

    window.Auth = {
        configurado: configurado,
        abrir: abrir,
        abrirPerfil: abrirPerfil,
        cerrar: cerrar,
        cerrarSesion: cerrarSesion,
        estaAutenticado: function () { return !!sesionActual; },
        getSesion: function () { return sesionActual; },
        getUsuario: function () { return sesionActual ? sesionActual.user : null; },
        getNombre: nombreVisible
    };
})();
