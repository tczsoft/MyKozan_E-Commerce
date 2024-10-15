import mongoose from 'mongoose'
export const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/mykozan', (err, db) => {
// export const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/dmarkecomm', (err, db) => {
  if (err) {
    console.log(err)
  }
  console.log('Master Data Dictionary Database Connected successfully')
})
