import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { WordProps } from "@/types";
import BadgeStatus from "./BadgeStatus";
import { toast } from "@/components/ui/toast";

export function TableDemo({ words, onDelete, onEdit }: WordProps) {
  function deleteToast(word: string) {
    toast.add({
      title: "Palavra removida",
      description: `Palavra ${word} foi deletada da lista.`,
    });
  }

  return (
    <Table className='mx-auto w-full '>
      {/* <TableCaption className=''>Lista de palavras aprendidas.</TableCaption> */}
      <TableHeader>
        <TableRow className=''>
          <TableHead className=''>Palavra</TableHead>
          <TableHead>Frase</TableHead>
          <TableHead>Inglês</TableHead>
          <TableHead>Tradução</TableHead>
          <TableHead className='text-left'>Origem</TableHead>
          {/* <TableHead className='text-left'>Tradução</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead className='text-left'>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {words.map((w) => (
          <TableRow key={w.id}>
            <TableCell className='font-medium'>{w.word}</TableCell>
            <TableCell>{w.sentence}</TableCell>
            <TableCell className='font-medium'>{w.english}</TableCell>
            <TableCell className='text-left'>{w.translation}</TableCell>
            <TableCell className='font-medium'>{w.source}</TableCell>
            {/* <TableCell className='text-left'>{w.source}</TableCell> */}
            <TableCell>
              <BadgeStatus status={w.status} />
            </TableCell>
            <TableCell className='text-left'>
              {new Date(w.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className='text-left'>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant='ghost' size='icon' className='size-8'>
                      <MoreHorizontalIcon />
                      <span className='sr-only'>Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => onEdit(w)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant='destructive'
                    onClick={() => (onDelete(w.id), deleteToast(w.word))}
                  >
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
