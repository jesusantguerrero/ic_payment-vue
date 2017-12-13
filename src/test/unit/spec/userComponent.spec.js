import avoriaz from 'avoriaz';
import Vue from 'vue';
import UsersSection from './../../../modules/administrador/';

describe('UserSection Component', () => {
  beforeEach(() => {
    const admin = `
      <div id="administrador"> </div>
    `;

    document.body.innerHTML = document.body.innerHTML + admin;
  });

  it('should be mounted', () => {
    const UserSectionComponent = avoriaz.mount(UsersSection);

    const searchBar = UserSectionComponent.find('.search')[0];
    searchBar.trigger('keypress', 'k');
    expect(searchBar.value().to.containe('k'));
  });
});

