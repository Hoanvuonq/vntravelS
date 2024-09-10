import React from 'react';

interface TextTitleProps {
    title: string;
    className?: string;
}

const TextTitle: React.FC<TextTitleProps> = ({ title, className = '' }) => {
    return (
        <div className="title">
            <h1 className={`font-bold bai-jamjuree text-title ${className}`}>{title}</h1>
        </div>
    );
};

export default TextTitle;
