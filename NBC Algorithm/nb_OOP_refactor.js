class Classifier {
  constructor() {
    this.songList = {
      allChords: new Set(),
      difficulties: {
        EASY: 'easy',
        MEDIUM: 'medium',
        HARD: 'hard'
      },
      songs: [],
      addSong: function (name, chords, difficulty) {
        this.songs.push({
          name,
          chords,
          difficulty
        })
      }
    }
    this.labelCounts = new Map()
    this.labelProbabilities = new Map()
    this.chordCountsInLabels = new Map()
    this.smoothing = 1.01
  }
  chordCountForDifficulty(difficulty, testChord) {
    return this.songList.songs.reduce((counter, song) => {
      if (song.difficulty === difficulty) {
        counter += song.chords.filter(chord => chord === testChord).length;
      }
      return counter;
    }, 0);
  }
  likelihoodFromChord (difficulty, chord) {
    return this.chordCountForDifficulty(difficulty, chord) /
      this.songList.songs.length;
  }
  valueForChordDifficulty (difficulty, chord) {
    const value = this.likelihoodFromChord(difficulty, chord);
    return value ? value + this.smoothing : 1;
  }
  trainAll () {
    this.songList.songs.forEach((song) => {
      this.train(song.chords, song.difficulty);
    });
    this.setLabelProbabilities();
  }
  train (chords, label) {
    chords.forEach(chord => this.songList.allChords.add(chord));
    if (Array.from(this.labelCounts.keys()).includes(label)) {
      this.labelCounts.set(label, this.labelCounts.get(label) + 1);
    } else {
      this.labelCounts.set(label, 1);
    }
  }
  setLabelProbabilities () {
    this.labelCounts.forEach((_count, label) => {
      this.labelProbabilities.set(label, this.labelCounts.get(label) /
        this.songList.songs.length);
    });
  }
  classify (chords) {
    return new Map(Array.from(
      this.labelProbabilities.entries()).map((labelWithProbability) => {
      const difficulty = labelWithProbability[0];
      return [difficulty, chords.reduce((total, chord) => {
        return total * this.valueForChordDifficulty(difficulty, chord);
      }, this.labelProbabilities.get(difficulty) + this.smoothing)];
    }));
  }
};

// unit tests

const wish = require('wish');
describe('the file', () => {
  // const classifier = Object.create(classifierTemplate);
  const classifier = new Classifier();
  classifier.songList.addSong('imagine', ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'], classifier.songList.difficulties.EASY)
  classifier.songList.addSong('somewhereOverTheRainbow', ['c', 'em', 'f', 'g', 'am'], classifier.songList.difficulties.EASY)
  classifier.songList.addSong('tooManyCooks', ['c', 'g', 'f'], classifier.songList.difficulties.EASY)
  classifier.songList.addSong('iWillFollowYouIntoTheDark', ['f', 'dm', 'bb', 'c', 'a', 'bbm'], classifier.songList.difficulties.MEDIUM)
  classifier.songList.addSong('babyOneMoreTime', ['cm', 'g', 'bb', 'eb', 'fm', 'ab'], classifier.songList.difficulties.MEDIUM)
  classifier.songList.addSong('creep', ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'], classifier.songList.difficulties.MEDIUM)
  classifier.songList.addSong('paperBag', ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'], classifier.songList.difficulties.HARD)
  classifier.songList.addSong('toxic', ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'], classifier.songList.difficulties.HARD)
  classifier.songList.addSong('bulletproof', ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'], classifier.songList.difficulties.HARD)

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
    wish(classifier.labelProbabilities.get('easy') === 0.3333333333333333);
    wish(classifier.labelProbabilities.get('medium') === 0.3333333333333333);
    wish(classifier.labelProbabilities.get('hard') === 0.3333333333333333);
  });
});