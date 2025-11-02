import { z } from "zod";

export const ApplicationCreate = z.object({
  creator_id: z.string().min(1),   // cuid/string ids in your DB
  event_id: z.string().min(1)
});
export type TApplicationCreate = z.infer<typeof ApplicationCreate>;
