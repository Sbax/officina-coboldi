export const invalidateEvents = (res) => {
  res.unstable_revalidate("/admin");
  res.unstable_revalidate("/events");
  res.unstable_revalidate("/");
}
