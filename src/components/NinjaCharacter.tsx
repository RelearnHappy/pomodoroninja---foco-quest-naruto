
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface NinjaCharacterProps {
  level: number;
  exp: number;
  expToNext: number;
  totalSessions: number;
}

const NinjaCharacter: React.FC<NinjaCharacterProps> = ({
  level,
  exp,
  expToNext,
  totalSessions
}) => {
  const getRankName = (level: number) => {
    if (level < 5) return "🥷 Genin";
    if (level < 10) return "🧑‍🎓 Chunin"; 
    if (level < 20) return "👤 Jonin";
    if (level < 30) return "🎭 ANBU";
    if (level < 50) return "🔥 Kage";
    return "🌟 Hokage";
  };

  const getNinjaEmoji = (level: number) => {
    if (level < 5) return "🥷";
    if (level < 10) return "🧑‍🎓";
    if (level < 20) return "👤";
    if (level < 30) return "🎭";
    if (level < 50) return "🔥";
    return "🌟";
  };

  const expProgress = (exp / expToNext) * 100;

  return (
    <Card className="ninja-card">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3 float-animation">
            {getNinjaEmoji(level)}
          </div>
          <Badge className="mb-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            Level {level}
          </Badge>
          <h3 className="text-xl font-bold text-gray-800">
            {getRankName(level)}
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>EXP</span>
              <span>{exp} / {expToNext}</span>
            </div>
            <div className="relative">
              <Progress 
                value={expProgress} 
                className="h-3 bg-gray-200"
              />
              <div 
                className="level-progress absolute top-0 left-0 h-3 rounded-full"
                style={{ width: `${expProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{totalSessions}</div>
              <div className="text-xs text-gray-600">Sesi Selesai</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{Math.floor(totalSessions * 25 / 60)}h</div>
              <div className="text-xs text-gray-600">Total Fokus</div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
          <p className="text-xs text-center text-gray-700">
            💪 "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras!"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NinjaCharacter;
