import type { Concert } from './types';

// Sample concerts data - this will be replaced with Google Sheets integration
// For now, edit this file directly to manage concerts

export const concerts: Concert[] = [
  {
    id: "1",
    slug: "sarah-jones-trio-march-2025",
    artistName: "Sarah Jones Trio",
    date: "2025-03-15",
    doorsTime: "6:30 PM",
    showTime: "7:00 PM",
    suggestedDonation: "$20-30",
    shortDescription: "Folk and Americana trio featuring beautiful harmonies and original songwriting.",
    fullDescription: `Join us for an evening with the Sarah Jones Trio, a folk and Americana group known for their stunning three-part harmonies and heartfelt original songs.

Sarah's songwriting draws from the rich traditions of Texas country and Appalachian folk, weaving stories of love, loss, and the landscapes of the American Southwest.

This intimate house concert setting is the perfect way to experience their music up close.`,
    artistBio: `Sarah Jones is an Austin-based singer-songwriter who has been crafting folk and Americana music for over a decade. Her trio, featuring longtime collaborators on guitar and upright bass, has performed at venues across Texas and the Southwest.

Their debut album "Wildflower Highway" received critical acclaim from Austin Chronicle and was featured on KUTX's Local Live.`,
    artistWebsite: "https://example.com/sarahjones",
    artistSpotify: "https://open.spotify.com/artist/example",
    artistInstagram: "https://instagram.com/sarahjonestrio",
    featuredImage: "/images/placeholder-concert.svg",
    artistImage: "/images/placeholder-artist.svg",
    rsvpLink: "https://forms.google.com/your-form-link",
    status: "upcoming"
  },
  {
    id: "2",
    slug: "michael-chen-april-2025",
    artistName: "Michael Chen",
    date: "2025-04-12",
    doorsTime: "6:30 PM",
    showTime: "7:00 PM",
    suggestedDonation: "$25-35",
    shortDescription: "Fingerstyle guitarist blending jazz, classical, and world music influences.",
    fullDescription: `Experience the virtuosic fingerstyle guitar of Michael Chen in an intimate house concert setting.

Michael's unique approach blends jazz improvisation with classical technique and influences from Brazilian music, creating a sound that's both technically impressive and deeply emotional.

This will be a seated concert with a listening room atmosphere - the perfect setting for Michael's nuanced playing.`,
    artistBio: `Michael Chen is a fingerstyle guitarist based in Austin, Texas. A graduate of the University of North Texas Jazz Studies program, Michael has developed a distinctive voice on the acoustic guitar that draws from multiple traditions.

He has released three solo albums and has toured throughout the United States and Europe. His most recent album "River Currents" was recorded live at the Cactus Cafe.`,
    artistWebsite: "https://example.com/michaelchen",
    featuredImage: "/images/placeholder-concert.svg",
    artistImage: "/images/placeholder-artist.svg",
    rsvpLink: "https://forms.google.com/your-form-link",
    status: "upcoming"
  },
  {
    id: "3",
    slug: "luna-collective-january-2025",
    artistName: "Luna Collective",
    date: "2025-01-18",
    doorsTime: "6:30 PM",
    showTime: "7:00 PM",
    suggestedDonation: "$20-30",
    shortDescription: "Indie folk band with dreamy vocals and atmospheric arrangements.",
    fullDescription: `Luna Collective brought their dreamy indie folk sound to the Meadowlark stage for a magical winter evening.

The four-piece band created an atmosphere of warmth and wonder with their layered arrangements and ethereal harmonies.`,
    artistBio: `Luna Collective is an Austin-based indie folk band formed in 2020. Their sound combines lush vocal harmonies with atmospheric instrumentation, creating a dreamy sonic landscape.`,
    featuredImage: "/images/placeholder-concert.svg",
    rsvpLink: "",
    status: "past"
  }
];

// Helper functions
export function getUpcomingConcerts(): Concert[] {
  return concerts
    .filter(c => c.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastConcerts(): Concert[] {
  return concerts
    .filter(c => c.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getConcertBySlug(slug: string): Concert | undefined {
  return concerts.find(c => c.slug === slug);
}

export function getNextConcert(): Concert | undefined {
  const upcoming = getUpcomingConcerts();
  return upcoming.length > 0 ? upcoming[0] : undefined;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
