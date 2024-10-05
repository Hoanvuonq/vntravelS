import React from 'react';

interface JourneyProgressProps {
    journeys: number;
    totalJourneys: number;
    className?: string;
    showBlockText?: boolean;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({ journeys, totalJourneys, className, showBlockText }) => {
    return (
        <div className={`shadow-custom-3 bg-white xl:rounded-[1vw] rounded-[3vw] xl:p-[1.2vw] p-[5vw] xl:gap-[1vw] flex flex-col gap-[3vw] ${className}`}>
            <div className="flex items-center justify-between wallet-item">
                <div className="flex items-center xl:gap-[0.5vw] gap-[1vw] ">
                    <p className="text-title">Hành Trình Hôm Nay: </p>
                    <div className="flex items-center xl:gap-[0.5vw] gap-[1vw]">
                        <p className="text-title">{journeys}</p>
                        <p className="text-title">/</p>
                        <p className="text-title">{totalJourneys}</p>
                    </div>
                </div>
                {showBlockText && <p className="text-ban !text-error uppercase">Block Hành Trình</p>}
            </div>
            <div className="progress xl:w-full w-full xl:!h-[0.5vw] !h-[2vw]">
                <div
                    className="progress-bar xl:h-[0.5vw] h-[2vw] facebook"
                    style={
                        {
                            '--progress-width': `${totalJourneys > 0 ? (journeys / totalJourneys) * 100 : 0}%`,
                        } as React.CSSProperties
                    }
                ></div>
            </div>
        </div>
    );
};

export default JourneyProgress;
