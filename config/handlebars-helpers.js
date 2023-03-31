module.exports = {
  ifeq: function (selectedCategoryId, value) {
    if (!selectedCategoryId) {
      return
    } else if (String(selectedCategoryId) === String(value)) {
      return 'selected'
    }
  },
}
