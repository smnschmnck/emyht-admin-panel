import { DeleteUserButton } from "@/components/ui/DeleteUserButton";
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
    <main className="flex p-12 flex-col gap-10 w-full">
      <h1 className="font-semibold text-xl">Users</h1>
      <div className="w-fit h-[265px] overflow-y-scroll pr-4">
        <table className="text-left">
          <thead>
            <tr className="border-b border-zinc-200 sticky top-0 z-10 bg-white">
              <th className="w-56 pb-4 font-semibold">Username</th>
              <th className="pb-4 w-96 font-semibold">E-Mail</th>
              <th className="w-56 pb-4 font-semibold">Message Count</th>
              <th className="pb-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.uuid} className="border-b border-zinc-100">
                <td className="py-8 font-semibold">{user.username}</td>
                <td className="py-8">{user.email}</td>
                <td className="py-8">{user.messageCount}</td>
                <td className="py-8">
                  <DeleteUserButton userId={user.uuid} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
