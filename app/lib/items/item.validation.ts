import { ApiItem, BaseItemSchema } from "./item.schema";

export function validateApiItem(item: ApiItem) {
  const parsed = BaseItemSchema.safeParse(item);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Validation errors:",
        parsed.error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path,
        })),
      );
    }
    return null;
  }

  return parsed.data;
}
