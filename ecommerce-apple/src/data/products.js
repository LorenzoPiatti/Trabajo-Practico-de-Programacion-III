const products = [
  // iPhone
  {
    id: 1,
    name: "iPhone 14 256GB Midnight",
    price: 1200,
    image: "/assets/iphone-14-256gb-midnight.jpg",
    category: "iPhone",
    description: "Disfruta del iPhone 14 con 256GB de almacenamiento. Pantalla Super Retina XDR que hace que fotos, videos y juegos se vean increíbles. Cámara avanzada de 12MP para capturar cada detalle, chip A15 Bionic que ofrece un rendimiento fluido y eficiente, y batería de larga duración para que tu día nunca se detenga. Perfecto para productividad, entretenimiento y creatividad en movimiento."
  },
  {
    id: 2,
    name: "iPhone 14 128GB Midnight",
    price: 1100,
    image: "/assets/iphone-14-128gb-midnight.jpg",
    category: "iPhone",
    description: "iPhone 14 con 128GB de almacenamiento, cámara dual de 12MP y pantalla Super Retina XDR. Diseño elegante y ligero, con rendimiento rápido gracias al chip A15 Bionic. Ideal para quienes buscan tecnología de última generación y facilidad de uso."
  },
  {
    id: 3,
    name: "iPhone 13 128GB Midnight",
    price: 999,
    image: "/assets/iphone-13-128gb-midnight.jpg",
    category: "iPhone",
    description: "iPhone 13 con 128GB, pantalla OLED brillante y cámara dual que captura fotos y videos de calidad profesional. Chip A15 Bionic que asegura rapidez en todas tus apps y juegos. Diseño moderno y elegante, ideal para usuarios que valoran rendimiento y estilo."
  },
  {
    id: 4,
    name: "iPhone 16 128GB White",
    price: 1300,
    image: "/assets/iphone-16-128gb-white.jpg",
    category: "iPhone",
    description: "iPhone 16 en color blanco, 128GB de almacenamiento, cámara mejorada para capturar fotos y videos con detalle excepcional. Pantalla vibrante, chip avanzado y batería duradera para un uso diario intenso. Ideal para productividad y entretenimiento.",
    featured: true
  },
  {
    id: 5,
    name: "iPhone 16 128GB Pink",
    price: 1300,
    image: "/assets/iphone-16-128gb-pink.jpg",
    category: "iPhone",
    description: "iPhone 16 en color rosa, 128GB, perfecto para quienes buscan estilo y funcionalidad. Cámara avanzada, pantalla brillante y chip potente para todas tus tareas y aplicaciones. Ligero, elegante y confiable."
  },
  {
    id: 6,
    name: "iPhone 16 256GB Black",
    price: 1500,
    image: "/assets/iphone-16-256gb-black.jpg",
    category: "iPhone",
    description: "iPhone 16 negro con 256GB de almacenamiento. Cámara de última generación, batería duradera y rendimiento óptimo para multitarea, fotos, videos y apps exigentes. Ideal para usuarios que necesitan más espacio y potencia."
  },
  {
    id: 7,
    name: "iPhone 16 Plus 128GB Teal",
    price: 1400,
    image: "/assets/iphone-16-plus-128gb-teal.jpg",
    category: "iPhone",
    description: "iPhone 16 Plus con pantalla más grande y 128GB de capacidad. Color teal elegante, ideal para ver contenido multimedia, trabajar y disfrutar de juegos sin interrupciones. Rendimiento fluido con chip avanzado."
  },
  {
    id: 8,
    name: "iPhone 16 Pro Max 256GB White Titanium",
    price: 1800,
    image: "/assets/iphone-16-pro-max-256gb-white-titanium.jpg",
    category: "iPhone",
    description: "iPhone 16 Pro Max con acabado White Titanium y 256GB de almacenamiento. Pantalla ProMotion ultra rápida, cámara triple avanzada y chip de última generación para los usuarios más exigentes. Ideal para fotografía, productividad y entretenimiento premium.",
    featured: true
  },
  {
    id: 9,
    name: "iPhone SE 128GB Midnight",
    price: 800,
    image: "/assets/iphone-se-128gb-midnight.jpg",
    category: "iPhone",
    description: "iPhone SE compacto con 128GB, chip A15 Bionic y diseño clásico. Potente, rápido y fácil de usar, ideal para quienes buscan un iPhone pequeño pero con todas las funcionalidades modernas."
  },
  {
    id: 10,
    name: "iPhone 12 64GB Green",
    price: 700,
    image: "/assets/apple-iphone-12-64gb-green.jpg",
    category: "iPhone",
    description: "iPhone 12 con 64GB, pantalla Super Retina XDR y color verde elegante. Rendimiento potente y diseño compacto, ideal para usuarios que buscan velocidad, estilo y calidad de cámara."
  },
  {
    id: 11,
    name: "iPhone 128GB White",
    price: 750,
    image: "/assets/apple-iphone-128-64gb-white.jpg",
    category: "iPhone",
    description: "Modelo iPhone estándar de 128GB en color blanco. Rendimiento confiable y diseño elegante para uso diario, ideal para quienes buscan un equipo versátil y práctico."
  },

  // iPad
  {
    id: 12,
    name: "iPad Air 10.9\" Wi-Fi 64GB 4ta generación Sky Blue",
    price: 600,
    image: "/assets/ipad-air-109-wi-fi-64gb-4ta-gen-sky-blue.jpg",
    category: "iPad",
    description: "iPad Air de 4ta generación, pantalla Liquid Retina de 10.9\", 64GB de almacenamiento y conectividad Wi‑Fi. Color Sky Blue elegante, compatible con Apple Pencil, perfecto para productividad, creatividad, lectura y entretenimiento. Ligero y potente para uso diario."
  },
  {
    id: 13,
    name: "iPad Mini Wi-Fi + Cellular 256GB Starlight",
    price: 750,
    image: "/assets/ipad-mini-wi-fi-cellular-256gb-starlight.jpg",
    category: "iPad",
    description: "iPad Mini compacto con 256GB, Wi-Fi + Cellular. Diseño portátil y ligero, ideal para productividad y entretenimiento en movimiento. Compatible con Apple Pencil y apps de creatividad."
  },
  {
    id: 14,
    name: "iPad Air 10.9\" Wi-Fi 64GB Space Gray",
    price: 600,
    image: "/assets/109-inch-ipad-air-wi-fi-64gb-space-gray.jpg",
    category: "iPad",
    description: "iPad Air 10.9\" Wi-Fi 64GB en Space Gray. Pantalla Liquid Retina brillante, chip potente y compatibilidad con Apple Pencil para creatividad y trabajo en cualquier lugar."
  },
  {
    id: 15,
    name: "iPad Air 13\" Wi-Fi M3 128GB Starlight",
    price: 850,
    image: "/assets/copy-of-ipad-air-13-wifi-m3-128gb-starlight.jpg",
    category: "iPad",
    description: "iPad Air 13” con chip M3, 128GB y Wi-Fi. Rendimiento rápido y eficiente para multitarea, edición de documentos, diseño gráfico y uso profesional. Compatible con Apple Pencil para creatividad sin límites."
  },
  {
    id: 16,
    name: "iPad Pro 11\" Wi-Fi M4 256GB Space Black",
    price: 950,
    image: "/assets/ipad-pro-11-wifi-m4-256gb-con-standard-glass-space-black.jpg",
    category: "iPad",
    description: "iPad Pro 11\" con chip M4 y 256GB. Pantalla Liquid Retina para colores precisos y fluidez visual. Ideal para trabajo creativo, edición de fotos y videos, productividad profesional y entretenimiento de alta calidad."
  },

  // Mac
  {
    id: 17,
    name: "MacBook Pro 14\" M3 512GB SSD Silver",
    price: 2000,
    image: "/assets/apple-macbook-pro-14-m3-512gb-ssd-silver.jpg",
    category: "Mac",
    description: "MacBook Pro 14\" con chip M3 y 512GB SSD. Pantalla Retina brillante, batería de larga duración y rendimiento profesional para edición de video, diseño, programación y multitarea avanzada."
  },
  {
    id: 18,
    name: "MacBook Pro 14\" M3 8GB RAM 512GB SSD Space Grey",
    price: 1900,
    image: "/assets/macbook-pro-14-m3-8gb-ram-512gb-ssd-space-grey.jpg",
    category: "Mac",
    description: "MacBook Pro 14\" gris espacial, 8GB RAM, 512GB SSD. Potente y eficiente para multitarea, creatividad y productividad profesional. Ideal para usuarios exigentes.",
    featured: true
  },
  {
    id: 19,
    name: "MacBook Air 15\" M3 16GB RAM 256GB SSD Silver",
    price: 1800,
    image: "/assets/macbook-air-15-m3-16gb-ram-256gb-ssd-silver.jpg",
    category: "Mac",
    description: "MacBook Air 15\" con chip M3, 16GB RAM y 256GB SSD. Ultraligero, potente y elegante, ideal para estudiantes y profesionales que necesitan movilidad y rendimiento."
  },
  {
    id: 20,
    name: "MacBook Air 13\" M4 16GB RAM 512GB SSD Silver",
    price: 1850,
    image: "/assets/macbook-air-13-m4-16gb-512gb-ssd-silver.jpg",
    category: "Mac",
    description: "MacBook Air 13\" M4, 16GB RAM, 512GB SSD. Compacto, potente y eficiente, perfecto para trabajo creativo, multitarea y productividad en movimiento."
  },
  {
    id: 21,
    name: "MacBook Pro 16\" M2 Pro 512GB SSD Silver",
    price: 2200,
    image: "/assets/macbook-pro-16-m2-pro-512gb-ssd-silver.jpg",
    category: "Mac",
    description: "MacBook Pro 16\" con chip M2 Pro y 512GB SSD. Rendimiento profesional, pantalla grande y colores precisos. Ideal para edición de video, diseño, programación y tareas exigentes."
  },

  // Apple Watch
  {
    id: 22,
    name: "Apple Watch Series 10 GPS 46mm Aluminio Jet Black",
    price: 650,
    image: "/assets/apple-watch-s10-gps-46mm-aluminio-jet-black-con-correa-black-sport-band.jpg",
    category: "Watch",
    description: "Apple Watch Series 10 de 46mm, GPS, aluminio Jet Black. Mantente activo y conectado, controla tu salud y actividad física, recibe notificaciones y disfruta de todas las funciones inteligentes de Apple Watch."
  },
  {
    id: 23,
    name: "Apple Watch Series 10 GPS 46mm Aluminio Silver",
    price: 650,
    image: "/assets/apple-watch-s10-gps-46mm-aluminio-silver-con-correa-denim-sport.jpg",
    category: "Watch",
    description: "Apple Watch Series 10 46mm, GPS, aluminio Silver con correa Denim. Funciones de salud, fitness y conectividad todo el día, con diseño elegante y resistente."
  },
  {
    id: 24,
    name: "Apple Watch Ultra 2 GPS + Cellular Black",
    price: 800,
    image: "/assets/apple-watch-ultra-2-gpscelullar-black-con-correa-black-ocean.jpg",
    category: "Watch",
    description: "Apple Watch Ultra 2, GPS + Cellular, color Black. Perfecto para deportes extremos y actividades al aire libre, con batería de larga duración, resistencia avanzada y todas las funciones inteligentes.",
    featured: true
  },
  {
    id: 25,
    name: "Apple Watch SE GPS 44mm Aluminio Starlight",
    price: 450,
    image: "/assets/apple-watch-se-gps-44mm-aluminio-starlight-con-correa-starlight-sport.jpg",
    category: "Watch",
    description: "Apple Watch SE 44mm, GPS, aluminio Starlight. Funciones esenciales de fitness y conectividad a un precio accesible. Ideal para usuarios que buscan lo mejor de Apple Watch de manera económica."
  },

  // Accesorios
  {
    id: 26,
    name: "Funda de silicona con MagSafe para iPhone 16 Pro Black",
    price: 50,
    image: "/assets/funda-de-silicona-con-magsafe-para-iphone-16-pro-black.jpg",
    category: "Accesorios",
    description: "Funda de silicona con MagSafe para iPhone 16 Pro en color negro. Protege tu dispositivo contra golpes y arañazos manteniendo el diseño elegante. Compatible con carga inalámbrica MagSafe."
  },
  {
    id: 27,
    name: "Apple Magic Keyboard con Touch ID para Macs",
    price: 250,
    image: "/assets/apple-magic-keyboard-con-touch-id-para-macs-con-apple-silicon-espanol.jpg",
    category: "Accesorios",
    description: "Teclado Magic Keyboard con Touch ID para Mac. Diseño elegante, cómodo y silencioso. Autenticación segura con Touch ID y compatibilidad total con Macs con Apple Silicon."
  },
  {
    id: 28,
    name: "Cable de carga Apple 2.4W USB-C 2m",
    price: 40,
    image: "/assets/cable-de-carga-apple-240w-usb-c-2-m.jpg",
    category: "Accesorios",
    description: "Cable de carga Apple USB-C de 2 metros, ideal para cargar y sincronizar tu iPhone, iPad o MacBook. Alta calidad y durabilidad garantizada."
  },
  {
    id: 29,
    name: "Magic Mouse Superficie Multi-Touch White",
    price: 100,
    image: "/assets/magic-mouse-superficie-multi-touch-white.jpg",
    category: "Accesorios",
    description: "Magic Mouse de Apple en color blanco con superficie Multi-Touch. Navegación fluida y gestos intuitivos para facilitar tu trabajo en Mac."
  },
  {
    id: 30,
    name: "AirPods Max Purple",
    price: 550,
    image: "/assets/airpods-max-purple.jpg",
    category: "Accesorios",
    description: "AirPods Max en color púrpura, con sonido espacial, cancelación activa de ruido y diseño cómodo. Experiencia auditiva premium para música, películas y llamadas.",
    featured: true
  },
  {
    id: 31,
    name: "Apple Smart Folio para iPad Pro 11\" M4 Black",
    price: 80,
    image: "/assets/apple-smart-folio-para-ipad-pro-11-m4-black.jpg",
    category: "Accesorios",
    description: "Funda Apple Smart Folio para iPad Pro 11\" M4 en color negro. Protege tu iPad y funciona como soporte para escritura, lectura o visualización de contenido."
  },
  {
    id: 32,
    name: "Cargador Apple 140W USB-C",
    price: 150,
    image: "/assets/cargador-apple-140w-usb-c.jpg",
    category: "Accesorios",
    description: "Cargador Apple 140W USB-C para MacBook y dispositivos compatibles. Carga rápida y segura con diseño compacto y eficiente.",
    featured: true
  },
  {
    id: 33,
    name: "Apple Pencil 2nd Generation",
    price: 130,
    image: "/assets/apple-pencil-2nd-generation.jpg",
    category: "Accesorios",
    description: "Apple Pencil de segunda generación. Ideal para tomar notas, dibujar o diseñar con precisión en iPad. Se adhiere magnéticamente y se carga de forma inalámbrica."
  },
  {
    id: 34,
    name: "AirPods 3ra Generación con estuche de carga Lightning",
    price: 200,
    image: "/assets/airpods-3ra-generacion-con-estuche-de-carga-lightning.jpg",
    category: "Accesorios",
    description: "AirPods de tercera generación con estuche de carga Lightning. Sonido envolvente, conectividad rápida y cómoda experiencia de audio inalámbrica."
  }
];

export default products;
