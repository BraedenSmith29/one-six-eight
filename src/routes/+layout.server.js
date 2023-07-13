export const load = async ({ locals: { getSession } }) => {
  // Allows us to pass the server session into client load function
  return {
    session: await getSession(),
  };
}