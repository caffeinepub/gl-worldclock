import { useState } from 'react';
import { Clock, Plus } from 'lucide-react';
import TimeZoneClockCard from '../components/TimeZoneClockCard';
import TimeZoneSelector from '../components/TimeZoneSelector';
import { useNow } from '../hooks/useNow';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { TIMEZONES, type TimeZoneInfo } from '../lib/timezones';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const DEFAULT_TIMEZONE_IDS = [
  'UTC',
  'America/New_York',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney'
];

export default function WorldTimeDashboard() {
  const now = useNow();
  const [selectedTimezoneIds, setSelectedTimezoneIds] = useLocalStorageState<string[]>(
    'world-clock-timezones',
    DEFAULT_TIMEZONE_IDS
  );
  const [showSelector, setShowSelector] = useState(false);

  const selectedTimezones = selectedTimezoneIds
    .map(id => TIMEZONES.find(tz => tz.id === id))
    .filter((tz): tz is TimeZoneInfo => tz !== undefined);

  const handleAddTimezone = (timezoneId: string) => {
    if (!selectedTimezoneIds.includes(timezoneId)) {
      setSelectedTimezoneIds([...selectedTimezoneIds, timezoneId]);
    }
    setShowSelector(false);
  };

  const handleRemoveTimezone = (timezoneId: string) => {
    setSelectedTimezoneIds(selectedTimezoneIds.filter(id => id !== timezoneId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Hero Image */}
      <header className="relative w-full overflow-hidden border-b border-border">
        <div className="relative h-48 md:h-64 w-full">
          <img
            src="/assets/generated/world-clock-hero.dim_1600x400.png"
            alt="gl.WorldClock Dashboard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:px-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-3">
              <div className="chroma-icon rounded-full p-2">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-black" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-chroma drop-shadow-lg">
                gl.WorldClock
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:px-8">
        {/* Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-muted-foreground">
            Showing {selectedTimezones.length} time zone{selectedTimezones.length !== 1 ? 's' : ''}
          </p>
          <Button
            onClick={() => setShowSelector(!showSelector)}
            variant="default"
            className="gap-2 chroma-border"
          >
            <Plus className="h-4 w-4" />
            Add Time Zone
          </Button>
        </div>

        {/* Time Zone Selector */}
        {showSelector && (
          <Card className="mb-8 p-6">
            <TimeZoneSelector
              selectedTimezoneIds={selectedTimezoneIds}
              onSelect={handleAddTimezone}
              onClose={() => setShowSelector(false)}
            />
          </Card>
        )}

        {/* Time Zone Grid */}
        {selectedTimezones.length === 0 ? (
          <Card className="p-12 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2 text-foreground">No time zones selected</h2>
            <p className="text-muted-foreground mb-6">
              Add time zones to start tracking world time
            </p>
            <Button onClick={() => setShowSelector(true)} variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Add Time Zone
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedTimezones.map(timezone => (
              <TimeZoneClockCard
                key={timezone.id}
                timezone={timezone}
                now={now}
                onRemove={() => handleRemoveTimezone(timezone.id)}
                canRemove={selectedTimezones.length > 1}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-8">
        <div className="container mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          © 2026. Built with ❤️ using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-chroma hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
