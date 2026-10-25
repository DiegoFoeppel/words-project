import { Badge } from "./ui/badge";

import { LearningStatus } from "@/types";

const colorTheme: Record<LearningStatus, string> = {
  new: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  learning:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  mastered: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};

const BadgeStatus = ({ status }: { status: LearningStatus }) => {
  const theme = colorTheme[status];

  return <Badge className={theme}>{status}</Badge>;
};

export default BadgeStatus;
