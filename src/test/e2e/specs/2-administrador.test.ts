import { Selector } from 'testcafe';
import { admin } from '../testHelpers/auth'
fixture`Admin page test`;

test('save company info', async (t) => {
  await t
    .useRole(admin)
    .navigateTo('http://localhost/icpayment/app/admin/administrador')
    .click('input[type="submit"]')
    .expect(Selector('.toasted.primary.success').innerText)
    .eql('Datos actualizados con exito');
});
