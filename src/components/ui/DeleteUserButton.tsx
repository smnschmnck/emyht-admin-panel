"use client";

export const DeleteUserButton: React.FC<{ userId: string | null }> = ({
  userId,
}) => {
  return (
    <button
      onClick={() => alert(userId)}
      className="font-medium text-red-500 bg-red-100 border border-red-200 w-24 h-10 rounded-md hover:bg-red-200 hover:border-red-300 hover:text-red-600 transition"
    >
      Delete
    </button>
  );
};
