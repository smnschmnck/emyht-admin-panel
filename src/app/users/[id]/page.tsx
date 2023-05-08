import { db } from "@/db/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { UserDeleteButton } from "./UserDeleteButton";

const UsersPage = async ({ params }: { params: { id: string } }) => {
  const usersRes = await db
    .select()
    .from(users)
    .where(eq(users.uuid, params.id))
    .limit(1);
  const user = usersRes[0];

  return (
    <div>
      <h1 className="text-3xl font-medium">User info</h1>
      <p>{user.username}</p>
      <p>{user.uuid}</p>
      <p>{user.email}</p>
      <p>{user.emailActive && "active"}</p>
      <p>{user.isAdmin && "admin"}</p>
      <UserDeleteButton uuid={user.uuid} />
    </div>
  );
};

export default UsersPage;
