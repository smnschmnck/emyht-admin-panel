"use server";
import { z } from "zod";
import { zact } from "zact/server";

const deleteUser = (uuid: string) => {
  return { message: `Deleting user with uuid: ${uuid} ` };
};

const schema = z.object({ uuid: z.string().min(6) });

export const validatedAction = zact(schema)(async (input) =>
  deleteUser(input.uuid)
);
