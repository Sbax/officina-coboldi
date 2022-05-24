export const invalidateEvents = (res) => {
  res.unstable_revalidate("/");
  res.unstable_revalidate("/events");
  res.unstable_revalidate("/admin");
};
