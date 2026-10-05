/**
 * Sagar Kumar Portfolio — Data Store
 */

const CRED = 'https://www.credly.com/badges/';

export const PROJECTS = [
  {
    slug: 'quantum-speed-up-nlp',
    title: 'Quantum_Speed_Up_NLP',
    sub: 'Hybrid Quantum-Classical NLP Model',
    cat: 'quantum',
    area: 'qml',
    tags: ['Qiskit', 'PennyLane', 'PyTorch', 'BERT'],
    sum: 'Parameterised quantum circuit layers trained end-to-end with PyTorch for sentiment analysis on IMDB, benchmarked against BERT.',
    points: [
      'Led development of a hybrid NLP pipeline integrating quantum computing with classical deep learning for sentiment analysis on the IMDB dataset.',
      'Designed parameterised quantum circuit layers in PennyLane and Qiskit, integrated seamlessly with PyTorch for end-to-end gradient-based training.',
      'Benchmarked the hybrid model against classical BERT baselines; documented performance improvements and computational trade-offs.'
    ],
    stack: 'Qiskit, PennyLane, PyTorch, BERT'
  },
  {
    slug: 'quantum-healthcare-ai',
    title: 'Quantum Supervised Learning for Healthcare AI',
    sub: 'Hybrid Disease Prediction',
    cat: 'quantum',
    area: 'qml',
    tags: ['PennyLane', 'PyTorch', 'Scikit-learn'],
    sum: 'Quantum circuit-based feature extraction enriching classical networks for disease prediction on the Pima Indians Diabetes Dataset.',
    points: [
      'Designed a hybrid ML pipeline combining classical neural networks with quantum circuit-based feature extraction using PennyLane.',
      'Developed custom quantum layers to enrich input features for disease prediction on the Pima Indians Diabetes Dataset, improving classification accuracy over classical baselines.',
      'Validated quantum-enhanced features in a practical healthcare setting, demonstrating measurable benefits of quantum ML on real-world medical data.'
    ],
    stack: 'PennyLane, PyTorch, Scikit-learn'
  },
  {
    slug: 'neo-nash',
    title: 'Neo-Nash',
    sub: 'Quantum Nash Equilibrium Solver',
    cat: 'quantum',
    area: 'qc',
    tags: ['Qiskit', 'VQE', 'Game Theory'],
    sum: 'A Variational Quantum Eigensolver that approximates Nash equilibria in multiplayer, multi-strategy games.',
    points: [
      'Implemented a Variational Quantum Eigensolver (VQE) to approximate Nash equilibria in multiplayer, multi-strategy game theory problems.',
      'Engineered modular classes for payoff matrix validation and Hamiltonian encoding; designed parameterised ansatz circuits with custom cost functions.',
      'Demonstrated quantum advantage over classical solvers on computationally hard game scenarios.'
    ],
    stack: 'Qiskit, VQE, Game Theory'
  },
  {
    slug: 'protein-folding',
    title: 'Quantum-Enhanced Protein Folding',
    sub: '& Structural Analysis Engine',
    cat: 'quantum',
    area: 'qc',
    tags: ['VQE', 'Quantum Annealing', 'Docker', 'Kubernetes'],
    sum: 'VQE-based quantum simulation combined with deep networks to predict folding pathways and identify druggable sites.',
    points: [
      'Built a hybrid platform combining VQE-based quantum simulation and deep neural networks to predict protein folding pathways and identify druggable sites.',
      'Engineered noise mitigation strategies for higher-fidelity energy landscape exploration.',
      'Containerised with Docker and deployed on Kubernetes for scalable cloud execution.'
    ],
    stack: 'VQE, Quantum Annealing, Deep Neural Networks, Docker, Kubernetes'
  },
  {
    slug: 'quantum-biomarker-discovery',
    title: 'Personalized Medicine via Quantum-AI',
    sub: 'Biomarker Discovery',
    cat: 'quantum',
    area: 'qml',
    tags: ['Quantum PCA', 'Quantum Clustering', 'Deep Learning'],
    sum: 'Quantum PCA and quantum clustering to mine genomic, proteomic and metabolomic data for personalised therapy planning.',
    points: [
      'Developed a platform combining Quantum PCA and quantum clustering to mine subtle patterns in large-scale genomic, proteomic and metabolomic datasets.',
      'Designed a personalised treatment recommendation engine linking biomarker profiles to individual patient data for customised therapy planning.'
    ],
    stack: 'Quantum PCA, Quantum Clustering, Deep Learning'
  },
  {
    slug: 'neutrino-oscillation',
    title: 'Neutrino Oscillation Simulation',
    sub: 'Physics Simulation Framework',
    cat: 'physics',
    area: 'space',
    tags: ['Python', 'NumPy', 'Matplotlib', 'Streamlit'],
    sum: 'A Python framework modelling neutrino oscillation probabilities in vacuum and matter, with automated plotting and data export.',
    points: [
      'Designed a Python simulation framework to model neutrino oscillation probabilities in vacuum and matter using NumPy, Pandas and Matplotlib.',
      'Supported flexible parameter tuning with automated plot generation and CSV/JSON export for experimental validation.',
      'Proposed extensions for 4-flavour oscillations, live data integration and a Streamlit GUI.'
    ],
    stack: 'Python, NumPy, Pandas, Matplotlib, Streamlit'
  },
  {
    slug: 'stock-market-llm',
    title: 'Stock Market Prediction LLM',
    sub: '& Finance Management Platform',
    cat: 'ai',
    area: 'ml',
    tags: ['Python', 'LLMs', 'NLP', 'REST APIs'],
    sum: 'An end-to-end AI platform uniting large language models with quantitative finance for prediction and portfolio management.',
    points: [
      'Developed an end-to-end AI platform integrating Large Language Models with quantitative finance algorithms for real-time stock market prediction and portfolio management.',
      'Engineered NLP pipelines to extract sentiment and financial signals from news feeds, earnings reports and social media streams using transformer-based models.',
      'Built a finance management dashboard with automated risk assessment, portfolio optimisation and predictive analytics; deployed on cloud-native architecture with RESTful APIs.'
    ],
    stack: 'Python, LLMs, Transformer-based NLP, REST APIs, Cloud-native deployment'
  },
  {
    slug: 'smartcampus',
    title: 'SmartCampus',
    sub: 'Android Academic Management Application',
    cat: 'software',
    area: 'sw',
    tags: ['Android', 'Kotlin', 'Firebase'],
    sum: 'A unified Kotlin app digitising attendance, timetables, grades and announcements for students, faculty and administrators.',
    metric: 'User-acceptance testing with 200+ student participants · 4.6/5 average satisfaction',
    points: [
      'Designed and developed a full-featured Android application in Kotlin to digitise campus operations for students, faculty and administrators on a single unified platform.',
      'Implemented real-time attendance tracking, timetable management, grade notifications and campus announcements using Firebase Realtime Database and Firebase Cloud Messaging (FCM).',
      'Built a Material Design 3 UI with XML Layouts and Jetpack components — ViewModel, LiveData, Navigation Component and Room Database for offline-first functionality.',
      'Integrated Google Maps SDK for campus navigation, Retrofit for REST API consumption and OAuth 2.0 for secure multi-role authentication.',
      'Conducted user-acceptance testing with 200+ student participants; iterated on feedback to improve UX, achieving a 4.6/5 average satisfaction score.'
    ],
    stack: 'Kotlin, Android Studio, Firebase (Auth, Firestore, Realtime DB, FCM, Storage), Jetpack, Retrofit, Room DB, Google Maps SDK, Material Design 3'
  },
  {
    slug: 'academiq',
    title: 'AcademiQ',
    sub: 'MEAN Stack Learning Management Portal',
    cat: 'software',
    area: 'sw',
    tags: ['MongoDB', 'Express.js', 'Angular 17', 'Node.js'],
    sum: 'A full-stack LMS for course content, assignments, quizzes and live sessions, with real-time analytics dashboards.',
    points: [
      'Architected and built a full-stack Learning Management System enabling faculty to publish course content and students to access assignments, quizzes and live sessions through a browser-based SPA.',
      'Developed a RESTful API backend with Node.js and Express.js featuring JWT-based authentication, role-based access control, input validation and rate limiting.',
      'Used MongoDB Atlas with Mongoose ODM; implemented aggregation pipelines for real-time analytics dashboards showing enrolment trends, submission rates and grade distributions.',
      'Built the frontend in Angular 17 with NgRx state management, RxJS reactive streams, lazy-loaded modules, Angular Material and reactive forms with server-side validation.',
      'Added real-time notifications and live class indicators via Socket.io; integrated Cloudinary for media uploads and SendGrid for automated email reminders.',
      'Deployed on AWS EC2 behind an NGINX reverse proxy with PM2, and set up a GitHub Actions CI/CD pipeline for automated testing and zero-downtime deployment.'
    ],
    stack: 'MongoDB Atlas, Mongoose, Express.js, Angular 17, NgRx, Node.js, TypeScript, Socket.io, JWT, AWS EC2, NGINX, PM2, Docker, GitHub Actions, Cloudinary'
  }
];

export const CATS = {
  quantum: { label: 'Quantum', art: 'circuit' },
  ai: { label: 'AI & Data', art: 'neural' },
  physics: { label: 'Physics & Space', art: 'wave' },
  software: { label: 'Software', art: 'chip' }
};

export const AREAS = [
  {
    id: 'qc',
    no: '01',
    title: 'Quantum Computing & Algorithms',
    short: 'Variational algorithms and quantum simulation.',
    art: 'circuit',
    desc: 'Variational and hybrid quantum algorithms built with Qiskit, PennyLane and Cirq — from a VQE-based Nash-equilibrium solver to quantum simulation of protein-folding energy landscapes — alongside work linking algebraic structures to cognitive phenomena.'
  },
  {
    id: 'qml',
    no: '02',
    title: 'Quantum Machine Learning',
    short: 'Hybrid quantum-classical models.',
    art: 'neural',
    desc: 'Hybrid quantum-classical models in which parameterised quantum circuits train end-to-end inside PyTorch pipelines — applied to sentiment analysis, disease prediction, biomarker discovery and material discovery for robotic sensors.'
  },
  {
    id: 'space',
    no: '03',
    title: 'Quantum Space Technology',
    short: 'Computing for cosmology and astrophysics.',
    art: 'galaxy',
    desc: 'Computing systems for space-based research: a published patent on in-orbit simulation of black-hole and early-universe dynamics, a neutrino-oscillation simulation framework, and the space-technology research focus of Kosmatron.'
  },
  {
    id: 'ml',
    no: '04',
    title: 'Machine Learning & Data Science',
    short: 'From lightweight CNNs to LLM finance.',
    art: 'wave',
    desc: 'Lightweight CNNs for plant-disease identification, time-efficient K-Means clustering, LLM-driven market prediction, and a regulatory and ethical framework for ML-driven 6G wireless networks.'
  },
  {
    id: 'sw',
    no: '05',
    title: 'Android & Full-Stack Systems',
    short: 'Platforms that digitise academic life.',
    art: 'chip',
    desc: 'Production-grade Android (Kotlin, Jetpack, Firebase) and MEAN-stack platforms that digitise campus operations and online learning.'
  }
];

export const WORKS = [
  { id: 'neo-nash', area: 'qc', label: 'Neo-Nash — quantum Nash solver', kind: 'Project', href: '#/projects/neo-nash' },
  { id: 'protein-folding', area: 'qc', label: 'Quantum protein-folding engine', kind: 'Project', href: '#/projects/protein-folding' },
  { id: 'p3', area: 'qc', label: 'Exploring Quantum Cognition', kind: 'Chapter', href: '#/publications' },
  { id: 'r1', area: 'qc', label: 'Building Quantum Software', kind: 'Review', href: '#/publications' },
  { id: 'quantum-speed-up-nlp', area: 'qml', label: 'Quantum_Speed_Up_NLP', kind: 'Project', href: '#/projects/quantum-speed-up-nlp' },
  { id: 'quantum-healthcare-ai', area: 'qml', label: 'Quantum healthcare AI', kind: 'Project', href: '#/projects/quantum-healthcare-ai' },
  { id: 'quantum-biomarker-discovery', area: 'qml', label: 'Quantum-AI biomarker discovery', kind: 'Project', href: '#/projects/quantum-biomarker-discovery' },
  { id: 'p4', area: 'qml', label: 'Quantum-AI enhanced FBG sensors', kind: 'Accepted', href: '#/publications' },
  { id: 'neutrino-oscillation', area: 'space', label: 'Neutrino oscillation simulation', kind: 'Project', href: '#/projects/neutrino-oscillation' },
  { id: 'pt1', area: 'space', label: 'In-orbit black-hole simulation', kind: 'Patent', href: '#/publications' },
  { id: 'stock-market-llm', area: 'ml', label: 'Stock market prediction LLM', kind: 'Project', href: '#/projects/stock-market-llm' },
  { id: 'p1', area: 'ml', label: 'Plant-disease lightweight CNN', kind: 'Journal', href: '#/publications' },
  { id: 'p2', area: 'ml', label: 'Time-efficient K-Means', kind: 'Chapter', href: '#/publications' },
  { id: 'p5', area: 'ml', label: 'ML-driven 6G framework', kind: 'Accepted', href: '#/publications' },
  { id: 'smartcampus', area: 'sw', label: 'SmartCampus', kind: 'Project', href: '#/projects/smartcampus' },
  { id: 'academiq', area: 'sw', label: 'AcademiQ', kind: 'Project', href: '#/projects/academiq' }
];

export const PUBS = [
  {
    id: 'p1',
    f: 'published',
    status: 'Published',
    type: 'Journal paper · Q3',
    title: 'Identification of Plant Diseases from Leaf Images Using Lightweight CNN Model',
    venue: 'Q3 journal paper',
    doi: '10.5391/IJFIS.2026.26.3.251'
  },
  {
    id: 'p2',
    f: 'published',
    status: 'Published',
    type: 'Book chapter',
    title: 'Optimizing K-Means Clustering with Focus on Time-Efficient Algorithms',
    venue: 'Book chapter',
    doi: '10.1201/9781003598152-16'
  },
  {
    id: 'p3',
    f: 'published',
    status: 'Published',
    type: 'Book chapter',
    title: 'Exploring Quantum Cognition: Linking Algebraic Structures to Cognitive Phenomena',
    venue: 'Book chapter',
    doi: '10.4018/979-8-3693-4107-0.ch005'
  },
  {
    id: 'p4',
    f: 'accepted',
    status: 'Accepted',
    type: 'Journal article / chapter',
    title: 'Accelerated Material Discovery for Robotic Sensors Using Quantum-AI Enhanced FBG Technology',
    venue: 'De Gruyter'
  },
  {
    id: 'p5',
    f: 'accepted',
    status: 'Accepted',
    type: 'Journal article / chapter',
    title: 'Regulatory and Ethical Framework for Machine Learning-driven 6G Wireless Networks',
    venue: 'CRC Press'
  },
  {
    id: 'pt1',
    f: 'patent',
    status: 'Published',
    type: 'Patent',
    title: 'Computing System for In-Orbit Simulation of Black Hole and Early-Universe Dynamics',
    venue: 'Patent published',
    note: 'In-orbit simulation system for cosmological and quantum gravitational modeling.'
  },
  {
    id: 'r1',
    f: 'review',
    status: 'Reviewed · 2024',
    type: 'Book review',
    title: 'Building Quantum Software',
    venue: 'Manning Publications — by C. Gonciulea & C. Stefanski'
  }
];

export const TIMELINE = [
  {
    kind: 'academia',
    year: '2025',
    range: 'June 2025 – Present',
    role: 'International Relation Coordinator & Assistant Professor',
    org: 'Poornima University, Jaipur',
    points: [
      'Coordinates global partnerships, student and faculty mobility, international collaborations and institutional outreach.',
      'Promotes internationalisation initiatives, organises global engagement activities, and manages partnership data, mobility records and departmental operations.',
      'Teaches UG and PG courses in Computer Science & Engineering, including Quantum Computing, AI, Android Application Development and MEAN Stack Web Development.',
      'Conducts research in Quantum Computing, Quantum Machine Learning and AI-driven systems; mentors students on research projects, publications and industry-aligned software.'
    ]
  },
  {
    kind: 'academia',
    year: '2023',
    range: 'August 2023 – June 2025',
    role: 'Visiting Assistant Professor',
    org: 'ICFAI University, Jaipur',
    points: [
      'Taught 7 courses across UG and PG levels: Machine Learning, Big Data Analytics, Data Science, Fuzzy Logic, Wireless Networks and Computer Networks.',
      'Supervised student projects integrating quantum computing, AI and full-stack development methodologies.',
      'Contributed to curriculum design and academic development activities.'
    ]
  },
  {
    kind: 'venture',
    year: '2023',
    range: '2023 – Present',
    role: 'Founder & CEO',
    org: 'Kosmatron, Jodhpur',
    points: [
      'Founded and leads a technology startup focused on quantum computing, space-technology research and software product development.',
      'Drives product development across quantum-AI, mobile application and web platform domains.'
    ]
  },
  {
    kind: 'industry',
    year: '2022',
    range: '2022 – 2023',
    role: 'Data Scientist',
    org: 'Mobyink Innovations, Jaipur',
    points: [
      'Developed predictive analytics and machine learning models for business intelligence applications.'
    ]
  },
  {
    kind: 'industry',
    year: '2022',
    range: '2022',
    role: 'Data Engineer',
    org: 'Sense Techno Solutions, Jodhpur',
    points: [
      'Designed and maintained data pipelines and ETL workflows using AWS and cloud platforms.'
    ]
  },
  {
    kind: 'education',
    year: '2019',
    range: '2019 – 2022',
    role: 'Master of Engineering (CSE)',
    org: 'ITMO University, St. Petersburg, Russia',
    points: [
      'Specialized in Advanced Computer Science, Distributed Systems and Algorithmic Computing.'
    ]
  },
  {
    kind: 'education',
    year: '2015',
    range: '2015 – 2019',
    role: 'Bachelor of Technology (CSE)',
    org: 'ICFAI University, Jaipur',
    points: [
      'Foundation in Computer Science, Data Structures, Algorithms and Software Engineering.'
    ]
  }
];

export const BADGES = [
  { t: 'Basics of Quantum Information', by: 'IBM', url: CRED + 'c230fc79-9c89-4979-954e-8a1a671b8cba/public_url' },
  { t: 'IBM Quantum Challenge 2024 Achievement', by: 'IBM', url: CRED + '0abe1136-32ff-462b-a3c6-62e61b523a7b/public_url' },
  { t: 'Practical Introduction to Quantum-Safe Cryptography', by: 'IBM', url: CRED + '72f9df31-2d12-47ee-9759-d60f64e9e74d/public_url' },
  { t: 'Qiskit Global Summer School 2024 — Quantum Excellence', by: 'IBM', url: CRED + '7b997aa1-cd12-4f85-b19f-7f1627c9a127/public_url' },
  { t: 'Variational Algorithm Design', by: 'IBM', url: CRED + '8e23e93d-df90-4f4c-a7d7-415b0b9d5fc0/public_url' },
  { t: 'LFQ101: Fundamentals of Quantum Computing', by: 'The Linux Foundation', url: CRED + '733fe48c-4f14-4510-9be3-10e37f9f16ec/public_url' },
  { t: 'LFQ102: Quantum Computing Essentials For Senior Leaders', by: 'The Linux Foundation', url: CRED + '6bd08c72-91d4-4d06-be3c-ae76b9d981e2/public_url' }
];

export const CERTS = [
  { g: 'Quantum & AI', items: ['Quantum Introduction — QubitXQubit & IBM', 'Quantum Challenge — IBM', 'Machine Learning — Ravindra Babu Ravula', 'Elements of AI — University of Helsinki'] },
  { g: 'Android Development', items: ['Android App Development with Kotlin — JetBrains Academy / Google Developer Training', 'Android Development Bootcamp (Kotlin & Jetpack) — Udemy', 'Firebase for Android Developers — Google Codelabs'] },
  { g: 'MEAN Stack & Web', items: ['Node.js, Express, MongoDB & More: The Complete Bootcamp — Udemy', 'Angular — The Complete Guide (2024 Edition) — Udemy', 'Complete MEAN Stack Web Developer Bootcamp — Udemy', 'TypeScript for Professionals — Udemy'] },
  { g: 'Databases, Cloud & Robotics', items: ['Introduction to MySQL — IIT Bombay', 'Human Centred Robotics — IIT Jodhpur & Robotics Society of India'] }
];

export const SKILLS = [
  {
    g: 'Quantum & AI / ML',
    rows: [
      { k: 'Quantum frameworks', v: 'Qiskit, PennyLane, Cirq' },
      { k: 'AI / ML libraries', v: 'PyTorch, TensorFlow, Scikit-learn, BERT, HuggingFace Transformers, LangChain' },
      { k: 'Cloud platforms', v: 'AWS, Microsoft Azure, Google Cloud Platform' },
      { k: 'Data & analytics', v: 'Pandas, NumPy, Matplotlib, Seaborn, Plotly' }
    ]
  },
  {
    g: 'Programming',
    rows: [
      { k: 'Core languages', v: 'Python, JavaScript, TypeScript, Kotlin, Java, MATLAB, SQL (MySQL), HTML5, CSS3' }
    ]
  },
  {
    g: 'Android Engineering',
    rows: [
      { k: 'Languages & IDE', v: 'Kotlin, Java, Android Studio, XML Layouts' },
      { k: 'Jetpack Architecture', v: 'ViewModel, LiveData, Navigation, Room Database, WorkManager, DataStore' },
      { k: 'Networking & APIs', v: 'Retrofit, OkHttp, RESTful APIs, OAuth 2.0, JSON parsing' },
      { k: 'Backend services', v: 'Firebase (Auth, Firestore, Realtime DB, FCM, Cloud Storage), Google Maps SDK' },
      { k: 'UI & design', v: 'Material Design 3, ConstraintLayout, RecyclerView, ViewBinding, Glide / Coil' },
      { k: 'Testing & publishing', v: 'JUnit, Espresso, APK Signing, Build Variants, ProGuard, Google Play Store' }
    ]
  },
  {
    g: 'MEAN Stack & DevOps',
    rows: [
      { k: 'MongoDB', v: 'MongoDB Atlas, Mongoose ODM, Aggregation Pipelines, Indexing & Query Optimisation' },
      { k: 'Express.js', v: 'RESTful API Design, Middleware, JWT Authentication, RBAC, Error Handling' },
      { k: 'Angular', v: 'Angular 17, NgRx, RxJS, Angular Material, Lazy Loading, Reactive Forms, SSR' },
      { k: 'Node.js', v: 'Event Loop, Async/Await, Socket.io, PM2, NGINX Reverse Proxy, Rate Limiting' },
      { k: 'DevOps & Cloud', v: 'Docker, Kubernetes, GitHub Actions CI/CD, AWS EC2, NGINX, Cloudinary, SendGrid' }
    ]
  }
];

export const COURSES = {
  ug: [
    ['Big Data Analytics', 'Data Science'],
    ['Machine Learning', 'CSE'],
    ['Fuzzy Logic', 'Data Science'],
    ['Data Science', 'CSE'],
    ['Wireless Networks', 'AI & IoT'],
    ['Computer Networks', 'AI & IoT'],
    ['Android Application Development', 'CSE'],
    ['MEAN Stack Web Development', 'CSE']
  ],
  pg: [
    ['Machine Learning', 'CSE'],
    ['Generative AI & LLMs', 'PG'],
    ['Quantum Computing', 'PG'],
    ['AI', 'PG'],
    ['Full-Stack Web Development', 'MEAN']
  ]
};

export const INTERESTS = [
  'Quantum Computing',
  'Quantum Machine Learning',
  'Quantum Space Technology',
  'Machine Learning',
  'Data Science',
  'Android App Development',
  'MEAN Stack & Full-Stack Systems'
];

export const GLOBAL_LINKS = [
  { x: 176, y: 78, label: 'St. Petersburg (ITMO)', anchor: 'end', dy: -6, primary: true },
  { x: 92, y: 120 },
  { x: 70, y: 210 },
  { x: 118, y: 300 },
  { x: 318, y: 112 },
  { x: 336, y: 236 },
  { x: 290, y: 318 },
  { x: 212, y: 262 }
];

export const FDPS = [
  { n: '01', t: 'Harnessing Artificial Intelligence for Innovative Teaching and Learning in Higher Education', by: 'Research & Development Cell, Poornima University' },
  { n: '02', t: 'NEP 2020 Orientation and Sensitization Programme under Malaviya Mission Teacher Training Programme (MM-TTP), University Grants Commission', by: 'UGC Centre, Maharshi Dayanand Saraswati University, Ajmer' }
];

export const INTL = [
  { n: '01', t: 'International engagement & partnerships', d: 'Coordinating global partnerships, student and faculty mobility, international collaborations and institutional outreach to strengthen the university’s global presence.' },
  { n: '02', t: 'Internationalisation & operations', d: 'Promoting internationalisation initiatives, organising global engagement activities, and managing partnership data, mobility records and departmental operations.' },
  { n: '03', t: 'Studied abroad', d: 'Master of Engineering (CSE), ITMO University, St. Petersburg, Russia — 2019 – 2022.' }
];

export const CONTACTS = [
  { k: 'Email', v: 'ersagark1997@gmail.com', href: 'mailto:ersagark1997@gmail.com', target: '_self', icon: 'mail' },
  { k: 'Phone', v: '+91-9982256688', href: 'tel:+919982256688', target: '_self', icon: 'phone' },
  { k: 'LinkedIn', v: 'linkedin.com/in/sagarkumar214', href: 'https://linkedin.com/in/sagarkumar214', target: '_blank', icon: 'linkedin' },
  { k: 'Credly', v: 'credly.com/users/sagar-kumar.a51d16f1', href: 'https://www.credly.com/users/sagar-kumar.a51d16f1', target: '_blank', icon: 'award' },
  { k: 'Location', v: 'Jaipur, Rajasthan, India', href: 'https://www.openstreetmap.org/search?query=Jaipur', target: '_blank', icon: 'pin' }
];
