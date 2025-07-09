
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Lock, CheckCircle } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  emoji: string;
  requiredLevel: number;
  description: string;
}

interface AdventureMapProps {
  currentLevel: number;
  unlockedLocations: number[];
}

const locations: Location[] = [
  { id: 1, name: "Desa Konoha", emoji: "🏘️", requiredLevel: 1, description: "Tempat awal perjalanan ninja" },
  { id: 2, name: "Hutan Maut", emoji: "🌲", requiredLevel: 5, description: "Tempat latihan survival" },
  { id: 3, name: "Gunung Myoboku", emoji: "⛰️", requiredLevel: 10, description: "Tempat para katak bijak" },
  { id: 4, name: "Desa Suna", emoji: "🏜️", requiredLevel: 15, description: "Desa tersembunyi di pasir" },
  { id: 5, name: "Pulau Kura-kura", emoji: "🏝️", requiredLevel: 20, description: "Tempat latihan Rasengan" },
  { id: 6, name: "Desa Kumo", emoji: "☁️", requiredLevel: 25, description: "Desa di atas awan" },
  { id: 7, name: "Lembah Akhir", emoji: "⚡", requiredLevel: 30, description: "Tempat pertarungan legendaris" },
  { id: 8, name: "Bulan Sage Mode", emoji: "🌙", requiredLevel: 40, description: "Dimensi chakra tertinggi" }
];

const AdventureMap: React.FC<AdventureMapProps> = ({ currentLevel, unlockedLocations }) => {
  const isLocationUnlocked = (location: Location) => {
    return currentLevel >= location.requiredLevel;
  };

  const isLocationVisited = (locationId: number) => {
    return unlockedLocations.includes(locationId);
  };

  return (
    <Card className="ninja-card">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MapPin className="mr-2 text-orange-500" />
          🗺️ Peta Petualangan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {locations.map((location) => {
            const unlocked = isLocationUnlocked(location);
            const visited = isLocationVisited(location.id);
            
            return (
              <div
                key={location.id}
                className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                  unlocked 
                    ? visited
                      ? 'border-green-300 bg-green-50 chakra-glow'
                      : 'border-orange-300 bg-orange-50 hover:bg-orange-100 cursor-pointer'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className={`text-2xl mb-2 ${unlocked ? 'float-animation' : ''}`}>
                    {unlocked ? location.emoji : '🔒'}
                  </div>
                  
                  <h4 className={`font-semibold text-sm mb-1 ${
                    unlocked ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {location.name}
                  </h4>
                  
                  <p className={`text-xs mb-2 ${
                    unlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {location.description}
                  </p>
                  
                  <div className="flex justify-center">
                    {visited ? (
                      <Badge className="bg-green-500 text-white text-xs">
                        <CheckCircle size={12} className="mr-1" />
                        Selesai
                      </Badge>
                    ) : unlocked ? (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Tersedia
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        <Lock size={12} className="mr-1" />
                        Lv.{location.requiredLevel}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
          <p className="text-sm text-center text-gray-700">
            🎯 Selesaikan sesi Pomodoro untuk membuka lokasi baru dan menjelajahi dunia ninja!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdventureMap;
