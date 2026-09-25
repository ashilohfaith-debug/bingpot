import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bell, User, Flame, Award, BookOpen, CheckCircle2, Circle, 
  PlayCircle, Clock, Star, Sparkles, TrendingUp, BarChart2, Compass, 
  LayoutDashboard, BrainCircuit, Send, MessageSquare, ChevronRight, 
  ChevronDown, Plus, X, Filter, Bookmark, Layers, Video, Calendar, 
  Zap, Target, Check, Briefcase, Cpu, RefreshCw, Trophy, ArrowRight,
  GraduationCap, HelpCircle, AlertCircle, Eye, ThumbsUp, Radio, Laptop
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  AreaChart, Area, CartesianGrid 
} from 'recharts';

const UDEMY_COLORS = {
  primary: '#A435F0',       // Electric Violet
  primaryHover: '#8710D8',  // Deep Violet Hover
  secondary: '#4435BB',     // Governor Bay Deep Accent
  coral: '#F4522D',         // Flamingo Alert / Accent
  teal: '#199FA3',          // Eastern Blue
  gold: '#F69C08',          // California Yellow/Gold
  goldBright: '#F0E100',    // Sunflower
  mint: '#72D8BA',          // Bermuda Mint Green
  dark: '#1C1D1F',          // Udemy Dark Ink
  darkCard: '#2D2F31',      // Darker Card Neutral
  bgLight: '#F7F9FA',       // Light Neutral Background
  border: '#D1D7DC',        // Subtle Gray Border
};

const INITIAL_USER = {
  name: "Alex Morgan",
  title: "Senior Data Engineer",
  targetRole: "MLOps Engineer",
  xp: 4250,
  streak: 8,
  level: 12,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  completedCoursesCount: 14,
  certificatesEarned: 6
};

const INITIAL_ACTIVE_COURSE = {
  id: "course-mlops-101",
  title: "Production MLOps: Infrastructure, Pipelines & Kubernetes",
  provider: "Pathwise Enterprise Academy",
  instructor: "Dr. Elena Rostova",
  instructorTitle: "Principal MLOps Architect",
  thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  totalModules: 8,
  completedModules: 5,
  modules: [
    { id: "m1", title: "1. MLOps Lifecycle & System Design Overview", duration: "45 mins", completed: true, xp: 50 },
    { id: "m2", title: "2. Version Control for Data & Models (DVC + Git)", duration: "60 mins", completed: true, xp: 75 },
    { id: "m3", title: "3. Dockerizing ML Inference Services & FastAPI", duration: "50 mins", completed: true, xp: 80 },
    { id: "m4", title: "4. Automated CI/CD Pipelines with GitHub Actions", duration: "75 mins", completed: true, xp: 100 },
    { id: "m5", title: "5. Orchestration with Apache Airflow & Prefect", duration: "90 mins", completed: true, xp: 120 },
    { id: "m6", title: "6. Kubernetes Deployment & Helm Charts for Models", duration: "110 mins", completed: false, xp: 150 },
    { id: "m7", title: "7. Real-Time Model Monitoring & Drift Detection", duration: "80 mins", completed: false, xp: 110 },
    { id: "m8", title: "8. Enterprise Security, Governance & Audit Logging", duration: "65 mins", completed: false, xp: 90 },
  ]
};

const ROADMAP_PHASES = [
  {
    phase: 1,
    title: "Phase 1: Foundations & Data Engineering",
    status: "completed",
    progress: 100,
    skills: ["Python", "SQL", "Spark", "Data Pipelines"],
    description: "Master foundational data transformation, storage patterns, and asynchronous messaging queues.",
    estimatedHours: 40,
    nodes: [
      { id: "n1", name: "Advanced Python Architecture", status: "completed" },
      { id: "n2", name: "PostgreSQL & Analytical SQL", status: "completed" },
      { id: "n3", name: "Distributed Computing with PySpark", status: "completed" }
    ]
  },
  {
    phase: 2,
    title: "Phase 2: Containerization & Cloud Infrastructure",
    status: "in_progress",
    progress: 65,
    skills: ["Docker", "AWS", "Terraform", "CI/CD"],
    description: "Containerize scalable microservices, manage IaC with Terraform, and create automated builds.",
    estimatedHours: 55,
    nodes: [
      { id: "n4", name: "Docker Containerization Deep Dive", status: "completed" },
      { id: "n5", name: "Infrastructure as Code (Terraform)", status: "in_progress" },
      { id: "n6", name: "AWS Cloud ML Architecture", status: "locked" }
    ]
  },
  {
    phase: 3,
    title: "Phase 3: Production MLOps & Model Serving",
    status: "locked",
    progress: 0,
    skills: ["Kubernetes", "MLflow", "Feature Store", "Triton"],
    description: "Deploy real-time inference clusters on Kubernetes with autoscaling and feature store management.",
    estimatedHours: 70,
    nodes: [
      { id: "n7", name: "Kubernetes Cluster Administration", status: "locked" },
      { id: "n8", name: "Model Registry & Tracking (MLflow)", status: "locked" },
      { id: "n9", name: "Feast Feature Store Setup", status: "locked" }
    ]
  },
  {
    phase: 4,
    title: "Phase 4: Goal - Enterprise AI System Architect",
    status: "target",
    progress: 0,
    skills: ["LLMOps", "GenAI Governance", "Drift Detection"],
    description: "Architect end-to-end GenAI enterprise platforms with security, observability, and compliance.",
    estimatedHours: 85,
    nodes: [
      { id: "n10", name: "Fine-tuning & Serving Open LLMs", status: "locked" },
      { id: "n11", name: "Prometheus & Evidently AI Monitoring", status: "locked" },
      { id: "n12", name: "Enterprise AI Security Audit", status: "locked" }
    ]
  }
];

const INITIAL_COURSES = [
  {
    id: "c-101",
    title: "AWS Certified Machine Learning - Specialty 2026",
    category: "Cloud",
    provider: "AWS Training & Certification",
    rating: 4.8,
    reviewsCount: 14200,
    students: "48,500",
    level: "Advanced",
    duration: "24.5 hrs",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    badge: "Bestseller",
    description: "Pass the AWS Certified Machine Learning Specialty exam with hands-on labs on SageMaker, Feature Store, and Serverless Inference.",
    instructor: "Stephane Maarek & Frank Kane",
    syllabus: ["AWS SageMaker Pipelines", "Data Engineering on AWS", "ML Security & IAM", "Practice Exam Simulators"]
  },
  {
    id: "c-102",
    title: "Deep Learning Specialization with PyTorch 2.x",
    category: "Machine Learning",
    provider: "DeepLearning.AI",
    rating: 4.9,
    reviewsCount: 22400,
    students: "89,100",
    level: "Intermediate",
    duration: "32.0 hrs",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    badge: "Highest Rated",
    description: "Build neural network architectures from scratch using PyTorch 2.0, Transformers, and GPU acceleration techniques.",
    instructor: "Andrew Ng & Team",
    syllabus: ["Tensor Operations", "CNNs & Computer Vision", "Transformers & Attention Mechanisms", "Quantization & ONNX"]
  },
  {
    id: "c-103",
    title: "Docker & Kubernetes: The Enterprise MLOps Mastery",
    category: "DevOps",
    provider: "Pathwise Academy",
    rating: 4.7,
    reviewsCount: 8900,
    students: "31,200",
    level: "Advanced",
    duration: "18.5 hrs",
    thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=600",
    badge: "Trending",
    description: "Learn to containerize Python ML workloads, write Helm charts, and manage auto-scaling Kubernetes clusters on GKE & EKS.",
    instructor: "Nigel Poulton",
    syllabus: ["Docker Multi-stage Builds", "Kubernetes Pods & Ingress", "KubeFlow Pipelines", "GPU Allocation in K8s"]
  },
  {
    id: "c-104",
    title: "Enterprise LLMOps: Deploying & Fine-Tuning GenAI",
    category: "Machine Learning",
    provider: "Pathwise GenAI Lab",
    rating: 4.9,
    reviewsCount: 5600,
    students: "18,400",
    level: "Expert",
    duration: "21.0 hrs",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600",
    badge: "New Release",
    description: "Master vLLM, LoRA fine-tuning, RAG enterprise pipelines, and Guardrails for production Generative AI deployments.",
    instructor: "Dr. Harrison Chase",
    syllabus: ["LoRA & QLoRA Fine-tuning", "vLLM High-throughput Inference", "Vector DB Scaling (Milvus)", "LLM Observability"]
  },
  {
    id: "c-105",
    title: "Data Engineering with PySpark & Apache Iceberg",
    category: "Data Science",
    provider: "DataBricks Partner Network",
    rating: 4.6,
    reviewsCount: 11200,
    students: "27,900",
    level: "Intermediate",
    duration: "16.0 hrs",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    badge: "Popular",
    description: "Design high-performance Lakehouse architectures using Apache Iceberg, Delta Lake, and PySpark structured streaming.",
    instructor: "Matei Zaharia",
    syllabus: ["Spark Optimization & Partitioning", "Iceberg Acid Transactions", "Streaming Pipelines", "Data Quality Enforcement"]
  },
  {
    id: "c-106",
    title: "Modern Python for High-Performance Systems",
    category: "Programming",
    provider: "Python Software Guild",
    rating: 4.8,
    reviewsCount: 19800,
    students: "62,000",
    level: "Intermediate",
    duration: "14.5 hrs",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600",
    badge: "Essential",
    description: "Master Asyncio, Pydantic v2, FastAPI, memory management, and typing for bulletproof enterprise applications.",
    instructor: "Sebastian Ramirez",
    syllabus: ["Asyncio Concurrency", "Pydantic v2 & Validation", "FastAPI Microservices", "Profiling & Cython"]
  }
];

const INITIAL_SKILLS = [
  { skill: 'Python', score: 92, target: 95 },
  { skill: 'SQL & Data', score: 88, target: 90 },
  { skill: 'Data Eng', score: 82, target: 85 },
  { skill: 'Docker', score: 75, target: 90 },
  { skill: 'MLOps', score: 60, target: 85 },
  { skill: 'Kubernetes', score: 45, target: 80 },
  { skill: 'Cloud (AWS)', score: 70, target: 88 },
];

const WEEKLY_ACTIVITY = [
  { day: 'Mon', hours: 2.5, xp: 250 },
  { day: 'Tue', hours: 3.2, xp: 320 },
  { day: 'Wed', hours: 1.8, xp: 180 },
  { day: 'Thu', hours: 4.0, xp: 400 },
  { day: 'Fri', hours: 2.1, xp: 210 },
  { day: 'Sat', hours: 5.5, xp: 550 },
  { day: 'Sun', hours: 3.0, xp: 300 },
];

const STUDY_TIME_TREND = [
  { week: 'W1', hours: 12 },
  { week: 'W2', hours: 15 },
  { week: 'W3', hours: 18 },
  { week: 'W4', hours: 22.1 },
];

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "Kubernetes ML Deployment Live Workshop",
    time: "Today, 4:00 PM EST",
    host: "K8s Working Group",
    attendees: 142,
    badge: "Live Session"
  },
  {
    id: "e2",
    title: "1-on-1 Mentor Sync with Dr. Elena Rostova",
    time: "Tomorrow, 10:30 AM EST",
    host: "Pathwise Enterprise",
    attendees: 2,
    badge: "1-on-1 Mentorship"
  },
  {
    id: "e3",
    title: "GenAI Safety & Governance Peer Review",
    time: "Friday, 2:00 PM EST",
    host: "AI Ethics Guild",
    attendees: 89,
    badge: "Peer Group"
  }
];

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'roadmap', 'courses', 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  
  // User & Dynamic Learning state persisted in localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pathwise_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [activeCourse, setActiveCourse] = useState(() => {
    const saved = localStorage.getItem('pathwise_active_course');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVE_COURSE;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('pathwise_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [coursesList, setCoursesList] = useState(INITIAL_COURSES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals & Drawers state
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillScore, setNewSkillScore] = useState(60);
  
  // Notifications state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "🎉 Great job! You completed Module 5 in MLOps Infrastructure.", time: "10m ago", read: false },
    { id: 2, text: "🔥 8-Day Learning Streak achieved! +100 Bonus XP awarded.", time: "2h ago", read: false },
    { id: 3, text: "💡 Pathwise AI recommended 2 new Kubernetes courses based on your skill gap.", time: "1d ago", read: true },
  ]);

  // AI Mentor Chat State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('pathwise_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        sender: 'ai',
        text: "Hello Alex! I am your Pathwise AI Career Mentor. I see you're currently progressing toward Senior MLOps Engineer. How can I assist your study plan today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // AI Recommendation Modal / Generator state
  const [aiPromptGoal, setAiPromptGoal] = useState('Kubernetes for Deep Learning');
  const [isGeneratingAiCourse, setIsGeneratingAiCourse] = useState(false);
  const [generatedAiCourse, setGeneratedAiCourse] = useState(null);

  // Toast Banner state
  const [toastMessage, setToastMessage] = useState(null);

  // Save to LocalStorage effects
  useEffect(() => {
    localStorage.setItem('pathwise_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pathwise_active_course', JSON.stringify(activeCourse));
  }, [activeCourse]);

  useEffect(() => {
    localStorage.setItem('pathwise_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('pathwise_chat_history', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiTyping]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleModule = (moduleId) => {
    const updatedModules = activeCourse.modules.map(mod => {
      if (mod.id === moduleId) {
        const nextState = !mod.completed;
        if (nextState) {
          // Award XP
          const newXp = user.xp + mod.xp;
          setUser(prev => ({ ...prev, xp: newXp }));
          triggerToast(`Module Completed! +${mod.xp} XP earned! 🚀`);
        }
        return { ...mod, completed: nextState };
      }
      return mod;
    });

    const completedCount = updatedModules.filter(m => m.completed).length;
    setActiveCourse(prev => ({
      ...prev,
      completedModules: completedCount,
      modules: updatedModules
    }));
  };

  const callGeminiApi = async (prompt, systemInstruction = "") => {
    const apiKey = ""; // Leave blank for Canvas runtime injection
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    let retries = 0;
    const maxRetries = 3;
    let delay = 1000;

    while (retries < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
        throw new Error("No text returned from API");
      } catch (err) {
        retries++;
        if (retries >= maxRetries) {
          throw err;
        }
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
      }
    }
  };

  const handleSendChatMessage = async (presetText) => {
    const messageText = presetText || chatInput;
    if (!messageText.trim()) return;

    const userMsg = {
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!presetText) setChatInput('');
    setIsAiTyping(true);

    try {
      const systemPrompt = "You are Pathwise AI, an elite enterprise technical career mentor specializing in Data Engineering, MLOps, DevOps, and AI Architecture. Give concise, highly structured, encouraging advice with practical code or pipeline suggestions. User is currently a Senior Data Engineer targeting a Senior MLOps Engineer role.";
      const aiReplyText = await callGeminiApi(messageText, systemPrompt);

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      // Intelligent fallback
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Here is a structured recommendation for "${messageText}":\n\n1. **Core Concept**: Focus on modular containerization using Docker & FastAPI for model endpoints.\n2. **Infrastructure**: Deploy on EKS or GKE with Helm Charts and HPA (Horizontal Pod Autoscaling).\n3. **Monitoring**: Integrate Evidently AI with Prometheus & Grafana to detect data drift.\n\nWould you like me to generate a tailored step-by-step syllabus for this topic?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleGenerateAiCourse = async () => {
    if (!aiPromptGoal.trim()) return;
    setIsGeneratingAiCourse(true);
    setGeneratedAiCourse(null);

    try {
      const prompt = `Generate a modern 4-module Udemy-styled mini course syllabus for an enterprise engineer learning: "${aiPromptGoal}".
Return ONLY valid JSON matching this schema:
{
  "title": "Course Title",
  "category": "Machine Learning",
  "provider": "Pathwise AI Generated",
  "rating": 4.9,
  "level": "Intermediate",
  "duration": "8.5 hrs",
  "description": "2-sentence summary",
  "instructor": "Pathwise AI Specialist",
  "syllabus": ["Module 1 details", "Module 2 details", "Module 3 details", "Module 4 details"]
}`;

      const rawJson = await callGeminiApi(prompt, "You output pure JSON without markdown codeblock syntax.");
      const cleanJson = rawJson.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      const newCourseObj = {
        id: `ai-gen-${Date.now()}`,
        ...parsed,
        reviewsCount: 320,
        students: "1,200",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
        badge: "AI Tailored"
      };

      setGeneratedAiCourse(newCourseObj);
    } catch (e) {
      // Fallback generated course
      setGeneratedAiCourse({
        id: `ai-gen-${Date.now()}`,
        title: `Enterprise ${aiPromptGoal} Intensive`,
        category: "Machine Learning",
        provider: "Pathwise AI Generator",
        rating: 4.9,
        reviewsCount: 450,
        students: "1,850",
        level: "Advanced",
        duration: "10.0 hrs",
        badge: "AI Tailored",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600",
        description: `Custom AI curated learning path specifically tailored to advance your career competencies in ${aiPromptGoal}.`,
        instructor: "Gemini AI Engine",
        syllabus: [
          `Fundamentals & Enterprise Architecture of ${aiPromptGoal}`,
          `Hands-on Pipeline Construction & Best Practices`,
          `Security, Automated Testing & Continuous Deployment`,
          `Production Scaling, Observability & Real-world Case Studies`
        ]
      });
    } finally {
      setIsGeneratingAiCourse(false);
    }
  };

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const existingIndex = skills.findIndex(s => s.skill.toLowerCase() === newSkillName.toLowerCase());
    if (existingIndex >= 0) {
      const updated = [...skills];
      updated[existingIndex].score = Math.min(100, Number(newSkillScore));
      setSkills(updated);
    } else {
      setSkills(prev => [...prev, { skill: newSkillName, score: Number(newSkillScore), target: Math.min(100, Number(newSkillScore) + 15) }]);
    }

    setIsAddSkillModalOpen(false);
    setNewSkillName('');
    triggerToast(`Skill "${newSkillName}" updated in your Proficiency Radar! 🎯`);
  };

  // Live filter courses
  const filteredCourses = coursesList.filter(c => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeProgressPercent = Math.round((activeCourse.completedModules / activeCourse.totalModules) * 100);

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#1C1D1F] font-sans antialiased flex flex-col">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce flex items-center space-x-3 bg-[#1C1D1F] text-white px-5 py-3.5 rounded-lg shadow-2xl border-l-4 border-[#A435F0]">
          <Zap className="w-5 h-5 text-[#F69C08] animate-pulse" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#D1D7DC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A435F0] to-[#4435BB] flex items-center justify-center text-white shadow-md shadow-purple-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-[#1C1D1F]">Path<span className="text-[#A435F0]">wise</span></span>
                <span className="bg-[#199FA3]/10 text-[#199FA3] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Enterprise</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">Empowerment Platform</p>
            </div>
          </div>

          {/* Search Bar with Live Filter capability */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, skills (e.g., Kubernetes, PyTorch, MLOps)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'courses' && e.target.value.trim().length > 0) {
                    setActiveTab('courses');
                  }
                }}
                className="w-full bg-[#F7F9FA] border border-[#D1D7DC] rounded-full pl-10 pr-4 py-2 text-sm text-[#1C1D1F] focus:outline-none focus:ring-2 focus:ring-[#A435F0] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-md transition-all flex items-center space-x-2 ${
                activeTab === 'dashboard' ? 'bg-[#A435F0]/10 text-[#A435F0] font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3.5 py-2 rounded-md transition-all flex items-center space-x-2 ${
                activeTab === 'roadmap' ? 'bg-[#A435F0]/10 text-[#A435F0] font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Learning Path</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3.5 py-2 rounded-md transition-all flex items-center space-x-2 ${
                activeTab === 'courses' ? 'bg-[#A435F0]/10 text-[#A435F0] font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-md transition-all flex items-center space-x-2 ${
                activeTab === 'analytics' ? 'bg-[#A435F0]/10 text-[#A435F0] font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Skills & Radar</span>
            </button>
          </nav>

          {/* User Score Badges, Notifications & Profile Drawer Trigger */}
          <div className="flex items-center space-x-3">
            
            {/* Streak Counter */}
            <div className="flex items-center space-x-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full text-orange-600 font-bold text-xs shadow-sm">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{user.streak} Days</span>
            </div>

            {/* XP Score Badge */}
            <div className="flex items-center space-x-1.5 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full text-[#A435F0] font-bold text-xs shadow-sm">
              <Trophy className="w-4 h-4 text-[#F69C08]" />
              <span>{user.xp.toLocaleString()} XP</span>
            </div>

            {/* Notifications Popover Toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative transition-all"
              >
                <Bell className="w-5 h-5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#F4522D] rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notifications Dropdown Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1C1D1F]">Notifications</span>
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                      className="text-[11px] text-[#A435F0] font-semibold hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 text-xs transition-colors ${!n.read ? 'bg-purple-50/50' : ''}`}>
                        <p className="text-gray-800 font-medium">{n.text}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#A435F0]"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold text-[#1C1D1F] leading-tight">{user.name}</div>
                <div className="text-[10px] text-gray-500 font-medium">Lvl {user.level} Practitioner</div>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Bar Bar */}
        <div className="flex lg:hidden justify-around border-t border-gray-200 bg-white py-2 px-1 text-xs">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'dashboard' ? 'text-[#A435F0] font-bold' : 'text-gray-600'}`}
          >
            <LayoutDashboard className="w-4 h-4 mb-1" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('roadmap')}
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'roadmap' ? 'text-[#A435F0] font-bold' : 'text-gray-600'}`}
          >
            <Compass className="w-4 h-4 mb-1" />
            <span>Path</span>
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'courses' ? 'text-[#A435F0] font-bold' : 'text-gray-600'}`}
          >
            <BookOpen className="w-4 h-4 mb-1" />
            <span>Catalog</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center py-1 px-3 rounded ${activeTab === 'analytics' ? 'text-[#A435F0] font-bold' : 'text-gray-600'}`}
          >
            <BarChart2 className="w-4 h-4 mb-1" />
            <span>Radar</span>
          </button>
        </div>
      </header>

      {/* Main Content Area Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ==================== 1. DASHBOARD VIEW ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#A435F0] via-[#4435BB] to-[#1C1D1F] text-white p-8 shadow-xl">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-[#F0E100]" />
                  <span>Target Goal: {user.targetRole}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  Welcome back, {user.name.split(' ')[0]}! 👋
                </h1>
                
                <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                  You are on an <span className="font-bold text-[#F0E100]">{user.streak}-day learning streak</span>! You've completed 5 of 8 modules in your active MLOps track. Keep building your production expertise.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => setActiveTab('roadmap')}
                    className="bg-[#F69C08] hover:bg-[#e08e06] text-slate-900 font-extrabold px-6 py-3 rounded-lg text-sm transition-all shadow-lg flex items-center space-x-2"
                  >
                    <span>View Career Roadmap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setIsAiChatOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg text-sm border border-white/30 backdrop-blur-md transition-all flex items-center space-x-2"
                  >
                    <BrainCircuit className="w-4 h-4 text-[#72D8BA]" />
                    <span>Ask Pathwise AI Mentor</span>
                  </button>
                </div>
              </div>
            </div>

            {}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Active Enrolled Course Interactive Card */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="w-5 h-5 text-[#A435F0]" />
                    <h2 className="text-lg font-bold text-[#1C1D1F]">Continue Active Track</h2>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{activeCourse.provider}</span>
                </div>

                {/* Course Header & Progress */}
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <img 
                    src={activeCourse.thumbnail} 
                    alt={activeCourse.title}
                    className="w-full sm:w-48 h-32 rounded-xl object-cover shadow-sm border border-gray-200"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-base sm:text-lg text-[#1C1D1F] leading-snug">
                      {activeCourse.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      Instructor: <span className="font-medium text-gray-800">{activeCourse.instructor}</span> ({activeCourse.instructorTitle})
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#A435F0]">{activeProgressPercent}% Completed</span>
                        <span className="text-gray-500">{activeCourse.completedModules} / {activeCourse.totalModules} Modules</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
                        <div 
                          className="bg-gradient-to-r from-[#A435F0] to-[#199FA3] h-full transition-all duration-500 rounded-full"
                          style={{ width: `${activeProgressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Modules Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Module Syllabus & Progress Checklist</h4>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {activeCourse.modules.map((mod) => (
                      <div 
                        key={mod.id}
                        onClick={() => handleToggleModule(mod.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          mod.completed 
                            ? 'bg-purple-50/60 border-purple-200 text-purple-950' 
                            : 'bg-white border-gray-200 hover:border-[#A435F0]/50 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {mod.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#A435F0] shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                          )}
                          <div>
                            <p className={`text-xs font-semibold ${mod.completed ? 'line-through text-gray-500' : 'text-[#1C1D1F]'}`}>
                              {mod.title}
                            </p>
                            <span className="text-[10px] text-gray-400">{mod.duration}</span>
                          </div>
                        </div>

                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          mod.completed ? 'bg-purple-100 text-[#A435F0]' : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{mod.xp} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar Widget: Weekly Activity BarChart & Live Workshops */}
              <div className="space-y-6">
                
                {/* Recharts Weekly Study Activity Bar Chart */}
                <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-[#1C1D1F] flex items-center space-x-2">
                      <BarChart2 className="w-4 h-4 text-[#A435F0]" />
                      <span>Weekly Study Hours</span>
                    </h2>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+22% vs last week</span>
                  </div>

                  <div className="h-48 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={WEEKLY_ACTIVITY}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6A6F73' }} />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1C1D1F', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                          formatter={(val) => [`${val} hrs`, 'Study Time']}
                        />
                        <Bar dataKey="hours" fill="#A435F0" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Upcoming Schedule / Live Workshops Widget */}
                <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h2 className="text-sm font-bold text-[#1C1D1F] flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#F4522D]" />
                      <span>Upcoming Events</span>
                    </h2>
                    <span className="text-[11px] text-[#A435F0] font-semibold cursor-pointer hover:underline">Sync Calendar</span>
                  </div>

                  <div className="space-y-3">
                    {UPCOMING_EVENTS.map(event => (
                      <div key={event.id} className="p-3 rounded-xl border border-gray-100 bg-[#F7F9FA] hover:bg-purple-50/40 transition-colors space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4522D] bg-orange-100/60 px-2 py-0.5 rounded">
                            {event.badge}
                          </span>
                          <span className="text-[11px] text-gray-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#1C1D1F]">{event.title}</h4>
                        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                          <span>Host: {event.host}</span>
                          <button 
                            onClick={() => triggerToast(`Joined session: ${event.title}`)}
                            className="text-[#A435F0] font-bold hover:underline text-[11px]"
                          >
                            Join Now →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {}
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl p-6 text-white border border-purple-800/40 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <div className="inline-flex items-center space-x-2 text-[#72D8BA] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Gemini AI Learning Engine</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Need a Custom Enterprise Syllabus?</h3>
                  <p className="text-xs text-gray-300">
                    Type any technical topic, pipeline requirement, or target tool to generate a tailor-made mini-course curriculum instantly.
                  </p>
                </div>

                <div className="flex w-full md:w-auto items-center space-x-2">
                  <input
                    type="text"
                    value={aiPromptGoal}
                    onChange={(e) => setAiPromptGoal(e.target.value)}
                    placeholder="e.g. Triton Inference Server with TensorRT"
                    className="bg-slate-800 text-white text-xs px-4 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#A435F0] w-full md:w-64"
                  />
                  <button
                    onClick={handleGenerateAiCourse}
                    disabled={isGeneratingAiCourse}
                    className="bg-[#A435F0] hover:bg-[#8710D8] text-white font-bold text-xs px-4 py-2.5 rounded-lg shrink-0 transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isGeneratingAiCourse ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-[#F0E100]" />
                        <span>Generate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Display Generated AI Course Modal / Box */}
              {generatedAiCourse && (
                <div className="mt-4 bg-slate-800/80 rounded-xl p-5 border border-purple-500/30 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#A435F0] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {generatedAiCourse.badge}
                    </span>
                    <span className="text-xs text-yellow-400 font-bold flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" />
                      <span>{generatedAiCourse.rating}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{generatedAiCourse.title}</h4>
                  <p className="text-xs text-gray-300">{generatedAiCourse.description}</p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-[#72D8BA] uppercase tracking-wider block">Generated Modules:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {generatedAiCourse.syllabus.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/50 flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#72D8BA] shrink-0 mt-0.5" />
                          <span className="text-gray-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        setCoursesList(prev => [generatedAiCourse, ...prev]);
                        setActiveTab('courses');
                        triggerToast(`Added "${generatedAiCourse.title}" to Course Catalog!`);
                      }}
                      className="bg-[#199FA3] hover:bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all"
                    >
                      Enroll & Save to Catalog
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================== 2. INTERACTIVE ROADMAP VIEW ==================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Header Banner */}
            <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[#A435F0] text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Interactive Trajectory</span>
                </div>
                <h1 className="text-2xl font-black text-[#1C1D1F] mt-1">
                  Career Pathway: <span className="text-[#A435F0]">{user.targetRole}</span>
                </h1>
                <p className="text-xs text-gray-600 mt-1">
                  Complete sequence nodes, acquire skill badges, and validate production competencies.
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-purple-50 px-4 py-2.5 rounded-xl border border-purple-100">
                <Target className="w-5 h-5 text-[#A435F0]" />
                <div>
                  <div className="text-xs font-bold text-[#1C1D1F]">Overall Roadmap Completion</div>
                  <div className="text-sm font-extrabold text-[#A435F0]">42% Completed</div>
                </div>
              </div>
            </div>

            {/* Vertical Milestone Trajectory Visual Nodes */}
            <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-[#A435F0] before:via-[#4435BB] before:to-gray-200">
              {ROADMAP_PHASES.map((phase) => {
                const isCompleted = phase.status === 'completed';
                const isInProgress = phase.status === 'in_progress';
                const isTarget = phase.status === 'target';

                return (
                  <div key={phase.phase} className="relative group">
                    
                    {/* Node Circle Badge */}
                    <div className={`absolute -left-6 sm:-left-10 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white shadow-md z-10 transition-transform group-hover:scale-110 ${
                      isCompleted ? 'bg-[#199FA3]' :
                      isInProgress ? 'bg-[#A435F0] ring-4 ring-purple-100' :
                      isTarget ? 'bg-[#F69C08]' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5 text-white" /> : phase.phase}
                    </div>

                    {/* Milestone Details Box */}
                    <div className={`ml-4 sm:ml-6 bg-white rounded-2xl border p-6 shadow-sm transition-all ${
                      isInProgress ? 'border-[#A435F0] ring-1 ring-[#A435F0]/30' : 'border-[#D1D7DC]'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-bold text-[#1C1D1F]">{phase.title}</h3>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            isCompleted ? 'bg-teal-50 text-[#199FA3]' :
                            isInProgress ? 'bg-purple-50 text-[#A435F0]' :
                            isTarget ? 'bg-amber-50 text-[#F69C08]' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {phase.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Est. Duration: {phase.estimatedHours} hrs</span>
                      </div>

                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">{phase.description}</p>

                      {/* Skill Badges Attached to Node */}
                      <div className="mt-4 pt-3 border-t border-gray-50 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-2">Skills Badges:</span>
                        {phase.skills.map((s, idx) => (
                          <span 
                            key={idx}
                            className="bg-[#F7F9FA] text-gray-700 border border-gray-200 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1"
                          >
                            <Award className="w-3 h-3 text-[#F69C08]" />
                            <span>{s}</span>
                          </span>
                        ))}
                      </div>

                      {/* Sub-node items */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {phase.nodes.map(n => (
                          <div 
                            key={n.id}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                              n.status === 'completed' ? 'bg-teal-50/50 border-teal-200 text-teal-900' :
                              n.status === 'in_progress' ? 'bg-purple-50/50 border-purple-200 text-purple-900 font-semibold' :
                              'bg-gray-50 border-gray-200 text-gray-400'
                            }`}
                          >
                            <span>{n.name}</span>
                            {n.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#199FA3]" />}
                            {n.status === 'in_progress' && <Clock className="w-4 h-4 text-[#A435F0] animate-spin" />}
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==================== 3. COURSE CATALOG VIEW ==================== */}
        {activeTab === 'courses' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Catalog Search & Category Filters Header */}
            <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#1C1D1F]">Enterprise Course Catalog</h1>
                  <p className="text-xs text-gray-600 mt-1">Explore verified learning tracks from top industry providers.</p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                  {['All', 'Programming', 'Data Science', 'Machine Learning', 'Cloud', 'DevOps'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        selectedCategory === cat 
                          ? 'bg-[#1C1D1F] text-white shadow-md' 
                          : 'bg-[#F7F9FA] text-gray-600 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourseModal(course)}
                  className="bg-white rounded-2xl border border-[#D1D7DC] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1D1F]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {course.category}
                    </div>
                    {course.badge && (
                      <div className="absolute top-3 right-3 bg-[#F69C08] text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                        {course.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                        {course.provider}
                      </div>
                      <h3 className="font-bold text-base text-[#1C1D1F] group-hover:text-[#A435F0] transition-colors leading-snug line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Metadata: Rating, Students, Level */}
                    <div className="space-y-3 pt-2 border-t border-gray-100 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 font-bold text-[#F69C08]">
                          <span>{course.rating}</span>
                          <div className="flex text-[#F69C08]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 font-normal">({course.reviewsCount?.toLocaleString()})</span>
                        </div>
                        <span className="text-gray-500 text-[11px]">{course.students} students</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-500 text-[11px]">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                          {course.level}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ==================== 4. SKILLS & ANALYTICS VIEW ==================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Header & Add Skill Button */}
            <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-[#1C1D1F]">Skill Proficiency & Analytics</h1>
                <p className="text-xs text-gray-600 mt-1">Real-time competency assessment vs target enterprise benchmarks.</p>
              </div>

              <button
                onClick={() => setIsAddSkillModalOpen(true)}
                className="bg-[#A435F0] hover:bg-[#8710D8] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Assess Skill</span>
              </button>
            </div>

            {/* Recharts Analytics Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Skill Proficiency Radar Chart */}
              <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-[#1C1D1F] flex items-center space-x-2">
                    <BrainCircuit className="w-5 h-5 text-[#A435F0]" />
                    <span>Skill Radar Matrix (Score vs Target)</span>
                  </h2>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                      <PolarGrid stroke="#E4E8EB" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#1C1D1F', fontSize: 11, fontWeight: 'bold' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#999" />
                      <Radar name="Current Proficiency" dataKey="score" stroke="#A435F0" fill="#A435F0" fillOpacity={0.5} />
                      <Radar name="Target Role Benchmark" dataKey="target" stroke="#199FA3" fill="#199FA3" fillOpacity={0.2} />
                      <Tooltip contentStyle={{ backgroundColor: '#1C1D1F', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Learning Hours Area Chart */}
              <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-[#1C1D1F] flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-[#199FA3]" />
                    <span>Monthly Study Hours Trend</span>
                  </h2>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={STUDY_TIME_TREND}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                      <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#6A6F73' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#6A6F73' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1C1D1F', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="hours" stroke="#199FA3" fill="#199FA3" fillOpacity={0.2} strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Detailed Skills Progress List */}
            <div className="bg-white rounded-2xl border border-[#D1D7DC] p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#1C1D1F]">Competency Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-[#F7F9FA] space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#1C1D1F]">{s.skill}</span>
                      <span className="text-[#A435F0]">{s.score} / 100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-[#A435F0] h-full rounded-full transition-all duration-500"
                        style={{ width: `${s.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {}
      <div className="fixed bottom-6 right-6 z-50">
        
        {/* Toggle Floating Bubble */}
        {!isAiChatOpen && (
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#A435F0] to-[#4435BB] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer border-2 border-white ring-4 ring-purple-200"
          >
            <BrainCircuit className="w-7 h-7 text-[#F0E100]" />
          </button>
        )}

        {/* Floating Chat Drawer Window */}
        {isAiChatOpen && (
          <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden h-[500px] animate-slide-up">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#A435F0] to-[#4435BB] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <BrainCircuit className="w-5 h-5 text-[#F0E100]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Pathwise AI Mentor</h3>
                  <p className="text-[10px] text-purple-200">Powered by Gemini 3 Flash</p>
                </div>
              </div>

              <button onClick={() => setIsAiChatOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F7F9FA] text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#A435F0] text-white rounded-br-none'
                        : 'bg-white text-[#1C1D1F] border border-gray-200 rounded-bl-none whitespace-pre-wrap'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className={`text-[9px] block mt-1 ${msg.sender === 'user' ? 'text-purple-200 text-right' : 'text-gray-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none flex items-center space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#A435F0] animate-ping"></div>
                    <div className="w-2 h-2 rounded-full bg-[#A435F0] animate-ping delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-[#A435F0] animate-ping delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Prompt Quick Shortcuts */}
            <div className="bg-white px-3 py-2 border-t border-gray-100 flex items-center space-x-2 overflow-x-auto text-[11px] no-scrollbar">
              <button
                onClick={() => handleSendChatMessage("Give me a 5-step checklist for MLOps CI/CD")}
                className="bg-purple-50 text-[#A435F0] hover:bg-purple-100 px-2.5 py-1 rounded-full shrink-0 font-medium border border-purple-200"
              >
                ⚡ CI/CD Checklist
              </button>
              <button
                onClick={() => handleSendChatMessage("Explain Docker vs Kubernetes for model serving")}
                className="bg-purple-50 text-[#A435F0] hover:bg-purple-100 px-2.5 py-1 rounded-full shrink-0 font-medium border border-purple-200"
              >
                🐳 Docker vs K8s
              </button>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Ask advice on MLOps, Docker, Python..."
                className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A435F0]"
              />
              <button
                onClick={() => handleSendChatMessage()}
                className="bg-[#A435F0] hover:bg-[#8710D8] text-white p-2 rounded-lg transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}
      </div>

      {}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col animate-scale-up">
            
            {/* Modal Header Image */}
            <div className="relative h-48 bg-gray-900">
              <img 
                src={selectedCourseModal.thumbnail} 
                alt={selectedCourseModal.title}
                className="w-full h-full object-cover opacity-80" 
              />
              <button 
                onClick={() => setSelectedCourseModal(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 text-white space-y-1">
                <span className="bg-[#A435F0] text-xs font-bold px-2.5 py-0.5 rounded">
                  {selectedCourseModal.category}
                </span>
                <h2 className="text-xl font-bold">{selectedCourseModal.title}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              <div className="space-y-2">
                <p className="text-gray-700 leading-relaxed text-sm">{selectedCourseModal.description}</p>
                <div className="flex items-center space-x-4 text-gray-500 pt-2">
                  <span>Instructor: <strong className="text-gray-800">{selectedCourseModal.instructor}</strong></span>
                  <span>•</span>
                  <span>Duration: <strong className="text-gray-800">{selectedCourseModal.duration}</strong></span>
                </div>
              </div>

              {/* Syllabus Breakdown */}
              {selectedCourseModal.syllabus && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#1C1D1F]">Curriculum Overview</h4>
                  <div className="space-y-2">
                    {selectedCourseModal.syllabus.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center space-x-3">
                        <PlayCircle className="w-4 h-4 text-[#A435F0]" />
                        <span className="font-semibold text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500">Includes Enterprise Verified Certificate</span>
              <button
                onClick={() => {
                  setSelectedCourseModal(null);
                  triggerToast(`Enrolled in "${selectedCourseModal.title}"! 🎉`);
                }}
                className="bg-[#A435F0] hover:bg-[#8710D8] text-white font-extrabold text-sm px-6 py-2.5 rounded-lg shadow-md transition-all"
              >
                Enroll Now
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      {isAddSkillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#1C1D1F]">Add / Upgrade Skill Score</h3>
              <button onClick={() => setIsAddSkillModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkillSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Skill Name</label>
                <input 
                  type="text" 
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Terraform, LLMOps, Rust"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-[#A435F0] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Proficiency Rating (0 - 100): {newSkillScore}</label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={newSkillScore}
                  onChange={(e) => setNewSkillScore(e.target.value)}
                  className="w-full accent-[#A435F0]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#A435F0] hover:bg-[#8710D8] text-white font-bold py-2.5 rounded-lg text-xs transition-all"
              >
                Save Skill Rating
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1C1D1F] text-gray-400 py-8 border-t border-gray-800 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-[#A435F0]" />
            <span className="text-white font-bold text-sm">Pathwise Enterprise</span>
            <span>© 2026 Pathwise Learning Inc. Styled with Udemy Palette.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Enterprise Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Gemini AI Guidelines</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}