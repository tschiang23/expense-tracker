module.exports = {
  ifeq: function (selectedCategoryId, value) {
    if (!selectedCategoryId) return

    if (String(selectedCategoryId) === String(value)) {
      return 'selected'
    }
  },
}
