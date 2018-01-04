import avoriaz from 'avoriaz';
import $ from 'jquery';
import App from './../../../modules/app/index';
import AdminSection from './../../../modules/administrador/AdminSection.vue';
import UsersSection from './../../../modules/administrador/components/UsersSection.vue';

const admin = `
<div id="administrador"> </div>
`;

document.body.innerHTML += admin;
window.$ = $;
window.jQuery = $;
window.baseURL = '//localhost:3000/icpayment/';

describe('UserSection Component', () => {
  beforeEach(() => {

  });

  it('should be mounted', () => {
    const UserSectionComponent = avoriaz.mount(UsersSection);

    const searchBar = UserSectionComponent.find('.search')[0];
    searchBar.trigger('keypress', 'k');
    expect(searchBar.value().to.containe('k'));
  });
});

