var assert = require('assert');

var translations = require('./static/js/translations.js');

var allKeys = Object.keys(translations.en);

Object.keys(translations).forEach(function(language) {
  console.log("Testing translation", language);
  assert.deepEqual(Object.keys(translations[language]), allKeys);
});

console.log("Translations are OK!");
