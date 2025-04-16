import { ThemeProvider } from "@/components/theme-provider"
import Workspace from './components/layout/Workspace';

function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Workspace />
    </ThemeProvider>
  )
}

export default App
