import handler from './handlers';

export default class generals {
  constructor() {
    handler(this);
  }


  static search(text, dbTable, fillTableFunction, handlerFunction) {
    if (handlerFunction === undefined) handlerFunction = initClientHandlers;
    if (fillTableFunction === undefined) fillTableFunction = fillCurrentTable;
    const word = text;
    if (word != null || word !== '') {
      const form = `tabla=${dbTable}&word=${word}`;
      connectAndSend('process/search', false, handlerFunction, fillTableFunction, form, null);
    }
  }
}
