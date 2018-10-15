import { Role } from 'testcafe';

const adminRole = Role('http://localhost/ic_payment/app/login', async t => {
  await t
  .typeText('#user-input', 'jguerrero')
  .typeText('#password-input', 'hola')
  .click('#btn-send-credentials');
})

export const admin = adminRole
export const host = 'ic_payment';
