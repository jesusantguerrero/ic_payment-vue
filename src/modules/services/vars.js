const currentPage = $("title").text().split(" ");

export default  {
  ran: false,
  currentPage: currentPage[4].toLowerCase().trim()
}
