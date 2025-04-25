import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatus } from "../actions/fetchTasks";

export function StatusDropdown({
  filteredStatus,
  onChange,
}: {
  filteredStatus: TaskStatus;
  onChange: (status: TaskStatus) => void;
}) {
  return (
    <Select value={filteredStatus} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(TaskStatus).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
