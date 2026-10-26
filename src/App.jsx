import { useEffect, useRef, useState } from "react";

const eventDate = "28 de octubre de 2026";
const eventShifts = [
  { name: "Turno matutino", time: "09:00–13:00 h" },
  { name: "Turno vespertino", time: "15:00–19:00 h" },
];
const institutionalEmailPattern = /^[^\s@]+@(?:cecytem|soycecytem)\.mx$/i;

const initialPosts = [
  {
    id: "post-1",
    name: "Valeria Hernández",
    group: "6.º semestre · Diseño",
    time: "Hace 2 horas",
    image: "/images/catrina-parade.jpg",
    caption:
      "Flores de cempasúchil, encaje y mucho amor por nuestras tradiciones. 🧡",
    likes: 28,
    liked: false,
    comments: ["¡Qué hermoso trabajo! 🌼", "Los detalles están increíbles."],
  },
  {
    id: "post-2",
    name: "Diego Ramírez",
    group: "4.º semestre · Electrónica",
    time: "Hace 5 horas",
    image: "/images/papel-picado-photo.jpg",
    caption:
      "Homenaje a las mujeres que abrieron camino. ¡Nos vemos en el evento!",
    likes: 19,
    liked: false,
    comments: ["¡Ya queremos ver el resultado!"],
  },
  {
    id: "post-3",
    name: "Mariana Cruz",
    group: "2.º semestre · Programación",
    time: "Ayer",
    image: "/images/comparsa-catrinas.jpg",
    caption:
      "Preparando cada accesorio para celebrar juntas nuestras raíces. ✨",
    likes: 36,
    liked: false,
    comments: [],
  },
];

const additionalPosts = [
  {
    id: "post-4",
    name: "Sofía López",
    group: "5.º semestre · Catrina",
    time: "Galería del evento",
    image: "/images/altar-photo.jpg",
    caption: "Una ofrenda llena de color para honrar nuestras tradiciones.",
    likes: 14,
    liked: false,
    comments: [],
  },
  {
    id: "post-5",
    name: "Emiliano Cruz",
    group: "4.º semestre · Danza",
    time: "Galería del evento",
    image: "/images/comparsa-oaxaca.jpg",
    caption: "La música y el baile también cuentan historias.",
    likes: 21,
    liked: false,
    comments: [],
  },
  {
    id: "post-6",
    name: "Jimena Reyes",
    group: "3.º semestre · Tradiciones",
    time: "Galería del evento",
    image: "/images/altar-tequisquiapan.jpg",
    caption: "Flores de cempasúchil y memoria en cada ofrenda.",
    likes: 17,
    liked: false,
    comments: [],
  },
];

const emptyRegistration = {
  name: "",
  email: "",
  phone: "",
  group: "",
  category: "Catrina tradicional",
};

const readStored = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`No se pudo leer el almacenamiento de "${key}".`, error);
    return fallback;
  }
};

const writeStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`No se pudo guardar el almacenamiento de "${key}".`, error);
    return false;
  }
};

const readPosts = () => {
  const stored = readStored("catrinas-posts", initialPosts);
  if (!Array.isArray(stored)) return initialPosts;

  const legacyImages = {
    "/images/catrina.svg": "/images/catrina-parade.jpg",
    "/images/papel-picado.svg": "/images/papel-picado-photo.jpg",
    "/images/calavera.svg": "/images/comparsa-catrinas.jpg",
    "/images/altar.svg": "/images/altar-photo.jpg",
  };
  const samplePostImages = {
    "post-2": "/images/papel-picado-photo.jpg",
    "post-3": "/images/comparsa-catrinas.jpg",
    "post-4": "/images/altar-photo.jpg",
  };

  const posts = stored.map((post) => ({
    ...post,
    image: samplePostImages[post.id] || legacyImages[post.image] || post.image,
  }));
  if (readStored("catrinas-photo-gallery-v6", false)) return posts;

  const existingIds = new Set(posts.map((post) => post.id));
  const migratedPosts = [
    ...posts,
    ...additionalPosts.filter((post) => !existingIds.has(post.id)),
  ];
  return migratedPosts;
};

function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
    arrowUp: <path d="m7 14 5-5 5 5" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    message: (
      <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
    ),
    plus: <path d="M12 5v14m-7-7h14" />,
    sparkle: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
        <path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14ZM5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8L5 2Z" />
      </>
    ),
    ticket: (
      <path d="M2 9a3 3 0 0 0 0 6v4h20v-4a3 3 0 0 1 0-6V5H2v4Zm12-4v2m0 4v2m0 4v2" />
    ),
    upload: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m17 8-5-5-5 5m5-5v12" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    x: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.sparkle}
    </svg>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("galeria");
  const [role, setRole] = useState("Estudiante");
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [postComposerOpen, setPostComposerOpen] = useState(false);
  const [postDescription, setPostDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [paymentLookupOpen, setPaymentLookupOpen] = useState(false);
  const [paymentLookupEmail, setPaymentLookupEmail] = useState("");
  const [paymentLookupResults, setPaymentLookupResults] = useState([]);
  const [paymentLookupMessage, setPaymentLookupMessage] = useState("");
  const [ticketRegistration, setTicketRegistration] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registration, setRegistration] = useState(emptyRegistration);
  const [registrations, setRegistrations] = useState(() =>
    readStored("catrinas-registrations", []),
  );
  const [studentEmail, setStudentEmail] = useState(() =>
    readStored("catrinas-student-email", ""),
  );
  const [posts, setPosts] = useState(() =>
    readPosts(),
  );
  const [toast, setToast] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const postImageInput = useRef(null);
  const canRegister = role === "Estudiante";
  const studentRegistrations = studentEmail
    ? registrations.filter(
        (item) => item.email.toLowerCase() === studentEmail.toLowerCase(),
      )
    : [];
  const activeParticipation = studentRegistrations.find(
    (item) => item.status === "Aceptada" && item.payment === "Confirmado",
  );

  useEffect(() => {
    if (!writeStored("catrinas-registrations", registrations)) {
      setToast("No se pudieron guardar las inscripciones en este navegador.");
    }
  }, [registrations]);

  useEffect(() => {
    if (!writeStored("catrinas-posts", posts)) {
      setToast("No se pudieron guardar las publicaciones en este navegador.");
    }
  }, [posts]);

  useEffect(() => {
    if (studentEmail && !writeStored("catrinas-student-email", studentEmail)) {
      setToast("No se pudo guardar el correo de inscripción en este navegador.");
    }
  }, [studentEmail]);

  useEffect(() => {
    if (role !== "Estudiante" || !studentEmail) return;
    if (activeParticipation) setRole("Concursante");
  }, [activeParticipation, role, studentEmail]);

  useEffect(() => {
    writeStored("catrinas-photo-gallery-v6", true);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!selectedImage) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedImage]);

  const showGallery = () => {
    setActiveTab("galeria");
    document.getElementById("comunidad")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const showConvocatoria = () => {
    document.getElementById("convocatoria")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const showAdministration = () => {
    setActiveTab("admin");
    document.getElementById("comunidad")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const changeRole = (nextRole) => {
    const paidRegistration = registrations.find(
      (item) =>
        studentEmail &&
        item.email.toLowerCase() === studentEmail.toLowerCase() &&
        item.status === "Aceptada" &&
        item.payment === "Confirmado",
    );
    setRole(nextRole === "Estudiante" && paidRegistration ? "Concursante" : nextRole);
    setActiveTab(nextRole === "Administrador" ? "admin" : "galeria");
  };

  const withdrawFromContest = () => {
    if (!activeParticipation || !studentEmail) return;
    const confirmed = window.confirm(
      "¿Confirmas que quieres retirarte del concurso? Tu solicitud y el registro del pago se conservarán.",
    );
    if (!confirmed) return;

    setRegistrations((current) =>
      current.map((item) =>
        item.email.toLowerCase() === studentEmail.toLowerCase() &&
        item.status === "Aceptada" &&
        item.payment === "Confirmado"
          ? { ...item, status: "Retirada", withdrawnAt: new Date().toISOString() }
          : item,
      ),
    );
    setRole("Estudiante");
    setActiveTab("avisos");
    setToast("Te retiraste del concurso. Tu perfil volvió a Estudiante.");
  };

  const openRegistration = () => {
    if (!canRegister) {
      setToast("Este perfil no puede inscribirse al concurso.");
      return;
    }
    setRegistrationOpen(true);
    setMobileMenuOpen(false);
  };

  const submitPaymentLookup = (event) => {
    event.preventDefault();
    const email = paymentLookupEmail.trim();
    if (!institutionalEmailPattern.test(email)) {
      setPaymentLookupResults([]);
      setPaymentLookupMessage("Ingresa el correo institucional que usaste al inscribirte.");
      return;
    }

    const matchingRegistrations = registrations.filter(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );
    setPaymentLookupResults(matchingRegistrations);
    setPaymentLookupMessage(
      matchingRegistrations.length
        ? ""
        : "No encontramos una inscripción con ese correo en este navegador.",
    );
  };

  const submitRegistration = (event) => {
    event.preventDefault();
    const email = registration.email.trim();
    if (!institutionalEmailPattern.test(email)) {
      event.currentTarget.elements.email.focus();
      setToast("Usa tu correo institucional @cecytem.mx o @soycecytem.mx para inscribirte.");
      return;
    }
    const newRegistration = {
      ...registration,
      email,
      id: `registro-${Date.now()}`,
      status: "Pendiente",
      payment: "Pendiente",
      submittedAt: new Date().toLocaleDateString("es-MX"),
    };
    setRegistrations((current) => [newRegistration, ...current]);
    setStudentEmail(email);
    setRegistration(emptyRegistration);
    setRegistrationOpen(false);
    setActiveTab("avisos");
    setToast("¡Listo! Tu solicitud quedó registrada para revisión.");
  };

  const toggleLike = (postId) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post,
      ),
    );
  };

  const addComment = (event, postId) => {
    event.preventDefault();
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, text] }
          : post,
      ),
    );
    setExpandedComments((current) => ({ ...current, [postId]: true }));
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  };

  const submitPost = (event) => {
    event.preventDefault();
    if (!postImage) {
      setToast("Elige una imagen para compartir.");
      return;
    }
    if (!postImage.type.startsWith("image/")) {
      setToast("Elige un archivo de imagen para publicar.");
      return;
    }
    if (postImage.size > 4 * 1024 * 1024) {
      setToast("La imagen debe pesar menos de 4 MB.");
      return;
    }
    const caption = postDescription.trim();
    if (!caption) {
      setToast("Escribe una descripción para tu publicación.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const newPost = {
        id: `post-${Date.now()}`,
        name: studentRegistrations[0]?.name || "Concursante",
        group: studentRegistrations[0]?.group || "Alumnado CECyTEM",
        time: "Ahora",
        image: reader.result,
        caption,
        likes: 0,
        liked: false,
        comments: [],
      };
      setPosts((current) => [newPost, ...current]);
      setPostComposerOpen(false);
      setPostImage(null);
      setPostDescription("");
      setToast("¡Tu foto ya forma parte de la galería!");
    };
    reader.onerror = () => setToast("No se pudo leer la imagen. Inténtalo de nuevo.");
    reader.readAsDataURL(postImage);
  };

  const openPostComposer = () => {
    if (role !== "Concursante") {
      setToast("Solo los concursantes pueden compartir una foto.");
      return;
    }
    setPostImage(null);
    setPostDescription("");
    if (postImageInput.current) postImageInput.current.value = "";
    setPostComposerOpen(true);
  };

  const updateRegistration = (id, updates) => {
    setRegistrations((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const removeRegistration = (id) => {
    setRegistrations((current) => current.filter((item) => item.id !== id));
  };

  const removePost = (id) => {
    if (role !== "Administrador") {
      setToast("Solo el administrador puede eliminar publicaciones.");
      return;
    }
    setPosts((current) => current.filter((post) => post.id !== id));
  };

  const renderComments = (post) => {
    const commentsId = `comments-${post.id}`;
    const isExpanded = Boolean(expandedComments[post.id]);
    return (
      <div className="post-comments">
        {post.comments.length > 0 ? (
          <>
            <button
              type="button"
              className="comments-toggle"
              aria-expanded={isExpanded}
              aria-controls={commentsId}
              onClick={() =>
                setExpandedComments((current) => ({
                  ...current,
                  [post.id]: !current[post.id],
                }))
              }
            >
              {isExpanded ? "Ocultar comentarios" : `Ver todos los comentarios (${post.comments.length})`}
            </button>
            {isExpanded && (
              <div className="comment-list" id={commentsId}>
                {post.comments.map((comment, index) => (
                  <p key={`${post.id}-comment-${index}`}><strong>Estudiante</strong> {comment}</p>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="no-comments">Aún no hay comentarios.</p>
        )}
      </div>
    );
  };

  const noticesContent = (
    <div className="notices-list">
      {studentRegistrations.length === 0 ? (
        <article className="notice-card">
          <span className="notice-status">Sin solicitud</span>
          <h3>Aún no tienes una inscripción</h3>
          <p>Envía tu solicitud con tu correo institucional. El comité te avisará aquí cuando la revise.</p>
          <button type="button" className="button button-primary button-small" onClick={openRegistration}>Solicitar inscripción <Icon name="arrow" size={15} /></button>
        </article>
      ) : studentRegistrations.map((item) => (
        <article className="notice-card" key={item.id}>
          <span className={`status-pill status-${item.status.toLowerCase()}`}>Solicitud {item.status}</span>
          <h3>{item.category}</h3>
          <p>Folio: {item.id.replace("registro-", "").toUpperCase()} · {item.submittedAt}</p>
          {item.status === "Pendiente" && <p>Tu solicitud está pendiente de revisión por el administrador.</p>}
          {item.status === "Rechazada" && <p>El comité no aprobó esta solicitud. Contacta al plantel si necesitas más información.</p>}
          {item.status === "Retirada" && (
            <>
              <p>Te retiraste del concurso. Se conserva el registro de la solicitud y del pago, pero ya no participas.</p>
              <button type="button" className="button button-outline button-small" onClick={openRegistration}>Solicitar inscripción nuevamente <Icon name="arrow" size={15} /></button>
            </>
          )}
          {item.status === "Aceptada" && item.payment !== "Confirmado" && (
            <div className="notice-payment-pending">
              <strong>Solicitud aceptada</strong>
              <span>Pago pendiente de confirmación. Consulta con el comité cómo realizarlo.</span>
            </div>
          )}
          {item.status === "Aceptada" && item.payment === "Confirmado" && (
            <div className="notice-payment-confirmed">
              <span><strong>Pago confirmado</strong>{item.paymentConfirmedAt && ` · ${new Date(item.paymentConfirmedAt).toLocaleString("es-MX")}`}</span>
              <button type="button" className="button button-primary button-small" onClick={() => setTicketRegistration(item)}><Icon name="ticket" size={15} /> Ver boleto</button>
              <p>Tu acceso de Concursante se habilitó con el pago confirmado.</p>
            </div>
          )}
        </article>
      ))}
      <p className="admin-disclaimer">Los avisos solo muestran solicitudes guardadas en este navegador. El comité debe aprobar la inscripción y confirmar el pago.</p>
    </div>
  );

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Noche de Catrinas, inicio">
          <span className="brand-mark"><Icon name="sparkle" size={22} /></span>
          <span className="brand-copy">
            <strong>Noche de <span>Catrinas</span></strong>
            <small>CECyTEM · CUAUTITLÁN IZCALLI</small>
          </span>
        </a>

        <button
          className="mobile-menu-button icon-button"
          type="button"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Icon name={mobileMenuOpen ? "x" : "menu"} />
        </button>
        <nav className={`main-nav${mobileMenuOpen ? " is-open" : ""}`} aria-label="Navegación principal">
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          <a href="#convocatoria" onClick={() => setMobileMenuOpen(false)}>Acerca del evento</a>
          <a href="#programa" onClick={() => setMobileMenuOpen(false)}>Programa</a>
          {role !== "Estudiante" && <>
          <a href="#comunidad" onClick={() => setMobileMenuOpen(false)}>Galería</a>
          <a href="#ubicacion" onClick={() => setMobileMenuOpen(false)}>Ubicación</a>
          <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          </>}
          {role !== "Administrador" && <a href="#avisos" onClick={() => setMobileMenuOpen(false)}>Avisos</a>}
          {role === "Administrador" && (
            <button
              type="button"
              onClick={showAdministration}
            >
              Administración
            </button>
          )}
        </nav>
        <div className="header-actions">
          <label className="role-select-wrap">
            <span className="sr-only">Cambiar perfil de demostración</span>
            <select
              className="role-select"
              value={role}
              onChange={(event) => changeRole(event.target.value)}
            >
              <option>Estudiante</option>
              <option disabled>Concursante</option>
              <option>Administrador</option>
            </select>
          </label>
          {role === "Concursante" ? (
            <button className="button button-dark button-small" onClick={() => {
              setPaymentLookupOpen(true);
              setPaymentLookupResults([]);
              setPaymentLookupMessage("");
            }}>
              <Icon name="ticket" size={16} /> Consultar mi pago
            </button>
          ) : role === "Administrador" ? (
            <button className="button button-dark button-small" onClick={showAdministration}>
              Panel de control <Icon name="arrow" size={16} />
            </button>
          ) : (
            <button className="button button-dark button-small" onClick={canRegister ? openRegistration : showConvocatoria}>
              {canRegister ? "Inscríbete" : "Ver bases"} <Icon name="arrow" size={16} />
            </button>
          )}
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-lights" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className="hero-papel-picado" aria-hidden="true">✿　✳　✿　✳　✿　✳　✿　✳　✿</div>
          <div className="hero-side-art hero-side-left"><img src="/images/catrina-parade.jpg" alt="" /></div>
          <div className="hero-copy">
            <div className="eyebrow"><span /> CECyTEM · CUAUTITLÁN IZCALLI <span /></div>
            <p className="hero-kicker">UNA NOCHE PARA HONRAR NUESTRAS RAÍCES</p>
            <h1>Noche de<br /><span>Catrinas</span></h1>
            <div className="hero-ornament" aria-hidden="true"><span />✳<span /></div>
            <h2>Una celebración de nuestras raíces</h2>
            <p className="hero-intro">Celebremos la tradición, el color y la belleza que mantienen viva nuestra cultura mexicana.</p>
            <a className="button button-primary" href="#convocatoria">Descubrir el evento <Icon name="arrow" size={17} /></a>
            <div className="hero-meta">
              <span><Icon name="calendar" /> {eventDate}</span>
              {eventShifts.map((shift) => <span key={shift.name}><Icon name="ticket" /> {shift.name}: {shift.time}</span>)}
              <span><Icon name="location" /> CECyTEM Cuautitlán Izcalli</span>
            </div>
          </div>
          <div className="hero-side-art hero-side-right"><img src="/images/altar-photo.jpg" alt="" /></div>
          <div className="hero-flower flower-left" aria-hidden="true">✿</div>
          <div className="hero-flower flower-right" aria-hidden="true">✿</div>
          <a className="hero-scroll" href="#convocatoria"><span /> DESLIZA PARA DESCUBRIR</a>
        </section>

        <section className="invitation section-wrap" id="convocatoria">
          <div className="invitation-art">
            <img src="/images/altar-photo.jpg" alt="Altar de Día de Muertos con flores de cempasúchil y ofrendas" />
            <span className="art-label">NUESTRAS RAÍCES, SIEMPRE VIVAS</span>
          </div>
          <div className="invitation-copy">
            <div className="eyebrow"><span /> ACERCA DEL EVENTO</div>
            <h2>Recordar también<br />es una forma de<br /><span>celebrar la vida.</span></h2>
            <p>
              La Noche de Catrinas celebra el Día de Muertos y las historias que
              dan vida a nuestras tradiciones. El alumnado del plantel está
              invitado a compartir su creatividad y honrar nuestras raíces.
            </p>
            <ul className="invitation-list">
              <li><span>✿</span> Evento: {eventDate}</li>
              <li><span>✿</span> Participación exclusiva para alumnado del plantel</li>
              <li><span>✿</span> Creatividad, vestuario y maquillaje con identidad propia</li>
              <li><span>✿</span> Inscripción con correo institucional CECyTEM</li>
            </ul>
            <div className="criteria-panel">
              <h3>Criterios de evaluación sugeridos</h3>
              <ul>
                <li>Creatividad y originalidad de la propuesta.</li>
                <li>Vestuario y cuidado de los detalles.</li>
                <li>Maquillaje y caracterización.</li>
                <li>Presentación y explicación del significado de la Catrina o el Catrín.</li>
              </ul>
              <p>La ponderación y los criterios definitivos deberán confirmarse con el comité organizador.</p>
            </div>
            <button className="button button-outline" onClick={canRegister ? openRegistration : showConvocatoria}>
              {canRegister ? "Leer convocatoria e inscribirme" : "Consultar convocatoria"} <Icon name="arrow" size={16} />
            </button>
            {role === "Estudiante" && <p className="fine-print">El registro es una solicitud y requiere confirmación del comité.</p>}
          </div>
        </section>

        <section className="program-section" id="programa">
          <div className="section-wrap">
            <div className="section-heading">
              <div><div className="eyebrow"><span /> TRADICIÓN QUE NOS REÚNE</div><h2>Una noche llena <span>de vida.</span></h2></div>
              <p>{eventDate}.<br />Turno matutino: 09:00–13:00 h.<br />Turno vespertino: 15:00–19:00 h.</p>
            </div>
            <div className="program-grid">
              <article className="program-card"><img src="/images/catrina-parade.jpg" alt="" /><span className="program-number">01</span><span className="program-time">HORARIO POR TURNO</span><h3>Desfile de Catrinas</h3><p>Pasarela de vestuarios que honran nuestra identidad.</p><span className="program-place"><Icon name="location" size={14} /> Lugar por confirmar</span></article>
              <article className="program-card"><img src="/images/comparsa-catrinas.jpg" alt="" /><span className="program-number">02</span><span className="program-time">HORARIO POR TURNO</span><h3>Concurso de maquillaje</h3><p>Creatividad y tradición en cada trazo y caracterización.</p><span className="program-place"><Icon name="location" size={14} /> Lugar por confirmar</span></article>
              <article className="program-card"><img src="/images/comparsa-oaxaca.jpg" alt="" /><span className="program-number">03</span><span className="program-time">HORARIO POR TURNO</span><h3>Danza y música en vivo</h3><p>Ritmos y expresiones que celebran la cultura mexicana.</p><span className="program-place"><Icon name="location" size={14} /> Lugar por confirmar</span></article>
              <article className="program-card"><img src="/images/altar-photo.jpg" alt="" /><span className="program-number">04</span><span className="program-time">HORARIO POR TURNO</span><h3>Exposición de altares</h3><p>Ofrendas llenas de memoria, color y significado.</p><span className="program-place"><Icon name="location" size={14} /> Lugar por confirmar</span></article>
              <article className="program-card"><img src="/images/papel-picado-photo.jpg" alt="" /><span className="program-number">05</span><span className="program-time">HORARIO POR TURNO</span><h3>Talleres artísticos</h3><p>Espacios para crear y compartir saberes artesanales.</p><span className="program-place"><Icon name="location" size={14} /> Lugar por confirmar</span></article>
              <article className="program-card"><img src="/images/altar-tequisquiapan.jpg" alt="" /><span className="program-number">06</span><span className="program-time">HORARIO POR TURNO</span><h3>Artesanías mexicanas</h3><p>Una muestra del ingenio y el talento del alumnado.</p><span className="program-place"><Icon name="location" size={14} /> Lugar por confirmar</span></article>
            </div>
            <p className="program-note">La fecha y los horarios por turno están confirmados. Las actividades y el lugar dentro del plantel son una propuesta y deben confirmarse con el comité organizador.</p>
          </div>
        </section>

        <section className="community-section section-wrap" id={role === "Estudiante" ? "avisos" : "comunidad"}>
          <div className="section-heading community-heading">
            {role === "Estudiante" ? (
              <div><div className="eyebrow"><span /> AVISOS DE INSCRIPCIÓN</div><h2>El estado de tu <span>solicitud.</span></h2></div>
            ) : (
              <>
                <div><div className="eyebrow"><span /> GALERÍA DE CATRINAS</div><h2>El arte de <span>recordar.</span></h2></div>
                <div className="community-tools">
                  <span className="live-label"><i /> {posts.length} historias compartidas</span>
                  {role === "Concursante" && (
                    <button className="button button-dark button-small" onClick={openPostComposer}><Icon name="plus" size={15} /> Compartir foto</button>
                  )}
                </div>
              </>
            )}
          </div>

          {role === "Estudiante" ? (
            noticesContent
          ) : activeTab === "admin" && role === "Administrador" ? (
            <section className="admin-panel" aria-label="Panel de administración">
              <div className="admin-panel-heading">
                <div><div className="eyebrow"><span /> GESTIÓN DEL EVENTO</div><h3>Panel de administración</h3></div>
                <span className="demo-badge">Modo demostración</span>
              </div>
              <div className="admin-stats">
                <div><small>INSCRIPCIONES</small><strong>{registrations.length}</strong></div>
                <div><small>POR REVISAR</small><strong>{registrations.filter((item) => item.status === "Pendiente").length}</strong></div>
                <div><small>PUBLICACIONES</small><strong>{posts.length}</strong></div>
              </div>
              <div className="admin-list-heading"><h4>Solicitudes de inscripción</h4><span>{registrations.length} total</span></div>
              {registrations.length === 0 ? (
                <div className="empty-state"><Icon name="users" size={28} /><strong>Aún no hay solicitudes</strong><span>Cuando alguien se inscriba, aparecerá aquí para revisión.</span></div>
              ) : (
                <div className="table-scroll"><table className="registration-table"><thead><tr><th>Participante</th><th>Categoría</th><th>Estado</th><th>Pago</th><th>Acciones</th></tr></thead>
                  <tbody>{registrations.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.name}</strong><small>{item.email} · {item.group}</small></td>
                      <td>{item.category}</td>
                      <td><span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                      <td><span className={`status-pill status-${item.payment.toLowerCase()}`}>{item.payment}</span></td>
                      <td className="table-actions">
                        {item.status === "Pendiente" && <>
                          <button type="button" className="action-approve" onClick={() => updateRegistration(item.id, { status: "Aceptada" })}>Aceptar</button>
                          <button type="button" className="action-reject" onClick={() => updateRegistration(item.id, { status: "Rechazada" })}>Rechazar</button>
                        </>}
                        {item.status === "Aceptada" && item.payment !== "Confirmado" && <button type="button" className="action-approve" onClick={() => updateRegistration(item.id, { payment: "Confirmado", paymentConfirmedAt: new Date().toISOString() })}>Confirmar pago</button>}
                        {item.status === "Aceptada" && item.payment === "Confirmado" && <button type="button" className="action-approve" onClick={() => setTicketRegistration(item)}>Imprimir boleto</button>}
                        <button type="button" className="action-remove" onClick={() => removeRegistration(item.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
              <div className="admin-list-heading publication-heading"><h4>Galería de publicaciones</h4><span>{posts.length} publicaciones</span></div>
              {posts.length === 0 ? (
                <div className="empty-state"><Icon name="image" size={28} /><strong>La galería está vacía</strong><span>Las publicaciones del alumnado aparecerán aquí.</span></div>
              ) : (
                <div className="gallery-grid admin-gallery-grid">
                  {posts.map((post) => (
                    <article className="post-card" key={post.id}>
                      <div className="post-image-wrap">
                        <button className="gallery-image-button" type="button" aria-label={`Ampliar imagen de ${post.name}`} onClick={() => setSelectedImage(post)}>
                          <img src={post.image} alt={`Publicación de ${post.name}`} />
                        </button>
                        <button type="button" className="post-moderate" onClick={() => removePost(post.id)}>Eliminar publicación</button>
                      </div>
                      <div className="post-content">
                        <div className="post-author"><span className="avatar">{post.name.charAt(0)}</span><span><strong>{post.name}</strong><small>{post.group} · {post.time}</small></span></div>
                        <p className="post-caption">{post.caption}</p>
                        {renderComments(post)}
                      </div>
                    </article>
                  ))}
                </div>
              )}
              <p className="admin-disclaimer">La confirmación del pago es manual; esta aplicación no procesa pagos. Los datos se guardan en este navegador y no se sincronizan con otros dispositivos.</p>
            </section>
          ) : (
            <>
              <div className="community-banner">
                <span className="banner-symbol">✳</span>
                <span><strong>Cada look cuenta una historia.</strong><small>Inspírate, celebra y comparte la tuya con el alumnado.</small></span>
                {role === "Concursante" ? (
                  <button type="button" className="banner-action" onClick={openPostComposer}>Subir mi foto <Icon name="arrow" size={15} /></button>
                ) : role === "Administrador" ? (
                  <button type="button" className="banner-action" onClick={showAdministration}>Abrir panel <Icon name="arrow" size={15} /></button>
                ) : null}
              </div>
              <div className="gallery-grid">
                {posts.length === 0 ? (
                  <div className="empty-gallery">Todavía no hay publicaciones. ¡Sé la primera persona en compartir una foto!</div>
                ) : posts.map((post) => (
                  <article className="post-card" key={post.id}>
                    <div className="post-image-wrap">
                      <button className="gallery-image-button" type="button" aria-label={`Ampliar imagen de ${post.name}`} onClick={() => setSelectedImage(post)}>
                        <img src={post.image} alt={`Publicación de ${post.name}`} />
                      </button>
                      {role === "Administrador" && <button type="button" className="post-moderate" onClick={() => removePost(post.id)}>Eliminar publicación</button>}
                    </div>
                    <div className="post-content">
                      <div className="post-author"><span className="avatar">{post.name.charAt(0)}</span><span><strong>{post.name}</strong><small>{post.group} · {post.time}</small></span><button className={`like-button${post.liked ? " is-liked" : ""}`} type="button" aria-label={post.liked ? "Quitar me gusta" : "Dar me gusta"} onClick={() => toggleLike(post.id)}><Icon name="heart" size={18} /><span>{post.likes}</span></button></div>
                      <p className="post-caption">{post.caption}</p>
                      {renderComments(post)}
                      {role !== "Administrador" && <form className="comment-form" onSubmit={(event) => addComment(event, post.id)}>
                        <Icon name="message" size={16} />
                        <input aria-label={`Comentar en la publicación de ${post.name}`} placeholder="Escribe un comentario..." value={commentDrafts[post.id] || ""} onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))} />
                        <button type="submit" aria-label="Publicar comentario"><Icon name="arrow" size={16} /></button>
                      </form>}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        {role === "Concursante" && (
          <section className="notices-section section-wrap" id="avisos">
            <div className="section-heading"><div><div className="eyebrow"><span /> AVISOS DE INSCRIPCIÓN</div><h2>Tu solicitud y <span>boleto.</span></h2></div></div>
            {noticesContent}
            {activeParticipation && (
              <div className="withdraw-panel">
                <p>Si decides no participar, puedes retirarte. Tu registro de inscripción y pago se conservará en este navegador.</p>
                <button type="button" className="button button-outline" onClick={withdrawFromContest}>Retirarme del concurso</button>
              </div>
            )}
          </section>
        )}

        {role !== "Estudiante" && <section className="location-section section-wrap" id="ubicacion">
          <div className="section-heading">
            <div><div className="eyebrow"><span /> EL PUNTO DE ENCUENTRO</div><h2>Nos vemos <span>pronto.</span></h2></div>
            <p>La información se actualizará<br />cuando la confirme el comité.</p>
          </div>
          <div className="location-card">
            <div className="location-map-placeholder"><img src="/images/altar-photo.jpg" alt="" /><span className="map-pin"><Icon name="location" size={25} /></span><span className="map-note">CECyTEM CUAUTITLÁN IZCALLI</span></div>
            <div className="location-details">
              <span className="location-kicker"><Icon name="location" size={17} /> CUAUTITLÁN IZCALLI, ESTADO DE MÉXICO</span>
              <h3>CECyTEM<br /><span>Cuautitlán Izcalli</span></h3>
              <p>El evento está organizado por el plantel CECyTEM Cuautitlán Izcalli. La dirección exacta y el espacio dentro del plantel aún están por confirmarse.</p>
              <div className="location-facts"><span><Icon name="calendar" /> Fecha: {eventDate}</span>{eventShifts.map((shift) => <span key={shift.name}><Icon name="ticket" /> {shift.name}: {shift.time}</span>)}</div>
              <a className="button button-outline" href="https://www.google.com/maps/search/?api=1&query=CECyTEM+Cuautitl%C3%A1n+Izcalli" target="_blank" rel="noreferrer">Buscar el plantel en Maps <Icon name="arrow" size={15} /></a>
              <small className="location-disclaimer">La búsqueda muestra el plantel, no una ubicación confirmada para el evento.</small>
            </div>
          </div>
        </section>}

        {role !== "Estudiante" && <section className="contact-section" id="contacto">
          <span className="contact-flower" aria-hidden="true">✿</span>
          <div className="contact-content">
            <div className="eyebrow"><span /> SIGAMOS CELEBRANDO</div>
            <h2>Una tradición que<br /><span>se comparte.</span></h2>
            <p>¿Quieres participar? Consulta la convocatoria y mantente al tanto de los detalles oficiales del evento.</p>
            <div className="contact-actions">
              <button className="button button-primary" onClick={canRegister ? openRegistration : showConvocatoria}>{canRegister ? "Solicitar inscripción" : "Consultar convocatoria"} <Icon name="arrow" size={16} /></button>
              <a className="button button-outline" href="#programa">Explorar actividades</a>
            </div>
            <small>Los canales de contacto y redes oficiales se publicarán cuando estén disponibles.</small>
          </div>
        </section>}
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><Icon name="sparkle" size={20} /></span><span className="brand-copy"><strong>Noche de <span>Catrinas</span></strong><small>CECyTEM · CUAUTITLÁN IZCALLI</small></span></a>
          <p>Una celebración de nuestras raíces y de quienes forman parte del plantel.</p>
          <nav className="footer-links" aria-label="Navegación del pie de página"><a href="#inicio">Inicio</a><a href="#convocatoria">El evento</a><a href="#programa">Actividades</a>{role === "Estudiante" ? <a href="#avisos">Avisos</a> : role === "Concursante" ? <><a href="#avisos">Avisos</a><a href="#ubicacion">Ubicación</a><a href="#contacto">Contacto</a></> : <><a href="#ubicacion">Ubicación</a><a href="#contacto">Contacto</a></>}</nav>
        </div>
        <div className="footer-bottom"><span>© 2026 Noche de Catrinas · CECyTEM Cuautitlán Izcalli</span><span>{eventDate} · Mañana: 09:00–13:00 h · Tarde: 15:00–19:00 h · Lugar exacto por confirmar.</span></div>
      </footer>

      {registrationOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setRegistrationOpen(false);
        }}>
          <section className="registration-modal" role="dialog" aria-modal="true" aria-labelledby="registration-title">
            <button type="button" className="modal-close icon-button" aria-label="Cerrar formulario" onClick={() => setRegistrationOpen(false)}><Icon name="x" /></button>
            <div className="eyebrow"><span /> CONCURSO DE CATRINAS Y CATRINES</div>
            <h2 id="registration-title">Tu historia<br /><span>empieza aquí.</span></h2>
            <p className="modal-intro">Inscripción exclusiva para alumnado del plantel. El comité revisará y confirmará tu solicitud.</p>
            <form className="registration-form" onSubmit={submitRegistration}>
              <label>Nombre completo<input required minLength="3" autoComplete="name" placeholder="Como quieres aparecer en el evento" value={registration.name} onChange={(event) => setRegistration({ ...registration, name: event.target.value })} /></label>
              <div className="form-row">
                <label>Correo institucional<input required name="email" type="email" autoComplete="email" placeholder="Escribe aquí tu correo institucional" title="Usa tu correo @cecytem.mx o @soycecytem.mx." value={registration.email} onChange={(event) => setRegistration({ ...registration, email: event.target.value })} /></label>
                <label>Teléfono<input required type="tel" autoComplete="tel" pattern="[0-9]{10,15}" placeholder="10 dígitos (solo números)" value={registration.phone} onChange={(event) => setRegistration({ ...registration, phone: event.target.value })} /></label>
              </div>
              <div className="form-row">
                <label>Semestre y grupo<input required placeholder="Ej. 5.º semestre · 502" value={registration.group} onChange={(event) => setRegistration({ ...registration, group: event.target.value })} /></label>
                <label>Categoría<select value={registration.category} onChange={(event) => setRegistration({ ...registration, category: event.target.value })}><option>Catrina tradicional</option><option>Catrín tradicional</option><option>Propuesta creativa</option></select></label>
              </div>
              <div className="payment-note"><Icon name="ticket" size={18} /><span><strong>Sobre el pago</strong><small>El pago se coordina con el comité. Cuando el administrador confirme que ya pagaste, podrá imprimir tu boleto.</small></span></div>
              <button className="button button-primary submit-button" type="submit">Enviar solicitud <Icon name="arrow" size={16} /></button>
              <p className="privacy-note">Solo pueden inscribirse estudiantes del plantel. El comité revisará y confirmará tu solicitud.</p>
            </form>
          </section>
        </div>
      )}

      {postComposerOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPostComposerOpen(false);
        }}>
          <section className="registration-modal post-composer-modal" role="dialog" aria-modal="true" aria-labelledby="post-composer-title">
            <button type="button" className="modal-close icon-button" aria-label="Cerrar publicación" onClick={() => setPostComposerOpen(false)}><Icon name="x" /></button>
            <div className="eyebrow"><span /> GALERÍA DE CATRINAS</div>
            <h2 id="post-composer-title">Comparte tu <span>historia.</span></h2>
            <p className="modal-intro">Elige una foto y escribe la descripción que quieres compartir con la comunidad.</p>
            <form className="registration-form" onSubmit={submitPost}>
              <label>Tu fotografía
                <input ref={postImageInput} required type="file" accept="image/*" onChange={(event) => setPostImage(event.target.files?.[0] || null)} />
                <small className="field-hint">Archivo de imagen de hasta 4 MB.{postImage ? ` Seleccionado: ${postImage.name}` : ""}</small>
              </label>
              <label>Descripción<textarea required rows="4" value={postDescription} onChange={(event) => setPostDescription(event.target.value)} placeholder="Escribe tu propia descripción..." /></label>
              <button className="button button-primary submit-button" type="submit">Publicar en la galería <Icon name="arrow" size={16} /></button>
            </form>
          </section>
        </div>
      )}

      {paymentLookupOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPaymentLookupOpen(false);
        }}>
          <section className="registration-modal payment-lookup-modal" role="dialog" aria-modal="true" aria-labelledby="payment-lookup-title">
            <button type="button" className="modal-close icon-button" aria-label="Cerrar consulta de pago" onClick={() => setPaymentLookupOpen(false)}><Icon name="x" /></button>
            <div className="eyebrow"><span /> CONSULTA DE INSCRIPCIÓN</div>
            <h2 id="payment-lookup-title">Revisa tu <span>pago.</span></h2>
            <p className="modal-intro">Escribe el correo institucional que usaste al inscribirte para consultar el estado registrado.</p>
            <form className="registration-form" onSubmit={submitPaymentLookup}>
              <label>Correo institucional<input required type="email" autoComplete="email" placeholder="nombre@cecytem.mx" value={paymentLookupEmail} onChange={(event) => {
                setPaymentLookupEmail(event.target.value);
                setPaymentLookupResults([]);
                setPaymentLookupMessage("");
              }} /></label>
              <button className="button button-primary submit-button" type="submit">Consultar pago <Icon name="arrow" size={16} /></button>
            </form>
            {paymentLookupMessage && <p className="payment-lookup-message" role="status">{paymentLookupMessage}</p>}
            {paymentLookupResults.map((item) => (
              <article className="payment-result" key={item.id}>
                <div><span>Participante</span><strong>{item.name}</strong></div>
                <div><span>Inscripción</span><strong>{item.status}</strong></div>
                <div><span>Pago</span><strong className={`payment-result-status${item.payment === "Confirmado" ? " is-confirmed" : ""}`}>{item.payment}</strong></div>
                <div><span>Categoría</span><strong>{item.category}</strong></div>
                {item.paymentConfirmedAt && <div><span>Pago confirmado</span><strong>{new Date(item.paymentConfirmedAt).toLocaleString("es-MX")}</strong></div>}
                {item.status === "Aceptada" && item.payment === "Confirmado" && <button type="button" className="button button-primary button-small" onClick={() => setTicketRegistration(item)}><Icon name="ticket" size={15} /> Ver boleto</button>}
                {item.payment !== "Confirmado" && <p>El pago aún no aparece como confirmado. Si ya realizaste el pago, contacta al comité organizador.</p>}
              </article>
            ))}
            <p className="payment-lookup-disclaimer">La consulta solo revisa los datos guardados en este navegador. No muestra comprobantes bancarios ni confirma pagos automáticamente.</p>
          </section>
        </div>
      )}

      {ticketRegistration && (
        <div className="ticket-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setTicketRegistration(null);
        }}>
          <section className="ticket-modal" role="dialog" aria-modal="true" aria-labelledby="ticket-title">
            <div className="ticket-controls">
              <button type="button" className="icon-button" aria-label="Cerrar boleto" onClick={() => setTicketRegistration(null)}><Icon name="x" /></button>
            </div>
            <div className="ticket-brand"><Icon name="sparkle" size={24} /><span>NOCHE DE CATRINAS<small>CECyTEM · CUAUTITLÁN IZCALLI</small></span></div>
            <div className="ticket-rule" />
            <p className="ticket-kicker">COMPROBANTE DE INSCRIPCIÓN</p>
            <h2 id="ticket-title">¡Tu lugar está <span>confirmado!</span></h2>
            <span className="ticket-paid">PAGO CONFIRMADO</span>
            <dl className="ticket-details">
              <div><dt>Participante</dt><dd>{ticketRegistration.name}</dd></div>
              <div><dt>Categoría</dt><dd>{ticketRegistration.category}</dd></div>
              <div><dt>Semestre y grupo</dt><dd>{ticketRegistration.group}</dd></div>
              <div><dt>Folio</dt><dd>{ticketRegistration.id.replace("registro-", "").toUpperCase()}</dd></div>
              <div><dt>Fecha del evento</dt><dd>{eventDate}</dd></div>
              <div><dt>Horario</dt><dd>Mañana 09:00–13:00 h · Tarde 15:00–19:00 h</dd></div>
              <div><dt>Pago confirmado</dt><dd>{ticketRegistration.paymentConfirmedAt ? new Date(ticketRegistration.paymentConfirmedAt).toLocaleString("es-MX") : "Confirmado previamente"}</dd></div>
            </dl>
            <p className="ticket-footnote">Conserva este comprobante y preséntalo al comité organizador.</p>
            <div className="ticket-controls ticket-actions">
              <button type="button" className="button button-primary" onClick={() => window.print()}><Icon name="ticket" size={16} /> Imprimir boleto</button>
            </div>
          </section>
        </div>
      )}

      {selectedImage && (
        <div className="lightbox-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedImage(null);
        }}>
          <section className="lightbox" role="dialog" aria-modal="true" aria-label={`Imagen de ${selectedImage.name}`}>
            <button type="button" className="lightbox-close icon-button" aria-label="Cerrar imagen" onClick={() => setSelectedImage(null)}><Icon name="x" /></button>
            <img src={selectedImage.image} alt={`Imagen de ${selectedImage.name}: ${selectedImage.caption}`} />
            <div className="lightbox-caption"><strong>{selectedImage.name}</strong><span>{selectedImage.caption}</span></div>
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={16} /></span>{toast}</div>}
      <button className="back-to-top" type="button" aria-label="Volver al inicio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><Icon name="arrowUp" /></button>
    </div>
  );
}

export default App;
