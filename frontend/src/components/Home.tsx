import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router";
import Quiz from "./Quiz";
import {
  addWord,
  deleteWord,
  editWord,
  getAllWords,
} from "../services/wordService";
import type { Word } from "../types";
import { TableDemo } from "./Table";
import { ModeToggle } from "./mode-toggle";
import { Form, formSchema } from "./Form";
import type z from "zod";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function Home() {
  const [count, setCount] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState<Word | null>(null);

  const [search, setSearch] = useState("");

  const filteredWords = useMemo(() => {
    if (!search) return words;
    return words.filter((w) =>
      w.word.toLowerCase().includes(search.toLowerCase()),
    );
  }, [words, search]);

  const fetchWords = async () => {
    try {
      const words = await getAllWords();

      setWords(words);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleDelete = async (id: Number) => {
    console.log("id", id);

    try {
      if (!id) {
        return;
      }

      const response = await deleteWord(id);
      console.log("response", response);

      fetchWords();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleEdit = async (item: Word) => {
    setOpen(true);

    console.log("cliquei editar", item);

    const formData = {
      ...item,
      english: item.english ?? undefined,
      translation: item.translation ?? undefined,
    };

    if (!item) return;

    setWord(formData);
  };

  const handleEditSubmit = async () => {
    if (!word) return;

    console.log("data 2", word);

    try {
      const response = await editWord(word);

      console.log("response", response);

      fetchWords();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className='mx-4 p-4'>
      <div className='flex justify-between my-4'>
        <div className='flex gap-4'>
          <Form
            onSuccess={fetchWords}
            mode='add'
            // isOpen={isOpen}
            // onChange={handleOpen}
          />
          <Field>
            <Input
              placeholder='Buscar palavra...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
        </div>
        <ModeToggle />
      </div>

      <Form
        onSuccess={fetchWords}
        mode='edit'
        open={open}
        onOpenChange={() => setOpen((prev) => !prev)}
        selectedItem={word}
        // onSubmit={handleEditSubmit}
      />

      <TableDemo
        words={filteredWords}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Home;
