import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TeamGraph } from '../TeamGraph';
import { User, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const players = [
  { id: 1, name: 'Иванов', number: 10 },
  { id: 2, name: 'Петров', number: 7 },
  { id: 3, name: 'Сидоров', number: 9 },
  { id: 4, name: 'Козлов', number: 5 },
  { id: 5, name: 'Смирнов', number: 3 },
];

const playerData = {
  possession: { total: 68.5, avg: 8.5, trend: 'up' },
  passes: { total: 534, avg: 67, trend: 'up' },
  losses: { total: 24, avg: 3, trend: 'down' },
  shots: { total: 40, avg: 5, trend: 'same' },
};

const matchHistory = [
  { match: 'ФК Спартак', date: '28 окт', possession: 8.5, passes: 67, losses: 3, shots: 5 },
  { match: 'ФК Зенит', date: '21 окт', possession: 7.8, passes: 54, losses: 4, shots: 4 },
  { match: 'ФК ЦСКА', date: '14 окт', possession: 8.9, passes: 71, losses: 2, shots: 6 },
  { match: 'ФК Динамо', date: '7 окт', possession: 9.2, passes: 78, losses: 1, shots: 7 },
];

const playerGraphData = {
  nodes: [
    { id: 1, name: 'Иванов', number: 10 },
    { id: 2, name: 'Петров', number: 7 },
    { id: 3, name: 'Сидоров', number: 9 },
    { id: 4, name: 'Козлов', number: 5 },
    { id: 5, name: 'Смирнов', number: 3 },
  ],
  links: [
    { source: 1, target: 2, strength: 15, accuracy: 90 },
    { source: 1, target: 3, strength: 12, accuracy: 85 },
    { source: 1, target: 4, strength: 18, accuracy: 92 },
    { source: 1, target: 5, strength: 10, accuracy: 88 },
  ],
};

export function PlayerScreen() {
  const [selectedPlayer, setSelectedPlayer] = useState('1');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6" />
          <h1>Статистика игрока</h1>
        </div>

        {/* Player Selector */}
        <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
          <SelectTrigger className="w-full bg-white text-slate-900 h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {players.map((player) => (
              <SelectItem key={player.id} value={player.id.toString()}>
                #{player.number} {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 -mt-4">
        {/* Player Info */}
        <Card className="p-4 mb-4 border-2 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white">10</span>
            </div>
            <div>
              <h2 className="text-blue-900">Иванов</h2>
              <p className="text-slate-600">Полузащитник • 8 матчей</p>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Владение</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-blue-900 mb-1">{playerData.possession.total} мин</div>
            <div className="text-slate-500">Средн.: {playerData.possession.avg} мин</div>
          </Card>

          <Card className="p-4 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Передачи</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-blue-900 mb-1">{playerData.passes.total}</div>
            <div className="text-slate-500">Средн.: {playerData.passes.avg}</div>
          </Card>

          <Card className="p-4 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Потери</span>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-red-600 mb-1">{playerData.losses.total}</div>
            <div className="text-slate-500">Средн.: {playerData.losses.avg}</div>
          </Card>

          <Card className="p-4 border-2 border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Удары</span>
              <Minus className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-blue-900 mb-1">{playerData.shots.total}</div>
            <div className="text-slate-500">Средн.: {playerData.shots.avg}</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="matches" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="matches">История</TabsTrigger>
            <TabsTrigger value="connections">Связи</TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            <div className="space-y-3">
              {matchHistory.map((match, idx) => (
                <Card key={idx} className="p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-900">{match.match}</h3>
                    <span className="text-slate-500">{match.date}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <div className="text-slate-500">Владение</div>
                      <div className="text-blue-900">{match.possession}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Передачи</div>
                      <div className="text-blue-900">{match.passes}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Потери</div>
                      <div className="text-red-600">{match.losses}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Удары</div>
                      <div className="text-blue-900">{match.shots}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections">
            <Card className="p-4 border-2 border-blue-100">
              <h3 className="text-blue-900 mb-4">Связи с другими игроками</h3>
              <TeamGraph data={playerGraphData} highlightNode={1} />
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-slate-600">
                  <strong className="text-blue-900">Лучшая связь:</strong> с Козловым (18 передач, 92% точность)
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
