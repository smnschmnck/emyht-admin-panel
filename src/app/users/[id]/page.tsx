import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { UserDeleteButton } from "./UserDeleteButton";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const formDataToObject = (formData: FormData) => {
  const dataMap = new Map<string, unknown>();

  formData.forEach((val, key) => dataMap.set(key, val));

  return Object.fromEntries(dataMap);
};

const UsersPage = async ({ params }: { params: { id: string } }) => {
  const usersRes = await db
    .select()
    .from(users)
    .where(eq(users.uuid, params.id))
    .limit(1);
  const user = usersRes[0];

  const updateUsername = async (data: FormData) => {
    "use server";

    const dataObj = formDataToObject(data);

    const schema = z.object({
      username: z
        .string({ required_error: "Username is required" })
        .min(3, "Username must be at least 3 characters"),
    });

    const parsedData = schema.safeParse(dataObj);

    if (!parsedData.success) {
      console.log(parsedData.error);
      return;
    }

    const userData = parsedData.data;

    await db
      .update(users)
      .set({ username: userData.username })
      .where(eq(users.uuid, params.id));

    revalidatePath(`/users/${params.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-medium">User info</h1>
        <p>{user.username}</p>
        <p>{user.uuid}</p>
        <p>{user.email}</p>
        <p>{user.emailActive && "active"}</p>
        <p>{user.isAdmin && "admin"}</p>
      </div>
      <form action={updateUsername} className="flex flex-col gap-2 w-fit">
        <Input name="username" placeholder="Update Username" />
        <Button type="submit">Update</Button>
      </form>
      <div className="flex flex-col rounded-3xl border-2 bg-red-50 border-red-500 p-8 w-1/2 gap-4 h-60">
        <h3 className="font-medium text-xl">Danger Zone</h3>
        <div>
          <UserDeleteButton uuid={user.uuid} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
