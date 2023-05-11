"use client";

import { Spinner } from "@/components/ui/Spinner";
import { validatedAction } from "./action";
import { useZact } from "zact/client";
import { Button } from "@/components/ui/Button";

export const UserDeleteButton: React.FC<{ uuid: string }> = ({ uuid }) => {
  const { mutate, data, isLoading, error } = useZact(validatedAction);

  const deleteUser = () => {
    mutate({ uuid: uuid });
  };

  return (
    <div className="flex flex-col items-start">
      <Button onClick={deleteUser} variant={"destructive"}>
        Delete User
      </Button>
      {isLoading && <Spinner size={"sm"} />}
      {data?.message}
      {error?.message}
    </div>
  );
};
