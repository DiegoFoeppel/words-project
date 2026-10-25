import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import * as z from "zod";

import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { LearningStatus, type Word } from "@/types";
import { addWord } from "@/services/wordService";

const status = z.enum(LearningStatus);

export const formSchema = z.object({
  word: z
    .string()
    .min(3, "Word must be at least 5 characters.")
    .max(32, "Word must be at most 32 characters."),
  sentence: z
    .string()
    .min(3, "Sentence must be at least 3 characters.")
    .max(300, "Sentence must be at most 300 characters."),
  source: z
    .string()
    .min(3, "Source must be at least 3 characters.")
    .max(300, "Source must be at most 300 characters."),
  english: z
    .string()
    .min(3, "Sentence must be at least 3 characters.")
    .max(300, "Sentence must be at most 300 characters."),
  translation: z
    .string()
    .min(3, "Source must be at least 3 characters.")
    .max(300, "Source must be at most 300 characters."),
  status: status,
});

type Props = {
  onSuccess: () => void;
  mode: string;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  word: Word;

  // isOpen: boolean;
  // onChange: (value: boolean) => void;
  // onSubmit?: () => void;
};

const emptyValues: z.infer<typeof formSchema> = {
  word: "",
  status: "new",
  sentence: "teste",
  source: "",
  english: "",
  translation: "",
};

export function Form({
  onSuccess,
  mode,
  open,
  onOpenChange,
  selectedItem,
}: Props) {
  const isEdit = mode === "edit";

  const {
    handleSubmit,
    control,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: emptyValues,
  });

  React.useEffect(() => {
    if (selectedItem) {
      // Se o estado existir, preenche o formulário com os dados novos
      reset(selectedItem);
    } else {
      // Se o estado for nulo/vazio, limpa o formulário de volta ao padrão
      reset(emptyValues);
    }
  }, [selectedItem, reset]);

  console.log("def", selectedItem);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
    if (!data) return;

    try {
      const response = await addWord(data);

      console.log("response", response);

      onSuccess();

      reset({
        word: "",
        status: "new",
        sentence: "",
        source: "",
      });

      toast.add({
        title: "Palavra adicionada",
        //   description: "Sunday, December 3 at 9:00 AM",
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form id='form-rhf-demo' onSubmit={handleSubmit(onSubmit)}>
        {!isEdit && (
          <DialogTrigger
            render={<Button variant='outline'>Adicionar palavra</Button>}
          />
        )}
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Editar palavra" : "Adicionar nova palavra"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Modifique algum campo do formulário."
                : "Adicione uma palavra que tenha visto e uma frase de exemplo."}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name='word'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-word'>Palavra</FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-demo-word'
                    aria-invalid={fieldState.invalid}
                    // placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='sentence'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-sentence'>
                    Frase
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-demo-sentence'
                    aria-invalid={fieldState.invalid}
                    // placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='english'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-source'>
                    English
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-demo-source'
                    aria-invalid={fieldState.invalid}
                    // placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='source'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-source'>Origem</FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-demo-source'
                    aria-invalid={fieldState.invalid}
                    // placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='translation'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-rhf-demo-source'>
                    Tradução
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-rhf-demo-translation'
                    aria-invalid={fieldState.invalid}
                    // placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>Cancelar</Button>} />
            <Button type='submit' form='form-rhf-demo'>
              {isEdit ? "Salvar alterações" : "Adicionar palavra"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
