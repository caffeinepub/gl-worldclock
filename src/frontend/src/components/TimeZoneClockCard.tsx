import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { TimeZoneInfo } from '../lib/timezones';

interface TimeZoneClockCardProps {
  timezone: TimeZoneInfo;
  now: Date;
  onRemove: () => void;
  canRemove: boolean;
}

export default function TimeZoneClockCard({
  timezone,
  now,
  onRemove,
  canRemove
}: TimeZoneClockCardProps) {
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone.id,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone.id,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const time = timeFormatter.format(now);
  const date = dateFormatter.format(now);

  // Calculate offset
  const offsetFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone.id,
    timeZoneName: 'shortOffset'
  });
  const parts = offsetFormatter.formatToParts(now);
  const offsetPart = parts.find(part => part.type === 'timeZoneName');
  const offset = offsetPart?.value || '';

  // Calculate day/night status based on local hour
  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone.id,
    hour: 'numeric',
    hour12: false
  });
  const hourString = hourFormatter.format(now);
  const hour = parseInt(hourString, 10);
  
  // Day is 6:00 - 17:59, Night is 18:00 - 5:59
  const isDay = hour >= 6 && hour < 18;
  const status = isDay ? 'Day' : 'Night';
  const statusColor = isDay ? 'text-yellow-400' : 'text-blue-400';

  return (
    <Card className="relative group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate text-card-foreground">
              {timezone.label}
            </CardTitle>
            {offset && (
              <Badge variant="secondary" className="mt-1 text-xs text-secondary-foreground">
                {offset}
              </Badge>
            )}
          </div>
          {canRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-foreground hover:text-foreground"
              aria-label={`Remove ${timezone.label}`}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-4xl font-bold tabular-nums tracking-tight text-primary">
            {time}
          </div>
          <div className="text-sm text-muted-foreground">{date}</div>
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
            <span className={`text-xl ${statusColor}`}>✦</span>
            <span className="text-sm font-medium text-foreground">{status}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
