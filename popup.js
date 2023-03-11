document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const goLink = {
    destination: document.querySelector("#destination").value,
    linkName: document.querySelector("#linkName").value,
    description: document.querySelector("#description").value,
  };
  console.log(goLink);
});
