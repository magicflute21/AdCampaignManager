import { ThemeProvider } from "@/components/theme-provider"
import Workspace from './components/layout/Workspace';
import { Toaster } from "./components/ui/sonner";

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Workspace />
      <Toaster />
    </ThemeProvider>
  )
}

export default App
