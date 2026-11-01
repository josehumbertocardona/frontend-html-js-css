// =================================================
// LÓGICA JAVASCRIPT DEL DASHBOARD
// ================================================= 

// 1. POBLAR DATOS DEL USUARIO EN LA INTERFAZ
// (Sabemos que está autorizado porque el script del <head> en el HTML ya lo verificó)
const usuarioStr = localStorage.getItem('usuarioSena');

if (usuarioStr) {
    const usuario = JSON.parse(usuarioStr);
    
    // Mostrar nombre en el header (usa 'nombre' o la parte antes del '@' del correo)
    const nombreMostrar = usuario.nombre || usuario.correo.split('@')[0];
    document.getElementById('nombreUsuarioDisplay').textContent = nombreMostrar;
    
    // Mostrar inicial en el avatar circular
    document.getElementById('inicialUsuario').textContent = nombreMostrar.charAt(0).toUpperCase();
}

// 2. FUNCIÓN PARA ABRIR/CERRAR MENÚ EN MÓVIL
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// 3. FUNCIÓN PARA CERRAR SESIÓN (SEGURA)
function cerrarSesion() {
    // Limpiar almacenamiento de forma definitiva
    localStorage.removeItem('tokenSena');
    localStorage.removeItem('usuarioSena');
    
    // Redirigir al login usando 'replace' para borrar el historial y evitar el botón "Atrás"
    window.location.replace('login.html');
}

// 4. AJUSTE AUTOMÁTICO AL CAMBIAR TAMAÑO DE PANTALLA
// Si el usuario está en celular (menú abierto) y gira la pantalla o agranda la ventana,
// el menú se cierra automáticamente para adaptarse al modo escritorio.
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    }
});