import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  LoaderCircle,
  Plus,
  User,
} from "lucide-react";

export const Icons = {
  loaderCircle: LoaderCircle,
  user: User,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  chevronsUpDown: ChevronsUpDown,
  plus: Plus,
};

export type iconNameType = keyof typeof Icons;
