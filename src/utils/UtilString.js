import md5 from 'md5';

const UtilString = {
  EMPTY_STRING: '',
  md5: (str) => {
    return md5(str);
  },
};

export default UtilString;
