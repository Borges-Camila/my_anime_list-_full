export const fetchAnimeData = async (searchTerm) => {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
  );

  if (!response.ok) {
    throw new Error("Erro na conexão com a API");
  }

  const responseData = await response.json();

  return responseData.data?.length > 0 ? responseData.data : null;
};
