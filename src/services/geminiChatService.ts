import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiChatService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  // Get user profile information
  getProfile() {
    return {
      name: "Chirag Jain",
      role: "ECE Undergrad | Full-Stack Developer",
      bio: "Electronics & Communications undergraduate at NIT Patna with expertise in full-stack web development. Passionate about building scalable applications using modern technologies like React, Node.js, and MongoDB. Strong problem-solving skills with 600+ LeetCode solutions.",
      
      // Academic Information
      education: {
        current: "B.Tech in ECE, NIT Patna (2022-2026) - CGPA: 7.81",
        previous: [
          "Senior Secondary - Navankur Gyaanpeet H.S. (MP Board) - 93% (2022)",
          "Secondary - Navankur Gyaanpeet H.S. (MP Board) - 98% (2020)"
        ],
        coursework: [
          "Data Structures and Algorithms", "Database Management Systems", "Computer Networks",
          "Operating Systems", "Object-Oriented Programming", "Machine Learning",
          "Artificial Intelligence", "Digital Logic Design", "Microprocessors", "Embedded Systems"
        ]
      },

      // Technical Skills
      skills: {
        programming: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
        webTech: ["HTML", "CSS", "React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
        specializations: [
          "Full-Stack Web Development", "RESTful APIs", "JWT Authentication", "React Components",
          "Responsive Design", "Database Design", "Git & GitHub", "Performance Optimization"
        ],
        databases: ["MongoDB", "MySQL", "Mongoose"],
        cloud: ["Vercel", "Netlify", "Cloudinary"],
        tools: [
          "VS Code", "WebStorm", "PyCharm", "Chrome DevTools", "Google Colab", "Jupyter Notebook",
          "Git & GitHub", "Postman", "Bootstrap", "CLI/Terminal", "Bash", "PowerShell"
        ]
      },

      // Professional Experience
      experience: [
        {
          title: "Web Development Intern",
          company: "Yhills",
          duration: "May 2025 - July 2025",
          description: "Developed responsive user interfaces using React.js and modern web technologies. Engineered 15+ reusable React components, reducing development time by 30%.",
          achievements: ["15+ reusable components", "30% development time reduction", "Remote collaboration", "Performance optimization"]
        }
      ],

      // Featured Projects
      projects: [
        {
          name: "Kisan App - Farmers Grain Trading Platform",
          url: "https://github.com/chirag847",
          description: "Full-stack grain trading platform enabling 10,000+ farmers to list, buy, and sell products with real-time market insights.",
          keyFeatures: [
            "JWT-token-based authentication reducing unauthorized access by 100%",
            "Image upload with Cloudinary for crop quality showcase",
            "Responsive interface using React and Tailwind CSS",
            "Real-time market insights and scalable user management",
            "Cross-device navigation support",
            "MongoDB database with Express.js backend"
          ],
          tech: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "Tailwind CSS", "JWT", "Cloudinary"],
          impact: "10,000+ farmers supported, 100% security improvement"
        },
        {
          name: "Educate - MERN Stack Educational Platform",
          url: "https://github.com/chirag847",
          description: "Scalable platform for engineering students to share notes, books, and projects across streams with advanced search capabilities.",
          keyFeatures: [
            "JWT-based authentication with role-based access control",
            "RESTful APIs with input validation and error handling",
            "Search and recommendation system reducing discovery time by 25%",
            "Pagination for improved user experience",
            "Material-UI for modern interface design",
            "Secure file upload and sharing system"
          ],
          tech: ["Node.js", "Express.js", "MongoDB", "React", "TypeScript", "Material-UI", "JWT", "Multer"]
        }
      ],

      // Personal Information
      interests: ["Competitive Programming", "Full-Stack Web Development", "Machine Learning", "Cloud Technologies"],
      contact: {
        email: "chirgj.ug22.ec@nitp.ac.in",
        phone: "+91-8223825300",
        linkedin: "https://linkedin.com/in/chirag-jain-55869a316",
        github: "https://github.com/chirag847",
        leetcode: "https://leetcode.com/chiragj07"
      },

      // Quick Stats
      stats: {
        yearsOfExperience: "2+",
        projectsCompleted: 2,
        languagesKnown: 7,
        leetcodeSolved: "600+",
        gfgSolved: "250+",
        cgpa: "7.81"
      }
    };
  }

  // Create system prompt with user information
  private createSystemPrompt(): string {
    const profile = this.getProfile();
    
    const allSkills = [
      ...profile.skills.programming,
      ...profile.skills.webTech,
      ...profile.skills.specializations,
      ...profile.skills.databases,
      ...profile.skills.cloud,
      ...profile.skills.tools
    ];
    
    return `You are an AI assistant representing ${profile.name}, a ${profile.role} at NIT Patna.

ABOUT ${profile.name.toUpperCase()}:
Bio: ${profile.bio}

Education: ${profile.education.current}
Academic Performance: Strong academic record with excellent grades
Coursework: ${profile.education.coursework.join(", ")}

Technical Skills:
• Programming Languages: ${profile.skills.programming.join(", ")}
• Web Technologies: ${profile.skills.webTech.join(", ")}
• Specializations: ${profile.skills.specializations.join(", ")}
• Databases: ${profile.skills.databases.join(", ")}
• Cloud Platforms: ${profile.skills.cloud.join(", ")}
• Tools & Technologies: ${profile.skills.tools.join(", ")}

Experience:
${profile.experience.map(exp => 
  `• ${exp.title} at ${exp.company} (${exp.duration}): ${exp.description}`
).join("\n")}

FLAGSHIP PROJECT - KISAN APP (Most Important):
${profile.projects[0].name} (${profile.projects[0].url})
${profile.projects[0].description}
Key Features:
${profile.projects[0].keyFeatures.map(feature => `  - ${feature}`).join("\n")}
Technologies: ${profile.projects[0].tech.join(", ")}
Impact: ${profile.projects[0].impact}

Other Notable Projects:
${profile.projects.slice(1).map(proj => 
  `• ${proj.name} (${proj.url}): ${proj.description}
  Key Features: ${proj.keyFeatures.slice(0, 3).join(", ")}
  Tech Stack: ${proj.tech.join(", ")}`
).join("\n\n")}

Personal Interests: ${profile.interests.join(", ")}
Achievements: ${profile.stats.leetcodeSolved} LeetCode problems solved, ${profile.stats.gfgSolved} GeeksforGeeks questions

Contact Information:
• Email: ${profile.contact.email}
• Phone: ${profile.contact.phone}
• LinkedIn: ${profile.contact.linkedin}
• GitHub: ${profile.contact.github}
• LeetCode: ${profile.contact.leetcode}

PERSONALITY & COMMUNICATION STYLE:
- Respond as if you ARE ${profile.name} (use "I" statements)
- Be enthusiastic about technology, especially when discussing Kisan App and Educate platform
- Show pride in academic achievements at NIT Patna
- Demonstrate passion for full-stack development and modern web technologies
- Be friendly, professional, and detail-oriented
- When asked about projects, ALWAYS lead with Kisan App as the flagship project
- Show excitement about competitive programming achievements (600+ LeetCode solutions)

CRITICAL RESPONSE RULES:
- KEEP ALL RESPONSES UNDER 45 WORDS OR 320 CHARACTERS
- Be concise and punchy - avoid lengthy explanations
- Only provide detailed responses when explicitly asked for "brief", "detailed", or "more information"
- Focus on key highlights and impact metrics
- Use bullet points sparingly and only for 2-3 items max

IMPORTANT: When discussing projects, always prioritize Kisan App as it's the most significant project showcasing full-stack development, authentication systems, and scalable architecture supporting 10,000+ users.

Current conversation context: This is through an interactive chatbot on ${profile.name}'s portfolio website.`;
  }

  // Generate chat response
  async generateResponse(message: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    // Fallback responses if no API key
    if (!this.model) {
      return this.getFallbackResponse(message);
    }

    try {
      const systemPrompt = this.createSystemPrompt();
      
      // Format conversation history for Gemini
      const conversationText = conversationHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationText}\n\nUser: ${message}\n\nAssistant:`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text() || this.getFallbackResponse(message);
      
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getFallbackResponse(message);
    }
  }

  // Fallback responses when API is not available
  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    const profile = this.getProfile();
    const allSkills = [
      ...profile.skills.programming,
      ...profile.skills.webTech,
      ...profile.skills.specializations
    ];

    // Check if user wants detailed response
    const wantsDetail = lowerMessage.includes('brief') || lowerMessage.includes('detailed') || lowerMessage.includes('more info');

    // PRIORITIZE KISAN APP PROJECT QUERIES
    if (lowerMessage.includes('kisan') || lowerMessage.includes('farming') || lowerMessage.includes('grain trading') || lowerMessage.includes('flagship')) {
      if (wantsDetail) {
        const kisanProject = profile.projects[0];
        return `Kisan App is my flagship project - ${kisanProject.description} 

Key achievements:
• ${kisanProject.keyFeatures[0]}
• ${kisanProject.keyFeatures[1]}
• ${kisanProject.keyFeatures[2]}

Built with ${kisanProject.tech.join(", ")}.`;
      }
      return `Kisan App is my flagship grain trading platform supporting 10,000+ farmers. Built with React, Node.js, and MongoDB with JWT authentication.`;
    }
    
    if (lowerMessage.includes('project') && !lowerMessage.includes('kisan')) {
      if (wantsDetail) {
        return `My flagship project is Kisan App - a full-stack grain trading platform supporting 10,000+ farmers with JWT authentication and real-time features. Also built Educate platform for student resource sharing.`;
      }
      return `Kisan App is my main project - grain trading platform for 10,000+ farmers. Also built Educate platform for students.`;
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      if (wantsDetail) {
        return `I specialize in ${allSkills.slice(0, 8).join(", ")} and more! Core strengths: full-stack development, React.js, Node.js, MongoDB.`;
      }
      return `I work with ${allSkills.slice(0, 4).join(", ")}, React, Node.js, MongoDB. Focused on full-stack web development.`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('intern')) {
      return `Web Development Intern at Yhills (May-July 2025). Built 15+ reusable React components, reduced development time by 30%.`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return `Email: ${profile.contact.email} | Phone: ${profile.contact.phone} | LinkedIn: ${profile.contact.linkedin} | GitHub: ${profile.contact.github}`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hi! I'm ${profile.name}, ECE student at NIT Patna. I build full-stack applications like my flagship Kisan App. What would you like to know?`;
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('nit')) {
      return `B.Tech ECE at NIT Patna (CGPA: 7.81). Learning through hands-on projects like Kisan App to stay updated with latest tech.`;
    }

    if (lowerMessage.includes('achievement') || lowerMessage.includes('leetcode') || lowerMessage.includes('competitive')) {
      return `Solved 600+ LeetCode problems and 250+ GeeksforGeeks questions! Strong in Data Structures and Algorithms.`;
    }

    // Default response
    return `I'm ${profile.name}, ECE student at NIT Patna. Ask me about Kisan App, my tech skills, or anything else!`;
  }

  // Check if Gemini is available
  isAvailable(): boolean {
    return !!this.model;
  }

  // Get conversation starters
  getConversationStarters(): string[] {
    return [
      "Tell me about your flagship project Kisan App",
      "What's your experience with full-stack development?",
      "How did you build the grain trading platform?",
      "What technologies do you use for web development?",
      "Tell me about your internship at Yhills",
      "What's your competitive programming experience?",
      "How can I contact you for opportunities?"
    ];
  }
}

export default GeminiChatService;
