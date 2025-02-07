import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from '../../components/Dashboard/Dashboard';
export const Home = () => {
  return (
    <div>
      <Dashboard />
      <Toaster />
    </div>
  );
};
