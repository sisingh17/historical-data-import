const Analytics = require('analytics-node')
const fs = require('fs')
const parse = require('csv-parse')

const analytics = new Analytics('PthiBXwhrlZLJ7CUFmZmCgBa34ylubW5')
let rowCount = 0

fs.createReadStream('./src/Sample_Track.csv')
  .pipe(parse({ delimiter: ',' }))
  .on('data', row => {
    if (rowCount > 0) sendTracks(row)
    rowCount++
  })

const sendTracks = data => {
  analytics.track({
    userId: data[1],
    timestamp:new Date(data[2]),
    event: data[3],
    properties: {
      email: data[4],
      first_name: data[5],
      last_name: data[6]
    }
  })
}
