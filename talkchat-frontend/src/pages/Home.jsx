import React, { useState, useEffect } from 'react';

// Custom hook for the typing animation effect
interface TypingEffectOptions {
  loop?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
}

const useTypingEffect = (words: string[], options: TypingEffectOptions = {}): string => {
  const { loop = true, typeSpeed = 150, deleteSpeed = 100, delay = 1000 } = options;
  
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  
  useEffect(() => {
    if (index >= words.length && !loop) {
      return;
    }

    const currentWord = words[index % words.length];

    if (isDeleting) {
      if (subIndex > 0) {
        const timeout = setTimeout(() => {
          setText(currentWord.substring(0, subIndex - 1));
          setSubIndex(subIndex - 1);
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setIndex(prevIndex => (prevIndex + 1));
        setSubIndex(0); 
        return;
      }
    } else {
      if (subIndex < currentWord.length) {
        const timeout = setTimeout(() => {
          setText(currentWord.substring(0, subIndex + 1));
          setSubIndex(subIndex + 1);
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsDeleting(true), delay);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, isDeleting, index, words, loop, typeSpeed, deleteSpeed, delay]);

  return text;
};

// SVG Icon component for the logo
const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
      clipRule="evenodd"
    />
  </svg>
);

// Blinking cursor for the typing animation
const Cursor: React.FC = () => (
  <span className="inline-block w-1 h-9 md:h-10 ml-2 bg-cyan-400 animate-pulse" aria-hidden="true"></span>
);


// The main App component containing the entire homepage
const App: React.FC = () => {
  const phrases = [
    'Connect with your team.',
    'Share your ideas.',
    'Stay in sync.',
    'Collaborate seamlessly.',
    'Build something amazing.',
  ];

  const typedText = useTypingEffect(phrases, { typeSpeed: 100, deleteSpeed: 75, delay: 2000 });

  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-white overflow-x-hidden">
      <div className="absolute top-0 left-0 -z-0 w-full h-full bg-[radial-gradient(ellipse_80%80%_at_50%-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header Section */}
        <header className="py-4 px-4 sm:px-8 lg:px-16 w-full">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <a href="#" className="flex items-center space-x-3" aria-label="Homepage">
              <ChatIcon className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold tracking-tight text-white">ConnectSphere</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-300">Features</a>
              <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-300">Pricing</a>
              <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-300">Contact</a>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Login
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              The Future of Group Chat is Here.
            </h1>
            <div className="h-14 md:h-20 flex items-center justify-center">
              <p className="text-2xl md:text-4xl font-semibold text-cyan-400">
                {typedText}
                <Cursor />
              </p>
            </div>
            <p className="max-w-2xl mx-auto mt-6 text-base md:text-lg text-slate-300">
              ConnectSphere is a powerful, real-time communication platform designed for modern teams.
              Experience crystal-clear voice, high-quality video, and lightning-fast messaging.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                Get Started for Free
              </button>
              <button className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="w-full py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center text-slate-400 border-t border-slate-700 pt-6">
            <p>&copy; {new Date().getFullYear()} ConnectSphere. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;