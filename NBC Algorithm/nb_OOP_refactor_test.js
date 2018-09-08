const Classifier = require('./nb_OOP_refactor');
const wish = require('wish');
describe('the file', () => {
  const classifier = new Classifier();
  classifier.addSong('imagine', ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'], classifier._songList.difficulties.EASY)
  classifier.addSong('somewhereOverTheRainbow', ['c', 'em', 'f', 'g', 'am'], classifier._songList.difficulties.EASY)
  classifier.addSong('tooManyCooks', ['c', 'g', 'f'], classifier._songList.difficulties.EASY)
  classifier.addSong('iWillFollowYouIntoTheDark', ['f', 'dm', 'bb', 'c', 'a', 'bbm'], classifier._songList.difficulties.MEDIUM)
  classifier.addSong('babyOneMoreTime', ['cm', 'g', 'bb', 'eb', 'fm', 'ab'], classifier._songList.difficulties.MEDIUM)
  classifier.addSong('creep', ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'], classifier._songList.difficulties.MEDIUM)
  classifier.addSong('paperBag', ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'], classifier._songList.difficulties.HARD)
  classifier.addSong('toxic', ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'], classifier._songList.difficulties.HARD)
  classifier.addSong('bulletproof', ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'], classifier._songList.difficulties.HARD)

  classifier.trainAll()
  it('classifies', () => {
    const classified = classifier.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
    wish(classified.get('easy') === 1.3433333333333333)
    wish(classified.get('medium') === 1.5060259259259259)
    wish(classified.get('hard') === 1.6884223991769547)
  })

  it('classifies again', () => {
    const classified = classifier.classify(['d', 'g', 'e', 'dm']);
    wish(classified.get('easy') === 2.023094827160494);
    wish(classified.get('medium') === 1.855758613168724);
    wish(classified.get('hard') === 1.855758613168724);
  })

  it('label probabilities', () => {
    wish(classifier._labelProbabilities.get('easy') === 0.3333333333333333);
    wish(classifier._labelProbabilities.get('medium') === 0.3333333333333333);
    wish(classifier._labelProbabilities.get('hard') === 0.3333333333333333);
  });
});