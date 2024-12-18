import React from "react";
import { Table } from "flowbite-react";

interface WordData {
  lit: string;
  rus: string;
  example: string;
  exampleTranslation: string;
  tags: string;
  level?: string;
}

interface WordsTableProps {
  data: WordData[];
}

const WordsTable: React.FC<WordsTableProps> = ({ data }) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Лит</Table.HeadCell>
        <Table.HeadCell>Рус</Table.HeadCell>
        <Table.HeadCell>Пример</Table.HeadCell>
        <Table.HeadCell>Перевод примера</Table.HeadCell>
        <Table.HeadCell>Тэги</Table.HeadCell>
        <Table.HeadCell>Уровень</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {data.map((word, index) => (
          <Table.Row key={index}>
            <Table.Cell>{word.lit}</Table.Cell>
            <Table.Cell>{word.rus}</Table.Cell>
            <Table.Cell>{word.example}</Table.Cell>
            <Table.Cell>{word.exampleTranslation}</Table.Cell>
            <Table.Cell>{word.tags}</Table.Cell>
            <Table.Cell>{word.level || "—"}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default WordsTable;