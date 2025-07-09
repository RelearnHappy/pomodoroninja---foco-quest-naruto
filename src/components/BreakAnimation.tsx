
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BreakAnimationProps {
  isBreak: boolean;
}

const BreakAnimation: React.FC<BreakAnimationProps> = ({ isBreak }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const ninjaQuotes = [
    "🧘‍♂️ 'Istirahat adalah bagian dari latihan' - Kakashi",
    "🍃 'Bernafaslah seperti angin, tenang namun kuat' - Asuma", 
    "🌸 'Kekuatan sejati datang dari ketenangan pikiran' - Sakura",
    "🦊 'Bahkan Kyuubi butuh istirahat untuk mengumpulkan chakra' - Naruto",
    "⚡ 'Petir terkuat lahir dari keheningan' - Sasuke",
    "🐍 'Ular terkuat adalah yang tahu kapan harus diam' - Orochimaru"
  ];

  const ninjaActivities = [
    { emoji: "🧘‍♂️", text: "Bermeditasi di taman" },
    { emoji: "🍃", text: "Meniup daun dengan chakra" },
    { emoji: "🥢", text: "Makan ramen Ichiraku" },
    { emoji: "🌸", text: "Berjalan di kebun sakura" },
    { emoji: "☁️", text: "Memandangi awan" },
    { emoji: "🐸", text: "Berlatih dengan katak" }
  ];

  useEffect(() => {
    if (isBreak) {
      setShowAnimation(true);
      const interval = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % ninjaQuotes.length);
      }, 3000);
      
      return () => clearInterval(interval);
    } else {
      setShowAnimation(false);
    }
  }, [isBreak, ninjaQuotes.length]);

  if (!isBreak) return null;

  const currentActivity = ninjaActivities[currentQuote % ninjaActivities.length];

  return (
    <Card className={`ninja-card transition-all duration-500 ${showAnimation ? 'animate-fade-in' : ''}`}>
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4 ninja-spin">
            🌀
          </div>
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            Waktu Istirahat Ninja! 
          </h2>
          <p className="text-gray-600">
            Biarkan chakra mu pulih kembali...
          </p>
        </div>

        <div className="mb-8">
          <div className="text-4xl mb-3 float-animation">
            {currentActivity.emoji}
          </div>
          <p className="text-lg text-gray-700 font-medium">
            {currentActivity.text}
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 rounded-2xl mb-6">
          <p className="text-sm italic text-gray-700 transition-all duration-500">
            {ninjaQuotes[currentQuote]}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl mb-1">🫁</div>
            <p className="text-xs text-gray-600">Tarik Nafas</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-1">💧</div>
            <p className="text-xs text-gray-600">Minum Air</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-1">👀</div>
            <p className="text-xs text-gray-600">Istirahat Mata</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-orange-400 chakra-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakAnimation;
