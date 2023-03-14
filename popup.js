// Helper functions
const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const toggleDisabled = () => {
  document.querySelector("#submit").disabled =
    !document.querySelector("#submit").disabled;
  if (document.querySelector("#submit").disabled) {
    document.querySelector("#submit").innerHTML = "Saving...";
  } else {
    document.querySelector("#submit").innerHTML = "Save";
  }
};

const onError = (message, id) => {
  document.querySelector(id + "-message").innerHTML = message;
  document.querySelector(id).focus();
};

// Fill destination field with current tab URL
browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
  document.querySelector("#destination").value = tabs[0].url;
}, console.error);

// Form to add new link
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  toggleDisabled();
  document.querySelector("#destination-message").innerHTML = "";
  document.querySelector("#linkName-message").innerHTML = "";
  document.querySelector("#description-message").innerHTML = "";

  // Get form values
  const destination = document.querySelector("#destination").value;
  const linkName = document.querySelector("#linkName").value;
  const description = document.querySelector("#description").value;

  // Form validation
  if (!isValidUrl(destination)) {
    onError("Please enter a valid URL", "#destination");
  } else if (!linkName) {
    onError("Please enter a link name", "#linkName");
  } else if (linkName.includes(" ")) {
    onError("Please enter a link name without spaces", "#linkName");
  } else {
    browser.storage.local.get(linkName).then((result) => {
      if (result[linkName]) {
        onError("This link name already exists", "#linkName");
        return;
      }
      // Save link to storage
      browser.storage.local.set({
        [linkName]: {
          content: destination,
          description: description ?? linkName,
        },
      });
    });
  }
  toggleDisabled();
});
