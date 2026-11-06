// ==========================================
// LÓGICA PARA EDITAR PERFIL DE CLIENTE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const formEditar = document.getElementById('formEditarCliente');

    if (formEditar) {
        formEditar.addEventListener('submit', (e) => {
            // aqui evitamos que el formulario recargue la página por defecto
            e.preventDefault();

            // tenemos los valores de cada campo
            const tipoDocumento = document.getElementById('tipo_documento').value;
            const documento = document.getElementById('documento').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const password = document.getElementById('password').value;

            // Validación de teléfono (10 dígitos)
            if (telefono.length !== 10) {
                alert('El número de teléfono debe tener exactamente 10 dígitos.');
                return;
            }

            // Simulamos el guardado de datos exitoso
            console.log('Datos actualizados:', {
                tipoDocumento,
                documento,
                nombre,
                direccion,
                telefono,
                correo,
                password: password ? '******' : 'Sin cambios'
            });

            // Mensaje de confirmación al usuario
            alert('¡Tus datos se han actualizado correctamente!');

            // Redirigimos al menú principal del cliente
            window.location.href = 'menucliente.html';
        });
    }
});