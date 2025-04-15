// import React, { useState, useEffect, useRef } from 'react';
// import { MessageCircle, Send, X, ChevronDown, ChevronUp } from 'lucide-react';

// // Types for our chat system
// type Message = {
//   id: string;
//   text: string;
//   sender: 'bot' | 'user';
//   timestamp: Date;
// };

// type SuggestedQuery = {
//   id: string;
//   text: string;
// };

// function App() {
//   // State for chat visibility and messages
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Suggested queries
//   const suggestedQueries: SuggestedQuery[] = [
//     { id: '1', text: 'Admission Process' },
//     { id: '2', text: 'Examination Details' },
//     { id: '3', text: 'Results' },
//     { id: '4', text: 'Fee Structure' },
//     { id: '5', text: 'Course Information' },
//     { id: '6', text: 'Contact Support' },
//     { id: '7', text: 'Online Verification' },
//   ];

//   // Mock database of university information
//   const universityInfo = {
//     'admission process': 'Mumbai University admissions typically open in June. The process involves online registration, document verification, and entrance exams for specific courses. Visit mumbaiuniversity.ac.in for detailed guidelines. For which course You want to know about (UG/ PG)',
//     'ug': (
//       <>
//         Visit{' '}
//         <a
//           href="https://mu.ac.in/ug-and-pg-admission-2024"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 underline hover:text-blue-700"
//         >
//           Mumbai University
//         </a>
//       </>
//     ),
//     'examinationDetails' : (
//       <>
//         Examinations are conducted twice a year (Winter and Summer). The schedule is published on the university website one month before exams. Students must register through the MU portal.
//         <br />
//         <a href="https://mu.ac.in/examination" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
//           Click here for more details
//         </a>
//       </>
//     ),
//     'result' : (
//       <>
//         The results of the examinations are published on the official MU results portal. Students can check their results using their roll number.
//         <br />
//         <a href="http://www.mumresults.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
//           Click here to check results
//         </a>
//       </>
//     ),
//     'fee structure': 'Fee structure varies by course and department. Undergraduate programs range from ₹5,000 to ₹25,000 per semester. Postgraduate programs range from ₹15,000 to ₹50,000 per semester.',
//     'course information': 'Mumbai University offers over 550 courses across Arts, Commerce, Science, Law, Management, and Technology. Each department has specific eligibility criteria and course duration.',
//     'contact support': 'For support, contact: helpdesk@mu.ac.in or call +91-22-2654-3000. Visit the Student Facilitation Center at Kalina Campus for in-person assistance.',
//     'help': 'I can assist with information about admissions, examinations, results, fees, courses, and more. Type your query or select from the suggested options.',
//     'fee': 'Fee structure varies by course and department. Undergraduate programs range from ₹5,000 to ₹25,000 per semester. Postgraduate programs range from ₹15,000 to ₹50,000 per semester.',
//     'course': 'Mumbai University offers over 550 courses across Arts, Commerce, Science, Law, Management, and Technology. Each department has specific eligibility criteria and course duration.',
//     'contact': 'For support, contact: helpdesk@mu.ac.in or call +91-22-2654-3000. Visit the Student Facilitation Center at Kalina Campus for in-person assistance.',
//     'deadline': 'Application deadlines vary by program. Generally, undergraduate admissions close by end of July, while postgraduate program deadlines extend to August. Check the specific department website for exact dates.',
//     'scholarship': 'Mumbai University offers various scholarships including merit-based, need-based, and category-based financial aid. Applications are typically accepted in September-October. Visit mu.ac.in/scholarship for details.',
//     'hostel': 'University hostels are available at Kalina and Churchgate campuses. Applications open in May-June. Monthly fees range from ₹3,000 to ₹7,000 depending on room type and facilities.',
//     'library': 'The Jawaharlal Nehru Library at Kalina Campus houses over 850,000 books and provides digital access to journals. Its open from 8 AM to 10 PM on weekdays and 10 AM to 6 PM on weekends.',
//     'placement': 'The University Placement Cell coordinates campus recruitment. Average placement rates vary by department, with Engineering and Management achieving 85-90% placement. Top recruiters include TCS, Infosys, and HDFC Bank.',
//     'certificate': 'For degree certificates, apply through the Examination House at Kalina Campus. Processing takes 30-45 days. Verification fee is ₹1,000 for Indian students and $50 for international students.',
//     'transcript': 'Official transcripts can be requested online through mumbaiuniversity.ac.in/transcript. Processing fee is ₹500 per copy for Indian students and $25 for international students.',
//     'syllabus': 'Course syllabi are available on respective department websites. For a printed copy, visit the department office or download from mu.ac.in/academics/syllabus.',
//     'internship': 'Internship opportunities are coordinated through individual departments. The University Industry Interaction Cell also facilitates internships with partner organizations.',
//     'document': 'Required documents typically include ID proof, address proof, previous educational certificates, caste certificate (if applicable), and passport-sized photographs. Specific requirements vary by program.',
//     'eligibility': 'Eligibility criteria vary by program. Generally, undergraduate programs require 50-60% in 12th standard, while postgraduate programs require 50-60% in relevant bachelor\'s degree.',
//     'campus': 'Mumbai University has multiple campuses including Kalina (Santacruz), Fort, Thane, and Kalyan. The main administrative campus is at Fort, while most departments are at Kalina Campus.',
//     'faculty': 'The university has over 2,000 faculty members across departments, with approximately 70% holding doctoral degrees. Faculty-student ratio averages 1:25 across programs.',
//     'research': 'Research opportunities are available through various centers of excellence. PhD programs are offered in most departments. Research funding is available through university grants and external agencies.',
//     'sports': 'The university offers facilities for cricket, football, basketball, swimming, and athletics. Annual inter-collegiate tournaments are held in various sports. Sports scholarships are available for exceptional athletes.',
//     'alumni': 'Notable alumni include industrialist Ratan Tata, cricketer Sunil Gavaskar, and former President Pratibha Patil. The Alumni Association organizes regular networking events and mentorship programs.',
//     'ranking': 'Mumbai University consistently ranks among the top 10 universities in India. It holds NAAC A grade accreditation and is recognized by UGC, AICTE, and other regulatory bodies.',
//     'exchange': 'International exchange programs are available with partner universities in the US, UK, Australia, and Germany. Applications open in January for fall semester and August for spring semester.',
//     'online': 'Several programs are offered in distance learning mode through the Institute of Distance and Open Learning (IDOL). Online application, study materials, and examinations are conducted regularly.',
//     'wifi': 'Free Wi-Fi is available across all campuses for students and faculty. Access requires registration with student ID and is subject to fair usage policy.',
//     'canteen': 'Campus canteens offer affordable meals ranging from ₹30-100. Special dietary requirements can be accommodated upon request.',
//     'parking': 'Student parking is available at designated areas in all campuses. Two-wheeler parking is free, while four-wheeler parking costs ₹20 per day or ₹500 per month.',
//     'counseling': 'Student counseling services are available at the Student Welfare Department. Free counseling sessions can be booked through the university portal or by visiting the department.',
//     'calendar': 'The academic calendar typically runs from June to April, with winter break in December and summer break in May. Detailed schedules are published on the university website at the beginning of each academic year.',
//     'migration': 'You have to visit Mumbai University for your migration certificate',
//   };

//   // Function to calculate similarity between two strings (Levenshtein distance)
//   const calculateSimilarity = (str1: string, str2: string): number => {
//     const track = Array(str2.length + 1).fill(null).map(() => 
//       Array(str1.length + 1).fill(null));
    
//     for (let i = 0; i <= str1.length; i += 1) {
//       track[0][i] = i;
//     }
    
//     for (let j = 0; j <= str2.length; j += 1) {
//       track[j][0] = j;
//     }
    
//     for (let j = 1; j <= str2.length; j += 1) {
//       for (let i = 1; i <= str1.length; i += 1) {
//         const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
//         track[j][i] = Math.min(
//           track[j][i - 1] + 1, // deletion
//           track[j - 1][i] + 1, // insertion
//           track[j - 1][i - 1] + indicator, // substitution
//         );
//       }
//     }
    
//     return 1 - (track[str2.length][str1.length] / Math.max(str1.length, str2.length));
//   };

//   let lastQuery = '';

//   // Function to simulate searching the database with improved matching
//   const searchDatabase = (query: string): string => {
//     // Convert to lowercase for case-insensitive matching
//     const normalizedQuery = query.toLowerCase().trim();
    
//     // Direct match
//     if (universityInfo[normalizedQuery]) {
//       lastQuery = normalizedQuery;
//       return universityInfo[normalizedQuery];
//     }

//     if(lastQuery === "admission process" && (normalizedQuery === "ug" || normalizedQuery === "pg")){
//       return universityInfo[normalizedQuery] || "Please specify the course name.";
//     }
    
//     // Check for keywords in the query
//     const queryWords = normalizedQuery.split(/\s+/);
    
//     // Check if any key in the database is contained in the query
//     for (const key in universityInfo) {
//       if (queryWords.some(word => word.length > 3 && key.includes(word))) {
//         return universityInfo[key];
//       }
//     }
    
//     // Find the best match using similarity
//     let bestMatch = '';
//     let highestSimilarity = 0;
    
//     for (const key in universityInfo) {
//       const similarity = calculateSimilarity(normalizedQuery, key);
//       if (similarity > highestSimilarity && similarity > 0.4) { // Threshold for similarity
//         highestSimilarity = similarity;
//         bestMatch = key;
//       }
//     }
    
//     if (bestMatch) {
//       return universityInfo[bestMatch];
//     }
    
//     // Check for partial matches in each word of the query
//     for (const word of queryWords) {
//       if (word.length < 4) continue; // Skip short words
      
//       for (const key in universityInfo) {
//         if (key.includes(word)) {
//           return universityInfo[key];
//         }
//       }
//     }
    
//     // No match found
//     return "I'm sorry, I couldn't find information about that. Would you like to ask about admissions, examinations, results, fees, courses, or contact support?";
//   };

//   // Function to handle bot responses
//   const getBotResponse = (query: string): string => {
//     return searchDatabase(query);
//   };

//   // Initialize chat with welcome message
//   useEffect(() => {
//     if (isChatOpen && messages.length === 0) {
//       setMessages([
//         {
//           id: '0',
//           text: 'Hi, how may I help you?',
//           sender: 'bot',
//           timestamp: new Date(),
//         },
//       ]);
//     }
//   }, [isChatOpen, messages.length]);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle sending a message
//   const handleSendMessage = (text: string) => {
//     if (!text.trim()) return;

//     // Add user message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text,
//       sender: 'user',
//       timestamp: new Date(),
//     };
    
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setIsTyping(true);
    
//     // Simulate bot thinking and responding
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         text: getBotResponse(text),
//         sender: 'bot',
//         timestamp: new Date(),
//       };
      
//       setMessages(prev => [...prev, botResponse]);
//       setIsTyping(false);
//     }, 1000);
//   };

//   // Handle suggested query selection
//   const handleSuggestedQuery = (query: string) => {
//     handleSendMessage(query);
//   };

//   // Toggle chat open/closed
//   const toggleChat = () => {
//     setIsChatOpen(!isChatOpen);
//     setIsMinimized(false);
//   };

//   // Toggle chat minimized/maximized
//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
//       {/* Main content - Mumbai University website simulation */}
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-blue-800">Mumbai University</h1>
//         <p className="mt-4 text-gray-600">Welcome to the official website of Mumbai University</p>
//       </div>

//       {/* Chat button */}
//       {!isChatOpen && (
//         <button
//           onClick={toggleChat}
//           className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
//           aria-label="Open chat"
//         >
//           <MessageCircle size={24} />
//         </button>
//       )}

//       {/* Chat window */}
//       {isChatOpen && (
//         <div 
//           className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-xl w-80 md:w-96 transition-all duration-300 flex flex-col ${
//             isMinimized ? 'h-16' : 'h-[500px] max-h-[80vh]'
//           }`}
//         >
//           {/* Chat header */}
//           <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
//             <div className="flex items-center">
//               <MessageCircle size={20} className="mr-2" />
//               <h3 className="font-medium">Mumbai University Assistant</h3>
//             </div>
//             <div className="flex items-center">
//               <button 
//                 onClick={toggleMinimize} 
//                 className="mr-2 hover:bg-blue-700 p-1 rounded"
//                 aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
//               >
//                 {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//               </button>
//               <button 
//                 onClick={toggleChat} 
//                 className="hover:bg-blue-700 p-1 rounded"
//                 aria-label="Close chat"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Chat body - only visible when not minimized */}
//           {!isMinimized && (
//             <>
//               {/* Messages area */}
//               <div className="flex-1 p-4 overflow-y-auto">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`mb-4 ${
//                       message.sender === 'user' ? 'text-right' : 'text-left'
//                     }`}
//                   >
//                     <div
//                       className={`inline-block p-3 rounded-lg ${
//                         message.sender === 'user'
//                           ? 'bg-blue-600 text-white'
//                           : 'bg-gray-200 text-gray-800'
//                       }`}
//                     >
//                       {message.text}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                   </div>
//                 ))}
//                 {isTyping && (
//                   <div className="text-left mb-4">
//                     <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Suggested queries - only show after welcome message and if no other messages */}
//               {messages.length === 1 && (
//                 <div className="px-4 pb-2">
//                   <p className="text-sm text-gray-500 mb-2">Suggested queries:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {suggestedQueries.map((query) => (
//                       <button
//                         key={query.id}
//                         onClick={() => handleSuggestedQuery(query.text)}
//                         className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-full transition-colors"
//                       >
//                         {query.text}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Input area */}
//               <div className="border-t p-3">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSendMessage(inputValue);
//                   }}
//                   className="flex items-center"
//                 >
//                   <input
//                     type="text"
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     placeholder="Type your question here..."
//                     className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
//                     aria-label="Send message"
//                   >
//                     <Send size={20} />
//                   </button>
//                 </form>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, ChevronDown, ChevronUp } from 'lucide-react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Types for our chat system
type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

type SuggestedQuery = {
  id: string;
  text: string;
};





function App() {
  // State for chat visibility and messages
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set your fallback reply
  const fallbackReply = "I'm sorry, I couldn't find information about that. Would you like to ask about admissions, examinations, results, fees, courses, or contact support?";

  // Suggested queries
  const suggestedQueries: SuggestedQuery[] = [
    { id: '1', text: 'Admission Process' },
    { id: '2', text: 'Examination Details' },
    { id: '3', text: 'Results' },
    { id: '4', text: 'Fee Structure' },
    { id: '5', text: 'Course Information' },
    { id: '6', text: 'Contact Support' },
    { id: '7', text: 'Online Verification' },
  ];

  // Mock database of university information
  const universityInfo = {
    'admission process': 
    (<>
      {/* Mumbai University admissions typically open in June.
      Visit{' '}
      <a
        href="https://mu.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Mumbai University
      </a>{' '}
      for detailed guidelines. */}
      
      {/* <strong>For which course do you want to know more?</strong>
      <br />
      
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {handleSendMessage('You selected UG Admission');
        window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}}      >
        UG Admission
      </button>{' '}
      

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
        PG Admission
      </button>{' '}
      

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
        Diploma
      </button>{' '}
      
      
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
        CET 
      </button> */}


<strong>For which course do you want to know more?</strong>
<br />

<div className="mt-4 flex flex-col gap-3 w-full max-w-xs">
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
    onClick={() => {
      handleSendMessage('UG Admission');
      window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer');
    }}
  >
    UG Admission
  </button>

  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
    onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}
  >
    PG Admission
  </button>

  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
    onClick={() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Mumbai University offers diploma courses across various disciplines such as management, arts, science, and technology',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }}
  >
    Diploma
  </button>

  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
    onClick={() => {handleSendMessage('CET');
      window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}}
  >
    CET
  </button>
</div>





    
      {/* <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          handleSendMessage('Returning to Main Menu');
        }}
      >
        Return to Main Menu
      </button> */}

    </>

    
  ),
  ug: (
    <>
      Visit{' '}
      <a
        href="https://mu.ac.in/ug-and-pg-admission-2024"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Mumbai University UG Admissions
      </a>
    </>
  ),



    'examination' : (
      <>
        Examinations are conducted twice a year (Winter and Summer). The schedule is published on the university website one month before exams. Students must register through the MU portal.
        <br />

        <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
        window.open('https://mu.ac.in/examination', '_blank', 'noopener,noreferrer')}}      >
        Examination Details
      </button>{' '}

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
        Passing certificate
      </button>

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
        Special certificate
      </button>

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
       Revaluation
      </button>

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.ac.in/ug-and-pg-admission-2024', '_blank', 'noopener,noreferrer')}      >
      
        Photocopy
      </button>




      </>
    ),




/*-----------------------------------------------RESULT START--------------------------------------------------------------------*/ 


    'result' : (
     

      <>
        <strong>which Result do you want to know more?</strong><br /><div className="mt-4 flex flex-col gap-3 w-full max-w-xs">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
            onClick={() => window.open('http://www.mumresults.in/', '_blank', 'noopener,noreferrer')}
          >
            Reguler

          </button>


          <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
          onClick={() => {
            setMessages(prev => [
              ...prev,
      {
        id: Date.now().toString(),
        text: `RPV mans Held in reserve that means you are either passed or failed but due to some problem they withheld your result. 
        So, in such a scenario you should try to reach the concerned authority of the MU itself.
        To resolve this and fill out the RPV form, you need to carry the following documents:
        1.A letter from your college
        2.Your lower semester marksheet
        3.Your eligibility status report. `
                ,

        sender: 'bot',
        timestamp: new Date(),

              
            },
            
          ]);
          
        }}
      >
        RLE
      </button>



         

          <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
          onClick={() => {
            setMessages(prev => [
              ...prev,
      {
        id: Date.now().toString(),
        text: `RPV mans Held in reserve that means you are either passed or failed but due to some problem they withheld your result. 
        So, in such a scenario you should try to reach the concerned authority of the MU itself.
        To resolve this and fill out the RPV form, you need to carry the following documents:
        1.A letter from your college
        2.Your lower semester marksheet
        3.Your eligibility status report. `
                ,

        sender: 'bot',
        timestamp: new Date(),

        
      },
      
    ]);
    
  }}
>
  RPV
</button>


          <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
                    onClick={() => {
                      setMessages(prev => [
                        ...prev,
                {
                  id: Date.now().toString(),
                  text: `RR means Result held in reserve most probabalily due to abscent student.
                          So, in such a scenario you should try to reach the concerned authority of the MU itself.
                           To resolve this and fill out the RR form, you need to carry the following documents:
        1.A letter from your college
        2.Your lower semester marksheet
        3.Your eligibility status report.
    `
                          ,

                  sender: 'bot',
                  timestamp: new Date(),

                  
                },
                
              ]);
              
            }}
          >
            RR
          </button>
        </div></>

    ),


    /*---------------------------------------RESULT  END--------------------------------------------------------------------*/ 
/*------------------------------------Convocation START--------------------------------------------------------------------*/


'Convocation': (
  <>
    Fee structure varies by course and department. Undergraduate programs range from ₹5,000 to ₹25,000 per semester. 
    Postgraduate programs range from ₹15,000 to ₹50,000 per semester.
    <br/>
    <a href="https://mu.ac.in/fees-structure" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
          Click here to check fee structure
    </a>

  </>
),

    
    



















    'feeStructure': (
  <>
    Fee structure varies by course and department. Undergraduate programs range from ₹5,000 to ₹25,000 per semester. 
    Postgraduate programs range from ₹15,000 to ₹50,000 per semester.
    <br/>
    <a href="https://mu.ac.in/fees-structure" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
          Click here to check fee structure
    </a>

  </>
),


'course information': (
  <>
    Mumbai University offers over 550 courses across Arts, Commerce, Science, Law, Management, and Technology. Each department has specific eligibility criteria and course duration.
    <br/>
    <a href="https://archive.mu.ac.in/courses/Index-1.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
          Click here to check course information
    </a>

  </>
),
    // 'contact support': 'For support, contact: helpdesk@mu.ac.in or call +91-22-2654-3000. Visit the Student Facilitation Center at Kalina Campus for in-person assistance.',
    // 'help': 'I can assist with information about admissions, examinations, results, fees, courses, and more. Type your query or select from the suggested options.',
    // 'fee': 'Fee structure varies by course and department. Undergraduate programs range from ₹5,000 to ₹25,000 per semester. Postgraduate programs range from ₹15,000 to ₹50,000 per semester.',
    // 'course': 'Mumbai University offers over 550 courses across Arts, Commerce, Science, Law, Management, and Technology. Each department has specific eligibility criteria and course duration.',
    // 'contact': 'For support, contact: helpdesk@mu.ac.in or call +91-22-2654-3000. Visit the Student Facilitation Center at Kalina Campus for in-person assistance.',
    // 'deadline': 'Application deadlines vary by program. Generally, undergraduate admissions close by end of July, while postgraduate program deadlines extend to August. Check the specific department website for exact dates.',
      
    'scholarship': (
  <>
    Mumbai University offers various scholarships including merit-based, need-based, and category-based financial aid. Applications are typically accepted in September-October. 
    <br/>
    <a href="https://mu.ac.in/scholarship" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
          Click here for more details. 
    </a>

  </>
),


    'hostel': (
      <>
        University hostels are available at Kalina and Churchgate campuses. Applications open in May-June. Monthly fees range from ₹3,000 to ₹7,000 depending on room type and facilities.
        <br/>
        <a href="https://mu.ac.in/archives/courses/2074" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
              Click here to check hostel details.
        </a>
    
      </>
    ),


    'online verification': (
      <>
        {/* University hostels are available at Kalina and Churchgate campuses. Applications open in May-June. Monthly fees range from ₹3,000 to ₹7,000 depending on room type and facilities. */}

        Click the button below to proceed with online document verification.
        <br/>
        <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://univ.secur.co.in/University/verification', '_blank', 'noopener,noreferrer')}      >
      
        online verification
      </button>
    
      </>
    ),

    'library': 'The Jawaharlal Nehru Library at Kalina Campus houses over 850,000 books and provides digital access to journals. Its open from 8 AM to 10 PM on weekdays and 10 AM to 6 PM on weekends.',
    'placement': 'The University Placement Cell coordinates campus recruitment. Average placement rates vary by department, with Engineering and Management achieving 85-90% placement. Top recruiters include TCS, Infosys, and HDFC Bank.',
    'degree certificate': 'For degree certificates, apply through the Examination House at Kalina Campus. Processing takes 30-45 days. Verification fee is ₹1,000 for Indian students and $50 for international students.',
    'transcript': 'Official transcripts can be requested online through mumbaiuniversity.ac.in/transcript. Processing fee is ₹500 per copy for Indian students and $25 for international students.',
    'syllabus': 'Course syllabi are available on respective department websites. For a printed copy, visit the department office or download from mu.ac.in/academics/syllabus.',
    'internship': 'Internship opportunities are coordinated through individual departments. The University Industry Interaction Cell also facilitates internships with partner organizations.',
    'document': 'Required documents typically include ID proof, address proof, previous educational certificates, caste certificate (if applicable), and passport-sized photographs. Specific requirements vary by program.',
    'eligibility': 'Eligibility criteria vary by program. Generally, undergraduate programs require 50-60% in 12th standard, while postgraduate programs require 50-60% in relevant bachelor\'s degree.',
    'campus': 'Mumbai University has multiple campuses including Kalina (Santacruz), Fort, Thane, and Kalyan. The main administrative campus is at Fort, while most departments are at Kalina Campus.',
    'faculty': 'The university has over 2,000 faculty members across departments, with approximately 70% holding doctoral degrees. Faculty-student ratio averages 1:25 across programs.',
    'research': 'Research opportunities are available through various centers of excellence. PhD programs are offered in most departments. Research funding is available through university grants and external agencies.',
    'alumni': 'Notable alumni include industrialist Ratan Tata, cricketer Sunil Gavaskar, and former President Pratibha Patil. The Alumni Association organizes regular networking events and mentorship programs.',
    'ranking': 'Mumbai University consistently ranks among the top 10 universities in India. It holds NAAC A grade accreditation and is recognized by UGC, AICTE, and other regulatory bodies.',
    'exchange': 'International exchange programs are available with partner universities in the US, UK, Australia, and Germany. Applications open in January for fall semester and August for spring semester.',
    'online': 'Several programs are offered in distance learning mode through the Institute of Distance and Open Learning (IDOL). Online application, study materials, and examinations are conducted regularly.',
    'counseling': 'Student counseling services are available at the Student Welfare Department. Free counseling sessions can be booked through the university portal or by visiting the department.',

    'academic calendar': (
  <>
    The academic calendar typically runs from June to April, with winter break in December and summer break in May. Detailed schedules are published on the university website at the beginning of each academic year.
    <br/>
    <a href="https://mu.migrationcertificate.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">
          Click here to check academic calendar.
    </a>

  </>
), 
    'migration certificate': (
  <>
    You have to visit Mumbai University for your migration certificate
    <br/>

    <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.open('https://mu.migrationcertificate.in/', '_blank', 'noopener,noreferrer')}      >
      
      Click here 
      </button>
    

  </>
),
  };

  // Function to calculate similarity between two strings (Levenshtein distance)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const track = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
    
    return 1 - (track[str2.length][str1.length] / Math.max(str1.length, str2.length));
  };

  let lastQuery = '';

  // Function to simulate searching the database with improved matching
  const searchDatabase = (query: string): string | JSX.Element => {
    // Convert to lowercase for case-insensitive matching
    const normalizedQuery = query.toLowerCase().trim();
    
    // Direct match
    if (universityInfo[normalizedQuery]) {
      lastQuery = normalizedQuery;
      return universityInfo[normalizedQuery];
    }

    if(lastQuery === "admission process" && (normalizedQuery === "ug" || normalizedQuery === "pg")){
      return universityInfo[normalizedQuery] || "Please specify the course name.";
    }
    
    // Check for keywords in the query
    const queryWords = normalizedQuery.split(/\s+/);
    
    // Check if any key in the database is contained in the query
    for (const key in universityInfo) {
      if (queryWords.some(word => word.length > 3 && key.includes(word))) {
        return universityInfo[key];
      }
    }
    
    // Find the best match using similarity
    let bestMatch = '';
    let highestSimilarity = 0;
    
    for (const key in universityInfo) {
      const similarity = calculateSimilarity(normalizedQuery, key);
      if (similarity > highestSimilarity && similarity > 0.4) { // Threshold for similarity
        highestSimilarity = similarity;
        bestMatch = key;
      }
    }
    
    if (bestMatch) {
      return universityInfo[bestMatch];
    }
    
    // Check for partial matches in each word of the query
    for (const word of queryWords) {
      if (word.length < 4) continue; // Skip short words
      
      for (const key in universityInfo) {
        if (key.includes(word)) {
          return universityInfo[key];
        }
      }
    }
    
    // No match found - return fallback message
    return fallbackReply;
  };

  // Function to handle bot responses
  const getBotResponse = (query: string) => {
    const response = searchDatabase(query);
    
    // If response is the fallback message, add the query to unanswered questions
    if (response === fallbackReply) {
      setUnansweredQuestions(prev => [...prev, query]);
    }
    
    return response;
  };

  // Export unanswered questions to Excel
  const exportUnansweredToExcel = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([["Unanswered User Questions"], ...unansweredQuestions.map(q => [q])]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Unanswered");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "unanswered_questions.xlsx");
  };

  // Initialize chat with welcome message
  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          id: '0',
          text: 'Hi, how may I help you?',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isChatOpen, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      
      const botResponseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: typeof botResponse === 'string' ? botResponse : 'Link response',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponseMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle suggested query selection
  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query);
  };

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsMinimized(false);
  };

  // Toggle chat minimized/maximized
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      {/* Main content - Mumbai University website simulation */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-800">Mumbai University</h1>
        <p className="mt-4 text-gray-600">Welcome to the official website of Mumbai University</p>
        
        {/* Export button for admin use */}
        <button
          onClick={exportUnansweredToExcel}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Export Unanswered Questions
        </button>
      </div>

      {/* Chat button */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {isChatOpen && (
        <div 
          className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-xl w-80 md:w-96 transition-all duration-300 flex flex-col ${
            isMinimized ? 'h-16' : 'h-[500px] max-h-[80vh]'
          }`}
        >
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <h3 className="font-medium">Mumbai University Assistant</h3>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleMinimize} 
                className="mr-2 hover:bg-blue-700 p-1 rounded"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <button 
                onClick={toggleChat} 
                className="hover:bg-blue-700 p-1 rounded"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat body - only visible when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="text-left mb-4">
                    <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested queries - only show after welcome message and if no other messages */}
              {messages.length === 1 && (
                <div className="px-4 pb-2">
                  <p className="text-sm text-gray-500 mb-2">Suggested queries:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQueries.map((query) => (
                      <button
                        key={query.id}
                        onClick={() => handleSuggestedQuery(query.text)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-full transition-colors"
                      >
                        {query.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="border-t p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your question here..."
                    className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;