import { App } from 'obsidian';
import './types/dataview';
import './types/templater';

/**
 * Global Modifications types imported at runtime
 */
declare global {
  /**
   * Obsidian App Instance exposed in Templater
   */
  const app: App & { 
    vault: App['vault'] & {
      path: string;
    }
  }

  /**
   * Input variable for DataView Plugin
   */
  const input: Record<string, any>;
}