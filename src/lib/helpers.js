export const convertToHtml = (text, initialNumber = 1) => {
  let inputCounter = initialNumber;

  return (
    text
      // Convert bold
      .replace(/\*(.*?)\*/g, "<b>$1</b>")
      // Convert italic
      .replace(/_(.*?)_/g, "<i>$1</i>")
      // Convert underline
      .replace(/\|(.*?)\|/g, "<u>$1</u>")
      // Convert special input with counter
      .replace(/\^(?!\w)/g, () => {
        const currentNumber = inputCounter++;
        return `<span class="question-input-wrapper"><span class="hidden-text"></span><input type="text" style="width:128px;" class="question-input" placeholder="${currentNumber}" data-number="${currentNumber}"></span>`;
      })
      // Convert list items
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Wrap consecutive list items in <ul>
      .replace(/(<li>.*<\/li>)/gs, (match) => {
        return `<ul class="list-disc list-inside -space-y-5">${match}</ul>`;
      })
  );
};
