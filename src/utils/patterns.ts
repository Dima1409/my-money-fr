const emailPattern =
  /^([a-zA-Z0-9]{1}[a-zA-Z0-9_\-.]{1,22})@([a-zA-Z0-9_\-.]{1,10})\.([a-zA-Z]{2,4})$/;
const passwordPattern = /(?!\s)^[^ ]{6,14}$/;
const namePattern = /^[a-zA-zа-яіїєА-ЯІЇЄ ,.'-]{2,12}[^\_]*$/;
const commentPattern = /^[\p{L}]{3,14}$/u;
const amountPattern = /^\d+(\.\d{1,2})?$/;
const walletPattern = /^[\p{L} ]{2,12}$/u;
const categoryPattern = /^[\p{L} ]{2,12}$/u;

export {
  emailPattern,
  passwordPattern,
  namePattern,
  commentPattern,
  amountPattern,
  walletPattern,
  categoryPattern,
};
