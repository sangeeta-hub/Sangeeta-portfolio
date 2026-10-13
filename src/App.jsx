
import { useState, useRef, useEffect } from 'react'
import {
  Cloud,
  Code2,
  Globe,
  Settings,
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Mail,
  UserRound,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Award,
  CalendarDays
} from 'lucide-react'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

import {
  TechIcon,
  CommandPalette,
  ScrollProgress,
  AWSArchitecture,
  ResumeDownload
} from './PortfolioExtras'

import './App.css'

// ======================================
// SKILLS
// ======================================

const skills = {
  'Frontend Development': [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'Responsive Design'
  ],

  'Backend & Databases': [
    'Node.js',
    'Express.js',
    'MySQL',
    'SQL',
    'Python',
    'REST APIs'
  ],

  'AWS Cloud': [
    'EC2',
    'S3',
    'IAM',
    'VPC',
    'RDS',
    'CloudWatch',
    'CloudFront',
    'Auto Scaling'
  ],

  'Tools & Platforms': [
    'Git',
    'GitHub',
    'WordPress',
    'VS Code',
    'Postman',
    'SSMS'
  ]
}

// ======================================
// PROJECT IMAGES
// ======================================

const projectImages = {
  'Secure Bank': '/projects/secure-bank.png',
  'TechConnect': '/projects/techconnect.png',
  'Almoonoor': '/projects/almoonoor.png',
  'Tours & Travels': '/projects/tours-travels.png',
  'AWS IAM & S3 Read-Only Access': '/projects/aws-iam.png',
  'AWS IAM Policy Evaluation': '/projects/aws-policy.png',
  'AWS Cloud Infrastructure Labs': '/projects/aws-cloud.png'
}

// ======================================
// PROJECTS
// ======================================

const projects = [
  {
    title: 'Secure Bank',
    category: 'Full Stack Application',
    icon: '🏦',
    description:
      'Developed a banking application with customer and admin modules, authentication, profile management, beneficiaries, fund transfers, and transaction records.',
    tags: ['React', 'Node.js', 'Express.js', 'MySQL'],
    features: [
      'Customer and administrator modules',
      'User registration and authentication',
      'Beneficiary and transaction management',
      'Full-stack frontend and backend integration'
    ]
  },
  {
    title: 'TechConnect',
    category: 'Frontend Development',
    icon: '💻',
    description:
      'A frontend website project focused on user-friendly layouts, web interface development, and responsive design.',
    tags: ['Frontend', 'UI Design', 'Responsive Website'],
    features: [
      'Website interface development',
      'Page layout and navigation',
      'Frontend design and styling'
    ]
  },
  {
    title: 'Almoonoor',
    category: 'Live Business Website',
    icon: '🌐',
    description:
      'Designed and launched a responsive business website using WordPress and Hostinger, with navigation, contact features, and website maintenance.',
    tags: ['WordPress', 'Hostinger', 'Web Design'],
    link: 'https://almoonoor.com',
    features: [
      'Live responsive business website',
      'Website navigation and page design',
      'Contact and WhatsApp integration',
      'Website updates and maintenance'
    ]
  },
  {
    title: 'Tours & Travels',
    category: 'BCA Academic Project',
    icon: '✈️',
    description:
      'An academic travel-management website project demonstrating web development, interface design, and application concepts.',
    tags: ['Web Development', 'Academic Project'],
    features: [
      'Travel-related website project',
      'Web interface design',
      'Academic application development'
    ]
  },
  {
    title: 'AWS IAM & S3 Read-Only Access',
    category: 'AWS Cloud Security',
    icon: '🔐',
    description:
      'Created a custom least-privilege IAM JSON policy for Amazon S3. Configured resource-specific permissions and tested successful file access and denied uploads.',
    tags: ['AWS IAM', 'Amazon S3', 'JSON', 'Least Privilege'],
    document: '/IAM_Practice.pdf',
    features: [
      'Created customer-managed IAM policies',
      'Configured S3 bucket-specific permissions',
      'Attached permissions to a test IAM user',
      'Verified allowed downloads and denied uploads'
    ]
  },
  {
    title: 'AWS IAM Policy Evaluation',
    category: 'Cloud Security & Access Management',
    icon: '🛡️',
    description:
      'Implemented and tested IAM policies covering explicit deny, implicit deny, and conditional Amazon S3 access using aws:SecureTransport.',
    tags: ['AWS IAM', 'S3', 'Policy Evaluation', 'HTTPS'],
    document: '/AWS_IAM_Hands-On_Portfolio.pdf',
    features: [
      'Tested explicit allow and explicit deny',
      'Verified implicit deny behavior',
      'Configured conditional S3 permissions',
      'Tested secure transport access conditions'
    ]
  },
  {
    title: 'AWS Cloud Infrastructure Labs',
    category: 'Cloud Engineering',
    icon: '☁️',
    description:
      'Hands-on cloud practice involving compute, storage, networking, monitoring, databases, and application infrastructure on AWS.',
    tags: ['EC2', 'S3', 'VPC', 'RDS', 'CloudWatch'],
    features: [
      'EC2 instance and storage practice',
      'S3 and CloudFront configuration',
      'Application Load Balancer and Auto Scaling',
      'VPC, RDS, and monitoring exercises'
    ]
  }
]

// ======================================
// SPECIALIZATIONS
// ======================================

const services = [
  {
    title: 'Full Stack Development',
    subtitle: 'React | Node.js | MySQL',
    icon: Code2,
    color: 'red',
    target: '#projects'
  },
  {
    title: 'Cloud Engineering',
    subtitle: 'AWS | VPC | EC2 | S3',
    icon: Cloud,
    color: 'blue',
    target: '#cloud'
  },
  {
    title: 'DevOps Tools',
    subtitle: 'Git | GitHub | CI/CD Learning',
    icon: Settings,
    color: 'pink',
    target: '#skills'
  },
  {
    title: 'Web Development',
    subtitle: 'WordPress | HTML | CSS | JS',
    icon: Globe,
    color: 'purple',
    target: '#projects'
  }
]

const navigation = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['AWS Labs', 'cloud'],
  ['Education', 'education'],
  ['Contact', 'contact']
]

// ======================================
// PROJECT SCREENSHOT COMPONENT
// ======================================

function ProjectPreview({ project }) {
  const [imageFailed, setImageFailed] = useState(false)
  const imagePath = projectImages[project.title]

  return (
    <div className="project-image cinematic-project-image">
      <span className="project-fallback-icon">
        {project.icon}
      </span>

      {imagePath && !imageFailed && (
        <img
          src={imagePath}
          alt={`${project.title} project screenshot`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}

      <div className="project-image-overlay">
        <span>PROJECT SHOWCASE</span>
        <strong>{project.title}</strong>
      </div>
    </div>
  )
}

// ======================================
// MAIN APP
// ======================================

function App() {
  const videoRef = useRef(null)

  const [soundOn, setSoundOn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [projectFilter, setProjectFilter] = useState('All')

  // CINEMATIC SCROLL ANIMATION

  useEffect(() => {
    const sections = document.querySelectorAll(
      '.about-section, .experience-section, #skills, .projects-section, .cloud-section, .education-section, .contact'
    )

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    )

    sections.forEach((section) => {
      section.classList.add('scroll-reveal')
      observer.observe(section)
    })

    return () => {
      observer.disconnect()

      sections.forEach((section) => {
        section.classList.remove('scroll-reveal', 'is-visible')
      })
    }
  }, [])

  // VIDEO SOUND

  const toggleSound = async () => {
    const video = videoRef.current

    if (!video) return

    const nextSound = !soundOn
    video.muted = !nextSound

    if (nextSound) {
      try {
        await video.play()
      } catch {
        video.muted = true
        setSoundOn(false)
        return
      }
    }

    setSoundOn(nextSound)
  }

  // PROJECT FILTERS

  const visibleProjects = projects.filter((project) => {
    if (projectFilter === 'All') return true

    const isAWS =
      project.category.includes('Cloud') ||
      project.category.includes('AWS')

    if (projectFilter === 'AWS') return isAWS
    if (projectFilter === 'Web') return !isAWS

    return true
  })

  // CLOSE PROJECT MODAL WITH ESCAPE

  useEffect(() => {
    if (!activeProject) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeProject])

  return (
    <div className="portfolio">

      {/* SCROLL PROGRESS */}
      <ScrollProgress />

      {/* CTRL + K NAVIGATION */}
      <CommandPalette />

      {/* =====================================
          NAVBAR
      ===================================== */}

      <nav className="navbar">
        <a className="logo" href="#home">
          Sangeeta<span> Patil</span>
        </a>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navigation.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>

        <a className="hire-btn" href="#contact">
          <BriefcaseBusiness size={18} />
          Hire Me
        </a>
      </nav>

      <main>

        {/* =====================================
            HOME
        ===================================== */}

        <section className="hero" id="home">

          <div className="hero-layout">

            {/* LEFT SIDE */}

            <div className="hero-content">

              <div className="welcome-badge">
                <span className="live-dot" />
                WELCOME TO MY DIGITAL WORLD
              </div>

              <h1>
                Hi, I'm
                <span className="name-highlight">
                  Sangeeta<span className="period">.</span>
                </span>
              </h1>

              <h2>I Build. I Code. I Create.</h2>

              <div className="role-line">
                <strong>Full Stack Developer</strong>
                <span className="role-divider">|</span>
                <span>Cloud &amp; DevOps Enthusiast</span>
              </div>

              <p className="hero-description">
                Turning ideas into meaningful digital
                experiences through modern web development,
                practical cloud engineering, and creative
                problem-solving.
              </p>

              <div className="hero-buttons">

                <a href="#projects" className="primary-btn">
                  <Play size={17} fill="currentColor" />
                  Explore My Work
                  <ArrowRight size={18} />
                </a>

                <a href="#about" className="secondary-btn">
                  <UserRound size={18} />
                  More About Me
                </a>

                {/* NEW DOWNLOAD RESUME BUTTON */}
                <ResumeDownload />

              </div>

              <div className="tech-heading">
                TECHNOLOGIES I WORK WITH
              </div>

              {/* NEW TECHNOLOGY ICONS */}

              <div className="tech-icons">
                {[
                  'React',
                  'AWS',
                  'Node.js',
                  'MySQL',
                  'Git'
                ].map((tech) => (
                  <div className="tech-pill" key={tech}>
                    <TechIcon name={tech} size={21} />
                    {tech}
                  </div>
                ))}
              </div>

              <div className="social-links">

                <a
                  href="https://github.com/sangeetahiremath09-ui"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub size={21} />
                </a>

                <a
                  href="https://www.linkedin.com/in/sangeeta-hiremath-201858267/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={21} />
                </a>

                <a
                  href="mailto:sangeetahiremath09@gmail.com"
                  aria-label="Email"
                >
                  <Mail size={21} />
                </a>

                <span className="social-label">
                  Let's Connect <span>♥</span>
                </span>

              </div>
            </div>

            {/* RIGHT SIDE - VIDEO */}

            <div className="video-column">
              <div className="video-decoration" />

              <div className="video-card">
                <div className="video-top-label">
                  <span className="video-play-icon">
                    <Play size={12} fill="currentColor" />
                  </span>
                  My Introduction
                </div>

                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source
                    src="/Sangeeta.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support video.
                </video>
              </div>

              <button
                type="button"
                className="video-sound-btn"
                onClick={toggleSound}
              >
                {soundOn ? (
                  <>
                    <VolumeX size={17} />
                    Mute Introduction
                  </>
                ) : (
                  <>
                    <Volume2 size={17} />
                    Hear My Introduction
                  </>
                )}
              </button>

              <p className="video-caption">
                A little introduction about me and my journey
              </p>
            </div>
          </div>

          {/* SPECIALIZATION CARDS */}

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <a
                  href={service.target}
                  className="service-card"
                  key={service.title}
                >
                  <div className={`service-icon ${service.color}`}>
                    <Icon size={27} />
                  </div>

                  <div className="service-info">
                    <h3>{service.title}</h3>
                    <p>{service.subtitle}</p>
                  </div>

                  <ArrowRight
                    className="service-arrow"
                    size={19}
                  />
                </a>
              )
            })}
          </div>

          {/* QUICK FACTS */}

          <div className="hero-stats">

            <div className="stat">
              <GraduationCap size={30} />
              <div>
                <strong>MCA Graduate</strong>
                <span>Full Stack Development · 2026</span>
              </div>
            </div>

            <div className="stat">
              <Code2 size={30} />
              <div>
                <strong>7 Projects</strong>
                <span>Web &amp; Cloud Development</span>
              </div>
            </div>

            <div className="stat">
              <Cloud size={30} />
              <div>
                <strong>AWS Hands-on</strong>
                <span>Cloud Security &amp; Infrastructure</span>
              </div>
            </div>

            <div className="stat">
              <MapPin size={30} />
              <div>
                <strong>Sharjah, UAE</strong>
                <span>Immediately Available</span>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================
            ABOUT
        ===================================== */}

        <section className="section about-section" id="about">

          <div className="section-heading">
            <p className="section-label">
              THE STORY BEHIND THE SCREEN
            </p>
            <h2>
              Beyond the <span>Code.</span>
            </h2>
          </div>

          <div className="about-panel">

            <p className="about-intro">
              Hello! I'm <strong>Sangeeta Patil</strong>,
              an MCA graduate specializing in Full Stack
              Development, with a passion for building
              practical and user-friendly digital solutions.
            </p>

            <p>
              I enjoy bringing together creativity, technology,
              and problem-solving. My experience includes
              building a full-stack banking application,
              working on frontend websites, and launching
              a live WordPress business website.
            </p>

            <p>
              My professional background includes website
              maintenance, working with SQL queries, and
              providing IT support. Alongside web development,
              I've completed hands-on AWS cloud labs involving
              IAM, S3, EC2, VPC, and other cloud services.
            </p>

            <p>
              I'm continuously developing my expertise in
              software engineering, cloud computing, and
              DevOps, with the goal of contributing to
              meaningful technology projects.
            </p>

            <div className="about-highlights">

              <div className="about-highlight-card">
                <GraduationCap size={28} />
                <h3>MCA Graduate</h3>
                <p>Full Stack Development</p>
              </div>

              <div className="about-highlight-card">
                <Code2 size={28} />
                <h3>Web Developer</h3>
                <p>React • Node.js • MySQL</p>
              </div>

              <div className="about-highlight-card">
                <Cloud size={28} />
                <h3>Cloud &amp; DevOps</h3>
                <p>AWS • Git • Cloud Labs</p>
              </div>

              <div className="about-highlight-card">
                <BriefcaseBusiness size={28} />
                <h3>IT Experience</h3>
                <p>Website Support • SQL</p>
              </div>

            </div>

            <div className="about-quote">
              <p>
                "I don't just write code. I build experiences
                that matter."
              </p>
            </div>

          </div>
        </section>

        {/* =====================================
            EXPERIENCE
        ===================================== */}

        <section
          className="section experience-section"
          id="experience"
        >

          <div className="section-heading">
            <p className="section-label">
              PROFESSIONAL BACKGROUND
            </p>
            <h2>
              Work <span>Experience</span>
            </h2>
          </div>

          <div className="experience-card">

            <div className="experience-top">
              <div>
                <p className="experience-type">
                  IT SUPPORT &amp; WEBSITE OPERATIONS
                </p>

                <h3>Computer Engineer / IT Support</h3>

                <p className="experience-location">
                  United Arab Emirates
                </p>
              </div>

              <BriefcaseBusiness size={30} />
            </div>

            <p className="experience-description">
              Supported company technology operations through
              website maintenance, SQL query work, and
              technical support activities.
            </p>

            <div className="experience-points">
              <p>✓ Maintained and updated the company website</p>
              <p>✓ Worked with SQL queries and database-related tasks</p>
              <p>✓ Supported troubleshooting and IT operations</p>
              <p>✓ Applied technical problem-solving skills</p>
            </div>

            <div className="experience-tags">
              <span>Website Maintenance</span>
              <span>SQL</span>
              <span>IT Support</span>
              <span>Troubleshooting</span>
            </div>

          </div>
        </section>

        {/* =====================================
            SKILLS
        ===================================== */}

        <section className="section" id="skills">

          <div className="section-heading">
            <p className="section-label">
              MY TECHNICAL TOOLKIT
            </p>

            <h2>
              My <span>Tech Stack</span>
            </h2>
          </div>

          <div className="skill-categories">

            {Object.entries(skills).map(([category, items]) => (
              <div className="skill-category" key={category}>

                <h3>{category}</h3>

                <div className="skills-grid">

                  {items.map((skill) => (
                    <div className="skill" key={skill}>
                      <TechIcon name={skill} size={19} />
                      {skill}
                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        </section>

        {/* =====================================
            NETFLIX PROJECT GALLERY
        ===================================== */}

        <section
          className="section projects-section"
          id="projects"
        >

          <div className="section-heading">
            <p className="section-label">
              EXPLORE WHAT I'VE BUILT
            </p>

            <h2>
              Featured <span>Projects</span>
            </h2>
          </div>

          <div className="project-filters">

            {['All', 'Web', 'AWS'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={
                  projectFilter === filter
                    ? 'project-filter active'
                    : 'project-filter'
                }
                onClick={() => setProjectFilter(filter)}
              >
                {filter === 'All' ? 'All Projects' : filter}
              </button>
            ))}

          </div>

          <div className="project-grid">

            {visibleProjects.map((project) => (
              <article
                className="project-card"
                key={project.title}
              >

                {/* NEW SCREENSHOT PREVIEW */}
                <ProjectPreview project={project} />

                <div className="project-info">

                  <small>{project.category}</small>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="project-details-btn"
                    onClick={() => setActiveProject(project)}
                  >
                    Explore Project
                    <ArrowRight size={16} />
                  </button>

                  {project.link && (
                    <a
                      className="project-link"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Live Website
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {project.document && (
                    <a
                      className="project-link"
                      href={project.document}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View AWS Documentation
                      <ExternalLink size={16} />
                    </a>
                  )}

                </div>
              </article>
            ))}

          </div>
        </section>

        {/* =====================================
            AWS CLOUD LABS
        ===================================== */}

        <section className="section cloud-section" id="cloud">

          <div className="section-heading">
            <p className="section-label">
              HANDS-ON CLOUD ENGINEERING
            </p>

            <h2>
              AWS <span>Cloud Laboratory</span>
            </h2>
          </div>

          <div className="cloud-intro">
            <ShieldCheck size={38} />

            <div>
              <h3>Learning Cloud by Building</h3>
              <p>
                My AWS work includes practical configuration,
                permission testing, security troubleshooting,
                and documentation of cloud services.
              </p>
            </div>
          </div>

          {/* NEW AWS ARCHITECTURE DIAGRAM */}
          <AWSArchitecture />

          <div className="cloud-lab-grid">

            <div className="cloud-lab-card">
              <ShieldCheck size={28} />

              <h3>IAM &amp; S3 Read-Only Policy</h3>

              <p>
                Created and tested least-privilege permissions
                for controlled access to S3 resources.
              </p>

              <a
                href="/IAM_Practice.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Lab PDF
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="cloud-lab-card">
              <CheckCircle2 size={28} />

              <h3>IAM Policy Evaluation</h3>

              <p>
                Tested explicit deny, implicit deny,
                and secure transport conditions with
                documented access results.
              </p>

              <a
                href="/AWS_IAM_Hands-On_Portfolio.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View Lab PDF
                <ExternalLink size={16} />
              </a>
            </div>

          </div>
        </section>

        {/* =====================================
            EDUCATION
        ===================================== */}

        <section
          className="section education-section"
          id="education"
        >

          <div className="section-heading">
            <p className="section-label">
              MY ACADEMIC JOURNEY
            </p>

            <h2>
              Education &amp; <span>Learning</span>
            </h2>
          </div>

          <div className="education-grid">

            <div className="education-card">
              <GraduationCap size={30} />

              <span className="education-year">
                <CalendarDays size={15} />
                2026
              </span>

              <h3>Master of Computer Applications</h3>
              <p>MCA — Full Stack Development</p>
            </div>

            <div className="education-card">
              <GraduationCap size={30} />

              <span className="education-year">
                <CalendarDays size={15} />
                2022
              </span>

              <h3>Bachelor of Computer Applications</h3>
              <p>Karnataka University, Dharwad</p>
            </div>

            <div className="education-card">
              <Award size={30} />

              <span className="education-year">
                PROFESSIONAL LEARNING
              </span>

              <h3>AWS Cloud &amp; DevOps</h3>

              <p>
                Hands-on AWS labs and Solutions Architect
                Associate preparation.
              </p>
            </div>

          </div>
        </section>

        {/* =====================================
            CONTACT
        ===================================== */}

        <section className="section contact" id="contact">

          <p className="section-label">
            AVAILABLE FOR OPPORTUNITIES
          </p>

          <h2>
            Let's Build <span>Something Great.</span>
          </h2>

          <p>
            I'm interested in Full Stack Development,
            Cloud Engineering, and IT opportunities.
            I'm available to join immediately.
          </p>

          <div className="contact-details">

            <div>
              <Mail size={19} />
              <a href="mailto:sangeetahiremath09@gmail.com">
                sangeetahiremath09@gmail.com
              </a>
            </div>

            <div>
  <a href="tel:+971566291534">
    📞 +971 56 629 1534
  </a>
</div>

<div>
  <a
    href="https://wa.me/971566291534"
    target="_blank"
    rel="noopener noreferrer"
  >
    💬 Chat on WhatsApp
  </a>
</div>

            <div>
              <MapPin size={19} />
              <span>Sharjah, United Arab Emirates</span>
            </div>

            <div>
              <CheckCircle2 size={19} />
              <span>Immediate Availability</span>
            </div>

          </div>

          <div className="contact-actions">

            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=sangeetahiremath09%40gmail.com&su=Portfolio%20Inquiry"
  target="_blank"
  rel="noopener noreferrer"
  className="primary-btn"
>
  ✉️ Send Me an Email
</a>

            <a
              href="https://www.linkedin.com/in/sangeeta-hiremath-201858267/"
              className="secondary-btn"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={19} />
              LinkedIn
            </a>

            <a
              href="https://github.com/sangeetahiremath09-ui"
              className="secondary-btn"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={19} />
              GitHub
            </a>

            {/* SECOND RESUME BUTTON */}
            <ResumeDownload />

          </div>
        </section>

      </main>

      {/* =====================================
          PROJECT DETAILS MODAL
      ===================================== */}

      {activeProject && (
        <div
          className="portfolio-modal-overlay"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="portfolio-modal"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              className="portfolio-modal-close"
              aria-label="Close project details"
              onClick={() => setActiveProject(null)}
            >
              <X size={22} />
            </button>

            <div className="portfolio-modal-icon">
              {activeProject.icon}
            </div>

            <p className="section-label">
              {activeProject.category}
            </p>

            <h2>{activeProject.title}</h2>
            <p>{activeProject.description}</p>

            <h3>Project Highlights</h3>

            <ul>
              {activeProject.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={17} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="project-tags">
              {activeProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {activeProject.link && (
              <a
                className="project-link"
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
              >
                Open Live Website
                <ExternalLink size={16} />
              </a>
            )}

            {activeProject.document && (
              <a
                className="project-link"
                href={activeProject.document}
                target="_blank"
                rel="noreferrer"
              >
                Open Project Documentation
                <ExternalLink size={16} />
              </a>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}

      <footer>
        © 2026 Sangeeta Patil.
        Designed and built with React.
      </footer>

      {/* EXISTING SECTION STYLES */}

      <style>{`
        .skill-categories {
          display: grid;
          gap: 26px;
        }

        .skill-category {
          background: #17171e;
          border: 1px solid #30303a;
          border-radius: 16px;
          padding: 24px;
        }

        .skill-category h3 {
          color: #fff;
          margin: 0 0 18px;
          font-size: 1.15rem;
        }

        .experience-card,
        .cloud-intro,
        .cloud-lab-card,
        .education-card {
          background: #17171e;
          border: 1px solid #30303a;
          border-radius: 18px;
          padding: 28px;
          color: #d1d1d8;
        }

        .experience-top {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .experience-top svg,
        .cloud-intro svg,
        .cloud-lab-card > svg,
        .education-card > svg {
          color: #e50914;
          flex-shrink: 0;
        }

        .experience-top h3,
        .cloud-intro h3,
        .cloud-lab-card h3,
        .education-card h3 {
          color: #fff;
          margin: 12px 0;
        }

        .experience-type,
        .education-year {
          color: #ff626c;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .education-year {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 14px;
        }

        .experience-description,
        .cloud-intro p,
        .cloud-lab-card p,
        .education-card p {
          line-height: 1.8;
        }

        .experience-points {
          margin: 22px 0;
        }

        .experience-points p {
          margin: 10px 0;
        }

        .experience-tags,
        .project-filters,
        .contact-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .experience-tags span {
          background: #2c2027;
          color: #ff9ca3;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .project-filters {
          margin: 0 0 28px;
        }

        .project-filter {
          cursor: pointer;
          border: 1px solid #3b3b46;
          background: #1c1c24;
          color: #ddd;
          border-radius: 24px;
          padding: 10px 20px;
          font: inherit;
        }

        .project-filter.active,
        .project-filter:hover {
          background: #e50914;
          border-color: #e50914;
          color: #fff;
        }

        .project-details-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #e50914;
          color: white;
          border: 0;
          border-radius: 8px;
          padding: 10px 15px;
          font: inherit;
          cursor: pointer;
          margin: 16px 12px 8px 0;
        }

        .project-details-btn:hover {
          background: #ff2935;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 10px 12px 8px 0;
        }

        .cloud-intro {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          margin-bottom: 22px;
        }

        .cloud-lab-grid,
        .education-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .education-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .cloud-lab-card a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ff737c;
          margin-top: 15px;
          text-decoration: none;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin: 26px 0;
        }

        .contact-details > div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .contact-details svg {
          color: #e50914;
          flex-shrink: 0;
        }

        .contact-details a {
          color: inherit;
          overflow-wrap: anywhere;
        }

        .contact-actions {
          justify-content: center;
          margin-top: 24px;
        }

        .portfolio-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .portfolio-modal {
          position: relative;
          width: min(100%, 680px);
          max-height: 85vh;
          overflow-y: auto;
          background: #191921;
          border: 1px solid #48404a;
          border-radius: 20px;
          padding: 32px;
          color: #ddd;
          box-shadow: 0 20px 80px rgba(0,0,0,0.6);
          animation: modalAppear 0.35s ease-out both;
        }

        .portfolio-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          border: 0;
          background: #30303a;
          color: #fff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .portfolio-modal-icon {
          font-size: 3.5rem;
          margin-bottom: 14px;
        }

        .portfolio-modal h2,
        .portfolio-modal h3 {
          color: #fff;
          margin: 14px 0;
        }

        .portfolio-modal p {
          line-height: 1.8;
        }

        .portfolio-modal ul {
          padding: 0;
          list-style: none;
          margin: 20px 0;
        }

        .portfolio-modal li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 12px 0;
        }

        .portfolio-modal li svg {
          color: #ff4653;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(45px);
          transition:
            opacity 0.85s ease,
            transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .scroll-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero {
          position: relative;
          isolation: isolate;
        }

        .hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          width: min(65vw, 720px);
          height: min(65vw, 720px);
          top: -160px;
          right: -160px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(229, 9, 20, 0.18) 0%,
            rgba(229, 9, 20, 0.07) 35%,
            transparent 70%
          );
          filter: blur(28px);
          pointer-events: none;
          animation: ambientMove 12s ease-in-out infinite alternate;
        }

        @keyframes ambientMove {
          from {
            transform: translate(-20px, 0) scale(0.9);
            opacity: 0.55;
          }
          to {
            transform: translate(30px, 45px) scale(1.15);
            opacity: 1;
          }
        }

        .project-card,
        .service-card,
        .about-highlight-card,
        .education-card,
        .cloud-lab-card {
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .project-card:hover,
        .service-card:hover,
        .about-highlight-card:hover,
        .education-card:hover,
        .cloud-lab-card:hover {
          transform: translateY(-7px);
          border-color: rgba(229, 9, 20, 0.6);
          box-shadow: 0 18px 42px rgba(229, 9, 20, 0.14);
        }

        .tech-pill {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .tech-pill:hover {
          transform: translateY(-5px) scale(1.04);
          box-shadow: 0 8px 25px rgba(229, 9, 20, 0.15);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: translateY(22px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 800px) {
          .cloud-lab-grid,
          .education-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-modal {
            padding: 24px;
          }
        }

        @media (max-width: 520px) {
          .cloud-intro {
            flex-direction: column;
          }

          .contact-details > div {
            flex-wrap: wrap;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal,
          .scroll-reveal.is-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .hero::before,
          .portfolio-modal {
            animation: none;
          }

          .project-card,
          .service-card,
          .about-highlight-card,
          .education-card,
          .cloud-lab-card,
          .tech-pill {
            transition: none;
          }
        }
      `}</style>

    </div>
  )
}

export default App
