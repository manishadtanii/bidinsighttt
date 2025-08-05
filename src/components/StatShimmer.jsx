import React from 'react';

const StatShimmer = () => {
  const skeletons = Array(5).fill(0); // Changed to 5 to match your stats count

  return (
    <>
      <style jsx>{`
        @keyframes shimmerFlow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.08) 25%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.08) 75%,
            rgba(255, 255, 255, 0.03) 100%
          );
          background-color: rgba(255, 255, 255, 0.04);
          background-size: 200% 100%;
          animation: shimmerFlow 2s infinite ease-in-out;
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: shimmerSlide 2s infinite ease-in-out;
        }

        @keyframes shimmerSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      <div className="flex gap-3">
        {skeletons.map((_, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl h-14 w-40 bg-[#1B1F3A] shimmer-effect"
            style={{ animationDelay: `${idx * 0.1}s` }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default StatShimmer;