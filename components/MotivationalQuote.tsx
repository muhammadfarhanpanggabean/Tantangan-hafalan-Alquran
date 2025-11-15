import React from 'react';

interface MotivationalQuoteProps {
  quote: string;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ quote }) => {
  return (
    <div className="w-full max-w-2xl text-center mb-8">
      <p className="text-lg italic text-slate-600">
        "{quote}"
      </p>
    </div>
  );
};

export default MotivationalQuote;