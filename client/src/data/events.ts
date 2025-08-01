// Event types for the symposium
export interface Event {
  id: string;
  name: string;
  category: "performance" | "verbal" | "creative";
  description: string;
  teamSize: string;
  duration: string;
  rules: string[];
  judgingCriteria: string[];
  disqualificationRules: string[];
}

export const events: Event[] = [
  {
    id: "dramatics",
    name: "Dramatics",
    category: "performance",
    description: "Description: Present a skit with strong social relevance on themes like technology, unity, current events, or similar topics.",
    teamSize: " Solo or 3-4 members",
    duration: "3-7 minutes",
    
    rules: [
      "Performance time: 5-10 minutes",
      "Props and costumes require organizer approval",
      "Only pre-approved MP3 tracks on CDs allowed",
      "No vulgarity or offensive content",
      "No pen drives allowed"
    ],
    judgingCriteria: [
      "Creativity and originality",
      "Acting skills and stage presence", 
      "Adherence to time limits",
      "Overall impact"
    ],
    disqualificationRules: [
      "Any act of vulgarity or obscenity",
      "Violation of institution's code of conduct",
      "Late arrival will not be permitted"
    ]
  },
  {
    id: "debate",
    name: "Debate",
    category: "verbal",
    description: "Engage in intellectual discourse through structured debates with direct finals format.",
    teamSize: "Teams of 3 speakers",
    duration: "8 min + 4 min reply",
    
    rules: [
      "Direct finals format with two teams",
      "8 minutes per substantive speech",
      "4 minutes per reply speech",
      "No communication during speeches",
      "Only registered speakers may speak"
    ],
    judgingCriteria: [
      "Content quality and research",
      "Style and delivery",
      "Strategy and rebuttals",
      "Overall persuasiveness"
    ],
    disqualificationRules: [
      "Communication with audience during speeches",
      "Attempting to influence judges",
      "Arguing with judge's decision"
    ]
  },
  {
    id: "verbal",
    name: "Verbal Correlations",
    category: "verbal",
    description: "Demonstrate quick thinking by connecting words, phrases, and concepts with logical correlations.",
    teamSize: "Individual or pairs",
    duration: "1-2 minutes per response",
    
    rules: [
      "Connect given words/phrases logically",
      "1-2 minutes per response",
      "No offensive language allowed",
      "Answers must be logical and clear"
    ],
    judgingCriteria: [
      "Creativity in connections",
      "Clarity of explanation",
      "Logical reasoning",
      "Presence of mind"
    ],
    disqualificationRules: [
      "Use of inappropriate language",
      "Exceeding time limits",
      "Illogical or offensive connections"
    ]
  },
  {
    id: "adzap",
    name: "Adzap",
    category: "creative",
    description: "Products will be assigned on the spot. Participants must creatively market and sell them through a stage performance.",
    teamSize: "1–5 members",
    duration: "30 seconds–3 minutes",
    
    rules: [
      "15-30 minutes preparation time",
      "Original content only (no plagiarism)",
      "Any format: skit, video, jingle",
      "Teams arrange their own props",
      "2-3 minutes presentation time"
    ],
    judgingCriteria: [
      "Creativity and innovation",
      "Impact and message clarity",
      "Presentation skills",
      "Adherence to time limits",
      "Originality"
    ],
    disqualificationRules: [
      "Plagiarism of any kind",
      "Vulgar or offensive content",
      "Content offensive to political/religious sentiments"
    ]
  },
  {
    id: "decode",
    name: "Decode",
    category: "creative",
    description: "Solve puzzles and decode encrypted messages using analytical thinking and problem-solving skills.",
    teamSize: "Individual or pairs",
    duration: "Time-limited rounds",
    
    rules: [
      "Decode clues and encrypted messages",
      "Submit answers within time limits",
      "No external devices or help allowed",
      "Tie-breaker rounds if necessary"
    ],
    judgingCriteria: [
      "Accuracy of solutions",
      "Speed of completion",
      "Problem-solving approach",
      "Logical reasoning"
    ],
    disqualificationRules: [
      "Use of mobile phones or smart devices",
      "External help or assistance",
      "Misconduct or harassment"
    ]
  }
];
