import http from './httpService';

const apiEndpoint = '/sports';

const sportUrl = (sportId) => {
  return `${apiEndpoint}/${sportId}`;
};

export const getSports = () => http.get(apiEndpoint);

export const searchSport = (query) =>
  http.get(`${apiEndpoint}/search?searchQuery=${query}`);

export const getUserSports = (accessToken) =>
  http.get(`${apiEndpoint}/user-sports`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const getSportById = (sportId, accessToken) =>
  http.get(sportUrl(sportId), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const getSportBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createSport = (sport) => http.post(apiEndpoint, sport);

export const updateSport = (sportId, sport) =>
  http.patch(sportUrl(sportId), sport);

export const deleteSport = (sportId) => http.delete(sportUrl(sportId));
