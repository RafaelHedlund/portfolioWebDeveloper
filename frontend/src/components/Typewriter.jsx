import React, { useEffect, useState } from 'react';

export default function Typewriter({
  texts = [],
  speed = 100,
  pause = 1500,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex % texts.length];

    const handleTyping = () => {
      if (!isDeleting) {
        // digitando
        setDisplayedText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // apagando
        setDisplayedText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting, speed, pause]);

  return (
    <span className="border-r-2 border-purple-600 animate-blink-caret">
      {displayedText}
    </span>
  );
}
