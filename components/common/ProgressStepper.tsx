import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepperProps {
  current: number; // 1-5
  total?: number;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ current, total = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: total }).map((_, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum <= current;
        const isCurrent = stepNum === current;
        const isLast = index === total - 1;

        return (
          <React.Fragment key={index}>
            <div 
              className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all
                ${isCompleted 
                  ? 'bg-teal border-teal text-bg-primary shadow-[0_0_12px_rgba(45,212,191,0.4)]' 
                  : isCurrent
                    ? 'bg-transparent border-teal text-teal'
                    : 'bg-bg-secondary/60 border-text-tertiary/40 text-text-secondary'
                }
              `}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : stepNum}
            </div>
            {!isLast && (
              <div 
                className={`w-8 h-0.5 transition-all ${stepNum < current ? 'bg-teal' : 'bg-text-tertiary/30'}`} 
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};