const $businessID = 1;
const $questionID = [1, 2, 3]; // Can only be numbers
const $question = "";
const $rules = [];

module.exports = {
  surveys: {
    [$businessID]: {
      [$questionID[0]]: {
        question: $question,
        rules: $rules,
        next: [$questionID[1]],
      },
    },
  },
};
