import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { TIMEZONES } from '../lib/timezones';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimeZoneSelectorProps {
  selectedTimezoneIds: string[];
  onSelect: (timezoneId: string) => void;
  onClose: () => void;
}

export default function TimeZoneSelector({
  selectedTimezoneIds,
  onSelect,
  onClose
}: TimeZoneSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTimezones = TIMEZONES.filter(tz => {
    const matchesSearch =
      tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const availableTimezones = filteredTimezones.filter(
    tz => !selectedTimezoneIds.includes(tz.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Add Time Zone</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search time zones..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <ScrollArea className="h-[300px] rounded-md border border-border p-4">
        {availableTimezones.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? 'No time zones found' : 'All time zones are already added'}
          </div>
        ) : (
          <div className="space-y-2">
            {availableTimezones.map(timezone => (
              <button
                key={timezone.id}
                onClick={() => onSelect(timezone.id)}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-accent transition-colors flex items-center justify-between group"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{timezone.label}</div>
                  <div className="text-sm text-muted-foreground">{timezone.id}</div>
                </div>
                <Badge variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground">
                  Add
                </Badge>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
