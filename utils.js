// Function to check if a string is a valid URL
function checkValidURL(url) {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
}
