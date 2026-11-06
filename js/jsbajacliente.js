// ==========================================
// LÓGICA PARA DAR DE BAJA AL CLIENTE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const formBaja = document.getElementById('formBajaCliente');

    if (formBaja) {
        formBaja.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const confirmacion = confirm('¿Realmente deseas eliminar tu cuenta de forma definitiva?');
            
            if (confirmacion) {
                alert('Tu cuenta ha sido dada de baja exitosamente.');
                // Redirigimos al login tras dar de baja la cuenta
                window.location.href = 'login.html';
            }
        });
    }
});