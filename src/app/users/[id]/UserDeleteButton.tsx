"use client";

import { Spinner } from "@/components/ui/Spinner";
import { validatedAction } from "./action";
import { useZact } from "zact/client";

export const UserDeleteButton: React.FC<{ uuid: string }> = ({ uuid }) => {
  const { mutate, data, isLoading, error } = useZact(validatedAction);

  const deleteUser = () => {
    mutate({ uuid: uuid });
  };

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={deleteUser}
        className="h-10 py-2 px-4 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
      {isLoading && <Spinner size={"sm"} />}
      {data?.message}
      {error?.message}
    </div>
  );
};
