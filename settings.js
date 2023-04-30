const linkList = document.querySelector("#link-list");

browser.storage.local.get().then((resp) => {
  // If no links found, display message
  if (Object.keys(resp).length === 0) {
    linkList.innerHTML = "No links found";
    return;
  }

  // Construct table head
  const tableHeader = document.createElement("thead");
  tableHeader.innerHTML =
    "<tr><th>Link</th><th>Description</th><th>Delete</th></tr>";
  linkList.appendChild(tableHeader);

  // Construct table body
  const tableBody = document.createElement("tbody");
  Object.keys(resp).forEach((entry) => {
    // Construct table row
    const row = document.createElement("tr");

    // Construct table link cell
    const link = document.createElement("td");
    link.innerHTML = "<a href='" + resp[entry].content + "'>" + entry + "</a>";

    // Construct table description cell
    const description = document.createElement("td");
    description.innerHTML = resp[entry].description;

    // Construct table delete cell
    const del = document.createElement("td");
    const delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.classList.add("pure-button");
    delButton.classList.add("delete");
    delButton.addEventListener("click", () => {
      browser.storage.local.remove(entry);
      row.remove();
    });
    del.appendChild(delButton);

    // Add cells to row
    row.appendChild(link);
    row.appendChild(description);
    row.appendChild(del);

    // Add row to table body
    tableBody.appendChild(row);
  });
  linkList.appendChild(tableBody);
});
