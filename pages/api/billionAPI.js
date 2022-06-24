const BASE_URL = "https://billions-api.nomadcoders.workers.dev/";

export const getAllPeople = () => {
  return fetch(BASE_URL);
};

export const getPerson = (id) => {
  return fetch(`${BASE_URL}/person/${id}`);
};
