import { Card } from './ui/card';
import { Check, Clock, BookOpen } from 'lucide-react';

interface VocabularyStatsProps {
  mastered: number;
  reviewLater: number;
  total: number;
}

export function VocabularyStats({ mastered, reviewLater, total }: VocabularyStatsProps) {
  const remaining = total - mastered - reviewLater;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-green-900">Mastered</p>
            <p className="text-green-700">{mastered} words</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-amber-900">Review Later</p>
            <p className="text-amber-700">{reviewLater} words</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-slate-50 border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-slate-900">To Learn</p>
            <p className="text-slate-700">{remaining} words</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
