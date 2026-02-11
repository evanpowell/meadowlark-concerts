import type { Concert } from './types';

// Concert data - edit this file to add/update concerts

export const concerts: Concert[] = [
  {
    id: "1",
    slug: "the-consequences-february-2026",
    artistName: "The Consequences",
    date: "2026-02-14",
    doorsTime: "6:00 PM",
    showTime: "7:00 PM",
    suggestedDonation: "$20",
    shortDescription: "Award-winning Irish traditional band featuring concertina, fiddle, bodhrán, and piano.",
    fullDescription: `Get ready for an amazing night of Irish traditional music with The Consequences!

There will also be a session after the show, so bring your instruments if you got 'em!`,
    artistBio: `Driven by a passion for exploring the colors and complexities of Irish music, The Consequences are a new Irish traditional band founded by Lexie Boatright (concertina & harp), Jake James (fiddle), Cara Wildman (bodhrán & dance), and Ryan Ward (piano & piano accordion). Award-winning soloists in their own right, the quartet comes together to create a dynamic and enthralling sound with a combination of traditional and original tunes.

Lexie Boatright is a multiple All-Ireland award-winning harpist and concertina player and executive director of the Baltimore-Washington Academy of Irish Culture.

Jake James is a two-time All-Ireland fiddle champion from Queens, NYC. The Irish Echo called his 2018 album Firewood an "outstanding debut solo recording."

Cara Wildman is a highly sought after bodhrán player at the cutting edge of the instrument's modern development. She was the 2021 All-Ireland Fleadhfest champion and has a Masters in Irish Traditional Music Performance from the University of Limerick.

Ryan Ward is an award-winning pianist and accordion player from NYC. He is a Senior All-Ireland Accompaniment Champion and a highly sought after accompanist in the NY area.`,
    artistWebsite: "https://theconsequencesband.com/home",
    youtubeVideoId: "9jKpjU9RDU8",
    featuredImage: "https://d10j3mvrs1suex.cloudfront.net/s:bzglfiles/u/684926/935add7e27569408466d6612b01eefed7020809b/original/promo-photo2.jpg/!!/b%3AW1sic2l6ZSIsInBob3RvIl1d/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.jpg",
    rsvpLink: "",
    status: "upcoming"
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
