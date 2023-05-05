import { UserTable } from "@/components/UserTable";
import { db } from "@/db/db";
import { chatmessages, users } from "@/db/schema/schema";
import { eq, sql } from "drizzle-orm";

export default async function Home() {
  const allUsers = await db
    .select({
      username: users.username,
      uuid: users.uuid,
      email: users.email,
      messageCount: sql<number>`count(${chatmessages.messageId})`,
    })
    .from(users)
    .fullJoin(chatmessages, eq(users.uuid, chatmessages.senderId))
    .groupBy(users.uuid);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-medium">Admin panel</h1>
      <UserTable users={allUsers} />
    </div>
  );
}
