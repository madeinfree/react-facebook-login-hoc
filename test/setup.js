import jsdom from 'jsdom';
import sinon from 'sinon';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body><script></script></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}
