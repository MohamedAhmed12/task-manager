import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  LoaderCircle,
  Pencil,
  Plus,
  Trash2,
  User,
} from "lucide-react";

export const Icons = {
  loaderCircle: LoaderCircle,
  user: User,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  chevronsUpDown: ChevronsUpDown,
  plus: Plus,
  pencil: Pencil,
  trash: Trash2,
};

export type iconNameType = keyof typeof Icons;
