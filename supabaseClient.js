/* =========================================================
   VallenatoStore – Cliente reutilizable de Supabase
   Requiere: SDK de Supabase (CDN) y config.js cargados antes.
   ========================================================= */

(function () {
    'use strict';

    var config = window.VALLENATO_CONFIG || {};
    var url = config.SUPABASE_URL || '';
    var anonKey = config.SUPABASE_ANON_KEY || '';
    var cliente = null;
    var error = null;
    var sdkDisponible = !!(window.supabase && window.supabase.createClient);
    var configurado = !!(sdkDisponible && url && anonKey);

    if (configurado) {
        try {
            cliente = window.supabase.createClient(url, anonKey, {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: true
                }
            });
        } catch (e) {
            configurado = false;
            error = e;
        }
    } else if (!sdkDisponible) {
        error = new Error('No se cargó el SDK de Supabase.');
    } else {
        error = new Error('Configura SUPABASE_URL y SUPABASE_ANON_KEY en config.js.');
    }

    if (error && window.console) {
        console.warn('[VallenatoStore] Supabase no está disponible: ' + error.message);
    }

    window.VallenatoSupabase = {
        cliente: cliente,
        configurado: configurado,
        sdkDisponible: sdkDisponible,
        error: error
    };
})();
