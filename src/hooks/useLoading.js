import { useState, useCallback } from 'react';

// Hook personnalisé pour gérer les états de chargement
export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);
  }, []);

  const updateProgress = useCallback((value) => {
    setProgress(Math.min(100, Math.max(0, value)));
  }, []);

  const finishLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
  }, []);

  return {
    loading,
    progress,
    startLoading,
    updateProgress,
    finishLoading
  };
};

// Composant de barre de progression personnalisable
export const CustomLoadingBar = ({ loading, progress, className = "", style = {} }) => {
  if (!loading) return null;

  return (
    <div 
      className={`progress ${className}`}
      role="progressbar" 
      aria-label="Chargement en cours" 
      aria-valuenow={Math.round(progress)} 
      aria-valuemin="0" 
      aria-valuemax="100"
      style={{
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        ...style
      }}
    >
      <div 
        className="progress-bar progress-bar-striped progress-bar-animated" 
        style={{ 
          width: `${progress}%`,
          background: 'linear-gradient(45deg, #28a745, #20c997)',
          transition: 'width 0.2s ease'
        }}
      />
    </div>
  );
};
