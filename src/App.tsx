import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Initial setup for No button position
  useEffect(() => {
    if (noButtonRef.current) {
      const rect = noButtonRef.current.getBoundingClientRect();
      setNoPosition({ top: rect.top, left: rect.left });
    }
  }, []);

  const moveNoButton = () => {
    const margin = 100;
    const maxX = window.innerWidth - (noButtonRef.current?.offsetWidth || 100) - margin;
    const maxY = window.innerHeight - (noButtonRef.current?.offsetHeight || 50) - margin;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoPosition({ top: newY, left: newX });
    setHasMovedNo(true);
  };

  if (accepted) {
    return (
      <div className="container success">
        <div className="heart-bg"></div>
        <div className="content">
          <h1>YAAAAAY! ❤️</h1>
          <div className="image-frame pulse">
            <img src="/gf.png" alt="My Beautiful Girlfriend" className="gf-photo" />
          </div>
          <p className="message">I knew you'd say yes! Can't wait to see you soon! 😍</p>
          <div className="floating-hearts">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}>❤️</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Hey Beautiful... 🌹</h1>
        <div className="image-frame">
          <img src="/gf.png" alt="My Beautiful Girlfriend" className="gf-photo" />
        </div>
        <h2 className="question">Will you go on a date with me?</h2>
        
        <div className="button-group">
          <button 
            className="yes-btn" 
            onClick={() => setAccepted(true)}
          >
            YES! 😍
          </button>
          
          <button
            ref={noButtonRef}
            className="no-btn"
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={hasMovedNo ? { position: 'fixed', top: noPosition.top, left: noPosition.left } : {}}
          >
            No 🥺
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
