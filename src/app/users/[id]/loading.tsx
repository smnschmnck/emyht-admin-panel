import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="w-full h-60 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
