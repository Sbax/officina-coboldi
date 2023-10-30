const handleResponse = async ({ res }, payload, callback = () => {}) => {
  if (payload.error) {
    res.status(500).send(payload);
    return;
  }

  await callback(payload);

  res.send(payload);
  return;
};

export default handleResponse;
