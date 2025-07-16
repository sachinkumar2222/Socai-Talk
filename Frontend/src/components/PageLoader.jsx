import { Disc3Icon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore.jsx';

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/30 backdrop-blur-md"
      data-theme={theme}
    >
      <Disc3Icon className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default PageLoader;
