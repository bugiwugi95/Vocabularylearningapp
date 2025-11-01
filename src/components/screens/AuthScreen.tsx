import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ShieldCheck, TrendingUp } from 'lucide-react';

interface AuthScreenProps {
  onAuth: () => void;
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const telegramUser = {
    username: '@football_player',
    id: '123456789',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-xl border-2 border-blue-100">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-blue-900 mb-2">TeamChem</h1>
          <p className="text-center text-slate-600 mb-8">
            Аналитика команды и матчей
          </p>

          {/* User Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-blue-900">Авторизация через Telegram</span>
            </div>
            <div className="space-y-2 pl-8">
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Никнейм:</span>
                <Badge variant="secondary">{telegramUser.username}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-600">ID:</span>
                <span className="text-slate-700">{telegramUser.id}</span>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={onAuth}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Войти
          </Button>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-slate-500 text-center mb-4">Возможности приложения:</p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Статистика игроков и команды
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Анализ видео матчей
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Графы взаимодействий игроков
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Отслеживание химии команды
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
