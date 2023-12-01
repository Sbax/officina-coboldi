export const getSystemFromEvents = (events) =>
  Object.values(
    events
      .map(({ system }) => system)
      .filter(Boolean)
      .reduce((systems, system) => {
        const slug = system.toLowerCase().trim().replaceAll(" ", "-");

        if (system[slug]) return systems;
        systems[slug] = system.trim();
        return systems;
      }, {})
  );
