let quotesArray = [
  { category: "inspiration", text: "Work hard or die trying" },
  { category: "motivation", text: "Wake up and get money" },
  { category: "love", text: "Love is blind" },
  { category: "life", text: "Life is hard" },
  { category: "birthday", text: "Happy birthday" },
  { category: "family", text: "No family no life" },
];

// Load quotes and filter from local storage if available
window.onload = function () {
  loadQuotes();
  populateCategoryFilter();
  loadLastSelectedCategory();
  filterQuotes();
};

// Show random quote from the array
function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotesArray.length);
  let randomQuote = quotesArray[randomIndex].text;
  document.getElementById("quoteDisplay").innerHTML = randomQuote;

  // Save last viewed quote to session storage
  sessionStorage.setItem("lastViewedQuote", randomQuote);
}

// Function to get input values and add a new quote
function createAddQuoteForm() {
  let newQuoteText = document.getElementById("newQuoteText").value;
  let newQuoteCategory = document.getElementById("newQuoteCategory").value;
  let newQuote = { category: newQuoteCategory, text: newQuoteText };
  quotesArray.push(newQuote);
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  saveQuotes();
  populateCategoryFilter();
  filterQuotes();
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotesArray", JSON.stringify(quotesArray));
}

// Load quotes from local storage
function loadQuotes() {
  let storedQuotes = localStorage.getItem("quotesArray");
  if (storedQuotes) {
    quotesArray = JSON.parse(storedQuotes);
  }
}

// Populate category filter with unique categories
function populateCategoryFilter() {
  let categories = ["all"];
  quotesArray.forEach((quote) => {
    if (!categories.includes(quote.category)) {
      categories.push(quote.category);
    }
  });

  let categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = "";
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on selected category
function filterQuotes() {
  let selectedCategory = document.getElementById("categoryFilter").value;
  let filteredQuotes = quotesArray.filter(
    (quote) => selectedCategory === "all" || quote.category === selectedCategory
  );

  if (filteredQuotes.length > 0) {
    let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    document.getElementById("quoteDisplay").innerText =
      filteredQuotes[randomIndex].text;
  } else {
    document.getElementById("quoteDisplay").innerText =
      "No quotes available for this category.";
  }

  // Save selected category to local storage
  localStorage.setItem("selectedCategory", selectedCategory);
}

// Load last selected category from local storage
function loadLastSelectedCategory() {
  let selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    document.getElementById("categoryFilter").value = selectedCategory;
  }
}

// Export quotes to JSON file
function exportToJsonFile() {
  let dataStr = JSON.stringify(quotesArray);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  let exportFileDefaultName = "quotes.json";

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotesArray.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
    populateCategoryFilter();
    filterQuotes();
  };
  fileReader.readAsText(event.target.files[0]);
}
