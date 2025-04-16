import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <h3 className="text-xl font-medium">Loading...</h3>
      </div>
    </div>
  );
}
