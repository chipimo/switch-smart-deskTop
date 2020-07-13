const {Transform} = require('stream')

class PrefixedStream extends Transform {
  constructor (prefixRow) {
    super()
    this.prefixRow = prefixRow
    this.isFirstChunk = true
  }

  _transform (chunk, encoding, callback) {
    if (this.isFirstChunk) {
      this.isFirstChunk = false
      this.push(this.prefixRow)
      this.push('\n')
    }
    this.push(chunk)
    callback()
  }
}