import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatTime } from '../utils/gameLogic';

const TimerContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.time < 10 ? 'red' : 'black'};
`;

const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, onTimeUp]);

  return (
    <TimerContainer time={time}>
      {formatTime(time)}
    </TimerContainer>
  );
};

export default Timer;
