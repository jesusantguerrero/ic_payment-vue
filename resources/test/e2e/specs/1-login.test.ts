import { Selector } from 'testcafe';
import { host } from '../testHelpers/auth'

fixture`Login page test`
  .page(`http://localhost/${host}`);

test('bad Login', async t => {
  await t
    .typeText('#user-input', 'melissa')
    .typeText('#password-input', 'mi password')
    .click('#btn-send-credentials')
    .expect(Selector('.toasted.primary.info').innerText)
    .eql('Usuario y Contraseña no validos');
});

test('good Login', async t => {
  await t
    .typeText('#user-input', 'demo')
    .typeText('#password-input', 'hola')
    .click('#btn-send-credentials');
});

