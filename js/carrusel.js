const setPersonasAleatorioDOM = async () => {
    const apiUrl = 'http://srv55237340.ultasrv.net/api/datapersonal/';
    const response = await fetch(apiUrl);
    const personas = await response.json(); // Suponiendo que la respuesta tiene una estructura similar
    let $divAleatorio = document.querySelector('.owl-carousel');

    // Limpiar contenido previo
    $($divAleatorio).trigger('destroy.owl.carousel').removeClass('owl-loaded');
    $divAleatorio.innerHTML = '';

    let html = '';

    // Asegurarse de que haya al menos 5 personas en el arreglo
    const randomPersonas = personas.results.sort(() => 0.5 - Math.random()).slice(0, 5);

    for (let i = 0; i < randomPersonas.length; i++) {
        // Generar HTML para cada persona
        html += `
        <div class="owl-carousel-info-wrap item">
            <img src="${randomPersonas[i].photo}" class="owl-carousel-image img-fluid" alt="${randomPersonas[i].nombre} ${randomPersonas[i].apellido}">
            <div class="owl-carousel-info">
                <h4 class="mb-2">${randomPersonas[i].nombre} ${randomPersonas[i].apellido}</h4>
                <span class="badge">Edad: ${randomPersonas[i].edad}</span>
                <span class="badge">Email: ${randomPersonas[i].email}</span>
            </div>
        </div>
        `;
    }

    // Insertar el HTML generado en el contenedor del carrusel
    $divAleatorio.innerHTML = html;

    // Inicializar nuevamente el carrusel con configuración
    $($divAleatorio).owlCarousel({
        items: 3, // Número de imágenes visibles al mismo tiempo
        loop: true,
        margin: 70,
        center: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 2999,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });
};

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', setPersonasAleatorioDOM);
