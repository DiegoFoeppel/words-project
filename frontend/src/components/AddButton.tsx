import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

export function AddButton({ onAdd }) {
  const { setTheme } = useTheme();

  return <Button onClick={onAdd}>Adicionar palavra</Button>;
}
