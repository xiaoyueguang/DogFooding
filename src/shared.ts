export const createFloatButton = () => {
  const button = document.createElement('button');
  button.className = 'dog-fooding-float-button';
  button.innerText = '?';
  document.body.appendChild(button);

  return button;
}
