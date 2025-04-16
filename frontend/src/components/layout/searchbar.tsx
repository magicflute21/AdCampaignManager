import {
  Command,
  CommandInput,
} from "@/components/ui/command"

export function SearchBar() {
  return (
    <div className="px-4 lg:px-6">
      <Command>
        <CommandInput placeholder="Type a title or a url..." />
      </Command>
    </div>
  )
}