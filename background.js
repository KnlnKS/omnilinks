// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
  description: "Search golinks",
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
  linkQuery = text.trim();
  browser.storage.local.get().then((resp) => {
    if (Object.keys(resp).length === 0) {
      addSuggestions([
        {
          content: "https://www.google.com/search?q=" + text,
          description: "No results found",
        },
      ]);
      return;
    }
    const fuse = new Fuse(Object.keys(resp), {});
    const results = fuse.search(linkQuery);
    const suggestions = results.map((result) => ({
      content: resp[result.item].content,
      description:
        resp[result.item].description?.length > 0
          ? resp[result.item].description
          : result.item,
    }));
    addSuggestions(suggestions);
  });
});

// Navigate to the selected result
browser.omnibox.onInputEntered.addListener((text) => {
  linkQuery = text.trim();
  browser.storage.local.get(linkQuery).then((resp) => {
    if (Object.keys(resp).length === 0) {
      browser.tabs.update({
        url: "https://www.google.com/search?q=" + text,
      });
      return;
    }
    browser.tabs.update({
      url: resp[linkQuery].content,
    });
  });
});
