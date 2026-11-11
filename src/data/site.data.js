export const site = {
    name: process.env.SITE_NAME || "Road Trip",
    tagline: "Historias de ruta",
    year: process.env.SITE_YEAR || new Date().getFullYear(),
};

export const nav = [
    { id: "home", href: "/", label: "Inicio" },
    { id: "elements", href: "/elements", label: "Elementos" },
];

export const posts = [
    {
        slug: "atacama",
        title: "Atacama en cuatro días",
        date: "2026-10-30",
        image: "banner2.jpg",
        summary: "Salares, géiseres y noches sin luz.",
        body: [
            "Cuatro días recorriendo el desierto más árido del mundo.",
            "El primer día llegamos a San Pedro y subimos al Valle de la Luna al atardecer.",
            "El último día madrugamos para ver los géiseres del Tatio con el sol saliendo.",
        ],
    },
    {
        slug: "patagonia",
        title: "Ruta 40 en la Patagonia",
        date: "2026-09-12",
        image: "banner5.jpg",
        summary: "Viento, estepa y rutas interminables.",
        body: [
            "Mil kilómetros de ripio, viento y paisajes que no se terminan.",
            "Cada estación de servicio es un evento social.",
        ],
    },
    {
        slug: "noroeste",
        title: "Noroeste argentino",
        date: "2026-08-02",
        image: "banner4.jpg",
        summary: "Quebradas, cerros de colores y empanadas.",
        body: [
            "De Salta a Jujuy por la Quebrada de Humahuaca.",
            "Purmamarca al mediodía es otra cosa: el cerro de los siete colores.",
        ],
    },
    {
        slug: "costa",
        title: "Costa atlántica en octubre",
        date: "2026-10-04",
        image: "banner3.jpg",
        summary: "Playas vacías, faros y mariscos.",
        body: [
            "Fuera de temporada, la costa es otro lugar.",
            "Faros, lobos marinos y rutas casi desiertas.",
        ],
    },
];