const Analytics = require('analytics-node')
const fs = require('fs')
const parse = require('csv-parse')

const analytics = new Analytics('PthiBXwhrlZLJ7CUFmZmCgBa34ylubW5')
let rowCount = 0

fs.createReadStream('./src/Sample_Identify.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', row => {
    if (rowCount > 0) sendIdentifies(row)
    rowCount++
  })

const sendIdentifies = data => {
  analytics.identify({
    userId: data[1],
    timestamp:new Date(data[2]),
    traits: {
      company: data[3],
      email: data[4],
      favorite_band: data[5]
    }
  })
}
