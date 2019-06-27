// **********************************
const weightLoggingButton = document.querySelector('#weightLogger');
const removeAllEntriesButton = document.querySelector('#clearEntriesButton');
const dateInput = document.querySelector('#dateInput');
const weightInput = document.querySelector('#weightInput');
const numberValidation = document.querySelector('.form__input__number-validation');
const entriesContainer = document.querySelector('.entries-container');
let validationPassed = false;
let finalFormatDate = logDate(); // Initialize date formatting.

let entries = getEntries();
renderEntries(entries);

// Store the input date in finalFormatDate.
dateInput.addEventListener('change', (e) => {
  finalFormatDate = logDate(e);
});

dateInput.addEventListener('focus', () => {
  numberValidation.style.animation = 'slideUp .3s';
  setTimeout(function() {
    removeWarningClasses(dateInput);
    numberValidation.style.animation = '';
  }, 200)
});

weightInput.addEventListener('focus', () => {
  numberValidation.style.animation = 'slideUp .3s';
  setTimeout(function() {
    removeWarningClasses(weightInput);
    numberValidation.style.animation = '';
  }, 200)
});


// Adds entry to the entries array;
// saves entries to the localStorage and renders all entries to the DOM
weightLoggingButton.addEventListener('click', () => {
  if(validate(entries)) {
    entries.push({
      date: finalFormatDate,
      weight: `${weightInput.value}kg`,
    });
    saveEntries(entries);
    renderEntries(entries);
    weightInput.value = '';
  }
});

// Deletes all entries
clearEntriesButton.addEventListener('click', () => {
  deleteAllEntries();
});

// Messing with git flow