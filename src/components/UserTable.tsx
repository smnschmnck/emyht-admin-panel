"use client";

import { DeleteUserButton } from "@/components/ui/DeleteUserButton";
import Link from "next/link";
import { useState } from "react";

interface UserEntitiy {
  username: string | null;
  uuid: string | null;
  email: string | null;
  messageCount: number;
}

export const UserTable: React.FC<{ users: UserEntitiy[] }> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((u) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const lowerCaseEmail = u.email?.toLowerCase();
    const lowerCaseUsername = u.username?.toLocaleLowerCase();

    return (
      lowerCaseEmail?.includes(lowerCaseQuery) ||
      lowerCaseUsername?.includes(lowerCaseQuery)
    );
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-xl">Users</h1>
        <input
          placeholder="Search Users"
          className="w-72 bg-zinc-100 p-3 rounded-md outline-none outline-offset-0 focus:outline-2 text-sm focus:outline-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="h-[265px] overflow-y-scroll">
        <table className="text-left">
          <thead>
            <tr className="border-b border-zinc-300 sticky top-0 z-10 bg-zinc-50">
              <th className="w-56 pb-4 font-medium">Username</th>
              <th className="w-96 pb-4 font-medium">E-Mail</th>
              <th className="pb-4 font-medium">Message Count</th>
              <th className="w-56" />
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.uuid} className="border-b border-zinc-100">
                <td className="py-8 font-medium">{user.username}</td>
                <td className="py-8">{user.email}</td>
                <td className="py-8 text-zinc-400">
                  {user.messageCount} Messages
                </td>
                <td className="flex py-8 w-56 justify-end">
                  <Link
                    href={`/users/${user.uuid}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
