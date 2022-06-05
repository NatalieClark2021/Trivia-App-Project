// This is a class that houses the JOSN return of the Trivia Game API
// opentdb.com/api_config.php


// this is what the API Service returns
export class APITriviaResponse {
  response_code: number;
  results: APIQuestion[];
}

// supporting class for the API return data
export class APIQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[]
}

export const SampleTriviaQuestions: APIQuestion[] = [
    {category: "Mythology", type: "multiple",
			difficulty: "easy",
			question: "Who was the King of Gods in Ancient Greek mythology?",
			correct_answer: "Zeus",
      incorrect_answers: ["Apollo", "Hermes", "Poseidon"]
    },
    {
			category: "Mythology",
			type: "boolean",
			difficulty: "easy",
			question: "According to Greek Mythology, Zeus can control lightning.",
			correct_answer: "True",
		incorrect_answers: ["False"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "Which Greek &amp; Roman god was known as the god of music, truth and prophecy, healing, the sun and light, plague, poetry, and more?",
			correct_answer: "Apollo",
			incorrect_answers: ["Aphrodite","Artemis","Athena"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "The greek god Poseidon was the god of what?",
			correct_answer: "The Sea",
			incorrect_answers: ["War","Sun","Fire"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "Which figure from Greek mythology traveled to the underworld to return his wife Eurydice to the land of the living?",
			correct_answer: "Orpheus",
			incorrect_answers: ["Hercules","Perseus",	"Daedalus"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "In most traditions, who was the wife of Zeus?",
			correct_answer: "Hera",
			incorrect_answers: ["Aphrodite","Athena",	"Hestia"]
		},
		{
			category: "Mythology",
			type: "boolean",
			difficulty: "easy",
			question: "According to Greek Mythology, Atlas was an Olympian God.",
			correct_answer: "False",
			incorrect_answers: ["True"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "Which of these mythological creatures is said to be half-man and half-horse?",
			correct_answer: "Centaur",
			incorrect_answers: ["Minotaur","Pegasus",	"Gorgon"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "What mytological creatures have women&#039;s faces and vultures&#039; bodies?",
			correct_answer: "Harpies",
			incorrect_answers: ["Mermaids","Nymph","Lilith"]
		},
		{
			category: "Mythology",
			type: "multiple",
			difficulty: "easy",
			question: "The Nike apparel and footwear brand takes it&#039;s name from the Greek goddess of what?",
			correct_answer: "Victory",
			incorrect_answers: ["Courage","Strength",	"Honor"]
		}
  ];

