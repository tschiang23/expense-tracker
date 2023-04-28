module.exports = {
  ifeq: function (a, b) {

    if (String(a) === String(b)) {
      return 'selected'
    } else {
      return ""
    }
  },
}
