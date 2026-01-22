
import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Lock, FileText, Code, Network, Award, Mail, Linkedin, Terminal as TerminalIcon, Search, AlertTriangle } from 'lucide-react';

// Types
interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

interface Skill {
  category: string;
  items: string;
}

// Data from Resume
const EXPERIENCE: Experience[] = [
  {
    role: "Security Analyst",
    company: "Northland Properties Corporation",
    location: "Vancouver, BC",
    period: "Sep 2024 - Present",
    points: [
      "Configured, deployed, and optimized security platforms, including SIEM, EDR, firewalls, and cloud security tools.",
      "Investigated security incidents and alerts using Microsoft Sentinel, Defender XDR, and Log Analytics.",
      "Conducted static and dynamic malware analysis using tools like PeStudio, Floss, and Wireshark.",
      "Performed vulnerability assessments and implemented mitigation strategies to improve security posture.",
      "Authored detailed incident reports and provided actionable recommendations for cyber resilience.",
      "Implemented Microsoft Purview policies, including Data Loss Prevention (DLP).",
      "Strengthened cybersecurity defenses by mitigating phishing, backdoors, and APTs.",
      "Led cybersecurity awareness programs and phishing simulations for employee training."
    ]
  },
  {
    role: "IT Support Analyst - 2",
    company: "Northland Properties Corporation",
    location: "Vancouver, BC",
    period: "Feb 2024 - Dec 2024",
    points: [
      "Managed Active Directory and Microsoft Entra ID, administering user accounts and permissions.",
      "Configured and maintained firewalls, VPNs, and network security policies.",
      "Monitored system logs to detect security incidents and responded promptly.",
      "Collaborated with cross-functional teams for Azure, Intune, Sentinel, and Cisco Meraki.",
      "Assisted in email security and compliance, resolving M365 security incidents.",
      "Supported vulnerability management, patch deployment, and endpoint hardening."
    ]
  },
  {
    role: "Junior System Administrator",
    company: "Northland Properties Corporation",
    location: "Vancouver, BC",
    period: "Nov 2022 - Feb 2024",
    points: [
      "Delivered IT support across 60+ hotels and 150+ restaurants, resolving 3,000+ tickets.",
      "Administered user accounts, groups, and security policies across AD and M365.",
      "Configured and maintained network resources, ensuring secure access via RDP and VPN.",
      "Conducted system maintenance and security updates to mitigate infrastructure risks."
    ]
  }
];

const SKILLS: Skill[] = [
  { category: "Cloud Security & Identity", items: "Azure Security, Microsoft Sentinel, Conditional Access, Azure Information Protection, Microsoft Entra, Purview, Intune" },
  { category: "Threat Detection & IR", items: "SIEM Analysis, Threat Hunting, Malware Analysis, Vulnerability Assessment, Forensic Analysis" },
  { category: "Network Security", items: "Firewall Management, IPS/IDS, Network Protocols, Data Loss Prevention (DLP)" },
  { category: "Malware Analysis Tools", items: "PeStudio, Floss, Process Hacker, ProcMon, Regshot, Wireshark, INetSim" },
  { category: "Tools & Scripting", items: "Wireshark, Nmap, Nessus, Brim, Burp Suite, Metasploit, Python, PowerShell, Bash, SQL" }
];

const CERTIFICATES = [
  { name: "Certified Ethical Hacker (CEH) - Practical", issuer: "EC-Council" },
  { name: "Blue Team Level 1 (BTLO)", issuer: "Security Blue Team" },
  { name: "CompTIA Security+ (SY0-601)", issuer: "CompTIA" },
  { name: "Sophos Firewall Certified Administrator V20.0", issuer: "Sophos" }
];

// Helper Components
const TerminalLine = ({ text, delay = 0, type = 'info' }: { text: string; delay?: number; type?: 'info' | 'success' | 'warning' | 'error' | 'cmd' }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  const colors = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    cmd: 'text-white'
  };

  return (
    <div className={`font-mono-custom text-sm mb-1 animate-in fade-in slide-in-from-left-2 duration-300 ${colors[type]}`}>
      {type === 'cmd' && <span className="mr-2">$</span>}
      {type !== 'cmd' && <span className="mr-2">[{type.toUpperCase()}]</span>}
      {text}
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-3 mb-8 border-b border-green-500/30 pb-4">
    <Icon className="text-[#00ff41] w-6 h-6 glow-green" />
    <h2 className="text-2xl font-bold font-mono-custom tracking-wider text-white uppercase">{title}</h2>
    <div className="flex-grow h-[1px] bg-gradient-to-r from-green-500/30 to-transparent ml-4"></div>
  </div>
);

const App: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('profile');
  const [showTerminal, setShowTerminal] = useState(true);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsScanning(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-300 relative">
      <div className="scanline"></div>
      
      {/* Background Matrix-like HUD */}
      <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden font-mono-custom text-[10px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap mb-1">
            {Math.random().toString(36).substring(2).repeat(10)}
          </div>
        ))}
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-green-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 border border-green-500 rounded-lg flex items-center justify-center animate-pulse-border">
              <Shield className="text-[#00ff41] w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-mono-custom tracking-tight">ROSHAN <span className="text-[#00ff41]">PATEL</span></h1>
              <p className="text-[10px] text-green-500/70 font-mono-custom uppercase tracking-widest">Security Analyst | Cybersecurity Professional</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/5">
            {['profile', 'experience', 'skills', 'certificates', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-custom uppercase tracking-tighter transition-all ${
                  activeTab === tab 
                  ? 'bg-green-500 text-black font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                  : 'text-slate-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-mono-custom">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-500/70">THREAT_LEVEL: LOW</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <div className="text-slate-500">2025.SEC.STABLE</div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Terminal Section */}
        {showTerminal && activeTab === 'profile' && (
          <div className="mb-12 bg-black border border-green-500/30 rounded-lg overflow-hidden shadow-2xl border-glow">
            <div className="bg-[#1a1a1b] px-4 py-2 border-b border-green-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-[10px] font-mono-custom text-slate-500 uppercase tracking-widest">bash — root@roshan-patel — 80x24</span>
              <button onClick={() => setShowTerminal(false)} className="text-slate-500 hover:text-white transition-colors">
                <AlertTriangle size={14} />
              </button>
            </div>
            <div className="p-6 min-h-[320px] bg-[#050505]">
              <TerminalLine type="cmd" text="whoami" delay={500} />
              <TerminalLine type="info" text="Name: Roshan Patel" delay={1000} />
              <TerminalLine type="info" text="Focus: Information Security & Threat Analysis" delay={1200} />
              <TerminalLine type="info" text="Status: Active Operations @ Northland Properties" delay={1400} />
              
              <TerminalLine type="cmd" text="grep --level=high 'Current Focus'" delay={2000} />
              <TerminalLine type="success" text="> SIEM Optimization (Microsoft Sentinel)" delay={2300} />
              <TerminalLine type="success" text="> Threat Hunting & Malware Analysis" delay={2500} />
              <TerminalLine type="success" text="> Vulnerability Assessment & Mitigation" delay={2700} />
              <TerminalLine type="success" text="> Cloud Identity Management (Azure/M365)" delay={2900} />
              
              <TerminalLine type="cmd" text="./verify_environment.sh" delay={3500} />
              <TerminalLine type="warning" text="Checking authentication tokens..." delay={3800} />
              <TerminalLine type="success" text="Environment verified. Content decrypted for viewing." delay={4500} />
              <div className="mt-4 animate-pulse inline-block w-2 h-4 bg-[#00ff41] ml-1"></div>
            </div>
          </div>
        )}

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left/Main Column */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Experience Section */}
            {(activeTab === 'profile' || activeTab === 'experience') && (
              <section id="experience">
                <SectionHeader title="Operational History" icon={TerminalIcon} />
                <div className="space-y-12">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="relative pl-8 border-l border-green-500/20 group">
                      <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <div className="mb-2">
                        <span className="text-xs font-mono-custom text-green-500/70 font-semibold tracking-tighter bg-green-500/10 px-2 py-0.5 rounded uppercase">{exp.period}</span>
                        <h3 className="text-xl font-bold text-white mt-2 font-mono-custom group-hover:text-[#00ff41] transition-colors">{exp.role}</h3>
                        <p className="text-sm font-medium text-slate-400">{exp.company}</p>
                      </div>
                      <ul className="space-y-3 mt-4">
                        {exp.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                            <span className="text-[#00ff41] mt-1.5 flex-shrink-0">
                              <Code size={12} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills Section */}
            {(activeTab === 'profile' || activeTab === 'skills') && (
              <section id="skills">
                <SectionHeader title="Technical Arsenal" icon={Cpu} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SKILLS.map((skill, idx) => (
                    <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-green-500/40 transition-all hover:bg-green-500/[0.02] group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                          <Network size={18} className="text-green-500" />
                        </div>
                        <h4 className="font-bold text-white font-mono-custom text-sm">{skill.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.split(', ').map((item, iIdx) => (
                          <span key={iIdx} className="text-[10px] font-mono-custom px-2 py-1 bg-black/40 border border-white/10 rounded text-slate-400 group-hover:text-green-400 group-hover:border-green-500/20 transition-all">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates Section */}
            {(activeTab === 'profile' || activeTab === 'certificates') && (
              <section id="certificates">
                <SectionHeader title="Verified Credentials" icon={Award} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CERTIFICATES.map((cert, idx) => (
                    <div key={idx} className="flex flex-col gap-1 p-5 bg-[#111112] border border-white/5 rounded-lg hover:border-green-500/30 transition-all group">
                      <div className="flex items-center gap-4 mb-2">
                        <Shield size={20} className="text-green-500 opacity-60 group-hover:opacity-100" />
                        <span className="text-sm font-semibold font-mono-custom text-slate-200 group-hover:text-white transition-colors">{cert.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono-custom uppercase tracking-widest pl-9">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-12">
            
            {/* Education Box */}
            <div className="p-8 bg-[#111112] border border-white/5 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
               <SectionHeader title="Academic Core" icon={FileText} />
               <div className="space-y-8 relative z-10">
                 <div className="group">
                   <p className="text-[10px] font-mono-custom text-green-500/60 uppercase tracking-widest mb-1">Master of Science</p>
                   <h4 className="text-white font-bold font-mono-custom leading-tight group-hover:text-green-400 transition-colors">CyberSecurity</h4>
                   <p className="text-sm text-slate-400 mt-1">New York Institute of Technology</p>
                   <p className="text-xs text-slate-500 mt-1">Graduated 2022</p>
                 </div>
                 <div className="h-[1px] bg-white/5"></div>
                 <div className="group">
                   <p className="text-[10px] font-mono-custom text-green-500/60 uppercase tracking-widest mb-1">Bachelor of Engineering</p>
                   <h4 className="text-white font-bold font-mono-custom leading-tight group-hover:text-green-400 transition-colors">Information Technology</h4>
                   <p className="text-sm text-slate-400 mt-1">Gujarat Technological University</p>
                   <p className="text-xs text-slate-500 mt-1">Graduated 2019</p>
                 </div>
               </div>
            </div>

            {/* Quick Contact / Reach out */}
            <div className="p-8 bg-green-500/[0.03] border border-green-500/20 rounded-2xl">
              <SectionHeader title="Encrypted Comms" icon={Mail} />
              <p className="text-sm text-slate-400 mb-8 leading-relaxed font-mono-custom italic">
                Secure channel available for brand building, networking, and career inquiries.
              </p>
              <div className="space-y-4">
                <a href="mailto:patelroshan5349@gmail.com" className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-xl hover:border-green-500/50 hover:bg-black transition-all group">
                  <Mail size={18} className="text-green-500" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-500 uppercase font-mono-custom tracking-wider">Email</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-white truncate">thecyberpatel@gmail.com</p>
                  </div>
                </a>
                <a href="https://linkedin.com/in/roshankumar-patel" target="_blank" className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-xl hover:border-[#0077b5]/50 hover:bg-black transition-all group">
                  <Linkedin size={18} className="text-[#0077b5]" />
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-500 uppercase font-mono-custom tracking-wider">LinkedIn</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-white truncate">roshankumar-patel</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Site Security Status */}
            <div className="p-6 bg-black border border-red-500/20 rounded-xl">
               <div className="flex items-center gap-3 mb-4">
                 <Lock className="text-red-500 w-4 h-4" />
                 <span className="text-[10px] font-mono-custom text-red-500 uppercase tracking-widest font-bold">Security Status</span>
               </div>
               <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-mono-custom">
                   <span className="text-slate-500">FIREWALL</span>
                   <span className="text-green-500">ACTIVE</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono-custom">
                   <span className="text-slate-500">SSL ENCRYPTION</span>
                   <span className="text-green-500">AES-256</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-mono-custom">
                   <span className="text-slate-500">THREAT DEFENSE</span>
                   <span className="text-green-500">ENABLED</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-4">
                   <div className="bg-green-500 h-full w-[94%] animate-pulse"></div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-20 bg-black/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h5 className="font-mono-custom text-white font-bold text-lg mb-2 tracking-tight">ROSHAN <span className="text-green-500">PATEL</span></h5>
            <p className="text-xs text-slate-500 max-w-sm">
              Defending digital frontiers through SIEM optimization, advanced threat hunting, and strategic risk mitigation.
            </p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-mono-custom text-slate-600 uppercase mb-2">Build Vers.</p>
              <p className="text-xs font-mono-custom text-green-500/70">v3.0.0-SEC</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono-custom text-slate-600 uppercase mb-2">License</p>
              <p className="text-xs font-mono-custom text-slate-400">ENCRYPTED</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono-custom text-slate-600 uppercase mb-2">Integrity</p>
              <p className="text-xs font-mono-custom text-slate-400">VERIFIED</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 text-center text-[10px] font-mono-custom text-slate-700 tracking-[0.2em] uppercase">
          &copy; 2025 ROSHAN PATEL // SECURITY OPERATIONS CENTER PORTFOLIO
        </div>
      </footer>

      {/* Floating Action Button for "Quick Scan" */}
      <button 
        onClick={startScan}
        disabled={isScanning}
        className={`fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          isScanning 
          ? 'bg-slate-800 scale-90 cursor-not-allowed' 
          : 'bg-[#00ff41] text-black shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-110 active:scale-95'
        }`}
      >
        {isScanning ? (
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 animate-ping bg-green-500/20 rounded-full"></div>
            <span className="text-[10px] font-bold font-mono-custom">{scanProgress}%</span>
          </div>
        ) : (
          <Search size={24} />
        )}
      </button>

      {/* Scanning Overlay */}
      {isScanning && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-80 space-y-4 text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-green-500/20 rounded-full mx-auto flex items-center justify-center">
                 <Shield className="text-[#00ff41] w-10 h-10 animate-pulse" />
              </div>
              <div className="absolute inset-0 border-4 border-[#00ff41] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-[#00ff41] font-mono-custom font-bold uppercase tracking-widest text-xl">System Scan In Progress</h3>
            <p className="text-slate-400 text-xs font-mono-custom">Analyzing portfolio integrity and verifying credentials...</p>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#00ff41] h-full transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
            </div>
            <div className="flex justify-between font-mono-custom text-[10px] text-green-500/70">
              <span>SCANNING_BLOCKS...</span>
              <span>{scanProgress}% COMPLETE</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
