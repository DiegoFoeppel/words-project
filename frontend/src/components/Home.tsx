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
import { toast } from "./ui/toast";

function Home() {
  const [count, setCount] = useState(0);
  const [words, setWords] = useState<Word[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Partial<Word> | null>(null);

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

  const deleteItem = async (id: Number) => {
    try {
      if (!id) {
        return;
      }

      await deleteWord(id);

      fetchWords();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleEdit = async (wordId: number) => {
    setOpen(true);

    // console.log("cliquei editar", item);
    const word = words.find((word) => word.id === wordId);

    console.log("word", word);

    if (!word) return;

    setSelectedItem(word);
  };

  const handleDelete = (word: Word) => {
    deleteItem(word.id);
    deleteToast(word.word);
  };

  function deleteToast(word: string) {
    toast.add({
      title: "Palavra removida",
      description: `Palavra ${word} foi deletada da lista.`,
    });
  }

  return (
    <div className='mx-4 p-4'>
      <div className='flex justify-between my-4'>
        <div className='flex gap-4'>
          <Form
            onSuccess={fetchWords}
            open={open}
            onOpenChange={() => setOpen((prev) => !prev)}
            resetWord={() => setSelectedItem(null)}
            selectedItem={selectedItem}
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

      <TableDemo
        words={filteredWords}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Home;
