import { useEffect, useState } from "react";
import axios from "axios";
import type { Quiz, Word } from "../types";
import {
  getRandomWord,
  getWordById,
  updateExample,
} from "@/services/quizService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function Quiz() {
  const [count, setCount] = useState(0);
  const [currentObj, setCurrentObj] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState("");
  const [examples, setExamples] = useState([]);

  const [exampleSentence, setExampleSentence] = useState(
    currentObj?.sentence ?? "",
  );
  const [exampleTranslation, setExampleTranslation] = useState(
    currentObj?.translation ?? "",
  );

  const handleAnswer = () => {
    console.log("obj", currentObj, attempt);
    if (
      currentObj &&
      currentObj.english.toLowerCase() === attempt.toLowerCase()
    ) {
      setCount((prev) => prev + 1);
      setAttempt("");
      fetchWord();
    }
  };

  console.log("w", currentObj);

  const fetchWord = async () => {
    try {
      const word = await getRandomWord();
      console.log("word", word, await getRandomWord());
      setCurrentObj(word);
    } catch (err) {
      console.log("err", err);
    }
  };

  const fetchExamples = async () => {
    if (!currentObj) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/api/sentences/search?word=${currentObj.german}`,
      );

      console.log("resposne", response.data);

      setExamples(response.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const saveExample = async () => {
    if (!currentObj) return;

    try {
      const response = await updateExample({
        id: currentObj.id,
        sentence: exampleSentence,
        translation: exampleTranslation,
      });

      console.log("response", response.data);

      const modWord = await getWordById(currentObj.id);

      if (modWord) {
        setCurrentObj(modWord);
      }

      clearInputs();

      await new Promise((resolve) => setTimeout(resolve, 1000));

      fetchWord();
    } catch (err) {
      console.log("err", err);
    }
  };

  const clearInputs = () => {
    setExampleSentence("");
    setExampleTranslation("");
  };

  useEffect(() => {
    fetchExamples();
  }, [currentObj]);

  const changeExample = () => {
    fetchWord();
    clearInputs();
  };

  return (
    <div className='flex p-4 flex-col mx-auto justify-center max-w-4xl mx-auto w-full rounded-md'>
      <Button disabled={!!currentObj} onClick={fetchWord}>
        Começar
      </Button>
      {currentObj && (
        <div className='space-y-3'>
          {/* <p>Contagem: {count}</p> */}
          <div>
            <p>
              Palavra: {currentObj.id} - {currentObj?.german} -{" "}
              {currentObj?.english}
            </p>
            <p>Frase: {currentObj.sentence ?? "Sem"}</p>
            <p>Tradução: {currentObj.translation ?? "Sem"}</p>
          </div>
          {/* <Input
            placeholder='resposta'
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
          /> */}

          <Label>Frase</Label>
          <Input
            placeholder='frase'
            value={exampleSentence}
            onChange={(e) => setExampleSentence(e.target.value)}
          />

          <Label>Tradução</Label>
          <Input
            placeholder='tradução'
            value={exampleTranslation}
            onChange={(e) => setExampleTranslation(e.target.value)}
          />
          {/* <p>Resposta: {attempt}</p> */}
          {/* <Button onClick={handleAnswer}>Verificar</Button> */}
          <div className='flex gap-2'>
            <Button onClick={changeExample}>Next example</Button>
            <Button onClick={saveExample}>Adicionar exemplo</Button>
          </div>
        </div>
      )}

      {/* {examples.length > 0 && (
        <ul>
          {examples.map((item) => (
            <li key={item.id}>{item.sentence}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Quiz;
