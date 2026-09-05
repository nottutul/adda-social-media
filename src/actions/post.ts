"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/index"
import { postsTable } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createPostAction({ desc, img }: { desc?: string | null; img?: string | null }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const [post] = await db.insert(postsTable).values({
    id: crypto.randomUUID(),
    userId,
    desc: desc?.trim() || null,
    img: img || null,
  }).returning();

  revalidatePath("/");
  return { success: true, post };
}
