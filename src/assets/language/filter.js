import Filter from 'bad-words';
var newBadWords = [
  'pendejo',
  'pendeja',
  'puto',
  'puta',
  'maricon',
  'marica',
  'culo',
  'verga',
  'vagina',
  'pene',
  'vulva',
];

const filter = new Filter();
filter.addWords(...newBadWords);

const cleanCussWords = phrase => {
  try {
    // Verify if the phrase length is less than 0 or equal
    if (phrase.length <= 0) {
      return phrase;
    }
    return filter.clean(phrase);
  } catch (error) {
    // If its an error, return the phrase
    return phrase;
  }
};

export { cleanCussWords };
