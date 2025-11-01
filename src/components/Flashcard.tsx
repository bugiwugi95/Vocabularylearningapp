import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Volume2, RotateCw, Check, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface Word {
  id: number;
  word: string;
  translation: string;
  example: string;
  partOfSpeech: string;
  language: string;
}

interface FlashcardProps {
  word: Word;
  isMastered: boolean;
  isReviewLater: boolean;
  onMastered: () => void;
  onReviewLater: () => void;
}

export function Flashcard({ word, isMastered, isReviewLater, onMastered, onReviewLater }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playPronunciation = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8; // Slightly slower for learning
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="perspective-1000 mb-6">
      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        {/* Front of Card */}
        <Card
          className={`p-8 cursor-pointer shadow-lg hover:shadow-xl transition-shadow min-h-[400px] flex flex-col justify-between ${
            isFlipped ? 'invisible' : 'visible'
          }`}
          style={{
            backfaceVisibility: 'hidden',
          }}
          onClick={handleFlip}
        >
          <div>
            <div className="flex items-start justify-between mb-6">
              <Badge variant="secondary" className="uppercase">
                {word.partOfSpeech}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation(word.word, word.language);
                }}
                className={isPlaying ? 'text-indigo-600' : ''}
              >
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-center py-12">
              <h2 className="text-indigo-900 mb-4">{word.word}</h2>
              <p className="text-slate-500 italic">Click to reveal definition</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <RotateCw className="w-5 h-5 text-slate-400" />
          </div>
        </Card>

        {/* Back of Card */}
        <Card
          className={`p-8 cursor-pointer shadow-lg hover:shadow-xl transition-shadow min-h-[400px] flex flex-col justify-between absolute top-0 left-0 w-full bg-gradient-to-br from-indigo-50 to-purple-50 ${
            isFlipped ? 'visible' : 'invisible'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          onClick={handleFlip}
        >
          <div>
            <div className="flex items-start justify-between mb-6">
              <Badge variant="secondary" className="uppercase">
                {word.partOfSpeech}
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation(word.word, word.language);
                  }}
                  className={isPlaying ? 'text-indigo-600' : ''}
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-indigo-900 mb-2">{word.word}</h3>
                <p className="text-slate-700">{word.translation}</p>
              </div>

              <div className="bg-white/50 rounded-lg p-4 border border-indigo-100">
                <p className="text-slate-600 italic">"{word.example}"</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <RotateCw className="w-5 h-5 text-slate-400" />
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-center">
        <Button
          variant={isReviewLater ? 'default' : 'outline'}
          onClick={onReviewLater}
          className={`gap-2 ${isReviewLater ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
        >
          <Clock className="w-4 h-4" />
          {isReviewLater ? 'Marked for Review' : 'Review Later'}
        </Button>
        <Button
          variant={isMastered ? 'default' : 'outline'}
          onClick={onMastered}
          className={`gap-2 ${isMastered ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          <Check className="w-4 h-4" />
          {isMastered ? 'Mastered!' : 'Mark as Mastered'}
        </Button>
      </div>
    </div>
  );
}
