import mysql from 'serverless-mysql';

// Database connection with seamless in-memory fallback for AI Studio
let realConnection = null;

function getRealConnection() {
  if (realConnection) return realConnection;
  if (process.env.DB_HOST) {
    try {
      realConnection = mysql({
        config: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: Number(process.env.DB_PORT) || 3306,
        },
      });
      return realConnection;
    } catch (e) {
      console.warn('[AI Studio] MySQL client initialization error:', e);
    }
  }
  return null;
}

// In-memory catalog of Agatha Christie's famous books (fallback when DB is not configured)
const initialBooks = [
  {
    id: 1,
    title: 'The Mysterious Affair at Styles',
    year: 1920,
    detective: 'poirot',
    description: 'At Styles Court, elderly heiress Emily Inglethorp is found poisoned by strychnine. Hercule Poirot investigates his first celebrated case.',
  },
  {
    id: 2,
    title: 'The Secret Adversary',
    year: 1922,
    detective: 'other',
    description: 'Tommy and Tuppence Beresford team up as "The Young Adventurers Ltd" and plunge into a perilous conspiracy involving stolen treaties.',
  },
  {
    id: 3,
    title: 'The Murder on the Links',
    year: 1923,
    detective: 'poirot',
    description: 'Summoned urgently to France, Poirot arrives only to find his client stabbed in the back on a freshly dug golf course grave.',
  },
  {
    id: 4,
    title: 'The Man in the Brown Suit',
    year: 1924,
    detective: 'other',
    description: 'Anne Beddingfeld witnesses a fatal accident in an underground station, discovering a coded message that leads her on an ocean voyage to South Africa.',
  },
  {
    id: 5,
    title: 'The Secret of Chimneys',
    year: 1925,
    detective: 'other',
    description: 'A stately home becomes the epicenter of political intrigue, stolen diamonds, and murder.',
  },
  {
    id: 6,
    title: 'The Murder of Roger Ackroyd',
    year: 1926,
    detective: 'poirot',
    description: 'In King\'s Abbot, a wealthy widower who knows too much about a blackmailer is murdered in his locked study.',
  },
  {
    id: 7,
    title: 'The Big Four',
    year: 1927,
    detective: 'poirot',
    description: 'Poirot faces a clandestine criminal organization scheming for worldwide dominion.',
  },
  {
    id: 8,
    title: 'The Mystery of the Blue Train',
    year: 1928,
    detective: 'poirot',
    description: 'Aboard the luxurious train to the French Riviera, an heiress is strangled and her priceless rubies stolen.',
  },
  {
    id: 9,
    title: 'The Seven Dials Mystery',
    year: 1929,
    detective: 'other',
    description: 'Lady Eileen "Bundle" Brent investigates a lethal prank and a secret society meeting at the Seven Dials Club.',
  },
  {
    id: 10,
    title: 'The Murder at the Vicarage',
    year: 1930,
    detective: 'marple',
    description: 'Colonel Protheroe, despised by the whole village of St. Mary Mead, is shot in the vicar\'s study. Miss Marple solves the puzzle.',
  },
  {
    id: 11,
    title: 'The Sittaford Mystery',
    year: 1931,
    detective: 'other',
    description: 'During a snowbound séance on Dartmoor, the spirits predict Captain Trevelyan\'s murder six miles away.',
  },
  {
    id: 12,
    title: 'Peril at End House',
    year: 1932,
    detective: 'poirot',
    description: 'Holidaying in Cornwall, Poirot meets young Nick Buckley, who has survived three near-fatal accidents in as many days.',
  },
  {
    id: 13,
    title: 'Lord Edgware Dies',
    year: 1933,
    detective: 'poirot',
    description: 'An American actress asks Poirot to help arrange a divorce from her eccentric husband; the very next day, Lord Edgware is murdered.',
  },
  {
    id: 14,
    title: 'Murder on the Orient Express',
    year: 1934,
    detective: 'poirot',
    description: 'Isolated by snowdrifts in the Balkans, a ruthless American passenger is stabbed a dozen times aboard the train.',
  },
  {
    id: 15,
    title: "Why Didn't They Ask Evans?",
    year: 1934,
    detective: 'other',
    description: 'A dying man fallen from a cliff whispers a strange question with his last breath, sparking an adventure for Bobby Jones and Frankie Derwent.',
  },
  {
    id: 16,
    title: 'Three Act Tragedy',
    year: 1934,
    detective: 'poirot',
    description: 'At a dinner party hosted by a famous actor, an elderly clergyman drinks a cocktail and collapses dead from poison.',
  },
  {
    id: 17,
    title: 'Death in the Clouds',
    year: 1935,
    detective: 'poirot',
    description: 'A moneylender is found dead from a poisoned blowdart inside an aeroplane cabin flying from Paris to Croydon with Poirot on board.',
  },
  {
    id: 18,
    title: 'The A.B.C. Murders',
    year: 1936,
    detective: 'poirot',
    description: 'A serial killer travels through England striking victims in alphabetical order, leaving an ABC Railway Guide beside each corpse.',
  },
  {
    id: 19,
    title: 'Murder in Mesopotamia',
    year: 1936,
    detective: 'poirot',
    description: 'At an archaeological excavation near Hassanieh, the beautiful wife of the expedition director is bludgeoned to death.',
  },
  {
    id: 20,
    title: 'Cards on the Table',
    year: 1936,
    detective: 'poirot',
    description: 'A flamboyant host invites four detectives and four suspected murderers to an evening of bridge, only to be killed during the game.',
  },
  {
    id: 21,
    title: 'Dumb Witness',
    year: 1937,
    detective: 'poirot',
    description: 'A wealthy spinster suspects her heirs are trying to kill her. When she dies, her fox terrier Bob holds the vital clue.',
  },
  {
    id: 22,
    title: 'Death on the Nile',
    year: 1937,
    detective: 'poirot',
    description: 'Linnet Doyle, a glamorous heiress who seemingly has everything, is shot through the head aboard the SS Karnak.',
  },
  {
    id: 23,
    title: 'Appointment with Death',
    year: 1938,
    detective: 'poirot',
    description: 'Among the red cliffs of Petra, the tyrannical matriarch Mrs. Boynton is discovered dead in her chair from a lethal injection.',
  },
  {
    id: 24,
    title: "Hercule Poirot's Christmas",
    year: 1938,
    detective: 'poirot',
    description: 'Old Simeon Lee gathers his estranged family for Christmas, but his throat is cut inside a locked room amidst chaotic screams.',
  },
  {
    id: 25,
    title: 'Murder is Easy',
    year: 1939,
    detective: 'other',
    description: 'Luke Fitzwilliam encounters an eccentric old lady on a train who claims a series of quiet accidental deaths in her village are murders.',
  },
  {
    id: 26,
    title: 'And Then There Were None',
    year: 1939,
    detective: 'other',
    description: 'Ten strangers are lured to an isolated island mansion by an unknown host and killed one by one following a nursery rhyme.',
  },
  {
    id: 27,
    title: 'Sad Cypress',
    year: 1940,
    detective: 'poirot',
    description: 'Elinor Carlisle stands accused of poisoning her romantic rival with morphine-laced fish paste sandwiches.',
  },
  {
    id: 28,
    title: 'One, Two, Buckle My Shoe',
    year: 1940,
    detective: 'poirot',
    description: 'Poirot leaves a dental appointment, only for his dentist Mr. Morley to be found dead with a bullet through his head hours later.',
  },
  {
    id: 29,
    title: 'Evil Under the Sun',
    year: 1941,
    detective: 'poirot',
    description: 'At an exclusive Devon resort hotel, glamorous flirt Arlena Stuart is found strangled on the secluded Pixy Cove beach.',
  },
  {
    id: 30,
    title: 'N or M?',
    year: 1941,
    detective: 'other',
    description: 'Tommy and Tuppence are sent to a seaside boarding house during WWII to hunt two dangerous Nazi fifth columnists.',
  },
  {
    id: 31,
    title: 'The Body in the Library',
    year: 1942,
    detective: 'marple',
    description: 'The Bantry household awakens to discover the body of an unknown glamorous blonde curled dead on their library hearthrug.',
  },
  {
    id: 32,
    title: 'Five Little Pigs',
    year: 1942,
    detective: 'poirot',
    description: 'Sixteen years after Caroline Crale was convicted of poisoning her painter husband, her daughter asks Poirot to uncover the truth.',
  },
  {
    id: 33,
    title: 'The Moving Finger',
    year: 1942,
    detective: 'marple',
    description: 'Vicious poison-pen letters torment the peaceful town of Lymstock, leading to supposed suicide and actual murder.',
  },
  {
    id: 34,
    title: 'Towards Zero',
    year: 1944,
    detective: 'other',
    description: 'Superintendent Battle realizes a murder at Gull\'s Point was the culmination of an intricately planned chain of events.',
  },
  {
    id: 35,
    title: 'Death Comes as the End',
    year: 1944,
    detective: 'other',
    description: 'Set in ancient Egypt 2000 BC, a priest\'s concubine arrives at his family estate, sowing discord and sudden death.',
  },
  {
    id: 36,
    title: 'Sparkling Cyanide',
    year: 1945,
    detective: 'other',
    description: 'Rosemary Barton dies from cyanide in her champagne at a birthday celebration; exactly a year later, the suspects gather again.',
  },
  {
    id: 37,
    title: 'The Hollow',
    year: 1946,
    detective: 'poirot',
    description: 'Poirot arrives for Sunday lunch at The Hollow to find Dr. John Christow bleeding to death beside the swimming pool.',
  },
  {
    id: 38,
    title: 'Crooked House',
    year: 1949,
    detective: 'other',
    description: 'Three generations of the eccentric Leonides family live in a crooked mansion where the wealthy patriarch is poisoned with eyedrops.',
  },
  {
    id: 39,
    title: 'A Murder Is Announced',
    year: 1950,
    detective: 'marple',
    description: 'An invitation published in the Chipping Cleghorn Gazette announces a murder will take place at Little Paddocks at 6:30 p.m.',
  },
  {
    id: 40,
    title: 'Mrs McGinty\'s Dead',
    year: 1952,
    detective: 'poirot',
    description: 'A charwoman is struck down for a few pounds, but an old photograph newspaper clipping holds the real motive.',
  },
  {
    id: 41,
    title: 'A Pocket Full of Rye',
    year: 1953,
    detective: 'marple',
    description: 'Rex Fortescue dies at his desk with rye grain in his pocket, starting a bizarre sequence of murders based on "Sing a Song of Sixpence".',
  },
  {
    id: 42,
    title: '4.50 from Paddington',
    year: 1957,
    detective: 'marple',
    description: 'Mrs. McGillicuddy witnesses a woman being strangled on a passing train, but no body is found on the railway line.',
  },
  {
    id: 43,
    title: 'The Mirror Crack\'d from Side to Side',
    year: 1962,
    detective: 'marple',
    description: 'At a fete hosted by Hollywood star Marina Gregg at Gossington Hall, a local admirer sips a poisoned daiquiri meant for someone else.',
  },
  {
    id: 44,
    title: 'Curtain: Poirot\'s Last Case',
    year: 1975,
    detective: 'poirot',
    description: 'An aging, wheelchair-bound Poirot returns to Styles Court to stop an ingenious killer who commits murders through psychological manipulation.',
  },
  {
    id: 45,
    title: 'Sleeping Murder',
    year: 1976,
    detective: 'marple',
    description: 'Newlywed Gwenda Reed buys a coastal villa in Devon, only to experience terrifying flashbacks of a murder committed years ago.',
  },
].map((b) => ({
  ...b,
  cover_url: b.cover_url ?? '',
}));

// In-memory user book entries
const userBookStore = new Map([
  [
    1,
    {
      user_id: 1,
      book_id: 1,
      is_read: 1,
      rating: 5,
      comment: 'The beginning of Hercule Poirot! Incredible atmosphere and deduction.',
    },
  ],
  [
    14,
    {
      user_id: 1,
      book_id: 14,
      is_read: 1,
      rating: 5,
      comment: 'A timeless masterpiece of the mystery genre.',
    },
  ],
  [
    26,
    {
      user_id: 1,
      book_id: 26,
      is_read: 1,
      rating: 5,
      comment: 'Chilling, brilliantly plotted, and impossible to put down.',
    },
  ],
]);

// Simulated query executor for database operations
async function executeMockQuery(query, values = []) {
  const q = String(query).trim();
  const upper = q.toUpperCase();

  // SELECT * FROM book
  if (upper.includes('SELECT * FROM BOOK')) {
    return initialBooks;
  }

  // SELECT * FROM user_book WHERE user_id = ? AND book_id = ?
  if (upper.includes('FROM USER_BOOK') && upper.includes('BOOK_ID =')) {
    const bookId = Number(values[1]);
    const record = userBookStore.get(bookId);
    return record ? [record] : [];
  }

  // SELECT * FROM user_book where user_id = ?
  if (upper.includes('FROM USER_BOOK') && upper.includes('USER_ID =')) {
    return Array.from(userBookStore.values());
  }

  // INSERT INTO user_book (user_id, book_id, ...) VALUES (...)
  if (upper.startsWith('INSERT INTO USER_BOOK')) {
    // values format: [1, bookId, ...fieldValues]
    const userId = values[0] ?? 1;
    const bookId = Number(values[1]);
    const existing = userBookStore.get(bookId) || { user_id: userId, book_id: bookId };

    // Parse column names in INSERT query
    const colsMatch = q.match(/\((.*?)\)\s*VALUES/i);
    if (colsMatch) {
      const cols = colsMatch[1].split(',').map((c) => c.trim().toLowerCase());
      cols.forEach((col, idx) => {
        if (values[idx] !== undefined) {
          existing[col] = values[idx];
        }
      });
    }
    userBookStore.set(bookId, existing);
    return { affectedRows: 1 };
  }

  // UPDATE user_book SET ... WHERE user_id = ? AND book_id = ?
  if (upper.startsWith('UPDATE USER_BOOK')) {
    // values format: [...fieldValues, 1, bookId]
    const bookId = Number(values[values.length - 1]);
    const existing = userBookStore.get(bookId) || { user_id: 1, book_id: bookId, is_read: 0, rating: 0, comment: '' };

    const setPartMatch = q.match(/SET\s+(.*?)\s+WHERE/i);
    if (setPartMatch) {
      const setClauses = setPartMatch[1].split(',').map((s) => s.trim());
      setClauses.forEach((clause, idx) => {
        const col = clause.split('=')[0].trim().toLowerCase();
        if (values[idx] !== undefined) {
          existing[col] = values[idx];
        }
      });
    }
    userBookStore.set(bookId, existing);
    return { affectedRows: 1 };
  }

  return [];
}

export const connection = {
  query: async (query, values) => {
    const conn = getRealConnection();
    if (conn) {
      try {
        return await conn.query(query, values);
      } catch (err) {
        console.warn('[AI Studio] Live MySQL query failed, falling back to mock:', err.message);
      }
    }
    return executeMockQuery(query, values);
  },
  end: async () => {
    const conn = getRealConnection();
    if (conn) {
      try {
        await conn.end();
      } catch {}
    }
  },
};
