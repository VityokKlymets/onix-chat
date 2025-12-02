import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider";
import { Router } from "@/routes";
import { useAuthStore } from "@/state/accounts";
import { useEffect } from "react";

export const App = () => {
  const hydrate = useAuthStore((state) => state.hydrate);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    hydrate();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Provider>
      <Router />
      <Toaster />
    </Provider>
  );
};
