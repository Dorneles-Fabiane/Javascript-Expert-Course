const Service = require('./service.js')
const assert = require('assert')
const { createSandbox }  = require('sinon')

const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"

const sinon = createSandbox()
const mocks = {
  alderaan: require('./../mocks/alderaan.json'),
  tatooine: require('../mocks/tatooine.json')
}

;(async () => {
  {
    // This snippet goes to the internet!!
    // const service = new Service()
    // const data = await service.makeRequest(BASE_URL_2)
    // console.log(JSON.stringify(data))
  }

  const service = new Service()
  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)
  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)
  
  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5
    }

    const results = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(results, expected)
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2
    }

    const results = await service.getPlanets(BASE_URL_2)
    assert.deepStrictEqual(results, expected)
  }
  
})()