export default function copyText(domNode) {
  const range = document.createRange();  
  range.selectNode(domNode);  
  window.getSelection().addRange(range);  

  try {   
    const successful = document.execCommand('copy');  
  } catch(err) {  
    console.log('Oops, unable to copy', err);  
    return false;
  }  

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  
  return true;
};