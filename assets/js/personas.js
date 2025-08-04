// Personas JavaScript - Clean persona management

// Persona configuration
const personaConfig = {
    student: {
        name: 'Student',
        icon: 'graduation-cap',
        theme: 'blue',
        description: 'Learning journey and educational content'
    },
    recruiter: {
        name: 'Recruiter', 
        icon: 'briefcase',
        theme: 'green',
        description: 'Professional experience and achievements'
    },
    developer: {
        name: 'Developer',
        icon: 'code',
        theme: 'cyan',
        description: 'Technical projects and development insights'
    },
    explorer: {
        name: 'Explorer',
        icon: 'compass',
        theme: 'purple',
        description: 'Creative projects and general overview'
    }
};

// Persona-specific content data
const personaContentData = {
    student: {
        profileTitle: 'Computer Science Student',
        intro: "I'm currently a Computer Engineering student, particularly interested in Software Engineering, but I'm well-versed in other fields as AI, ML/DL, and Cybersecurity.",
        favorites: {
            'Platform': 'Stack Overflow',
            'Language': 'Java, Python',
            'Book': 'Head First Java',
            'Study Time': 'Late night coding',
            'IDE': 'VS Code',
            'Learning': 'Cybersecurity'
        },
        focus: [
            {
                icon: 'book-open',
                title: 'Academic Excellence',
            },
            {
                icon: 'users',
                title: 'Collaborative Learning',
            }
        ],
        connectDescription: "Always eager to connect with fellow students and learn from experienced developers!",
        facts: [
            { icon: 'graduation-cap', text: 'Computer Engineer' },
            { icon: 'clock', text: 'Late night coder' },
            { icon: 'brain', text: 'Brainstormer' },
            { icon: 'users', text: 'Collaborative' }
        ],
        projects: [
            {
                title: "ByteWise Educational Platform",
                description: "Java-based desktop application: An educational platform with different roles, and dynamic pages.",
                tech: ["Java", "JavaFX", "OOP", "GUI Design"],
                category: "Software Engineering",
                link: "https://github.com/dizzydroid/ByteWise",
                icon: "graduation-cap",
                image: "images/projects/student/BW.png",
                status: "Completed",
                featured: true
            },
            {
                title: "Digital Audio Filtering Project",
                description: "Python toolkit for audio signal manipulation with time/frequency domain visualizations and custom filtering.",
                tech: ["Python", "NumPy", "Signal Processing", "Matplotlib"],
                category: "Signal Processing",
                link: "https://github.com/dizzydroid/ASU_DigitalAudioFilteringPrjct",
                icon: "music",
                image: "images/projects/student/audiofilter.png",
                status: "Completed"
            },
            {
                title: "COVID-19 ML Prediction",
                description: "Machine learning model assessment for COVID-19 outcome prediction, comparing different classification algorithms.",
                tech: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
                category: "Machine Learning",
                link: "https://github.com/dizzydroid/ASU_SeniorProject_ML",
                icon: "brain",
                image: "images/projects/student/covid19.png",
                status: "Completed"
            },
            {
                title: "CHRONOS CPU Scheduler",
                description: "Desktop application visualizing CPU scheduling algorithms with interactive Gantt charts.",
                tech: ["Python", "Tkinter", "OS Concepts", "Algorithms"],
                category: "Operating Systems",
                link: "https://github.com/dizzydroid/Chronos",
                icon: "cpu",
                image: "images/projects/student/OS.png",
                status: "Completed"
            },
            {
                title: "NodeScope XML Editor",
                description: "Python-based XML editor and graph visualizer for efficient file management and data analysis.",
                tech: ["Python", "XML", "Graph Theory", "Data Structures"],
                category: "Data Structures",
                link: "https://github.com/dizzydroid/NodeScope",
                icon: "network",
                image: "images/projects/student/NS.png",
                status: "Completed",
                featured: true,
            },
            {
                title: "Algorithm Visualizers",
                description: "Interactive visualizations and solvers for six classic algorithmic puzzles, implemented in Java.",
                tech: ["Java", "Swing", "Algorithms", "Visualization"],
                category: "Computer Science",
                link: "https://github.com/dizzydroid/ASU_SeniorProject_Algorithms",
                icon: "zap",
                image: "images/projects/student/Algo.png",
                status: "Completed"
            },
            {
                title: "ASU Programming Sheets & Solutions",
                description: "Complete solutions for ASU CSE131s and CSE231s programming course assignments and exercises.",
                tech: ["C++", "Java", "Problem Solving", "Education"],
                category: "Academic Resources",
                link: "https://github.com/dizzydroid/ASU_Sheets-Solutions",
                icon: "book-open",
                image: "images/projects/student/sheets.png",
                status: "Completed"
            },
            {
                title: "Sophomore Year Project",
                description: "C++ terminal-based electric circuit solver.",
                tech: ["C++", "Software Engineering"],
                category: "Academic",
                link: "https://github.com/dizzydroid/ASU_SophomoreProject",
                icon: "code",
                image: "images/projects/student/sophprjct.png",
                status: "Completed"
            },
            {
                title: "ASU CodeForces Tasks",
                description: "Solutions for programming problems, as part of the Programming course curriculum.",
                tech: ["C++", "Python", "Data Structures", "Problem Solving"],
                category: "Academic",
                link: "https://github.com/dizzydroid/ASU_CodeForces-Tasks",
                icon: "trophy",
                image: "images/projects/student/CF.png",
                status: "Completed",
            }
        ]
    },
    recruiter: {
        profileTitle: 'Software Engineer',
        intro: "A passionate software developer, with a 5-year experience in leading teams to success, I believe collaboration and co-operation are the shortest path to success.",
        favorites: {
            'Experience': '4+ Years',
            'Specialization': 'Software Development',
            'Team Size': '5-10 developers',
            'Methodology': 'Agile/Scrum',
            'Leadership': 'Technical Lead',
            'Environment': 'Collaborative'
        },
        focus: [
            {
                icon: 'briefcase',
                title: 'Professional Excellence',
            },
            {
                icon: 'users',
                title: 'Team Collaboration',
            }
        ],
        connectDescription: "Open to discussing career opportunities and technical challenges in software development.",
        facts: [
            { icon: 'briefcase', text: 'Professional experience' },
            { icon: 'award', text: 'Team leader' },
            { icon: 'trending-up', text: 'Performance focused' },
            { icon: 'handshake', text: 'Client relations' }
        ],
        resume: {
            contact: {
                name: "Shehab Mahmoud",
                location: "Cairo, EG",
                email: "shehabmahmoud2003@gmail.com",
                website: "dizzydroid.github.io",
                linkedin: "ShehabMahmoud",
                github: "dizzydroid", 
                behance: "dizzydroid"
            },
            summary: "A Computer Engineer with 4 years of experience in Software Engineering (Java, Python) and 2 years of hands-on Machine Learning project experience. Leverages a 6-year background in Graphic Design to build intuitive and effective applications. Currently expanding knowledge in Cybersecurity.",
            education: {
                degree: "BSc in Computer Engineering",
                university: "Faculty of Engineering - Ain Shams University",
                period: "2021 - Present"
            },
            projects: [
                {
                    title: "ReelRec: Movie Recommendation System",
                    type: "Software Testing Project | Team Lead",
                    period: "Mar. 2025",
                    githubUrl: "https://github.com/dizzydroid/ReelRec",
                    achievements: [
                        "Built a movie recommendation system with a Swing-based GUI and a CLI.",
                        "Used Maven for build automation and Jira for project and bug management.",
                        "Technologies: Java, Swing, JUnit5, Maven, GitHub Actions, Jira"
                    ]
                },
                {
                    title: "Design Patterns in a Nutshell",
                    type: "Personal Project",
                    period: "2025",
                    githubUrl: "https://github.com/dizzydroid/DesignPatternsNutshell",
                    achievements: [
                        "Authored a comprehensive handbook on Software Design Patterns."
                    ]
                },
                {
                    title: "Nodescope: XML Editor and Visualizer",
                    type: "DSA Project | Team Lead",
                    period: "Dec. 2024",
                    githubUrl: "https://github.com/dizzydroid/NodeScope",
                    achievements: [
                        "Applied advanced Data Structures and Algorithms for XML data processing.",
                        "Developed a GUI and CLI for rapid file and directory operations, enhancing user workflow.",
                        "Technologies: Python, Matplotlib, Custom Tkinter"
                    ]
                },
                {
                    title: "ByteWise: Course Management System",
                    type: "Object-Oriented Programming Project | Team Lead",
                    period: "Apr. 2024",
                    githubUrl: "https://github.com/dizzydroid/ByteWise",
                    achievements: [
                        "Led the development of the \"ByteWise\" educational platform.",
                        "Implemented Object-Oriented Programming (OOP) principles for a maintainable and flexible system design.",
                        "Engineered exception-handling mechanisms to improve application stability.",
                        "Technologies: Java, JavaFx, Figma"
                    ]
                }
            ],
            experience: [
                {
                    role: "Media Team Head",
                    company: "IEEE | ASUSB",
                    companyHtml: '<a href="https://www.linkedin.com/company/ieee-asusb/" target="_blank">IEEE | ASUSB</a>',
                    period: "2024 - Present",
                    achievements: [
                        "Led a team of 7 editors, driving content strategy and production, which resulted in a 30% increase in brand recognition across digital platforms.",
                        "Managed end-to-end content creation, improving content delivery speed by 70% and enhancing the quality of materials published.",
                        "Collaborated with the Marketing Team to execute visual strategies, increasing social media engagement.",
                        "Established initiatives to improve digital visibility through SEO, social media marketing, and other digital marketing channels."
                    ]
                },
                {
                    role: "Multimedia Designer",
                    company: "Google Developer Student Clubs (GDSC) — ASU",
                    companyHtml: '<a href="https://www.linkedin.com/company/gdsc-asu-eng/" target="_blank">Google Developer Student Clubs (GDSC) — ASU</a>',
                    period: "2023 - 2024",
                    achievements: [
                        "Created high-impact digital content, including graphics and videos, using Adobe Creative Cloud, leading to a 60% increase in audience engagement for key events.",
                        'Contributed to event promotion and planning as a key organizer for <a href="https://gdg.community.dev/events/details/google-gdg-cairo-presents-devfest-cairo-2023/" target="_blank">DEVFEST Cairo 2023</a>, which proved successful and was recognized by Google for its outstanding promotion.',
                        'Designed and executed marketing strategies for the <a href="https://www.facebook.com/events/425842583153760/" target="_blank">EXPLORE I/O</a> event.'
                    ]
                }
            ],
            certifications: [
                {
                    title: "Supervised Machine Learning: Regression and Classification",
                    issuer: "DeepLearning.AI",
                    date: "March 2024",
                    link: "https://www.coursera.org/account/accomplishments/records/AXUN9YUMN4BW",
                    skills: "Machine Learning"
                },
                {
                    title: "Penetration Testing, Incident Response and Forensics",
                    issuer: "IBM",
                    date: "February 2024", 
                    link: "https://www.coursera.org/account/accomplishments/records/RVAL2DTTLWYA",
                    skills: "Cybersecurity, Penetration Testing, OSINT, Digital Forensics"
                },
                {
                    title: "Generative AI Fundamentals",
                    issuer: "Google",
                    date: "December 2023",
                    link: "https://www.cloudskillsboost.google/public_profiles/b67657ab-a01a-4b5a-864d-20cc2e9e57e0/badges/6613315?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
                    skills: "Artificial Intelligence"
                }
            ],
            skills: {
                "Programming Languages": ["Java", "Python", "C++", "C", "JavaScript", "Go", "HTML", "CSS", "SQL"],
                "Frameworks & Libraries": ["React", "JUnit", "Matplotlib", "Numpy", "Scikit-learn", "PyTorch", "Tensorflow"],
                "Developer Tools & DevOps": ["Git", "GitHub", "Docker", "Kubernetes", "Maven", "Jira", "GitHub Actions"],
                "Operating Systems": ["Linux", "Windows", "macOS"],
                "Core Competencies": ["Object-Oriented Programming", "Data Structures & Algorithms", "Machine Learning & Artificial Intelligence", "Software Development Life Cycle (SDLC)", "Software Testing & Quality Assurance", "Web Development", "Cybersecurity Fundamentals", "Penetration Testing", "Networking Fundamentals"],
                "Design & Professional Skills": ["Adobe Creative Cloud Suite", "Canva", "Figma", "Team Leadership & Collaboration", "Project Management & Agile Methodologies", "Content Strategy", "Technical Documentation & Communication"],
                "Languages": ["English (Fluent)", "Arabic (Native)", "French (Conversational)", "German (Elementary)"]
            }
        }
    },
    developer: {
        profileTitle: 'Software Developer',
        intro: "24/7 passionate about creating solutions, contributing to open-source and discovering new tools and technologies.",
        favorites: {
            'Editor': 'Vi',
            'Languages': 'Java, Python, JavaScript',
            'OS': 'Linux (Arch BTW)',
            'Terminal': 'Alacritty',
            'Shell': 'Zsh + Oh My Zsh',
            'Container': 'Docker + Kubernetes'
        },
        focus: [
            {
                icon: 'code-2',
                title: 'Clean Architecture',
            },
            {
                icon: 'git-branch',
                title: 'Open Source',
            }
        ],
        connectDescription: "Love connecting with fellow developers to discuss tech, share knowledge, and collaborate on interesting projects!",
        facts: [
            { icon: 'terminal', text: 'Living in shells' },
            { icon: 'coffee', text: 'Coffeeholic' },
            { icon: 'github', text: 'Open source advocate' },
            { icon: 'zap', text: 'Performance nerd' }
        ],
        projects: [
            {
                title: "Fraud Detection System",
                description: "Python implementation of Chung & Lee's 2023 fraud detection ensemble approach with 93%+ recall on PaySim dataset.",
                tech: ["Python", "Scikit-learn", "Ensemble Methods", "Data Science"],
                category: "Machine Learning",
                link: "https://github.com/dizzydroid/fraud-detection",
                icon: "shield",
                image: "images/projects/dev/fraudDet.png",
                status: "Completed",
            },
            {
                title: "Learning Not to Learn",
                description: "PyTorch implementation of adversarial approach to mitigate dataset bias in deep neural networks.",
                tech: ["PyTorch", "Deep Learning", "Adversarial Training", "Research"],
                category: "AI Research",
                link: "https://github.com/dizzydroid/learning-not-to-learn",
                icon: "brain",
                image: "images/projects/dev/learningNotToLearn.png",
                status: "Completed"
            },
            {
                title: "ReelRec Movie Recommender",
                description: "Java-based movie recommendation system with genre-based filtering and user preference learning for Software Testing course.",
                tech: ["Java", "Recommendation Systems", "Testing", "Software Engineering"],
                category: "Software",
                link: "https://github.com/dizzydroid/ReelRec",
                icon: "film",
                image: "images/projects/dev/reelrec.png",
                status: "Completed"
            },
            {
                title: "InvMan Inventory System",
                description: "PyQt-based inventory management application with order processing, refunds, and performance tracking.",
                tech: ["Python", "PyQt", "Database", "Desktop App"],
                category: "Desktop Software",
                link: "https://github.com/dizzydroid/InvMan",
                icon: "package",
                image:"images/projects/dev/invman.png",
                status: "Completed"
            },
            {
                title: "Design Patterns Handbook",
                description: "Comprehensive Java examples for my design patterns handbook with practical implementations of all major patterns.",
                tech: ["Java", "Design Patterns", "OOP", "Documentation"],
                category: "Educational",
                link: "https://github.com/dizzydroid/DesignPatternsNutshell",
                icon: "book",
                image: "images/projects/dev/dpnutshell.png",
                status: "Completed"
            },
            {
                title: "Skimble Arcade Game",
                description: "Simple arcade-style web game with great personality :D",
                tech: ["JavaScript", "HTML5 Canvas", "Game Development", "Animation"],
                category: "Game Development",
                link: "https://github.com/dizzydroid/skimble",
                liveLink: "https://dizzydroid.github.io/skimble",
                icon: "gamepad-2",
                status: "Completed",
                image: "images/projects/dev/skmbl.png"
            },
            {
                title: "The Quotes Website",
                description: "Simple website that generates random quotes.",
                tech: ["JavaScript", "CSS3", "Typography", "API"],
                category: "Web Experiment",
                link: "https://github.com/dizzydroid/quotes",
                liveLink: "https://dizzydroid.github.io/quotes",
                icon: "quote",
                status: "Completed",
                image: "images/projects/dev/quotes.png"
            },
            {
                title: "Earth Day Quiz 2023",
                description: "Interactive 15-question quiz for Earth Day 2023.",
                tech: ["JavaScript", "HTML5", "CSS3", "Interactive Quiz"],
                category: "Web Experiment",
                link: "https://github.com/dizzydroid/earth-day-quiz",
                liveLink: "https://dizzydroid.github.io/earth-day-quiz",
                icon: "earth",
                image:"images/projects/dev/earthday.png",
                status: "Completed"
            },
            {
                title: "Portfoliod Template",
                description: "Customizable portfolio template built with basic HTML/CSS knowledge requirements - get portfolio-ing now!",
                tech: ["HTML5", "CSS3", "Template", "Responsive"],
                category: "Web Template",
                link: "https://github.com/dizzydroid/portfoliod",
                liveLink: "https://dizzydroid.github.io/portfoliod",
                icon: "layout",
                image: "images/projects/dev/portfoliod.png",
                status: "Completed"
            }
        ]
    },
    explorer: {
        profileTitle: 'Explorer/Learner',
        intro: "I've tried things, many things! I've dabbled in Graphic Design, starting from MS Paint, and even MS Office, till I've become comfortable with complex tools like Adobe Photoshop and Illustrator. I've also tried Game Development, Hacking (the good kind), Creative Writing (I wrote a book!). Even though I major in Computer Engineering and Software Development, I love exploring new areas, that usually starts by the words 'I'd like to', and the rest is history.",
        favorites: {
            'Inspiration': 'Behance',
            'Tools': 'Adobe CC',
            'Interest': 'Typography',
            'Hobby': 'Reading, Gaming',
            'Philosophy': 'Less is More',
            'Innovation': 'Humans'
        },
        focus: [
            {
                icon: 'palette',
                title: 'Design & Code',
            },
            {
                icon: 'lightbulb',
                title: 'Innovation',
            }
        ],
        connectDescription: "Always excited to connect with creative minds and explore the possibilities of technology!",
        facts: [
            { icon: 'gamepad', text: 'Occasional Gamer' },
            { icon: 'palette', text: 'Design enthusiast' },
            { icon: 'globe', text: 'Tech explorer' },
            { icon: 'rocket', text: 'Innovation driven' }
        ],
        projects: [
            {
                title: "Sea Biscuit Wildlife Shelter",
                description: "Logo and banner design for wildlife conservation organization",
                location: "North Carolina, USA",
                coordinates: { lat: 35.7796, lng: -78.6382 },
                category: "Branding",
                type: "Logo Design",
                client: "Wildlife Conservation",
                icon: "heart",
                image: "images/earthday.png",
                status: "Completed",
                year: "2023"
            },
            {
                title: "Damn Fine Handpies",
                description: "Brand identity and logo design for artisanal bakery specializing in handcrafted pies",
                location: "Missouri, USA", 
                coordinates: { lat: 38.5767, lng: -92.1735 },
                category: "Food & Beverage",
                type: "Brand Identity",
                client: "Local Bakery",
                icon: "chef-hat",
                status: "Completed",
                year: "2023"
            },
            {
                title: "BlackBull Inn",
                description: "Complete visual identity package for boutique inn including logo, signage, and marketing materials",
                location: "Bolton, Canada",
                coordinates: { lat: 50.0712, lng: -79.9003 },
                category: "Hospitality",
                type: "Visual Identity",
                client: "Boutique Inn",
                icon: "building",
                status: "Completed",
                year: "2022"
            },
            {
                title: "Green Team Pandas",
                description: "Eco-friendly organization branding with focus on sustainability and environmental awareness",
                location: "California, USA",
                coordinates: { lat: 36.7783, lng: -119.4179 },
                category: "Environmental",
                type: "Brand Design",
                client: "Environmental Organization",
                icon: "leaf",
                image: "images/earthday.jpg",
                status: "Completed",
                year: "2023"
            },
            {
                title: "MyKope Akademia Coffee Shop",
                description: "Complete branding package for specialty coffee shop including logo, menu design, and interior graphics",
                location: "Philippines",
                coordinates: { lat: 12.8797, lng: 121.7740 },
                category: "Food & Beverage",
                type: "Complete Branding",
                client: "Coffee Shop",
                icon: "coffee",
                status: "Completed",
                year: "2022"
            },
            {
                title: "Digital Portfolio Network",
                description: "Modern web design and user interface for creative portfolio platform showcasing artistic works",
                location: "Cairo, Egypt",
                coordinates: { lat: 30.0444, lng: 31.2357 },
                category: "Web Design",
                type: "UI/UX Design",
                client: "Tech Startup",
                icon: "monitor",
                image: "images/dpn.png",
                status: "Completed",
                year: "2024"
            },
            {
                title: "Global Design Portfolio",
                description: "Hundreds of design projects for clients worldwide spanning various industries and design disciplines",
                location: "Worldwide",
                coordinates: { lat: 0, lng: 0 },
                category: "Portfolio",
                type: "Various Projects",
                client: "International Clients",
                icon: "globe",
                image: "images/portfoliod.png",
                status: "Ongoing",
                year: "2020-Present",
                special: true
            }
        ]
    }
};

// Initialize persona system
function initializePersonaSystem() {
    loadPersonaPreference();
    setupPersonaEventListeners();
    updatePersonaUI();
    checkFirstVisit();
}

// Load saved persona preference
function loadPersonaPreference() {
    let savedPersona = null;
    
    // Try to get saved persona with error handling for localStorage issues
    try {
        savedPersona = localStorage.getItem('preferred-persona');
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlPersona = urlParams.get('persona');
    const resumeParam = urlParams.get('resume');
    
    // If resume parameter is present, force recruiter persona
    if (resumeParam !== null) {
        setActivePersona('recruiter');
        return;
    }
    
    // Priority: URL parameter > saved preference > default
    const activePersona = urlPersona || savedPersona || 'developer';
    
    if (personaConfig[activePersona]) {
        setActivePersona(activePersona);
    } else {
        setActivePersona('developer');
    }
}

// Set the active persona
function setActivePersona(persona) {
    if (!personaConfig[persona]) return;
    
    // Update body data attribute
    document.body.setAttribute('data-persona', persona);
    
    // Update URL based on persona
    if (persona === 'recruiter') {
        updateURLForResume();
    } else {
        updateURLForPersona(persona);
    }
    
    // Update active states in UI
    updatePersonaCardStates(persona);
    
    // Update content based on persona
    updatePersonaContent(persona);
    
    // Save preference with error handling
    try {
        localStorage.setItem('preferred-persona', persona);
    } catch (e) {
        console.warn('Could not save persona preference:', e);
    }
    
    // Trigger custom event
    document.dispatchEvent(new CustomEvent('personaChanged', {
        detail: { persona, config: personaConfig[persona] }
    }));
}

// Update persona card active states
function updatePersonaCardStates(activePersona) {
    document.querySelectorAll('.persona-card').forEach(card => {
        const cardPersona = card.dataset.persona;
        card.classList.toggle('active', cardPersona === activePersona);
        
        // Update aria-pressed for accessibility
        card.setAttribute('aria-pressed', cardPersona === activePersona ? 'true' : 'false');
    });
}

// Update content based on active persona
function updatePersonaContent(persona) {
    const config = personaConfig[persona];
    if (!config) return;
    
    // Update greeting
    updateGreeting(persona);
    
    // Update main content
    updateHeroContent(persona);
    
    // Update navigation
    updateNavigationHighlight(persona);
    
    // Update terminal output
    updateTerminalContent(persona);
    
    // Update About page content
    updateAboutPageContent(persona);
    
    // Update Projects page content
    updateProjectsPageContent(persona);
}

// Update greeting based on persona
function updateGreeting(persona) {
    const greetingElement = document.querySelector('.greeting-text');
    if (!greetingElement) return;
    
    const greetings = {
        student: 'Hello, Fellow Learner!',
        recruiter: 'Welcome, Recruiter!',
        developer: 'Hello, World!',
        explorer: 'Hey, Explorer!'
    };
    
    greetingElement.textContent = greetings[persona] || greetings.developer;
}

// Update hero content based on persona
function updateHeroContent(persona) {
    const contentMap = {
        student: {
            subtitle: 'still learning...',
            description: "I'm continuously learning everyday, I'm interested in breakthroughs in the field of technology, currently expanding knowledge in Cybersecurity",
            primaryAction: 'View Course Projects',
            secondaryAction: 'Study Notes'
        },
        recruiter: {
            subtitle: 'open to new opportunities',
            description: 'Computer Engineering student with hands-on experience in software development, AI & Machine Learning, Cybersecurity, and above all, a passion for creating impactful solutions.',
            primaryAction: 'View Resume',
            secondaryAction: 'Contact'
        },
        developer: {
            subtitle: 'there\'s no place like 127.0.0.1',
            description: 'Occasionally building things, contributing to open-source or playing dead.',
            primaryAction: 'View Projects',
            secondaryAction: 'Check GitHub'
        },
        explorer: {
            subtitle: 'a curious individual.',
            description: 'Passionate about technology, design, and innovation. I believe that just the way "Necessity is the mother of invention", Curiosity is the mother of learning.',
            primaryAction: 'Explore Projects',
            secondaryAction: 'See Creative Work'
        }
    };
    
    const content = contentMap[persona] || contentMap.developer;
    
    // Update subtitle
    const subtitleElement = document.getElementById('dynamic-subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = content.subtitle;
    }
    
    // Update description
    const descriptionElement = document.getElementById('dynamic-description');
    if (descriptionElement) {
        descriptionElement.textContent = content.description;
    }
    
    // Update action buttons (only on homepage)
    const primaryButton = document.querySelector('.hero-actions .btn-primary span');
    if (primaryButton) {
        primaryButton.textContent = content.primaryAction;
    }
}

// Update terminal content based on persona
function updateTerminalContent(persona) {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    const outputs = {
        student: [
            'shehab@learning',
            'Uptime: napping',
            'Packages: Java, Python',
            'Shell: Zsh',
            'Theme: Dark',
            'Status: procrastinating'
        ],
        recruiter: [
            'shehab@professional',
            'Uptime: 4+ years coding',
            'Skills: Java, Node.js, React, Python',
            'Education: Computer Engineering',
            'Status: Open to Opportunities'
        ],
        developer: [
            'shehab@dev',
            'OS: arch btw',
            'Uptime: coding when I feel like it',
            'Tools: Git, VS Code, Docker',
            'Status: stuck in vim'
        ],
        explorer: [
            'shehab@explorer-mode',
            'Uptime: Exploring',
            'Tools: Adobe CC',
            'Interests: Tech, Graphic Design, Gaming',
            'Status: Reading probably'
        ]
    };
    
    const output = outputs[persona] || outputs.developer;
    
    terminalOutput.innerHTML = '';
    
    output.forEach((line, index) => {
        setTimeout(() => {
            const lineElement = document.createElement('div');
            lineElement.className = 'output-line';
            lineElement.textContent = line;
            terminalOutput.appendChild(lineElement);
        }, index * 50);
    });
}

// Update navigation highlight
function updateNavigationHighlight(persona) {
    const config = personaConfig[persona];
    if (config) {
        document.documentElement.style.setProperty('--current-persona-color', 
            `var(--persona-primary, var(--accent-primary))`);
    }
}

// Update About page content based on persona
function updateAboutPageContent(persona) {
    const data = personaContentData[persona];
    if (!data) return;
    
    // Update profile title
    const profileTitle = document.getElementById('profile-title');
    if (profileTitle) {
        profileTitle.textContent = data.profileTitle;
    }
    
    // Update introduction text
    const dynamicIntro = document.getElementById('dynamic-intro');
    if (dynamicIntro) {
        dynamicIntro.innerHTML = `<p>${data.intro}</p>`;
    }
    
    // Update favorites section
    const personaFavorites = document.getElementById('persona-favorites');
    if (personaFavorites && data.favorites) {
        personaFavorites.innerHTML = Object.entries(data.favorites)
            .map(([key, value]) => `
                <div class="favorite-item">
                    <div class="favorite-label">${key}</div>
                    <div class="favorite-value">${value}</div>
                </div>
            `).join('');
    }
    
    // Update current focus
    const dynamicFocus = document.getElementById('dynamic-focus');
    if (dynamicFocus && data.focus) {
        dynamicFocus.innerHTML = data.focus.map(item => `
            <div class="focus-item">
                <div class="focus-icon">
                    <i data-lucide="${item.icon}"></i>
                </div>
                <div class="focus-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Update connect description
    const connectDescription = document.getElementById('connect-description');
    if (connectDescription) {
        connectDescription.textContent = data.connectDescription;
    }
    
    // Update fun facts
    const dynamicFacts = document.getElementById('dynamic-facts');
    if (dynamicFacts && data.facts) {
        dynamicFacts.innerHTML = data.facts.map(fact => `
            <div class="fact-item">
                <i data-lucide="${fact.icon}"></i>
                <span>${fact.text}</span>
            </div>
        `).join('');
    }
    
    // Re-initialize Lucide icons for new content
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons({
            strokeWidth: 2,
            fill: 'none'
        });
    }
}

// Update Projects page content based on active persona
function updateProjectsPageContent(persona) {
    const data = personaContentData[persona];
    if (!data) return;
    
    // Update projects description
    const projectsDescription = document.getElementById('projects-description');
    if (projectsDescription) {
        const descriptions = {
            student: 'Explore my academic journey and learning projects',
            recruiter: 'Professional experience and technical achievements',
            developer: 'Open source contributions and technical portfolio',
            explorer: 'Creative works from around the globe'
        };
        projectsDescription.innerHTML = descriptions[persona] || descriptions.developer;
    }
    
    // Update projects grid
    const projectsGrid = document.getElementById('dynamic-projects');
    if (!projectsGrid) return;
    
    if (persona === 'recruiter') {
        // Show resume format for recruiters
        renderResumeView(projectsGrid, data.resume);
    } else if (persona === 'explorer') {
        // Show design projects in a map-like view
        renderDesignProjectsView(projectsGrid, data.projects);
    } else {
        // Show regular project cards for students and developers
        renderProjectCardsView(projectsGrid, data.projects);
    }
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// Render resume view for recruiters
function renderResumeView(container, resumeData) {
    if (!resumeData) return;
    
    container.innerHTML = `
        <div class="resume-container">
            <div class="resume-header">
                <h2>${resumeData.contact.name}</h2>
                <div class="resume-contact">
                    <span><i class="fas fa-map-marker-alt"></i> ${resumeData.contact.location}</span>
                    <span><i class="fas fa-envelope"></i> <a href="mailto:${resumeData.contact.email}">${resumeData.contact.email}</a></span>
                    <span><i class="fas fa-globe"></i> <a href="https://${resumeData.contact.website}" target="_blank">${resumeData.contact.website}</a></span>
                </div>
                <div class="resume-social">
                    <span><i class="fab fa-linkedin"></i> <a href="https://linkedin.com/in/${resumeData.contact.linkedin}" target="_blank">${resumeData.contact.linkedin}</a></span>
                    <span><i class="fab fa-github"></i> <a href="https://github.com/${resumeData.contact.github}" target="_blank">${resumeData.contact.github}</a></span>
                    <span><i class="fab fa-behance"></i> <a href="https://behance.net/${resumeData.contact.behance}" target="_blank">${resumeData.contact.behance}</a></span>
                </div>
            </div>
            
            <div class="resume-section">
                <h3>Summary</h3>
                <p class="resume-summary">${resumeData.summary}</p>
            </div>
            
            <div class="resume-section">
                <h3>Education</h3>
                <div class="resume-item">
                    <div class="resume-item-header">
                        <h4>${resumeData.education.university}</h4>
                        <span class="resume-period">${resumeData.education.period}</span>
                    </div>
                    <p class="resume-degree">◦ ${resumeData.education.degree}</p>
                </div>
            </div>
            
            <div class="resume-section">
                <h3>Projects</h3>
                ${resumeData.projects.map(project => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <h4>${project.title}</h4>
                            <span class="resume-github-link"><i class="fab fa-github"></i> <a href="${project.githubUrl}" target="_blank">GitHub Repository</a></span>
                        </div>
                        <p class="resume-project-type">${project.type} | ${project.period}</p>
                        <ul class="resume-achievements">
                            ${project.achievements.map(achievement => `<li>◦ ${achievement}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="resume-section">
                <h3>Experience</h3>
                ${resumeData.experience.map(exp => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <h4>${exp.role}</h4>
                            <span class="resume-period">${exp.period}</span>
                        </div>
                        <p class="resume-company">${exp.companyHtml}</p>
                        <ul class="resume-achievements">
                            ${exp.achievements.map(achievement => `<li>◦ ${achievement}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="resume-section">
                <h3>Certifications</h3>
                ${resumeData.certifications.map(cert => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <h4><a href="${cert.link}" target="_blank">${cert.title} <i class="fas fa-external-link-alt"></i></a></h4>
                        </div>
                        <p class="resume-cert-details">${cert.issuer}, Issued ${cert.date}</p>
                        <p class="resume-cert-skills">Relevant Skills: ${cert.skills}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="resume-section">
                <h3>Skills</h3>
                <div class="skills-grid">
                    ${Object.entries(resumeData.skills).map(([category, skills]) => `
                        <div class="skill-category">
                            <h4>${category}:</h4>
                            <p class="skill-list">${skills.join(', ')}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Render design projects view for explorers
function renderDesignProjectsView(container, projects) {
    if (!projects) return;

    const behanceProjects = [
        '182654047',
        '182542339',
        '180213987'
    ];

    container.innerHTML = `
        <div class="explorer-projects-container" style="margin-top: 0; padding-top: 0;">
            <div class="alert" role="alert" style="margin-bottom: var(--space-lg); margin-top: 0; padding: 1rem; text-align: left; background-color: rgba(var(--persona-primary-rgb), 0.1); border: 2px solid var(--persona-primary, var(--accent-primary)); border-radius: 0.75rem; box-shadow: 0 2px 8px rgba(var(--persona-primary-rgb), 0.08); color: var(--persona-primary);">
                <div class="alert-icon" style="flex-shrink: 0; margin-top: 0; color: var(--persona-primary);">
                    <i data-lucide="construction"></i>
                </div>
                <div class="alert-content" style="margin-top: 0;">
                    <h4 style="margin-bottom: 0.25rem; color: var(--text-primary);">Under Development</h4>
                    <p style="color: var(--text-secondary);">This section is currently being refined. More creative projects and an enhanced viewing experience are coming soon!</p>
                </div>
            </div>
            <div class="explorer-header">
                <i data-lucide="telescope"></i>
                <h2>Featured Creative Work</h2>
                <p>Here's a selection of my recent creative projects. You can view my full portfolio on Behance.</p>
                <a href="https://www.behance.net/dizzydroid" class="btn btn-primary" target="_blank" rel="noopener">
                    <span>View Full Portfolio</span>
                    <i data-lucide="external-link"></i>
                </a>
            </div>
            <div class="behance-grid">
                ${behanceProjects.map(projectId => `
                    <div class="behance-embed-wrapper">
                        <iframe src="https://www.behance.net/embed/project/${projectId}?ilo0=1"
                                allowfullscreen 
                                lazyload 
                                frameborder="0" 
                                allow="autoplay; encrypted-media" 
                                refererPolicy="strict-origin-when-cross-origin">
                        </iframe>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render regular project cards view
function renderProjectCardsView(container, projects) {
    if (!projects) return;
    
    container.innerHTML = projects.map(project => `
        <div class="project-card ${project.featured ? 'featured-project' : ''}">
            <div class="project-image">
                ${project.image ? 
                    `<img src="${project.image}" alt="${project.title}" class="project-thumbnail" loading="lazy" />` :
                    `<i data-lucide="${project.icon}"></i>`
                }
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <p class="project-description">${project.description}</p>
                ${project.category ? `<div class="project-category-badge">${project.category}</div>` : ''}
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.link}" class="project-link primary" target="_blank" rel="noopener">
                        <i data-lucide="github"></i>
                        <span>View Code</span>
                    </a>
                    ${project.liveLink ? `
                        <a href="${project.liveLink}" class="project-link" target="_blank" rel="noopener">
                            <i data-lucide="external-link"></i>
                            <span>Live Demo</span>
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Helper function to update URL for resume view
function updateURLForResume() {
    const currentURL = new URL(window.location);
    currentURL.searchParams.set('resume', '');
    window.history.replaceState({}, '', currentURL);
}

// Helper function to update URL for persona
function updateURLForPersona(persona) {
    const currentURL = new URL(window.location);
    currentURL.searchParams.delete('resume');
    if (persona !== 'developer') {
        currentURL.searchParams.set('persona', persona);
    } else {
        currentURL.searchParams.delete('persona');
    }
    window.history.replaceState({}, '', currentURL);
}

// Setup event listeners for persona interactions
function setupPersonaEventListeners() {
    // Persona card clicks
    document.querySelectorAll('.persona-card').forEach(card => {
        card.addEventListener('click', () => {
            const persona = card.dataset.persona;
            if (persona && personaConfig[persona]) {
                setActivePersona(persona);
                
                // Close modal if open
                const modal = document.getElementById('persona-modal');
                if (modal && modal.getAttribute('aria-hidden') === 'false') {
                    // Use PortfolioApp.closeModal if available, otherwise close directly
                    if (window.PortfolioApp?.closeModal) {
                        window.PortfolioApp.closeModal(modal);
                    } else {
                        modal.setAttribute('aria-hidden', 'true');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
        
        // Keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Listen for external persona changes
    document.addEventListener('personaChanged', (e) => {
        console.log('Persona changed to:', e.detail.persona);
        updatePersonaUI();
    });
}

// Update persona UI elements
function updatePersonaUI() {
    const currentPersona = document.body.getAttribute('data-persona') || 'developer';
    const config = personaConfig[currentPersona];
    
    if (!config) return;
    
    // Update persona toggle icon if it exists
    const personaToggle = document.querySelector('.persona-toggle');
    if (personaToggle) {
        personaToggle.setAttribute('title', `Current: ${config.name}`);
    }
    
    // Update any other UI elements that depend on persona
    updatePersonaCardStates(currentPersona);
}

// Utility function to get current persona
function getCurrentPersona() {
    return document.body.getAttribute('data-persona') || 'developer';
}

// Utility function to get persona config
function getPersonaConfig(persona) {
    return personaConfig[persona] || null;
}

// Check if this is the first visit and show persona modal
function checkFirstVisit() {
    let hasVisited = false;
    
    try {
        hasVisited = localStorage.getItem('has-visited-before') === 'true';
    } catch (e) {
        console.warn('localStorage not available for first visit check:', e);
    }
    
    // Don't show modal if user has specific intent via URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const hasResumeParam = urlParams.has('resume');
    const hasPersonaParam = urlParams.has('persona');
    const isProjectsPage = window.location.pathname.includes('projects.html');
    
    // Skip modal if:
    // - User has visited before
    // - URL has resume parameter (they want to see resume specifically)
    // - URL has persona parameter (they have a specific persona in mind)
    // - They're on projects page (they're looking for projects specifically)
    if (hasVisited || hasResumeParam || hasPersonaParam || isProjectsPage) {
        // Still mark as visited for future visits
        try {
            localStorage.setItem('has-visited-before', 'true');
        } catch (e) {
            console.warn('Could not save visit status:', e);
        }
        return;
    }
    
    // Mark as visited
    try {
        localStorage.setItem('has-visited-before', 'true');
    } catch (e) {
        console.warn('Could not save visit status:', e);
    }
    
    // Auto-open persona modal after a short delay (only for homepage first visits)
    setTimeout(() => {
        const modal = document.getElementById('persona-modal');
        if (modal && window.PortfolioApp?.openModal) {
            window.PortfolioApp.openModal(modal);
        }
    }, 1500); // Delay to let the page load and animations settle
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePersonaSystem);
} else {
    // If DOM is already loaded, wait a bit to ensure other scripts have initialized
    setTimeout(initializePersonaSystem, 100);
}

// Export for external use
window.PersonaManager = {
    setActivePersona,
    getCurrentPersona,
    getPersonaConfig,
    personaConfig
};
