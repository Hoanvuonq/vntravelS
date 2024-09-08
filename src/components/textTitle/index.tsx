import React from 'react';

interface TextTitleProps {
    title: string;
    className?: string;
}

const TextTitle: React.FC<TextTitleProps> = ({ title, className = '' }) => {
    return (
        <div>
            <h1 className={`font-bold bai-jamjuree pt-[1vw] text-title ${className}`}>{title}</h1>
        </div>
    );
};

export default TextTitle;
