// components/LoadingOverlay.tsx
const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
      <style jsx>{`
        .ball {
          width: 15px;
          height: 15px;
          background-color: #F87315;
          border-radius: 50%;
          animation: bounce 0.6s infinite alternate;
        }
        
        .ball:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .ball:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes bounce {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
