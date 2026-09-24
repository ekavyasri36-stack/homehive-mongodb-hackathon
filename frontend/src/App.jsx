import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard, CalendarCheck, Wrench, MessageCircle, Settings,
  Bell, Search, Home, ChevronRight, Plus, Clock3, CheckCircle2,
  CircleHelp, Sparkles, X, Menu, MapPin, ArrowUpRight, ShieldCheck,
  Zap, Heart, Bot, AlertTriangle, HeartPulse
} from "lucide-react";
import "./App.css";

const services = [
  { id: 1, title: "Home Cleaning", description: "Deep cleaning for a fresh and comfortable home.", icon: "🧹", color: "blue", price: "From ₹499" },
  { id: 2, title: "Plumbing", description: "Reliable solutions for leaks, pipes and fittings.", icon: "🔧", color: "purple", price: "From ₹299" },
  { id: 3, title: "Electrical", description: "Safe electrical installation and repair services.", icon: "💡", color: "yellow", price: "From ₹349" },
  { id: 4, title: "AC Service", description: "Keep your cooling system efficient and clean.", icon: "❄️", color: "cyan", price: "From ₹599" },
  { id: 5, title: "Painting", description: "Give your walls a beautiful new appearance.", icon: "🎨", color: "pink", price: "From ₹1,499" },
  { id: 6, title: "Appliance Repair", description: "Professional support for household appliances.", icon: "⚙️", color: "green", price: "From ₹399" },
];

const bookings = [
  { id: 1, service: "AC Service", date: "Tomorrow", time: "10:30 AM", status: "Confirmed", icon: "❄️" },
  { id: 2, service: "Home Cleaning", date: "28 Sep", time: "02:00 PM", status: "Pending", icon: "🧹" },
];

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={19} /> },
  { name: "My Bookings", icon: <CalendarCheck size={19} /> },
  { name: "Services", icon: <Wrench size={19} /> },
  { name: "Messages", icon: <MessageCircle size={19} /> },
  { name: "Settings", icon: <Settings size={19} /> },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [avatarMood, setAvatarMood] = useState("normal");
  const [emergencyType, setEmergencyType] = useState("");
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyLocation, setEmergencyLocation] = useState("");
  const [emergencyDescription, setEmergencyDescription] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const move = (e) => setCursorPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const outside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
      if (notificationRef.current && !notificationRef.current.contains(e.target)) setShowNotifications(false);
    };
    const escape = (e) => {
      if (e.key === "Escape") {
        setShowProfile(false);
        setShowNotifications(false);
        setShowBookingModal(false);
        setShowEmergencyModal(false);
      }
    };
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => () => toastTimerRef.current && clearTimeout(toastTimerRef.current), []);

  const showToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), 3000);
  };

  const openBooking = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
    setAvatarMood("happy");
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
    setAvatarMood("normal");
  };

  const openEmergencyModal = () => {
    setShowEmergencyModal(true);
    setEmergencySubmitted(false);
    setEmergencyType("");
    setEmergencyContact("");
    setEmergencyLocation("");
    setEmergencyDescription("");
    setAvatarMood("surprised");
  };

  const closeEmergencyModal = () => {
    setShowEmergencyModal(false);
    setEmergencySubmitted(false);
    setEmergencyType("");
    setEmergencyContact("");
    setEmergencyLocation("");
    setEmergencyDescription("");
    setAvatarMood("normal");
  };

  const submitEmergencyRequest = () => {
    if (!emergencyType) return showToast("Please select who needs emergency assistance");
    if (!emergencyContact.trim()) return showToast("Please enter a contact number");
    if (!emergencyLocation.trim()) return showToast("Please enter the current location");
    if (!emergencyDescription.trim()) return showToast("Please describe the assistance needed");
    setEmergencySubmitted(true);
    setAvatarMood("friendly");
    showToast("Emergency assistance request submitted");
  };

  const filteredServices = services.filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const navigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    setShowProfile(false);
    setShowNotifications(false);
  };

  return (
    <div className="app">
      {sidebarOpen && <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-icon"><Home size={22} /></div><div><h2>Haven</h2><span>Smart Living</span></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button key={item.name} className={`nav-item ${activePage === item.name ? "active" : ""}`} onClick={() => navigate(item.name)} onMouseEnter={() => setAvatarMood(item.name === "Messages" ? "friendly" : "curious")} onMouseLeave={() => setAvatarMood("normal")}>
              {item.icon}<span>{item.name}</span>{item.name === "Messages" && <span className="message-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><CircleHelp size={21} /></div><h4>Need assistance?</h4><p>Our support team is ready to help.</p><button onClick={() => showToast("Support chat will open soon")}>Contact Support <ArrowUpRight size={15} /></button></div>
          <div className="sidebar-profile"><div className="profile-avatar">K</div><div><strong>Khadijah</strong><span>Personal Account</span></div><button className="icon-button" onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}><ChevronRight size={17} /></button></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button><span>Haven</span></div>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={15} /><strong>{activePage}</strong></div>
          <div className="topbar-actions">
            <div className="top-search"><Search size={17} /><input placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /><span>⌘ K</span></div>
            <div className="notification-wrapper" ref={notificationRef}>
              <button className="icon-button notification-button" onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}><Bell size={19} /><span className="notification-dot" /></button>
              {showNotifications && <div className="dropdown"><div className="dropdown-heading"><strong>Notifications</strong><span>2 new</span></div><div className="notification-item"><CheckCircle2 size={18} /><div><strong>Booking confirmed</strong><p>Your AC service is confirmed.</p></div></div><div className="notification-item"><Sparkles size={18} /><div><strong>New recommendation</strong><p>Keep your home maintenance updated.</p></div></div><button className="dropdown-close-button" onClick={() => setShowNotifications(false)}>Close notifications</button></div>}
            </div>
            <div className="profile-wrapper" ref={profileRef}>
              <button className="profile-mini" onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}><div className="profile-avatar small">K</div><ChevronRight size={15} /></button>
              {showProfile && <div className="dropdown profile-dropdown"><div className="profile-dropdown-heading"><div className="profile-avatar">K</div><div><strong>Khadijah Marzuqah</strong><p>Personal Account</p></div></div><button onClick={() => { setShowProfile(false); showToast("Profile settings selected"); }}><Settings size={16} />Account Settings</button><button className="logout-button" onClick={() => { setShowProfile(false); showToast("Logout feature coming soon"); }}><X size={16} />Log out</button><button className="dropdown-close-button" onClick={() => setShowProfile(false)}>Close menu</button></div>}
            </div>
          </div>
        </header>

        <section className="page-content">
          {activePage === "Dashboard" ? <>
            <div className="welcome-section"><div><div className="eyebrow"><Sparkles size={15} />YOUR PERSONAL HOME ASSISTANT</div><h1>Good morning, <span>Khadijah.</span></h1><p>Everything your home needs, organized in one peaceful space.</p></div><button className="primary-button" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}><Plus size={18} />Book a Service</button></div>

            <div className="stats-grid">
              <Stat icon={<CalendarCheck size={20} />} cls="blue-bg" trend="+12%" label="Total Bookings" value="24" desc="Compared to last month" positive />
              <Stat icon={<Clock3 size={20} />} cls="purple-bg" trend="Active" label="Upcoming Services" value="02" desc="Scheduled for this week" />
              <Stat icon={<ShieldCheck size={20} />} cls="green-bg" trend="Reliable" label="Service Reliability" value="98%" desc="Based on completed services" positive />
              <Stat icon={<Heart size={20} />} cls="orange-bg" trend="Saved" label="Favorite Services" value="06" desc="Services saved for later" />
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card"><div className="card-heading"><div><h3>Upcoming bookings</h3><p>Stay updated with your scheduled services.</p></div><button className="text-button" onClick={() => navigate("My Bookings")}>View all <ArrowUpRight size={16} /></button></div><div className="booking-list">{bookings.map((b) => <div className="booking-row" key={b.id}><div className="booking-service-icon">{b.icon}</div><div className="booking-details"><strong>{b.service}</strong><span><CalendarCheck size={13} />{b.date}<Clock3 size={13} />{b.time}</span></div><span className={`status ${b.status === "Confirmed" ? "confirmed" : "pending"}`}>{b.status}</span><button className="icon-button" onClick={() => showToast(`${b.service} details selected`)}><ChevronRight size={17} /></button></div>)}</div><button className="outline-button full-width" onClick={() => navigate("My Bookings")}>Manage bookings <ArrowUpRight size={16} /></button></div>
              <div className="assistant-card"><div className="assistant-header"><div className="assistant-badge"><Bot size={17} />HAVEN AI</div><span className="online-status"><span />Online</span></div><div className="assistant-visual"><div className="anime-character"><div className="anime-hair" /><div className="anime-face"><div className="anime-eye left-eye" /><div className="anime-eye right-eye" /><div className="anime-mouth" /></div><div className="anime-body" /></div><span className="floating-spark spark-one">✦</span><span className="floating-spark spark-two">✧</span></div><div className="assistant-text"><h3>How can I help today?</h3><p>I can help you find services, track bookings, and keep your home maintenance organized.</p></div><button className="assistant-button" onClick={() => showToast("AI assistant activated")}><MessageCircle size={17} />Start a conversation</button></div>
            </div>

            <div className="emergency-section"><div className="emergency-card"><div className="emergency-icon"><HeartPulse size={30} /></div><div className="emergency-content"><div className="emergency-label"><AlertTriangle size={13} />EMERGENCY ASSISTANCE</div><h2>Someone at home needs urgent help?</h2><p>HomeHive can create an assistance request for people who are alone and need support, including pregnant women, elderly people and children.</p></div><button className="emergency-help-button" onClick={openEmergencyModal}><AlertTriangle size={17} />Request Help</button></div></div>

            <div className="services-section" id="services"><div className="section-header"><div><div className="eyebrow"><Zap size={15} />SERVICES FOR EVERY NEED</div><h2>What does your home need?</h2><p>Choose a service and let us take care of the rest.</p></div><button className="text-button" onClick={() => navigate("Services")}>Explore all <ArrowUpRight size={16} /></button></div><div className="services-grid">{filteredServices.map((s) => <div className="service-card" key={s.id}><div className={`service-icon ${s.color}`}><span>{s.icon}</span><button className="favorite-button" onClick={() => showToast(`${s.title} saved to favorites`)}><Heart size={15} /></button></div><div className="service-content"><h3>{s.title}</h3><p>{s.description}</p><div className="service-bottom"><strong>{s.price}</strong><button className="service-arrow" onClick={() => openBooking(s)}><ArrowUpRight size={18} /></button></div></div></div>)}</div>{filteredServices.length === 0 && <div className="empty-state"><Search size={30} /><h3>No services found</h3><p>Try searching for another service.</p></div>}</div>
            <div className="bottom-banner"><div className="banner-icon"><ShieldCheck size={25} /></div><div><h3>Your home deserves dependable care.</h3><p>Verified professionals, transparent pricing, and service updates in one place.</p></div><button className="banner-button" onClick={() => showToast("Learn more section coming soon")}>Learn more <ArrowUpRight size={16} /></button></div>
          </> : <div className="placeholder-page"><div className="placeholder-icon">{activePage === "My Bookings" ? <CalendarCheck size={35} /> : activePage === "Services" ? <Wrench size={35} /> : activePage === "Messages" ? <MessageCircle size={35} /> : <Settings size={35} />}</div><h1>{activePage}</h1><p>This section is ready for your next feature implementation.</p><button className="primary-button" onClick={() => navigate("Dashboard")}>Return to dashboard</button></div>}
        </section>
      </main>

      {showBookingModal && selectedService && <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeBookingModal()}><div className="booking-modal"><button className="modal-close" onClick={closeBookingModal}><X size={20} /></button><div className="modal-icon">{selectedService.icon}</div><div className="eyebrow">SERVICE REQUEST</div><h2>Book {selectedService.title}</h2><p>Tell us when you would like a professional to visit your home.</p><label>Select preferred date</label><input type="date" /><label>Select preferred time</label><select defaultValue=""><option value="" disabled>Choose a time</option><option>09:00 AM - 11:00 AM</option><option>11:00 AM - 01:00 PM</option><option>02:00 PM - 04:00 PM</option><option>04:00 PM - 06:00 PM</option></select><label>Location</label><div className="location-input"><MapPin size={17} /><input placeholder="Enter your home location" /></div><button className="primary-button full-width" onClick={() => { const name = selectedService.title; closeBookingModal(); showToast(`${name} booking request submitted`); }}>Confirm booking request <ArrowUpRight size={17} /></button></div></div>}

      {showEmergencyModal && <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeEmergencyModal()}><div className="booking-modal emergency-modal"><button className="modal-close" onClick={closeEmergencyModal}><X size={20} /></button>{!emergencySubmitted ? <><div className="modal-icon emergency-modal-icon"><HeartPulse size={32} /></div><div className="eyebrow"><AlertTriangle size={14} />EMERGENCY ASSISTANCE</div><h2>Request Emergency Help</h2><p>Tell us who needs assistance and where help is required. A HomeHive assistance request will be created.</p><div className="emergency-warning"><AlertTriangle size={18} /><span>If this is a life-threatening emergency, contact your local emergency service immediately. HomeHive assistance does not replace ambulance, medical, police or rescue services.</span></div><label>Who needs help?</label><div className="emergency-type-grid">{[["Pregnant Woman","🤰"],["Elderly Person","👴"],["Child","👧"],["Other","🆘"]].map(([type,emoji]) => <button type="button" key={type} className={`emergency-type-button ${emergencyType === type ? "selected" : ""}`} onClick={() => setEmergencyType(type)}><span className="emergency-type-icon">{emoji}</span>{type}</button>)}</div><label>Contact number</label><input type="tel" placeholder="Enter contact number" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} /><label>Location</label><div className="location-input"><MapPin size={17} /><input placeholder="Enter current location" value={emergencyLocation} onChange={(e) => setEmergencyLocation(e.target.value)} /></div><label>What happened?</label><textarea placeholder="Briefly describe what assistance is needed..." value={emergencyDescription} onChange={(e) => setEmergencyDescription(e.target.value)} /><button className="primary-button full-width emergency-submit" onClick={submitEmergencyRequest}><HeartPulse size={17} />Request Emergency Help</button></> : <div className="emergency-success"><div className="emergency-success-icon"><CheckCircle2 size={30} /></div><h3>Help Request Submitted</h3><p>Your HomeHive emergency assistance request has been recorded. Please remain in a safe place and contact local emergency services if the situation is life-threatening.</p><button className="primary-button full-width" onClick={closeEmergencyModal}>Done</button></div>}</div></div>}

      {toast && <div className="toast"><CheckCircle2 size={19} />{toast}</div>}
      <div className={`cursor-companion mood-${avatarMood}`}><div className="cute-bunny"><div className="bunny-ear bunny-ear-left"><span className="ear-inner" /></div><div className="bunny-ear bunny-ear-right"><span className="ear-inner" /></div><div className="bunny-head"><div className={`bunny-face expression-${avatarMood}`}><div className="bunny-eye bunny-eye-left"><span className="eye-pupil" style={{ transform: `translate(${(cursorPosition.x / Math.max(window.innerWidth,1) - .5) * 7}px, ${(cursorPosition.y / Math.max(window.innerHeight,1) - .5) * 5}px)` }} /></div><div className="bunny-eye bunny-eye-right"><span className="eye-pupil" style={{ transform: `translate(${(cursorPosition.x / Math.max(window.innerWidth,1) - .5) * 7}px, ${(cursorPosition.y / Math.max(window.innerHeight,1) - .5) * 5}px)` }} /></div><span className="bunny-cheek bunny-cheek-left" /><span className="bunny-cheek bunny-cheek-right" /><div className="bunny-nose" /><div className="bunny-mouth" /></div></div><div className="bunny-body"><span className="bunny-belly" /><span className="bunny-star">✦</span></div><span className="bunny-foot bunny-foot-left" /><span className="bunny-foot bunny-foot-right" /></div><div className="companion-message">{avatarMood === "happy" && "Yay! Let's book it! ✨"}{avatarMood === "sad" && "Already leaving? 🥺"}{avatarMood === "surprised" && "Oh! A notification!"}{avatarMood === "waving" && "Hiii Khadijah! 👋"}{avatarMood === "friendly" && "I'm here to help!"}{avatarMood === "curious" && "Ooo, what's this? 👀"}{avatarMood === "normal" && "I'm watching over you ☁️"}</div></div>
    </div>
  );
}

function Stat({ icon, cls, trend, label, value, desc, positive }) {
  return <div className="stat-card"><div className="stat-top"><div className={`stat-icon ${cls}`}>{icon}</div><span className={`stat-trend ${positive ? "positive" : ""}`}>{trend}</span></div><p>{label}</p><h2>{value}</h2><span className="stat-description">{desc}</span></div>;
}

export default App;
