import type { Concert } from './types';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVhgVuW7L0f5cESZWBVcgU0PcU3kwa_kiXAIBetchgrVc6hCOTwSspzlYBG1iExoE56CEGZ9bNcsoO/pub?gid=0&single=true&output=csv';

// Parse CSV text into array of objects, handling multi-line quoted fields
function parseCSV(csv: string): Record<string, string>[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
      currentRow.push(currentField);
      if (currentRow.some(field => field.trim() !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      if (char === '\r') i++; // Skip \n in \r\n
    } else if (char !== '\r') {
      currentField += char;
    }
  }

  // Don't forget the last row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(field => field.trim() !== '')) {
      rows.push(currentRow);
    }
  }

  if (rows.length === 0) return [];

  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = row[i] || '';
    });
    return obj;
  });
}

// Fetch and parse concerts from Google Sheets
export async function fetchConcerts(): Promise<Concert[]> {
  const response = await fetch(SHEET_URL);
  const csv = await response.text();
  const rows = parseCSV(csv);

  return rows
    .filter(row => row.slug && row.slug.trim() !== '')
    .map(row => ({
    id: row.id || '',
    slug: row.slug || '',
    artistName: row.artistName || '',
    date: row.date || '',
    doorsTime: row.doorsTime || '',
    showTime: row.showTime || '',
    suggestedDonation: row.suggestedDonation || '',
    shortDescription: row.shortDescription || '',
    fullDescription: row.fullDescription || '',
    artistBio: row.artistBio || '',
    artistWebsite: row.artistWebsite || undefined,
    artistSpotify: row.artistSpotify || undefined,
    artistInstagram: row.artistInstagram || undefined,
    featuredImage: row.featuredImage || '',
    artistImage: row.artistImage || undefined,
    youtubeVideoId: row.youtubeVideoId || undefined,
    rsvpLink: row.rsvpLink || '',
    status: determineStatus(row.date, row.status),
  }));
}

// Determine status based on date and optional override
function determineStatus(dateString: string, manualStatus?: string): 'upcoming' | 'past' | 'cancelled' {
  // If manually set to cancelled or hidden, respect that
  if (manualStatus === 'cancelled' || manualStatus === 'hidden') {
    return 'cancelled';
  }

  // Otherwise, calculate from date
  const [year, month, day] = dateString.split('-').map(Number);
  const concertDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return concertDate >= today ? 'upcoming' : 'past';
}

// Helper functions that work with fetched data
export function getUpcomingConcerts(concerts: Concert[]): Concert[] {
  return concerts
    .filter(c => c.status === 'upcoming')
    .sort((a, b) => {
      const [aYear, aMonth, aDay] = a.date.split('-').map(Number);
      const [bYear, bMonth, bDay] = b.date.split('-').map(Number);
      return new Date(aYear, aMonth - 1, aDay).getTime() - new Date(bYear, bMonth - 1, bDay).getTime();
    });
}

export function getPastConcerts(concerts: Concert[]): Concert[] {
  return concerts
    .filter(c => c.status === 'past')
    .sort((a, b) => {
      const [aYear, aMonth, aDay] = a.date.split('-').map(Number);
      const [bYear, bMonth, bDay] = b.date.split('-').map(Number);
      return new Date(bYear, bMonth - 1, bDay).getTime() - new Date(aYear, aMonth - 1, aDay).getTime();
    });
}

export function getConcertBySlug(concerts: Concert[], slug: string): Concert | undefined {
  return concerts.find(c => c.slug === slug);
}

export function getNextConcert(concerts: Concert[]): Concert | undefined {
  const upcoming = getUpcomingConcerts(concerts);
  return upcoming.length > 0 ? upcoming[0] : undefined;
}

export function formatDate(dateString: string): string {
  // Parse as local date to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
