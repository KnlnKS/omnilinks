document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const destination = document.querySelector("#destination").value;
  const linkName = document.querySelector("#linkName").value;
  const description = document.querySelector("#description").value;

  browser.storage.local.set({
    [linkName]: { destination, linkName, description },
  });
});
