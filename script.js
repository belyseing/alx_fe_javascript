let quotesArray = [
  { category: "inspiration", text: "Work hard or die trying" },
  { category: "motivation", text: "Wake up and get money" },
  { category: "love", text: "Love is blind" },
  { category: "life", text: "Life is hard" },
  { category: "birthday", text: "Happy birthday" },
  { category: "family", text: "No family no life" },
];

// Call the function after the page has loaded
window.onload = function () {
  showRandomQuote();
};

//Show random quote from the array
function showRandomQuote() {
  // Get a random index
  let randomIndex = Math.floor(Math.random() * quotesArray.length);

  // Get the quote at the random index
  let randomQuote = quotesArray[randomIndex].text;
  document.getElementById("quoteDisplay").innerHTML = randomQuote;
}

// Function to get input values and add a new quote
function createAddQuoteForm() {
  // Get the input values
  let newQuoteText = document.getElementById("newQuoteText").value;
  let newQuoteCategory = document.getElementById("newQuoteCategory").value;
  // Create a new quote object
  let newQuote = { category: newQuoteCategory, text: newQuoteText };
  // Add the new quote to the quotes array
  quotesArray.push(newQuote);
  // Clear the input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  // Optionally, display the new random quote
  console.log(quotesArray)
}
