import { useEffect, useState } from 'react';

const BackgroundAnimation = ({ darkMode }) => {
  const [videoSrc, setVideoSrc] = useState('/animations/light_bg.webm');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Start transition when dark mode changes
    setIsTransitioning(true);

    // Short delay to allow fade out
    const timeout = setTimeout(() => {
      setVideoSrc(darkMode ? '/animations/dark_bg.webm' : '/animations/light_bg.webm');
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-50/20 to-green-50/20 dark:from-transparent dark:via-gray-800/30 dark:to-gray-900/30 transition-all duration-500"></div>
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-40 dark:opacity-30'
        }`}
        style={{
          mixBlendMode: darkMode ? 'lighten' : 'multiply',
          filter: darkMode ? 'brightness(0.8)' : 'brightness(1.1)'
        }}
      >
        <source src={videoSrc} type="video/webm" />
      </video>
    </div>
  );
};

export default BackgroundAnimation;
