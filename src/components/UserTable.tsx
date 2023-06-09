"use client";

import Link from "next/link";
import { useState } from "react";
import { MagnifyingGlass } from "./icons/MagnifyingGlass";
import { Input } from "./ui/Input";

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
    <div className="flex flex-col gap-10 w-fit">
      <div className="flex flex-col gap-4">
        <h1 className="font-medium text-lg">Users</h1>
        <Input
          StartIcon={<MagnifyingGlass />}
          value={searchQuery}
          setValue={setSearchQuery}
          placeholder="Search users"
        />
      </div>
      <div className="h-[265px] overflow-y-scroll pr-4">
        <table className="text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-300 sticky top-0 z-10 bg-white">
              <th className="w-56 pb-2 font-medium">Username</th>
              <th className="w-96 pb-2 font-medium">E-Mail</th>
              <th className="pb-2 font-medium">Message Count</th>
              <th className="w-56" />
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.uuid} className="border-b border-zinc-100">
                <td className="py-6 font-medium">{user.username}</td>
                <td className="py-6">{user.email}</td>
                <td className="py-6 text-zinc-400">
                  {user.messageCount} Messages
                </td>
                <td className="flex py-6 w-56 justify-end">
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
