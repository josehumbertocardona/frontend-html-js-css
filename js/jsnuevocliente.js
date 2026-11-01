/*document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const mensajeError = document.getElementById('mensajeError');
    const textoError = document.getElementById('textoError');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnSubmit = document.getElementById('btnSubmit');

    // Función para mostrar errores
    const mostrarError = (mensaje) => {
        textoError.textContent = mensaje;
        mensajeError.style.display = 'flex';
        mensajeExito.style.display = 'none';
    };

    // Función para ocultar errores
    const ocultarMensajes = () => {
        mensajeError.style.display = 'none';
        mensajeExito.style.display = 'none';
    };

    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita la recarga de la página
        ocultarMensajes();

        // 1. Capturar datos (Los IDs coinciden con lo que espera tu controlador)
        const formData = {
            t1: document.getElementById('t1').value.toUpperCase(), // Aseguramos mayúsculas para CC, TI, CE
            t2: document.getElementById('t2').value.trim(),
            t3: document.getElementById('t3').value.trim(),
            t4: document.getElementById('t4').value.trim(),
            t5: document.getElementById('t5').value.trim(),
            t6: document.getElementById('t6').value.trim().toLowerCase(),
            t7: document.getElementById('t7').value
        };

        // 2. Estado de carga en el botón
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Registrando...</span>';
         //const API_URL = 'http://localhost:3333/cliente/'; 
        try {
            // ⚠️ IMPORTANTE: Ajusta esta URL a la ruta real de tu backend Express
            // Ejemplo: si en tu app.js tienes: app.post('/api/clientes', CrearClienteControlador.crearCliente)
            const response = await fetch('http://localhost:3333/usuario/crear', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                // El backend devuelve 400, 409 o 500 con un objeto { error: "..." }
                throw new Error(data.error || 'Error desconocido al registrar el cliente.');
            }

            // 3. Éxito (Código 201)
            mensajeExito.style.display = 'flex';
            registroForm.reset(); // Limpiar formulario
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            console.error('Error en el registro:', error);
            mostrarError(error.message);
        } finally {
            // Restaurar botón
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fa-solid fa-user-plus"></i> <span>Registrarme</span>';
        }
    });
});  */

document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const mensajeError = document.getElementById('mensajeError');
    const textoError = document.getElementById('textoError');
    const mensajeExito = document.getElementById('mensajeExito');
    const btnSubmit = document.getElementById('btnSubmit');

    // ==========================================
    // 1. VALIDACIÓN EN TIEMPO REAL (INPUT MASKING)
    // ==========================================

    // t2: Número de Documento (Solo números, máximo 10)
    // Regex del controlador: /^\d{8,10}$/
    const inputNdoc = document.getElementById('t2');
    inputNdoc.addEventListener('input', function() {
        // \D significa "cualquier cosa que NO sea un dígito". Lo reemplazamos por vacío.
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
        validarCampo(this, /^\d{8,10}$/);
    });

    // t3: Nombres Completos (Solo letras y espacios)
    // Regex del controlador: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/
    const inputNom = document.getElementById('t3');
    inputNom.addEventListener('input', function() {
        // Borramos cualquier cosa que NO sea letra (incluye tildes) o espacio
        this.value = this.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
        validarCampo(this, /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/);
    });

    // t4: Dirección (Letras, números, espacios y caracteres específicos)
    // Regex del controlador: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\/ºª\-]{5,200}$/
    const inputDir = document.getElementById('t4');
    inputDir.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\/ºª\-]/g, '');
        validarCampo(this, /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s.,#\/ºª\-]{5,200}$/);
    });

    // t5: Teléfono (Solo números, exactamente 10)
    // Regex del controlador: /^\d{10}$/
    const inputTel = document.getElementById('t5');
    inputTel.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
        validarCampo(this, /^\d{10}$/);
    });

    // t6: Correo Electrónico (Validación visual en tiempo real)
    // Regex del controlador: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const inputEmail = document.getElementById('t6');
    inputEmail.addEventListener('input', function() {
        const er = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validarCampo(this, er);
    });

    // t7: Contraseña (Validación de complejidad en tiempo real)
    // Regex del controlador: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    const inputContras = document.getElementById('t7');
    inputContras.addEventListener('input', function() {
        const val = this.value;
        // No bloqueamos la escritura en contraseñas (sería muy frustrante para el usuario),
        // pero sí validamos visualmente si cumple las reglas.
        const tieneMin = /[a-z]/.test(val);
        const tieneMay = /[A-Z]/.test(val);
        const tieneNum = /\d/.test(val);
        const tieneEsp = /[\W_]/.test(val);
        const tieneLen = val.length >= 8;

        if (tieneMin && tieneMay && tieneNum && tieneEsp && tieneLen) {
            this.classList.add('valido');
            this.classList.remove('invalido');
        } else {
            this.classList.add('invalido');
            this.classList.remove('valido');
        }
    });

    // ==========================================
    // 2. FUNCIÓN AUXILIAR PARA FEEDBACK VISUAL
    // ==========================================
    function validarCampo(input, regex) {
        if (input.value === '') {
            input.classList.remove('valido', 'invalido');
            return;
        }
        if (regex.test(input.value)) {
            input.classList.add('valido');
            input.classList.remove('invalido');
        } else {
            input.classList.add('invalido');
            input.classList.remove('valido');
        }
    }

    // ==========================================
    // 3. ENVÍO DEL FORMULARIO (FETCH)
    // ==========================================
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        ocultarMensajes();

        // Validación final de seguridad antes de enviar
        if (!registroForm.checkValidity()) {
            mostrarError('Por favor, completa todos los campos correctamente.');
            return;
        }

        const formData = {
            t1: document.getElementById('t1').value.toUpperCase(),
            t2: inputNdoc.value.trim(),
            t3: inputNom.value.trim(),
            t4: inputDir.value.trim(),
            t5: inputTel.value.trim(),
            t6: inputEmail.value.trim().toLowerCase(),
            t7: inputContras.value
        };

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Registrando...</span>';

        try {
            // ⚠️ AJUSTA ESTA URL a la ruta real de tu backend Express
            const response = await fetch('http://localhost:3333/usuario/crear', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error desconocido al registrar el cliente.');
            }

            mensajeExito.style.display = 'flex';
            registroForm.reset();
            // Limpiar clases de validación visual
            document.querySelectorAll('.valido, .invalido').forEach(el => el.classList.remove('valido', 'invalido'));

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            console.error('Error en el registro:', error);
            mostrarError(error.message);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fa-solid fa-user-plus"></i> <span>Registrarme</span>';
        }
    });

    function mostrarError(mensaje) {
        textoError.textContent = mensaje;
        mensajeError.style.display = 'flex';
        mensajeExito.style.display = 'none';
    }

    function ocultarMensajes() {
        mensajeError.style.display = 'none';
        mensajeExito.style.display = 'none';
    }
});