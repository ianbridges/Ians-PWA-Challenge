import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('jate');

    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => {
      console.info('Loaded IndexedDB data, entering into editor');
      console.log(data);
      const text = data ? data.content : ""
      this.editorr.setValue(text || localData || header);
    });
  
    this.editor.on('change', () => {
      localStorage.setItem('jate', this.editor.getValue());
    });

    this.editor.on('blur', () => {
      consol.log('Editor has lost focus');
      putDb(localStorage.getItem('jate'));
    });
  }
};