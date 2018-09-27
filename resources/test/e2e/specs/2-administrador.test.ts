import { Selector } from 'testcafe';
import { admin } from '../testHelpers/auth'
import { host } from '../testHelpers/auth'

fixture`Admin page test`;

test('save company info', async (t) => {
  await t
    .useRole(admin)
    .navigateTo(`http://localhost/${host}/app/admin/administrador`)
    .click('input[type="submit"]')
    .expect(Selector('.toasted.primary.success').innerText)
    .eql('Datos actualizados con exito');
  });

  test('should search admin', async (t) => {
    await t
      .useRole(admin)
      .navigateTo(`http://localhost/${host}/app/admin/administrador`)
      .click('[href*="users"]')
      .typeText('.searcher', 'demo')
      .expect(Selector('tbody tr:first-child td:nth-child(3)').innerText)
      .eql('demo');
});

// text('should save new user', async (t) => {
//   await t
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .typeText('')
//     .click('')
// })
