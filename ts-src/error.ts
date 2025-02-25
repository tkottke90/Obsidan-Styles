
function showError(message: string, customConfig?: HTMLParagraphElement) {
  dv.el(
    'p',
    'There was a problem: ' + message, 
    { 
      attr: {
        style: 'padding: 1rem 2rem; background-color: hsla(0, 100%, 50%, 20%); border: 2px solid hsla(0, 100%, 50%, 75%); color: hsla(0, 100%, 50%, 75%); border-radius: 0.25rem;' 
      }, 
      ...customConfig 
    }
  );
}

showError(input['message'], input['customConfig']);