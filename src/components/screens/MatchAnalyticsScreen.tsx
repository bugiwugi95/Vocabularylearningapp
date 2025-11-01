import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { TeamGraph } from '../TeamGraph';
import { Upload, Play, CheckCircle2, TrendingUp } from 'lucide-react';

interface MatchAnalyticsScreenProps {
  matchId: number | null;
  showUpload?: boolean;
}

const playerStats = [
  { id: 1, name: 'Иванов', number: 10, possession: 8.5, passes: 67, losses: 3, shots: 5, accuracy: 89 },
  { id: 2, name: 'Петров', number: 7, possession: 7.2, passes: 54, losses: 5, shots: 3, accuracy: 85 },
  { id: 3, name: 'Сидоров', number: 9, possession: 6.8, passes: 42, losses: 4, shots: 7, accuracy: 78 },
  { id: 4, name: 'Козлов', number: 5, possession: 9.1, passes: 78, losses: 2, shots: 1, accuracy: 92 },
  { id: 5, name: 'Смирнов', number: 3, possession: 7.5, passes: 58, losses: 3, shots: 2, accuracy: 88 },
  { id: 6, name: 'Волков', number: 11, possession: 5.9, passes: 38, losses: 6, shots: 4, accuracy: 75 },
];

const graphData = {
  nodes: [
    { id: 1, name: 'Иванов', number: 10 },
    { id: 2, name: 'Петров', number: 7 },
    { id: 3, name: 'Сидоров', number: 9 },
    { id: 4, name: 'Козлов', number: 5 },
    { id: 5, name: 'Смирнов', number: 3 },
    { id: 6, name: 'Волков', number: 11 },
  ],
  links: [
    { source: 1, target: 2, strength: 15, accuracy: 90 },
    { source: 1, target: 3, strength: 12, accuracy: 85 },
    { source: 2, target: 3, strength: 8, accuracy: 78 },
    { source: 4, target: 1, strength: 18, accuracy: 92 },
    { source: 4, target: 5, strength: 14, accuracy: 88 },
    { source: 5, target: 2, strength: 10, accuracy: 82 },
    { source: 6, target: 3, strength: 9, accuracy: 75 },
    { source: 1, target: 6, strength: 7, accuracy: 80 },
  ],
};

export function MatchAnalyticsScreen({ matchId, showUpload }: MatchAnalyticsScreenProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(!showUpload);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsAnalyzed(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6" />
          <h1>Аналитика матча</h1>
        </div>
        <p className="text-blue-100">ФК Спартак • 28 окт 2025</p>
      </div>

      <div className="p-4 -mt-4">
        {/* Upload Section */}
        {!isAnalyzed && (
          <Card className="p-6 mb-6 border-2 border-blue-200">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-blue-900 mb-2">Загрузка видео матча</h2>
              <p className="text-slate-600 mb-4">
                Загрузите видео для анализа через Match Analyzer Service
              </p>

              {!isUploading && uploadProgress === 0 && (
                <Button
                  onClick={handleUpload}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить видео
                </Button>
              )}

              {isUploading && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600">Обработка видео...</span>
                    <span className="text-blue-600">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-slate-500 mt-2">
                    Анализ передач, владения и событий
                  </p>
                </div>
              )}

              {!isUploading && uploadProgress === 100 && (
                <div className="w-full">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Анализ завершён!</span>
                  </div>
                  <Button
                    onClick={() => setIsAnalyzed(true)}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Посмотреть результаты
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Analytics Content */}
        {isAnalyzed && (
          <>
            {/* Match Summary */}
            <Card className="p-4 mb-4 border-2 border-blue-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-slate-600 mb-1">Владение</div>
                  <div className="text-blue-900">58%</div>
                </div>
                <div>
                  <div className="text-slate-600 mb-1">Передачи</div>
                  <div className="text-blue-900">487</div>
                </div>
                <div>
                  <div className="text-slate-600 mb-1">Удары</div>
                  <div className="text-blue-900">18</div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="table" className="mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="table">Таблица</TabsTrigger>
                <TabsTrigger value="graph">Граф</TabsTrigger>
              </TabsList>

              <TabsContent value="table">
                <Card className="overflow-hidden border-2 border-blue-100">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-50">
                          <TableHead className="text-blue-900">№</TableHead>
                          <TableHead className="text-blue-900">Игрок</TableHead>
                          <TableHead className="text-blue-900">Владение</TableHead>
                          <TableHead className="text-blue-900">Передачи</TableHead>
                          <TableHead className="text-blue-900">Потери</TableHead>
                          <TableHead className="text-blue-900">Удары</TableHead>
                          <TableHead className="text-blue-900">Точность</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerStats.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell>{player.number}</TableCell>
                            <TableCell className="text-slate-900">{player.name}</TableCell>
                            <TableCell>{player.possession} мин</TableCell>
                            <TableCell>{player.passes}</TableCell>
                            <TableCell className="text-red-600">{player.losses}</TableCell>
                            <TableCell>{player.shots}</TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={
                                  player.accuracy >= 85
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }
                              >
                                {player.accuracy}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-slate-600">
                    <strong className="text-blue-900">Легенда:</strong> Владение — время с мячом, 
                    Передачи — успешные передачи, Потери — потери мяча, Удары — удары по воротам, 
                    Точность — процент успешных передач
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="graph">
                <Card className="p-4 border-2 border-blue-100">
                  <h3 className="text-blue-900 mb-4">Граф взаимодействий игроков</h3>
                  <TeamGraph data={graphData} />
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-slate-600">
                      <strong className="text-blue-900">Граф показывает:</strong> Узлы — игроки, 
                      линии — передачи между игроками. Толщина линии — количество передач, 
                      цвет — точность (зелёный ≥85%, жёлтый {'<'}85%)
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
