function formatMonth(date) {
  return date.getMonth() > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
}

(function initialDateFormat() { // I put it in an IIFE to be self-conained.
  const dateControl = document.querySelector('#dateInput');
  const currentDate = new Date();
  const currentDateFormatted = `${currentDate.getFullYear()}-${formatMonth(currentDate)}-${currentDate.getDate()}`;
    
  dateControl.value = currentDateFormatted;
  dateControl.setAttribute('max', currentDateFormatted);
}())

// Takes the date input and converts its format to DD-Month-YYYY.
function logDate(event) {
  let dateToFormat;
  if(event) {
    dateToFormat = new Date(event.target.value)
  } else {
    dateToFormat = new Date();
  }
  const date = dateToFormat.getDate().toString();
  function getMonthName(date)  {
    const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthsList[date.getMonth()];
  };
  const year = dateToFormat.getFullYear().toString();
  return `${date} ${getMonthName(dateToFormat)} ${year}`;
}

function getEntries() {
  const entriesJSON = localStorage.getItem('weightEntries');
  try {
    return entriesJSON ? JSON.parse(entriesJSON) : [];
  } catch(e) {
    return [];
  }  
}

function sortByDateLogged(entries) {
  return entries.sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return 1;
    }
    if (new Date(a.date) < new Date(b.date)) {
      return -1;
    }
  });
}

function saveEntries(entries) {
  sortByDateLogged(entries);
  localStorage.setItem('weightEntries', JSON.stringify(entries))
}


function generateEntryDOM(entry) {
  // Destructures an entry's date
  const [date, month, year] = entry.date.split(' ');
  
  const singleEntry = document.createElement('section');
  const entryDate = document.createElement('aside');
  const day = document.createElement('span');
  const monthAndYear = document.createElement('span');
  const article = document.createElement('article');

  singleEntry.setAttribute('class', 'weight-entry');
  singleEntry.appendChild(entryDate);

  entryDate.setAttribute('class', 'weight-entry__date');
  entryDate.appendChild(day);
  day.setAttribute('class', 'day');
  day.textContent = date;

  entryDate.appendChild(monthAndYear);
  monthAndYear.setAttribute('class', 'month-and-year');
  monthAndYear.textContent = `${month} ${year}`;

  singleEntry.appendChild(article);
  article.setAttribute('class', 'weight-entry__text');
  article.textContent = entry.weight;

  return singleEntry;
}

function renderEntries(entries) {
  entriesContainer.innerHTML = '';
  entries.forEach((entry) => {
    const entryElement = generateEntryDOM(entry);
    entriesContainer.appendChild(entryElement);
  });
}

function deleteAllEntries() {
  localStorage.clear();
  entries = [];
  entriesContainer.innerHTML = '';
}


// ******VALIDATION FUNCTIONALITY******
function validate(entries) {
  // Date validation
  const foundDate = entries.find((entry) => {
    return entry.date == finalFormatDate;
  });
  if (typeof foundDate != 'undefined') {   
    addWarningClasses(dateInput);
    document.querySelector('#validationText').textContent = 'It appears you\'ve already logged on that date';
    return false;
  } 
  
  if (
    weightInput.value == '' ||
    weightInput.value < 5    
  ) {
    addWarningClasses(weightInput);
    document.querySelector('#validationText').textContent = 'You must provide a valid number input!';
    weightInput.value = '';
    return false;
  } else {
    return true;
  }
}

// ******VISUAL FUNCTIONALITY******
function addWarningClasses(inputElement) {
  inputElement.classList.add('form__input--wrong-input');
  numberValidation.classList.add('u-visible-flex');
}

function removeWarningClasses(inputElement) {
  inputElement.classList.remove('form__input--wrong-input');
  numberValidation.classList.remove('u-visible-flex');
}