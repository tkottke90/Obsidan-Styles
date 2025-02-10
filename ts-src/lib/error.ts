

export function showError(message: string, customConfig?: Record<string, any>) {
  dv.el('p', 'There was a problem: ' + message, { attr: { style: 'padding: 1rem 2rem; background-color: hsla(0, 100%, 50%, 30%); border: 2px solid hsla(0, 100%, 50%, 75%); color: hsla(0, 100%, 50%, 75%); border-radius: 0.25rem;' }, ...customConfig })
}