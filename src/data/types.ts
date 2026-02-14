export interface Concert {
  id: string;
  slug: string;

  // Basic Info
  artistName: string;
  date: string; // ISO date string
  doorsTime: string; // e.g., "6:30 PM"
  showTime: string; // e.g., "7:00 PM"
  suggestedDonation: string; // e.g., "$20-30"

  // Description
  shortDescription: string; // For listing pages
  fullDescription: string; // For detail page

  // Artist Info
  artistBio: string;
  artistWebsite?: string;
  artistSpotify?: string;
  artistInstagram?: string;

  // Images (Cloudinary URLs recommended)
  featuredImage: string;
  artistImage?: string;
  galleryImages?: string[];

  // Video (YouTube embed ID, e.g., "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ)
  youtubeVideoId?: string;

  // Live Stream (for remote viewing)
  streamVideoId?: string; // YouTube video/stream ID for the private stream
  streamPassword?: string; // Password to access the stream page

  // RSVP
  rsvpLink: string; // Google Form link

  // Status
  status: 'upcoming' | 'past' | 'cancelled';
}

export interface VenueInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  parkingInfo: string;
  additionalInfo: string;
}

export const venue: VenueInfo = {
  name: "Meadowlark House",
  address: "10500 Beard Avenue",
  city: "Austin",
  state: "TX",
  zip: "78748",
  neighborhood: "Bauerle Ranch",
  parkingInfo: "Street parking is available on Beard Avenue and Drew Lane. Please be mindful of neighbors and avoid blocking driveways.",
  additionalInfo: "Look for the Meadowlark Concert Series sign. Exact details will be provided when you RSVP."
};
