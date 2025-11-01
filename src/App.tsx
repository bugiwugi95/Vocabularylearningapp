import { useState } from 'react';
import { AuthScreen } from './components/screens/AuthScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { MatchAnalyticsScreen } from './components/screens/MatchAnalyticsScreen';
import { PlayerScreen } from './components/screens/PlayerScreen';
import { TeamScreen } from './components/screens/TeamScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Home, Users, User, Upload } from 'lucide-react';

type Screen = 'auth' | 'dashboard' | 'match' | 'player' | 'team' | 'upload';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const handleAuth = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const navigateToMatch = (matchId: number) => {
    setSelectedMatchId(matchId);
    setCurrentScreen('match');
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      return <AuthScreen onAuth={handleAuth} />;
    }

    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onMatchSelect={navigateToMatch} />;
      case 'match':
        return <MatchAnalyticsScreen matchId={selectedMatchId} />;
      case 'player':
        return <PlayerScreen />;
      case 'team':
        return <TeamScreen />;
      case 'upload':
        return <MatchAnalyticsScreen matchId={selectedMatchId} showUpload />;
      default:
        return <DashboardScreen onMatchSelect={navigateToMatch} />;
    }
  };

  const navigationItems = [
    { id: 'dashboard' as Screen, label: 'Главная', icon: Home },
    { id: 'player' as Screen, label: 'Игрок', icon: User },
    { id: 'team' as Screen, label: 'Команда', icon: Users },
    { id: 'upload' as Screen, label: 'Загрузка', icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {renderScreen()}
      
      {isAuthenticated && (
        <BottomNavigation
          items={navigationItems}
          activeItem={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  );
}
