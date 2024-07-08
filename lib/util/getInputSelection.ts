export const setCaretPosition = (el: HTMLInputElement | HTMLTextAreaElement, caretPos: number): void => {
  el.focus();
  el.setSelectionRange(caretPos, caretPos);
};


export const insertAtCursor = (myField: HTMLInputElement | HTMLTextAreaElement, myValue: string): void => {
  const currentValue = myField.value;
  const start = myField.selectionStart ?? 0;
  const end = myField.selectionEnd ?? 0;

  const newValue =
    currentValue.substring(0, start)
    + myValue
    + currentValue.substring(end, currentValue.length);

  myField.value = newValue;

  // Adjust the caret position after inserting the text
  setCaretPosition(myField, start + myValue.length);
};
