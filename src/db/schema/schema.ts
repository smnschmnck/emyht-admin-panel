import {
  pgTable,
  pgEnum,
  uniqueIndex,
  varchar,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";

export const chatType = pgEnum("chat_type", ["one_on_one", "group"]);
export const messageType = pgEnum("message_type", [
  "data",
  "audio",
  "video",
  "image",
  "plaintext",
]);
export const deliveryStatus = pgEnum("delivery_status", [
  "read",
  "delivered",
  "sent",
]);
export const friendshipStatus = pgEnum("friendship_status", [
  "blocked",
  "declined",
  "accepted",
  "pending",
]);

export const users = pgTable(
  "users",
  {
    uuid: varchar("uuid", { length: 64 }).notNull(),
    email: varchar("email", { length: 64 }).notNull(),
    username: varchar("username", { length: 32 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    salt: varchar("salt", { length: 128 }).notNull(),
    isAdmin: boolean("is_admin").notNull(),
    emailActive: boolean("email_active").notNull(),
    emailToken: varchar("email_token", { length: 64 }),
    pictureUrl: varchar("picture_url", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      emailKey: uniqueIndex("users_email_key").on(table.email),
      emailTokenKey: uniqueIndex("users_email_token_key").on(table.emailToken),
    };
  }
);

export const chats = pgTable("chats", {
  chatId: varchar("chat_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 32 }).notNull(),
  lastMessageId: varchar("last_message_id", { length: 64 }),
  pictureUrl: varchar("picture_url", { length: 128 }).notNull(),
  chatType: chatType("chat_type").notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  creationTimestamp: bigint("creation_timestamp", { mode: "number" }).notNull(),
  blocked: boolean("blocked"),
});

export const friends = pgTable("friends", {
  sender: varchar("sender", { length: 64 }).notNull(),
  reciever: varchar("reciever", { length: 64 }).notNull(),
  status: friendshipStatus("status").notNull(),
});

export const userChat = pgTable("user_chat", {
  uuid: varchar("uuid", { length: 64 }).notNull(),
  chatId: varchar("chat_id", { length: 64 }).notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  unreadMessages: bigint("unread_messages", { mode: "number" }).notNull(),
});

export const changeEmail = pgTable(
  "change_email",
  {
    uuid: varchar("uuid", { length: 64 }).notNull(),
    newEmail: varchar("new_email", { length: 64 }).notNull(),
    confirmationToken: varchar("confirmation_token", { length: 64 }).notNull(),
  },
  (table) => {
    return {
      confirmationTokenKey: uniqueIndex(
        "change_email_confirmation_token_key"
      ).on(table.confirmationToken),
      newEmailKey: uniqueIndex("change_email_new_email_key").on(table.newEmail),
      uuidKey: uniqueIndex("change_email_uuid_key").on(table.uuid),
    };
  }
);

export const chatmessages = pgTable("chatmessages", {
  messageId: varchar("message_id", { length: 64 }).notNull(),
  chatId: varchar("chat_id", { length: 64 }).notNull(),
  senderId: varchar("sender_id", { length: 64 }).notNull(),
  textContent: varchar("text_content", { length: 4096 }),
  messageType: messageType("message_type").notNull(),
  mediaUrl: varchar("media_url", { length: 128 }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  timestamp: bigint("timestamp", { mode: "number" }).notNull(),
  deliveryStatus: deliveryStatus("delivery_status").notNull(),
});
