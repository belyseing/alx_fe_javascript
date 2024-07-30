let quotesArray = [
  { category: "inspiration", text: "Work hard or die trying" },
  { category: "motivation", text: "Wake up and get money" },
  { category: "love", text: "Love is blind" },
  { category: "life", text: "Life is hard" },
  { category: "birthday", text: "Happy birthday" },
  { category: "family", text: "No family no life" },
];

// Load quotes from local storage if available
window.onload = function () {
  loadQuotes();
  showRandomQuote();
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
    showRandomQuote(); // Update the display
  };
  fileReader.readAsText(event.target.files[0]);
}
