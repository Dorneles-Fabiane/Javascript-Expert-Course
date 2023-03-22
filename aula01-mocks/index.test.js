const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require('assert');

//IFEE
;(async () => {
  
  //Vaviraveis criadas neste bloco, só são validas durante sua execução.
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/invalid-header.csv'
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/fiveItems-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/threeItems-valid.csv'
    const expected = [
      {
        id: '123',
        name: 'Fabiane Dorneles',
        profession: 'Javascript Specialist',
        age: '27'
      },
      {
        id: '321',
        name: 'Xuxa da Silva',
        profession: 'Javascript Specialist',
        age: '80'
      },
      {
        id: '231',
        name: 'Joazinho',
        profession: 'Java Developer',
        age: '30'
      }
    ]
    const result = await File.csvToJSON(filePath)
    assert.deepEqual(result, expected)
  }
})()