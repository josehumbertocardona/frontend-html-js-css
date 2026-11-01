        // Ejemplo: 'http://localhost:3333/cliente/login'
        const API_URL = 'http://localhost:3333/cliente/login'; 

        // 2. Referencias al DOM
        const loginForm = document.getElementById('loginForm');
        const mensajeError = document.getElementById('mensajeError');
        const textoError = document.getElementById('textoError');
        const btnSubmit = document.getElementById('btnSubmit');
        const btnText = btnSubmit.querySelector('span');
        const btnIcon = btnSubmit.querySelector('i');

        // 3. Función para mostrar errores
        function mostrarError(mensaje) {
            textoError.textContent = mensaje;
            mensajeError.style.display = 'flex';
        }

        function ocultarError() {
            mensajeError.style.display = 'none';
        }

        // 4. Función para estado de carga (Loading)
        function setLoading(isLoading) {
            if (isLoading) {
                btnSubmit.disabled = true;
                btnText.textContent = 'Verificando...';
                btnIcon.className = 'fa-solid fa-circle-notch fa-spin';
            } else {
                btnSubmit.disabled = false;
                btnText.textContent = 'Iniciar Sesión';
                btnIcon.className = 'fa-solid fa-right-to-bracket';
            }
        }

        // 5. Manejo del envío del formulario
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que la página se recargue
            ocultarError();

            // Obtener datos (ya coinciden con t1 y t2 que espera tu backend)
            const formData = {
                t1: document.getElementById('t1').value.trim(),
                t2: document.getElementById('t2').value
            };

            setLoading(true);

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                // 🔒 SEGURIDAD: Verificar que la respuesta sea JSON y no HTML (evita error 404/500 en consola)
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Error del servidor: No se recibió una respuesta válida. Verifica que el backend esté corriendo.");
                }

                const data = await response.json();

                if (!response.ok) {
                    // El backend envía { error: 'mensaje' } (ej: 401, 403, 500)
                    throw new Error(data.error || 'Error al iniciar sesión');
                }

                // ==========================================
                // ✅ ÉXITO: Guardar TOKEN y redirigir
                // ==========================================
                
                // 1. Guardamos el TOKEN (esto es lo que realmente nos autentica)
                localStorage.setItem('tokenSena', data.token);
                
                // 2. Guardamos el usuario SEGURO (ya viene sin contraseña desde el backend)
                localStorage.setItem('usuarioSena', JSON.stringify(data.usuario));

                // 3. Mensaje discreto en consola (sin exponer datos sensibles)
                console.log('Autenticación exitosa. Token generado.');

                // 4. Redirigimos al dashboard del cliente
                window.location.href = 'menucliente.html';

            } catch (error) {
                // Captura tanto errores de la API (401, 403, 500) como de red
                console.error("Error de login:", error); // Solo para que tú lo veas en desarrollo
                mostrarError(error.message);
            } finally {
                setLoading(false);
            }
        });