import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/LoadingBar.css'; // Import du fichier CSS personnalisé

const LoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Commencer le chargement quand la route change
    setLoading(true);
    setProgress(0);

    // Simuler une progression de chargement réaliste
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          return prev; // Ralentir vers la fin
        }
        return prev + Math.random() * 20; // Progression plus rapide au début
      });
    }, 80);

    // Simuler la fin du chargement après un délai variable
    const loadingTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300); // Petite pause pour voir la completion
    }, 600 + Math.random() * 600); // Entre 600ms et 1200ms

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimeout);
    };
  }, [location]);

  if (!loading) return null;

  return (
    <div className="loading-bar-container">
      <div 
        className="progress loading-bar-progress" 
        role="progressbar" 
        aria-label="Chargement de la page" 
        aria-valuenow={Math.round(progress)} 
        aria-valuemin="0" 
        aria-valuemax="100"
      >
        <div 
          className="progress-bar progress-bar-striped progress-bar-animated loading-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
