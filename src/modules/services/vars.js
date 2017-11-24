const currentPage = $("title").text().split(" ");
let ran = false;
currentPage = currentPage[4].toLowerCase().trim();


defineAxios = axios.create({
  baseURL: BASE_URL
})
