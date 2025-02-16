import { type Templater } from "./types/templater";

/**
 * Templater Script for Setting up the Title & Filename of a troubleshooting file
 * @param {Templater} tp Templater instance
 * @param {string} prompt Prompt to be passed to the user 
 * @returns 
 */
export default async function(tp: Templater, prompt: string) {
  const response = await tp.system.prompt(prompt, null, true, false);

  if (!response) {
    throw Error('Empty Titles Are Not Allowed')
  }

  await tp.file.rename(`${tp.date.now("YYYYMMDD")} - ${response}`)
  return `Troubleshooting - ${response}`
}