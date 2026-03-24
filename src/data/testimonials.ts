export interface Testimonial {
  id: string;
  authorName: string;
  authorAvatar: string;
  city: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    authorName: 'Artan Hoxha',
    authorAvatar: 'AH',
    city: 'Tiranë',
    rating: 5,
    quote: 'Shërbimi më i mirë i qirasë së makinave në Shqipëri!',
  },
  {
    id: 't2',
    authorName: 'Elona Kushi',
    authorAvatar: 'EK',
    city: 'Durrës',
    rating: 5,
    quote: 'Procesi i blerjes ishte shumë i thjeshtë dhe transparent.',
  },
  {
    id: 't3',
    authorName: 'Dritan Leka',
    authorAvatar: 'DL',
    city: 'Vlorë',
    rating: 4,
    quote: 'Makina luksoze me çmime konkurruese. Rekomandoj!',
  },
  {
    id: 't4',
    authorName: 'Blerina Topi',
    authorAvatar: 'BT',
    city: 'Sarandë',
    rating: 5,
    quote: 'Përvoja perfekte për pushimet tona verore.',
  },
  {
    id: 't5',
    authorName: 'Gentian Muka',
    authorAvatar: 'GM',
    city: 'Shkodër',
    rating: 4,
    quote: 'Flota e gjerë dhe staf i kujdesshëm. Do ta përdor sërish!',
  },
];
