var translations = require('./static/js/translations.js');

var allKeys = Object.keys(translations.en);

var errors = 0;

Object.keys(translations).forEach(function(language) {
  console.log("Testing translation", language);

  allKeys.forEach(function(key) {
    if (!translations[language][key]) {
      errors++;
      console.log("Key '" + key + "' not present in " + language +
                  " translation");
    }
  });

  Object.keys(translations[language]).forEach(function(key) {
    if (allKeys.indexOf(key) == -1) {
      errors++;
      console.log("Extra key '" + key + "' found in " + language +
                  " translation");
    }
  });
});

console.log("Done testing.");

process.exit(errors);
