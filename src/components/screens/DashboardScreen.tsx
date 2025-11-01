import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Activity, Percent, Send, AlertCircle, Target, Calendar, MapPin } from 'lucide-react';

interface DashboardScreenProps {
  onMatchSelect: (matchId: number) => void;
}

const matches = [
  { id: 1, date: '28 окт 2025', opponent: 'ФК Спартак', location: 'Дома', score: '2:1', status: 'win' },
  { id: 2, date: '21 окт 2025', opponent: 'ФК Зенит', location: 'В гостях', score: '1:1', status: 'draw' },
  { id: 3, date: '14 окт 2025', opponent: 'ФК ЦСКА', location: 'Дома', score: '0:2', status: 'loss' },
  { id: 4, date: '7 окт 2025', opponent: 'ФК Динамо', location: 'В гостях', score: '3:0', status: 'win' },
];

const teamStats = [
  { label: 'Владение', value: '58%', icon: Percent, color: 'blue' },
  { label: 'Передачи', value: '487', icon: Send, color: 'blue' },
  { label: 'Удары', value: '18', icon: Target, color: 'blue' },
  { label: 'Потери', value: '23', icon: AlertCircle, color: 'red' },
];

export function DashboardScreen({ onMatchSelect }: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-6 h-6" />
          <h1>Главная</h1>
        </div>
        <p className="text-blue-100">Статистика и результаты</p>
      </div>

      <div className="p-4 -mt-4">
        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {teamStats.map((stat) => (
            <Card key={stat.label} className="p-4 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full ${stat.color === 'blue' ? 'bg-blue-100' : 'bg-red-100'} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color === 'blue' ? 'text-blue-600' : 'text-red-600'}`} />
                </div>
              </div>
              <div className="text-slate-600 mb-1">{stat.label}</div>
              <div className="text-blue-900">{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Last Match */}
        <div className="mb-4">
          <h2 className="text-blue-900 mb-3">Последний матч</h2>
          <Card className="p-4 border-2 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">{matches[0].date}</span>
              </div>
              <Badge className="bg-green-600 text-white">Победа</Badge>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-blue-900">vs {matches[0].opponent}</span>
              <span className="text-blue-900">{matches[0].score}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">{matches[0].location}</span>
            </div>
            <Button
              onClick={() => onMatchSelect(matches[0].id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
            >
              Открыть аналитику
            </Button>
          </Card>
        </div>

        {/* All Matches */}
        <div>
          <h2 className="text-blue-900 mb-3">Все матчи</h2>
          <div className="space-y-3">
            {matches.slice(1).map((match) => (
              <Card
                key={match.id}
                className="p-4 border border-slate-200 cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => onMatchSelect(match.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-slate-600">{match.date}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      match.status === 'win'
                        ? 'bg-green-100 text-green-700'
                        : match.status === 'draw'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {match.status === 'win' ? 'Победа' : match.status === 'draw' ? 'Ничья' : 'Поражение'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900">vs {match.opponent}</span>
                  <span className="text-slate-900">{match.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-500">{match.location}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
