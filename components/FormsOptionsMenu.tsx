import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Button } from './ui/button';

export default function FormsOptionsMenu({
  isEditable,
  setIsEditable,
}: {
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-6 px-2">
          <span className="sr-only">Actions</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!isEditable ? (
          <DropdownMenuItem onSelect={() => setIsEditable(true)}>
            Edit
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => setIsEditable(false)}>
            Cancel
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => {}} className="text-red-600">
        Delete
      </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
