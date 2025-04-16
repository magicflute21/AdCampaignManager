import { Toggle } from "@/components/ui/toggle"
import { Sun, CloudSun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function DarkmodeSwitch() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('dark');
  }

  return (
    <Toggle size="default" className="w-auto h-auto p-2 ml-auto" onClick={toggleTheme}>
      {theme === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <CloudSun className="size-4" />
      )}
    </Toggle>
  )
}