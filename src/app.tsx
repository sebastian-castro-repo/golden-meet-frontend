import '@styles/global.scss'
import AppRoutes from "@/routes/routes";
import { useApplyTheme } from '@/hooks/useApplyTheme';

function App() {
  useApplyTheme();
  return (
          <AppRoutes/>
)
}

export default App
