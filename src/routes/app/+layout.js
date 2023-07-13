import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
  // Need to have a layout-level protection to avoid client-side switching
  const data = await parent();
  if (!data.session) {
    throw redirect(303, "/");
  }
}