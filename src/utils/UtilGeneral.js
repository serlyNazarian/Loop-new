const UtilGeneral = {
  TabTitle(newTitle) {
    document.title = newTitle;
  },

  preventDefault(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
  },

  stopPropagation(e) {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
  },
};

export default UtilGeneral;
