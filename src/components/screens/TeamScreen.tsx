import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TeamGraph } from '../TeamGraph';
import { Users, TrendingUp, Filter } from 'lucide-react';

const teamGraphData = {
  nodes: [
    { id: 1, name: 'Иванов', number: 10 },
    { id: 2, name: 'Петров', number: 7 },
    { id: 3, name: 'Сидоров', number: 9 },
    { id: 4, name: 'Козлов', number: 5 },
    { id: 5, name: 'Смирнов', number: 3 },
    { id: 6, name: 'Волков', number: 11 },
    { id: 7, name: 'Орлов', number: 8 },
    { id: 8, name: 'Медведев', number: 2 },
  ],
  links: [
    { source: 1, target: 2, strength: 15, accuracy: 90 },
    { source: 1, target: 3, strength: 12, accuracy: 85 },
    { source: 1, target: 4, strength: 18, accuracy: 92 },
    { source: 2, target: 3, strength: 8, accuracy: 78 },
    { source: 4, target: 5, strength: 14, accuracy: 88 },
    { source: 5, target: 2, strength: 10, accuracy: 82 },
    { source: 6, target: 3, strength: 9, accuracy: 75 },
    { source: 1, target: 6, strength: 7, accuracy: 80 },
    { source: 7, target: 4, strength: 11, accuracy: 86 },
    { source: 8, target: 5, strength: 13, accuracy: 89 },
    { source: 2, target: 7, strength: 6, accuracy: 77 },
    { source: 3, target: 8, strength: 5, accuracy: 74 },
  ],
};

const playerComparison = [
  { id: 1, name: 'Иванов', number: 10, connections: 4, topPartner: 'Козлов', losses: 3, chemistry: 92 },
  { id: 2, name: 'Петров', number: 7, connections: 4, topPartner: 'Иванов', losses: 5, chemistry: 85 },
  { id: 3, name: 'Сидоров', number: 9, connections: 4, topPartner: 'Иванов', losses: 4, chemistry: 82 },
  { id: 4, name: 'Козлов', number: 5, connections: 3, topPartner: 'Иванов', losses: 2, chemistry: 95 },
  { id: 5, name: 'Смирнов', number: 3, connections: 3, topPartner: 'Козлов', losses: 3, chemistry: 88 },
  { id: 6, name: 'Волков', number: 11, connections: 2, topPartner: 'Сидоров', losses: 6, chemistry: 78 },
];

export function TeamScreen() {
  const [selectedMatch, setSelectedMatch] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6" />
          <h1>Команда</h1>
        </div>
        <p className="text-blue-100">Химия и взаимодействия</p>
      </div>

      <div className="p-4 -mt-4">
        {/* Team Chemistry Score */}
        <Card className="p-6 mb-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-blue-900">Химия команды</h2>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-blue-900 mb-1">87%</div>
          <p className="text-slate-600">Отличное взаимодействие игроков</p>
          <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '87%' }} />
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-4 mb-4 border-2 border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-blue-600" />
            <h3 className="text-blue-900">Фильтры</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-600 mb-2 block">Матч</label>
              <Select value={selectedMatch} onValueChange={setSelectedMatch}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все матчи</SelectItem>
                  <SelectItem value="1">ФК Спартак</SelectItem>
                  <SelectItem value="2">ФК Зенит</SelectItem>
                  <SelectItem value="3">ФК ЦСКА</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-slate-600 mb-2 block">Период</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Весь сезон</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="week">Неделя</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="graph" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="graph">Граф</TabsTrigger>
            <TabsTrigger value="comparison">Сравнение</TabsTrigger>
          </TabsList>

          <TabsContent value="graph">
            <Card className="p-4 border-2 border-blue-100">
              <h3 className="text-blue-900 mb-4">Граф взаимодействий команды</h3>
              <TeamGraph data={teamGraphData} />
              
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-900">
                    <strong>Лучшая связь:</strong> Иванов → Козлов (18 передач, 92%)
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-slate-600">
                    <strong className="text-blue-900">Центральные игроки:</strong> Иванов, Козлов, Смирнов
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="space-y-3">
              {playerComparison.map((player) => (
                <Card key={player.id} className="p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white">{player.number}</span>
                      </div>
                      <div>
                        <h3 className="text-slate-900">{player.name}</h3>
                        <p className="text-slate-500">
                          {player.connections} связи
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={
                        player.chemistry >= 90
                          ? 'bg-green-600 text-white'
                          : player.chemistry >= 80
                          ? 'bg-blue-600 text-white'
                          : 'bg-yellow-600 text-white'
                      }
                    >
                      {player.chemistry}%
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                    <div>
                      <div className="text-slate-500">Лучший партнёр</div>
                      <div className="text-blue-900">{player.topPartner}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Потери за матч</div>
                      <div className="text-red-600">{player.losses}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-blue-900 mb-2">Рекомендации</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <span>Увеличить взаимодействие Волкова с центральными игроками</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <span>Снизить количество потерь у Волкова и Петрова</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2" />
                  <span>Связка Иванов-Козлов показывает лучшие результаты</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
