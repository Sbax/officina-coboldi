const handleResponse = async ({ res }, payload, callback = () => {}) => {
  if (payload.error) {
    res.status(500).send(payload.error);
    return;
  }

  await callback(payload);

  res.send(payload);
  return;
};

export default handleResponse;
