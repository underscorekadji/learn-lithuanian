import WordsTable from "../../features/Words/components/WordsTable/WordsTable.component";

const wordsData = [
  {
    lit: "ė́sti (ė́da, ė́dė)",
    rus: "есть (животные)",
    example: "Karvė ė́dė šieną",
    exampleTranslation: "Корова ест сено",
    tags: "Глагол",
  },
  {
    lit: "válgyti (válgau)",
    rus: "есть (человек)",
    example: "Af válgau kavìnėje",
    exampleTranslation: "Я ем в кафе",
    tags: "Глагол",
  },
  {
    lit: "ei̇̃ti (einù)",
    rus: "идти",
    example: "Aš einù pas draũgę\nAš su draũge einù į teatra",
    exampleTranslation: "Я иду к подруге\nЯ с подругой иду в театр",
    tags: "Глагол, движение",
    level: "Начальный",
  },
  {
    lit: "móteris",
    rus: "женщина",
    example: "Čià yrà móteris",
    exampleTranslation: "Это женщина",
    tags: "Существительное, люди",
    level: "Начальный",
  },
  {
    lit: "dabar̃",
    rus: "сейчас",
    example: "Dvi móterys dabar̃ kavìnėje",
    exampleTranslation: "Две женщины сейчас в кафе",
    tags: "Наречие, время",
    level: "Начальный",
  },
];

const WordsPage = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            Words
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </h3>
        </div>
      </div>

      <div className="flex items-center w-full">
        <div className="flex-grow">
          <WordsTable data={wordsData} />
        </div>
      </div>
    </div>
  );
};

export default WordsPage;
