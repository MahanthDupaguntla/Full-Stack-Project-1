import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const AuctionTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const end = DateTime.fromISO(endTime);
            const now = DateTime.now();
            const diff = end.diff(now, ['hours', 'minutes', 'seconds']);

            if (diff.as('seconds') <= 0) {
                return 'ENDED';
            }

            return `${Math.floor(diff.hours).toString().padStart(2, '0')}:${Math.floor(diff.minutes).toString().padStart(2, '0')}:${Math.floor(diff.seconds).toString().padStart(2, '0')}`;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <span className="font-mono text-xl text-accent">
            {timeLeft}
        </span>
    );
};

export default AuctionTimer;
