document.addEventListener('DOMContentLoaded', function () { 
    const apiUrl = 'http://srv55237340.ultasrv.net/api/datapersonal/';
    let currentPage = 1; // Página inicial
    const itemsPerPage = 20; // Número de items por página
    const searchBtn = document.getElementById('button-search');
    const searchInput = document.getElementById('searchInput');
    const personasContainer = document.getElementById('personas-container');
    const prevBtn = document.getElementById('previous');
    const nextBtn = document.getElementById('next');

    // Inicialmente deshabilitar el botón "Anterior"
    prevBtn.disabled = true;

    // Función para obtener los datos de la API
    async function fetchData(page = 1, searchQuery = '') {
        let url = `${apiUrl}?page=${page}&limit=${itemsPerPage}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (searchQuery) {
                const filteredResults = data.results.filter(persona => 
                    persona.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    persona.apellido.toLowerCase().includes(searchQuery.toLowerCase())
                );
                displayData(filteredResults);
                toggleButtons(filteredResults.length);
            } else {
                displayData(data.results);
                toggleButtons(data.results.length);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    // Función para mostrar los datos en las cards
    function displayData(data) {
        personasContainer.innerHTML = ''; // Limpiar contenido previo
        if (!data || data.length === 0) {
            personasContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        data.forEach(persona => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${persona.photo}" class="card-img-top" alt="${persona.nombre} ${persona.apellido}">
                        <div class="card-body">
                            <h5 class="card-title">${persona.nombre} ${persona.apellido}</h5>
                            <p class="card-text"><strong>Edad:</strong> ${persona.edad}</p>
                            <p class="card-text"><strong>Email:</strong> ${persona.email}</p>
                            <p class="card-text"><strong>Teléfono:</strong> ${persona.telefono}</p>
                            <p class="card-text"><strong>Dirección:</strong> ${persona.direccion}, ${persona.ciudad}, ${persona.pais}</p>
                        </div>
                    </div>
                </div>
            `;
            personasContainer.innerHTML += card;
        });
    }

    // Función para habilitar o deshabilitar los botones de paginación
    function toggleButtons(dataLength) {
        // Ocultar botones de paginación si hay menos de 2 resultados
        if (dataLength <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            prevBtn.disabled = true; // Asegurarse de que el botón "Anterior" esté deshabilitado
        } else {
            prevBtn.style.display = 'inline-block'; // Mostrar botón "Previous"
            nextBtn.style.display = 'inline-block'; // Mostrar botón "Next"
        }
    }

    // Botón Previous
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage, searchInput.value); // Pasar el valor de búsqueda
            // Deshabilitar "Anterior" si estamos en la primera página
            if (currentPage === 1) {
                prevBtn.disabled = true;
            }
        }
    });

    // Botón Next
    nextBtn.addEventListener('click', () => {
        currentPage++;
        fetchData(currentPage, searchInput.value); // Pasar el valor de búsqueda
        // Habilitar "Anterior" si no estamos en la primera página
        if (currentPage > 1) {
            prevBtn.disabled = false;
        }
    });

    // Búsqueda
    searchBtn.addEventListener('click', () => {
        currentPage = 1; // Reiniciar a la primera página al buscar
        const searchQuery = searchInput.value;
        fetchData(1, searchQuery);
    });

    // Cargar los datos iniciales sin búsqueda
    fetchData();
});

