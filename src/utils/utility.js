const parseAddress = (raw) => {
    return raw.features.map((feature) => {
        return {
            country: feature.properties.country,
            state: feature.properties.state,
            city: feature.properties.city,
            id: feature.properties.place_id,
        };
    });
};

export { parseAddress };
