// almost final
// class Person {
//   constructor(whatIs) {
//     this.whatIs = whatIs
//   }
//   log(number) {
//     console.log(this.whatIs(number))
//   }
// };
// const personOne = new Person(number => Number('0b' + number));
// const personTwo = new Person(number => number);


// extract functions
// function binaryAware(number) {
//   return Number('0b' + number);
// };

// function binaryOblivious(number) {
//   return number;
// };
// const personOne = new Person(binaryAware);
// const personTwo = new Person(binaryOblivious);




// static functctions
// class Person {
//   constructor(whatIs) {
//     this.whatIs = whatIs;
//   };
//   log(number) {
//     console.log(this.whatIs(number));
//   };
//   static binaryAware(number) {
//     return Number('0b' + number);
//   };
//   static binaryOblivious(number) {
//     return number;
//   };
// };
// const personOne = new Person(Person.binaryAware);
// const personTwo = new Person(Person.binaryOblivious);



//actual strategy
class Person {
  constructor(whatIs) {
    this.whatIs = whatIs
  };
  log(number) {
    console.log(this.whatIs(number))
  };
};
const binary = {
  aware(number) {
    return Number('0b' + number)
  },
  oblivious(number) {
    return number
  }
};
const personOne = new Person(binary.aware);
const personTwo = new Person(binary.oblivious);
[personOne, personTwo].forEach(person => {
  person.log(10)
});





// output test
[personOne, personTwo].forEach(person => {
  person.log(10)
});