
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PomodoroTimerProps {
  onSessionComplete: () => void;
  onBreakStart: () => void;
  onBreakEnd: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  onSessionComplete,
  onBreakStart, 
  onBreakEnd
}) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const WORK_TIME = 25 * 60; // 25 minutes
  const SHORT_BREAK = 5 * 60; // 5 minutes
  const LONG_BREAK = 15 * 60; // 15 minutes

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          if (isBreak) {
            onBreakEnd();
            startWorkSession();
          } else {
            onSessionComplete();
            setSessionCount(prev => prev + 1);
            startBreakSession();
          }
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, isBreak, onSessionComplete, onBreakStart, onBreakEnd]);

  const startWorkSession = () => {
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
    setIsActive(false);
  };

  const startBreakSession = () => {
    onBreakStart();
    const breakTime = sessionCount % 4 === 3 ? LONG_BREAK : SHORT_BREAK;
    setMinutes(Math.floor(breakTime / 60));
    setSeconds(0);
    setIsBreak(true);
    setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (isBreak) {
      const breakTime = sessionCount % 4 === 3 ? LONG_BREAK : SHORT_BREAK;
      setMinutes(Math.floor(breakTime / 60));
      setSeconds(0);
    } else {
      setMinutes(25);
      setSeconds(0);
    }
  };

  const totalSeconds = isBreak 
    ? (sessionCount % 4 === 3 ? LONG_BREAK : SHORT_BREAK)
    : WORK_TIME;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  return (
    <Card className="ninja-card chakra-glow">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <Clock className="mr-2 text-orange-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              {isBreak ? '🍃 Istirahat Ninja' : '🥷 Sesi Fokus'}
            </h2>
          </div>
          
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={isBreak ? "text-green-500" : "text-orange-500"}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-gray-800">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Sesi ke-{sessionCount + 1}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleTimer}
            className={`ninja-btn ${isActive ? 'bg-red-500 hover:bg-red-600' : ''}`}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
            <span className="ml-2">{isActive ? 'Pause' : 'Mulai'}</span>
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            className="border-orange-300 hover:bg-orange-50"
          >
            <RotateCcw size={20} />
            <span className="ml-2">Reset</span>
          </Button>
        </div>

        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {isBreak 
              ? "🧘‍♂️ Waktunya istirahat! Biarkan chakra mu pulih..."
              : "🎯 Fokus seperti ninja sejati! Jangan biarkan gangguan menghentikanmu!"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
