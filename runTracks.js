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
    timestamp: new Date(data[2]),
    event: data[3],
    properties: {
      email: data[4],
      first_name: data[5],
      last_name: data[6],
      city: data[7],
      country: data[8],
      postal_code: data[9],
      street: data[10],
      gender: data[11],
      phone: data[12],
      coupon_code: data[13],
      currency: data[14],
      order_id: data[15],
      payment_method: data[16],
      product_category: data[17],
      product_name: data[18],
      price: data[19],
      product_id: data[20],
      quantity: data[21],
      revenue: data[22],
      shipping: data[23],
      tax: data[24],
      value: data[25],
      order_status: data[26],
      discount_amount: data[27]
    }
  })
}
