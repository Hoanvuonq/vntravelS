import { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

const generateRandomData = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
        value1: Math.floor(Math.random() * 1000) + 100,
        value2: Math.floor(Math.random() * 800) + 200,
    }));
};

const Chart = () => {
    const [data, setData] = useState(generateRandomData(12));
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        const updateData = () => {
            setData(generateRandomData(windowWidth < 768 ? 8 : 16));
        };

        const interval = setInterval(updateData, 5000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    return (
        <div className="w-full xl:h-[20vw] h-[40vw]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Tooltip />
                    <Bar dataKey="value1" fill="#8884d8" />
                    <Bar dataKey="value2" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
