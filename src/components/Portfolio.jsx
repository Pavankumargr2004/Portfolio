import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink, Download, Menu, X, ArrowRight, Star,Code, Zap } from 'lucide-react';

// Move roles array outside component to avoid re-creation on re-renders
const roles = [
  'Full Stack Developer',
  'AI Enthusiast',
  'Problem Solver',
  'Tech Innovator'
];

const App = () => { // Renamed Portfolio to App for default export
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const nameToAnimate = "Pavan Kumar GR";
  const nameWords = nameToAnimate.split(' ');

  // Refs for sections to observe their visibility
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // State for section visibility to trigger animations
  const [homeInView, setHomeInView] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const [skillsInView, setSkillsInView] = useState(false);
  const [projectsInView, setProjectsInView] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "Electronic Health Record System",
      description: "Electronic Healthcare System with HTML, CSS, JS. Features include user authentication, payment integration, and admin dashboard.",
      image: "https://images.pexels.com/photos/8436891/pexels-photo-8436891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Added image parameters
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Pavankumargr2004/ehs",
      live: "#",
      featured: true
    },
    {
      id: 2,
      title: "GYM Management System",
      description: "Collaborative gym management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Added image parameters
      technologies: ["Java", "JDBC", "SQL"],
      github: "https://github.com/Pavankumargr2004/Gym-Management-System",
      live: "#",
      featured: false
    },
    {
      id: 3,
      title: "Code Editor",
      description: "I have developed a modern code editor with features like syntax highlighting, and real-time preview to streamline the coding experience.",
      image: "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Added image parameters
      technologies: ["React", "Node.js", "Tailwind CSS"],
      github: "https://github.com/Pavankumargr2004/code-editor",
      live: "#",
      featured: true
    }
  ];

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentRoleText = roles[currentRole];
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= currentRoleText.length) {
        setTypedText(currentRoleText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          const deletingInterval = setInterval(() => {
            if (index > 0) {
              setTypedText(currentRoleText.slice(0, index - 1));
              index--;
            } else {
              clearInterval(deletingInterval);
              setCurrentRole((prev) => (prev + 1) % roles.length);
            }
          }, 50);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentRole]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll handler for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is mostly in view
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial active section
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to trigger section animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        switch (entry.target.id) {
          case 'home': setHomeInView(entry.isIntersecting); break;
          case 'about': setAboutInView(entry.isIntersecting); break;
          case 'skills': setSkillsInView(entry.isIntersecting); break;
          case 'projects': setProjectsInView(entry.isIntersecting); break;
          case 'contact': setContactInView(entry.isIntersecting); break;
          default: break;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [homeRef, aboutRef, skillsRef, projectsRef, contactRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [homeRef, aboutRef, skillsRef, projectsRef, contactRef].forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking a link
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (simplified for demo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(''); // Clear previous messages

    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen font-sans bg-black text-white overflow-x-hidden">
      {/* Background Video Only */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://videos.pexels.com/video-files/28561594/12421541_2560_1440_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Interactive cursor light effect */}
      <div
        className="fixed pointer-events-none z-5 w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content wrapper */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Pavan Kumar GR
                </h1>
                <div className="text-xs text-gray-400 mt-1">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Kolkata'
                  })} IST
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-transparent hover:border-violet-400/30
                        ${activeSection === item
                          ? 'bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white shadow-lg shadow-violet-500/20'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/80 backdrop-blur-xl">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors
                      ${activeSection === item
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" ref={homeRef} className={`min-h-screen flex items-center justify-center pt-16 transition-all duration-1000 ${homeInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* Status indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Available for work</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
                {nameWords.map((word, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in-up hover:scale-105 transition-transform duration-300 cursor-default"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {word}{index < nameWords.length - 1 && ' '}
                  </span>
                ))}
              </h1>

              <p className="text-xl md:text-3xl text-gray-200 max-w-4xl mx-auto">
                <span className="text-white">I'm a </span>
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent font-bold">
                  {typedText}
                  <span className="animate-pulse text-violet-400">|</span>
                </span>
              </p>

              <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Crafting digital experiences with <span className="text-violet-400 font-semibold">ReactJS</span>, <span className="text-purple-400 font-semibold">NodeJS</span>, <span className="text-indigo-400 font-semibold">MongoDB</span>, and cutting-edge technologies.
                Passionate about building scalable, performant applications that make a difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full font-semibold text-lg hover:from-violet-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 border border-violet-500/20"
                >
                  <span className="flex items-center justify-center gap-3">
                    View My Work
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                <a
                  href="https://drive.google.com/file/d/1Qf3XCVNEkaFiB2AIV0Yb9S9CfA0oluGo/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 border-2 border-violet-500/50 rounded-full font-semibold text-lg hover:bg-violet-500/10 hover:from-violet-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 border border-violet-500/20 flex items-center justify-center gap-3 shadow-xl backdrop-blur-sm"
                >
                  <Download size={24} className="group-hover:animate-bounce" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className={`py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm transition-all duration-1000 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-16 text-center bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p className="text-xl">
                  I'm a passionate <span className="text-violet-400 font-bold">Computer Science Engineer</span> who thrives on turning complex problems into elegant, simple solutions.
                </p>
                <p>
                  My journey in tech is driven by curiosity and a relentless pursuit of excellence. I specialize in building
                  <span className="text-purple-400 font-semibold"> modern web applications</span> that not only look stunning but deliver exceptional user experiences.
                </p>
                <p>
                  When I'm not crafting code, you'll find me exploring the latest in AI, contributing to open source,
                  or mentoring aspiring developers. I believe in <span className="text-indigo-400 font-semibold">continuous learning</span> and staying ahead of the curve.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center">
                        <Star className="text-violet-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Quality First</h3>
                        <p className="text-gray-400">Clean, maintainable, scalable code</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                        <Zap className="text-purple-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Fast Delivery</h3>
                        <p className="text-gray-400">Efficient development process</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                        <Code className="text-indigo-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Modern Stack</h3>
                        <p className="text-gray-400">Latest technologies & best practices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className={`py-20 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm transition-all duration-1000 ${skillsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-violet-400/20 shadow-xl hover:shadow-violet-500/30 transition-all duration-500 hover:scale-105 hover:border-violet-400/50">
                <div className="text-5xl mb-6 text-center">🎨</div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-violet-400 transition-colors">Frontend Mastery</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-violet-600/20 text-violet-200 rounded-full text-sm font-medium hover:bg-violet-500/30 transition-all transform hover:scale-110 cursor-default border border-violet-400/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 shadow-xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 hover:border-purple-400/50">
                <div className="text-5xl mb-6 text-center">⚙️</div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-purple-400 transition-colors">Backend & Data</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Node.js', 'Express.js', 'MongoDB', 'SQL', 'Python', 'Java', 'JDBC', 'C'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-purple-600/20 text-purple-200 rounded-full text-sm font-medium hover:bg-purple-500/30 transition-all transform hover:scale-110 cursor-default border border-purple-400/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="group bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-indigo-400/20 shadow-xl hover:shadow-indigo-500/30 transition-all duration-500 hover:scale-105 hover:border-indigo-400/50">
                <div className="text-5xl mb-6 text-center">🛠️</div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-indigo-400 transition-colors">Tools & Platform</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Git', 'GitHub', 'VS Code', 'Eclipse', 'Netlify', 'Vercel'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-indigo-600/20 text-indigo-200 rounded-full text-sm font-medium hover:bg-indigo-500/30 transition-all transform hover:scale-110 cursor-default border border-indigo-400/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className={`py-20 px-4 sm:px-6 lg:px-8 bg-black/20 backdrop-blur-sm transition-all duration-1000 ${projectsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <br></br>
            <br></br>
            <br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:border-violet-500/50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-violet-500/30"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    opacity: projectsInView ? 1 : 0,
                    transform: projectsInView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.6s ease-out'
                  }}
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Star size={12} />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="aspect-video bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray-400 text-lg font-semibold px-4 text-center">${project.title} - Image Failed to Load</div>`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
                        >
                          <Github size={20} className="text-white" />
                        </a>
                        {project.live !== "#" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
                          >
                            <ExternalLink size={20} className="text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-violet-500/20 text-violet-200 rounded-full text-xs font-medium border border-violet-400/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover:scale-105 transform group"
                      >
                        <Github size={18} />
                        <span className="text-sm group-hover:underline">Code</span>
                      </a>
                      {project.live !== "#" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover:scale-105 transform group"
                        >
                          <ExternalLink size={18} />
                          <span className="text-sm group-hover:underline">Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className={`py-20 px-4 sm:px-6 lg:px-8 bg-black/10 backdrop-blur-sm transition-all duration-1000 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-4xl font-bold mb-8 text-white">Let's create something amazing together</h3>
                <p className="text-gray-300 mb-12 text-lg leading-relaxed">
                  Ready to bring your ideas to life? I'm always excited about new challenges and innovative projects.
                  Whether you need a full-stack application, a stunning frontend, or just want to discuss tech, let's connect!
                </p>

                <div className="space-y-6">
                  <div className="group flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 hover:from-violet-500/20 hover:to-purple-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-violet-400/20 hover:border-violet-400/40">
                    <div className="w-16 h-16 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all">
                      <Mail size={24} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Email</p>
                      <p className="text-gray-300">pavankumargr1904@gmail.com</p>

                    </div>
                  </div>

                  <div className="group flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-purple-400/20 hover:border-purple-400/40">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                      <Phone size={24} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Phone</p>
                      <p className="text-gray-300">+91 6363845197</p>
                    </div>
                  </div>

                  <div className="group flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 hover:from-indigo-500/20 hover:to-blue-500/20 transition-all duration-300 transform hover:scale-105 cursor-pointer border border-indigo-400/20 hover:border-indigo-400/40">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:from-indigo-500/30 group-hover:to-blue-500/30 transition-all">
                      <MapPin size={24} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">Location</p>
                      <p className="text-gray-300">Bengaluru, India</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 mt-12">
                  <a href="https://github.com/Pavankumargr2004" target="_blank" rel="noopener noreferrer"
                      className="group w-16 h-16 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl flex items-center justify-center hover:from-gray-600/30 hover:to-gray-500/30 transition-all duration-300 transform hover:scale-110 border border-gray-600/20 hover:border-gray-500/40">
                    <Github size={24} className="text-gray-300 group-hover:text-white" />
                  </a>
                  <a href="https://www.linkedin.com/in/pavan-kumar-gr-6404112a7/" target="_blank" rel="noopener noreferrer"
                      className="group w-16 h-16 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl flex items-center justify-center hover:from-blue-500/30 hover:to-blue-400/30 transition-all duration-300 transform hover:scale-110 border border-blue-500/20 hover:border-blue-400/40">
                    <Linkedin size={24} className="text-blue-400 group-hover:text-blue-300" />
                  </a>
                  <a href="https://x.com/pavan192004" target="_blank" rel="noopener noreferrer"
                      className="group w-16 h-16 bg-gradient-to-r from-sky-600/20 to-sky-500/20 rounded-2xl flex items-center justify-center hover:from-sky-500/30 hover:to-sky-400/30 transition-all duration-300 transform hover:scale-110 border border-sky-500/20 hover:border-sky-400/40">
                    <Twitter size={24} className="text-sky-400 group-hover:text-sky-300" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-violet-400/20 shadow-2xl  transition-all transform hover:scale-105 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 border border-violet-500/20">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-3 text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-black/20 border border-violet-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm hover:border-violet-400/50"
                      placeholder="Your amazing name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-3 text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-black/20 border border-violet-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm hover:border-violet-400/50"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-3 text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-6 py-4 bg-black/20 border border-violet-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none text-white placeholder-gray-400 backdrop-blur-sm hover:border-violet-400/50"
                      placeholder="Tell me about your amazing project idea..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 border border-violet-500/20"
                  >
                    <span className="flex items-center justify-center gap-3">
                      {isSubmitting ? 'Sending Magic...' : 'Send Message'}
                      {!isSubmitting && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                    </span>
                  </button>

                  {submitMessage && (
                    <div className={`text-center text-sm mt-6 font-semibold p-4 rounded-xl backdrop-blur-sm ${submitMessage.includes('successfully') ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-violet-400/20 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-x-20 justify-items-center md:justify-items-start">
            {/* Column 1: Company Info */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <a href="nav" className="mb-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Pavan Kumar GR
                </h1>
              </a>
              <p className="text-sm leading-relaxed mb-2">&copy; 2025 All rights reserved.</p>
              <p className="text-sm leading-relaxed">Your trusted partner in building amazing web experiences.</p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-base"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Social Links & Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-4">Connect & Contact</h3>
              <div className="flex flex-col space-y-4 mb-6">
                <a href="https://github.com/Pavankumargr2004" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Github size={20} />
                  <span>Github</span>
                </a>
                <a href="https://www.linkedin.com/in/pavan-kumar-gr-6404112a7/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin size={20} />
                  <span>Linkedin</span>
                </a>
                <a href="https://x.com/pavan192004" target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center md:justify-start space-x-3 text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter size={20} />
                  <span>Twitter</span>
                </a>
              </div>
              {/* <address className="not-italic text-gray-400 mb-4 leading-relaxed text-base">
                Bengaluru Group Layout, Main Road, State, Country - 535363
              </address> */}
              <div className="flex flex-col space-y-2">
                <a href="tel:+916363845197" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center md:justify-start space-x-2">
                  <Phone size={16} />
                  <span>+91 6363845197</span>
                </a>
                <button><a href="mailto:pavankumargr1904@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center md:justify-start space-x-2">
                  <Mail size={16} />
                  <span>pavankumargr1904@gmail.com</span>
                </a></button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Styles for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0; /* Ensures it starts invisible */
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #a855f7);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #9333ea);
        }
      `}</style>
    </div>
  );
};

export default App;
