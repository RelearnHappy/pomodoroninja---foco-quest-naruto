
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Clock, Target, Zap } from 'lucide-react';

interface StatsPanelProps {
  todaySessions: number;
  todayMinutes: number;
  weekSessions: number;
  totalSessions: number;
  currentStreak: number;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  todaySessions,
  todayMinutes,
  weekSessions,
  totalSessions,
  currentStreak
}) => {
  return (
    <Card className="ninja-card">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <BarChart3 className="mr-2 text-orange-500" />
          📊 Statistik Ninja
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
            <Clock className="mx-auto mb-2 text-orange-600" size={24} />
            <div className="text-2xl font-bold text-orange-700">{todaySessions}</div>
            <div className="text-sm text-gray-600">Sesi Hari Ini</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
            <Target className="mx-auto mb-2 text-blue-600" size={24} />
            <div className="text-2xl font-bold text-blue-700">{todayMinutes}m</div>
            <div className="text-sm text-gray-600">Menit Hari Ini</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg">
            <Zap className="mx-auto mb-2 text-green-600" size={24} />
            <div className="text-2xl font-bold text-green-700">{currentStreak}</div>
            <div className="text-sm text-gray-600">Hari Berturut</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
            <BarChart3 className="mx-auto mb-2 text-purple-600" size={24} />
            <div className="text-2xl font-bold text-purple-700">{totalSessions}</div>
            <div className="text-sm text-gray-600">Total Sesi</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-sm font-medium text-gray-700">
              Target Minggu Ini: {weekSessions}/35 sesi
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((weekSessions / 35) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            🎯 "Konsistensi kecil mengalahkan usaha besar yang tidak konsisten"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
