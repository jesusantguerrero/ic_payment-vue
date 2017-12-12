import { Selector } from 'testcafe';

fixture`Login page test`
  .page('http://localhost/icpayment');

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
    .typeText('#password-input', 'demo')
    .click('#btn-send-credentials');
});

