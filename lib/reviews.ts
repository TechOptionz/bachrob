/**
 * Google reviews shown on the home page.
 *
 * Every entry is a real review transcribed verbatim from the firm's public
 * Google Business listing — spelling and all — with the reviewer's name as it
 * appears there. To add one, copy the text exactly from the Google profile;
 * the section only renders entries rated `minRating` stars or higher.
 */
type GoogleReview = {
  name: string;
  rating: number;
  text: string;
  /** True when the reviewer's name isn't known — kept out of the JSON-LD. */
  anonymous?: boolean;
};

export const googleReviews: {
  rating: number;
  minRating: number;
  url: string;
  reviews: GoogleReview[];
} = {
  /** Overall score shown on the firm's Google Business profile. */
  rating: 4.9,
  minRating: 4,
  /** The firm's Google Maps listing — where "read all reviews" points. */
  url: "https://goo.gl/maps/jvh5zfBbDMm",
  // Newest first, matching the order on the Google profile.
  reviews: [
    {
      name: "Jess Willcox",
      rating: 5,
      text: "Great staff & Nayyar was a fantastic accountant for our tax return. She was helpful & patient. After our family accountant retired, we were hesitant about a new accountant but we were very happy. We will definitely be using their services again next financial year. Thank you Nayyar.",
    },
    {
      name: "Susan Jennings",
      rating: 5,
      text: "Been using them for several years. They are easy to communicate with and very good at keeping me updated on progress with our tax returns. Love the new app which simplifies this process for me all documents and communication in one place. Definitely recommend this company.",
    },
    {
      name: "Jan E",
      rating: 5,
      text: "Always willing to help. Even doing business with me in my car as staircase too difficult for me to manouvre. Always answers queries in a timely manner. Top notch help.",
    },
    {
      // Wording matches the firm's own transcription in its review video
      // (vimeo.com/493979826), which quotes both this and Jan E's review.
      name: "Peter & Ellenie M",
      rating: 5,
      text: "Such great and helpful accountants, especially Salil. Even the office staff are friendly and get reports etc if requested to you very promptly and efficiently.",
    },
    {
      // Google review surfaced in search snippets without the reviewer's
      // name — replace "Google reviewer" with the real name from the firm's
      // Google Business profile when it's to hand.
      name: "Google reviewer",
      rating: 5,
      anonymous: true,
      text: "I highly recommend Bachmann Robinson for their exceptional tax services. They successfully lodged my income tax return with efficiency and at a very affordable price. I was impressed by their professionalism and attention to detail throughout the process.",
    },
  ],
};
