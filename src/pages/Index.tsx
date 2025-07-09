
import React, { useState, useEffect } from 'react';
import PomodoroTimer from '@/components/PomodoroTimer';
import NinjaCharacter from '@/components/NinjaCharacter';
import AdventureMap from '@/components/AdventureMap';
import BreakAnimation from '@/components/BreakAnimation';
import StatsPanel from '@/components/StatsPanel';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  // Game State
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [unlockedLocations, setUnlockedLocations] = useState<number[]>([1]);
  
  // Stats
  const [todaySessions, setTodaySessions] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [weekSessions, setWeekSessions] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(1);

  const { toast } = useToast();

  // Calculate EXP needed for next level
  const getExpToNext = (currentLevel: number) => {
    return currentLevel * 100;
  };

  const expToNext = getExpToNext(level);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('naruto-pomodoro-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setLevel(data.level || 1);
      setExp(data.exp || 0);
      setTotalSessions(data.totalSessions || 0);
      setUnlockedLocations(data.unlockedLocations || [1]);
      setTodaySessions(data.todaySessions || 0);
      setTodayMinutes(data.todayMinutes || 0);
      setWeekSessions(data.weekSessions || 0);
      setCurrentStreak(data.currentStreak || 1);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      level,
      exp,
      totalSessions,
      unlockedLocations,
      todaySessions,
      todayMinutes,
      weekSessions,
      currentStreak
    };
    localStorage.setItem('naruto-pomodoro-data', JSON.stringify(dataToSave));
  }, [level, exp, totalSessions, unlockedLocations, todaySessions, todayMinutes, weekSessions, currentStreak]);

  const handleSessionComplete = () => {
    console.log('Session completed!');
    
    // Add EXP
    const expGained = 50;
    let newExp = exp + expGained;
    let newLevel = level;

    // Check for level up
    while (newExp >= getExpToNext(newLevel)) {
      newExp -= getExpToNext(newLevel);
      newLevel += 1;
      
      // Show level up notification
      toast({
        title: "🎉 Level Up!",
        description: `Selamat! Kamu sekarang adalah ${getRankName(newLevel)} Level ${newLevel}!`,
        duration: 5000,
      });

      // Unlock new locations
      const newLocationId = Math.floor(newLevel / 5) + 1;
      if (newLocationId <= 8 && !unlockedLocations.includes(newLocationId)) {
        setUnlockedLocations(prev => [...prev, newLocationId]);
        toast({
          title: "🗺️ Lokasi Baru Terbuka!",
          description: "Petualangan baru menantimu di peta!",
          duration: 3000,
        });
      }
    }

    setExp(newExp);
    setLevel(newLevel);
    setTotalSessions(prev => prev + 1);
    setTodaySessions(prev => prev + 1);
    setTodayMinutes(prev => prev + 25);
    setWeekSessions(prev => prev + 1);

    toast({
      title: "✅ Sesi Selesai!",
      description: `+${expGained} EXP gained! Kerja bagus, ninja!`,
      duration: 3000,
    });
  };

  const handleBreakStart = () => {
    console.log('Break started');
    setIsBreak(true);
    toast({
      title: "🍃 Waktu Istirahat!",
      description: "Biarkan chakra mu pulih kembali...",
      duration: 2000,
    });
  };

  const handleBreakEnd = () => {
    console.log('Break ended');
    setIsBreak(false);
    toast({
      title: "💪 Siap Melanjutkan!",
      description: "Semangat untuk sesi berikutnya!",
      duration: 2000,
    });
  };

  const getRankName = (level: number) => {
    if (level < 5) return "🥷 Genin";
    if (level < 10) return "🧑‍🎓 Chunin"; 
    if (level < 20) return "👤 Jonin";
    if (level < 30) return "🎭 ANBU";
    if (level < 50) return "🔥 Kage";
    return "🌟 Hokage";
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2">
            🍃 Ninja Pomodoro Quest
          </h1>
          <p className="text-gray-600 text-lg">
            Latih fokus mu seperti ninja sejati!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Timer Section */}
          <div className="lg:col-span-2">
            {isBreak ? (
              <BreakAnimation isBreak={isBreak} />
            ) : (
              <PomodoroTimer
                onSessionComplete={handleSessionComplete}
                onBreakStart={handleBreakStart}
                onBreakEnd={handleBreakEnd}
              />
            )}
          </div>

          {/* Character Section */}
          <div>
            <NinjaCharacter
              level={level}
              exp={exp}
              expToNext={expToNext}
              totalSessions={totalSessions}
            />
          </div>
        </div>

        {/* Adventure Map */}
        <div className="mb-8">
          <AdventureMap
            currentLevel={level}
            unlockedLocations={unlockedLocations}
          />
        </div>

        {/* Stats Panel */}
        <div>
          <StatsPanel
            todaySessions={todaySessions}
            todayMinutes={todayMinutes}
            weekSessions={weekSessions}
            totalSessions={totalSessions}
            currentStreak={currentStreak}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl">
          <p className="text-gray-700 mb-2">
            🎯 <strong>"Jangan menyerah sampai mimpi mu menjadi kenyataan!"</strong>
          </p>
          <p className="text-sm text-gray-600">
            - Uzumaki Naruto
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
